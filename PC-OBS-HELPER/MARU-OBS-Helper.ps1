$ErrorActionPreference = 'Stop'
$script:HelperPort = 8765
$script:LastObsPort = 4455
$script:LastObsPassword = ''
$script:LogFile = Join-Path $PSScriptRoot 'MARU-OBS-Helper.log'

function Write-Log([string]$Text) {
    try {
        $line = ('{0:yyyy-MM-dd HH:mm:ss}  {1}' -f (Get-Date), $Text)
        Add-Content -LiteralPath $script:LogFile -Value $line -Encoding UTF8
    } catch {}
}

function Find-ObsPath {
    $candidates = @(
        (Join-Path $env:ProgramFiles 'obs-studio\bin\64bit\obs64.exe'),
        (Join-Path ${env:ProgramFiles(x86)} 'obs-studio\bin\64bit\obs64.exe'),
        (Join-Path $env:LOCALAPPDATA 'Programs\obs-studio\bin\64bit\obs64.exe')
    ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }
    if ($candidates.Count -gt 0) { return $candidates[0] }
    return $null
}

function Test-TcpPort([int]$Port) {
    $client = New-Object System.Net.Sockets.TcpClient
    try {
        $iar = $client.BeginConnect('127.0.0.1', $Port, $null, $null)
        if (-not $iar.AsyncWaitHandle.WaitOne(450)) { return $false }
        $client.EndConnect($iar)
        return $client.Connected
    } catch { return $false }
    finally { try { $client.Close() } catch {} }
}

function Ensure-ObsRunning {
    $running = Get-Process obs64 -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($running) { return $running }
    $path = Find-ObsPath
    if (-not $path) { throw 'OBS Studio를 찾지 못했습니다. OBS Studio를 먼저 설치해 주세요.' }
    $wd = Split-Path -Parent $path
    Write-Log "Starting OBS: $path"
    Start-Process -FilePath $path -WorkingDirectory $wd | Out-Null
    for ($i=0; $i -lt 20; $i++) {
        Start-Sleep -Milliseconds 700
        $running = Get-Process obs64 -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($running) { return $running }
    }
    throw 'OBS 실행을 확인하지 못했습니다.'
}

function ConvertTo-Sha256Base64([string]$Text) {
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
        return [Convert]::ToBase64String($sha.ComputeHash($bytes))
    } finally { $sha.Dispose() }
}

function Send-WsJson($Ws, $Object) {
    $json = $Object | ConvertTo-Json -Depth 12 -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $seg = [System.ArraySegment[byte]]::new($bytes, 0, $bytes.Length)
    $Ws.SendAsync($seg, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).GetAwaiter().GetResult() | Out-Null
}

function Receive-WsJson($Ws) {
    $buffer = New-Object byte[] 65536
    $ms = New-Object System.IO.MemoryStream
    try {
        do {
            $seg = [System.ArraySegment[byte]]::new($buffer, 0, $buffer.Length)
            $result = $Ws.ReceiveAsync($seg, [System.Threading.CancellationToken]::None).GetAwaiter().GetResult()
            if ($result.MessageType -eq [System.Net.WebSockets.WebSocketMessageType]::Close) { throw 'OBS WebSocket 연결이 닫혔습니다.' }
            if ($result.Count -gt 0) { $ms.Write($buffer, 0, $result.Count) }
        } until ($result.EndOfMessage)
        $text = [System.Text.Encoding]::UTF8.GetString($ms.ToArray())
        return $text | ConvertFrom-Json
    } finally { $ms.Dispose() }
}

function Connect-Obs([int]$Port, [string]$Password) {
    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    try {
        $uri = [Uri]("ws://127.0.0.1:{0}" -f $Port)
        $ws.ConnectAsync($uri, [System.Threading.CancellationToken]::None).GetAwaiter().GetResult() | Out-Null
        $hello = Receive-WsJson $ws
        if ([int]$hello.op -ne 0) { throw 'OBS WebSocket Hello 응답이 올바르지 않습니다.' }
        $identifyData = @{ rpcVersion = 1; eventSubscriptions = 0 }
        if ($hello.d.authentication) {
            if ([string]::IsNullOrEmpty($Password)) { throw 'OBS WebSocket 비밀번호가 필요합니다. MARU에 비밀번호를 입력해 주세요.' }
            $secret = ConvertTo-Sha256Base64 ($Password + [string]$hello.d.authentication.salt)
            $auth = ConvertTo-Sha256Base64 ($secret + [string]$hello.d.authentication.challenge)
            $identifyData.authentication = $auth
        }
        Send-WsJson $ws @{ op = 1; d = $identifyData }
        $identified = Receive-WsJson $ws
        if ([int]$identified.op -ne 2) { throw 'OBS WebSocket 인증에 실패했습니다. 비밀번호를 확인해 주세요.' }
        return $ws
    } catch {
        try { $ws.Dispose() } catch {}
        throw
    }
}

function Invoke-ObsRequest($Ws, [string]$Type, $Data = $null) {
    $id = [Guid]::NewGuid().ToString('N')
    $d = @{ requestType = $Type; requestId = $id }
    if ($null -ne $Data) { $d.requestData = $Data }
    Send-WsJson $Ws @{ op = 6; d = $d }
    while ($true) {
        $msg = Receive-WsJson $Ws
        if ([int]$msg.op -ne 7) { continue }
        if ([string]$msg.d.requestId -ne $id) { continue }
        if (-not $msg.d.requestStatus.result) {
            $comment = [string]$msg.d.requestStatus.comment
            if (-not $comment) { $comment = "OBS 요청 실패: $Type (code $($msg.d.requestStatus.code))" }
            throw $comment
        }
        return $msg.d.responseData
    }
}

function Try-ObsRequest($Ws, [string]$Type, $Data = $null) {
    try { return Invoke-ObsRequest $Ws $Type $Data } catch { return $null }
}

function Ensure-MaruSceneAndSource($Ws, [string]$SceneName, [string]$SourceName, [string]$WindowTitle) {
    $scenes = Invoke-ObsRequest $Ws 'GetSceneList'
    $sceneExists = $false
    foreach ($s in @($scenes.scenes)) { if ([string]$s.sceneName -eq $SceneName) { $sceneExists = $true; break } }
    if (-not $sceneExists) { Invoke-ObsRequest $Ws 'CreateScene' @{ sceneName = $SceneName } | Out-Null }

    $inputs = Invoke-ObsRequest $Ws 'GetInputList'
    $inputExists = $false
    foreach ($i in @($inputs.inputs)) { if ([string]$i.inputName -eq $SourceName) { $inputExists = $true; break } }

    $sceneItemId = $null
    if (-not $inputExists) {
        $kinds = Invoke-ObsRequest $Ws 'GetInputKindList'
        $kind = $null
        foreach ($k in @($kinds.inputKinds)) {
            if ([string]$k -eq 'window_capture') { $kind = 'window_capture'; break }
        }
        if (-not $kind) { throw 'OBS의 창 캡처(window_capture) 소스를 찾지 못했습니다.' }
        $created = Invoke-ObsRequest $Ws 'CreateInput' @{ sceneName=$SceneName; inputName=$SourceName; inputKind=$kind; inputSettings=@{}; sceneItemEnabled=$true }
        $sceneItemId = $created.sceneItemId
    } else {
        $item = Try-ObsRequest $Ws 'GetSceneItemId' @{ sceneName=$SceneName; sourceName=$SourceName }
        if ($item) { $sceneItemId = $item.sceneItemId }
        else {
            $createdItem = Invoke-ObsRequest $Ws 'CreateSceneItem' @{ sceneName=$SceneName; sourceName=$SourceName; sceneItemEnabled=$true }
            $sceneItemId = $createdItem.sceneItemId
        }
    }

    $props = $null
    for ($attempt=0; $attempt -lt 8; $attempt++) {
        $props = Try-ObsRequest $Ws 'GetInputPropertiesListPropertyItems' @{ inputName=$SourceName; propertyName='window' }
        if ($props -and @($props.propertyItems).Count -gt 0) { break }
        Start-Sleep -Milliseconds 450
    }
    if (-not $props) { throw 'OBS 창 목록을 읽지 못했습니다. MARU_OBS_LIVE 창을 열어 둔 뒤 다시 시도해 주세요.' }

    $match = $null
    foreach ($it in @($props.propertyItems)) {
        $nm = [string]$it.itemName; $val = [string]$it.itemValue
        if ($nm -like "*$WindowTitle*" -or $val -like "*$WindowTitle*") { $match = $it; break }
    }
    if (-not $match) {
        $names = @($props.propertyItems | ForEach-Object { [string]$_.itemName } | Where-Object { $_ } | Select-Object -First 8) -join ' / '
        throw "MARU_OBS_LIVE 창을 OBS에서 찾지 못했습니다. 창을 닫지 말고 다시 시도해 주세요. 현재 창: $names"
    }

    Invoke-ObsRequest $Ws 'SetInputSettings' @{ inputName=$SourceName; inputSettings=@{ window=[string]$match.itemValue; capture_cursor=$false; capture_audio=$true }; overlay=$true } | Out-Null
    Invoke-ObsRequest $Ws 'SetCurrentProgramScene' @{ sceneName=$SceneName } | Out-Null

    if (-not $sceneItemId) {
        $item = Invoke-ObsRequest $Ws 'GetSceneItemId' @{ sceneName=$SceneName; sourceName=$SourceName }
        $sceneItemId = $item.sceneItemId
    }
    $video = Invoke-ObsRequest $Ws 'GetVideoSettings'
    $bw = [double]$video.baseWidth; $bh = [double]$video.baseHeight
    if ($bw -le 0) { $bw = 1920 }; if ($bh -le 0) { $bh = 1080 }
    Invoke-ObsRequest $Ws 'SetSceneItemTransform' @{ sceneName=$SceneName; sceneItemId=[int]$sceneItemId; sceneItemTransform=@{ positionX=0.0; positionY=0.0; boundsType='OBS_BOUNDS_SCALE_INNER'; boundsWidth=$bw; boundsHeight=$bh; alignment=5 } } | Out-Null
    return @{ sceneName=$SceneName; sourceName=$SourceName; window=[string]$match.itemName; captureAudio=$true }
}

function Start-MaruObs($Payload) {
    $obsPort = 4455
    if ($Payload.obsPort) { $obsPort = [int]$Payload.obsPort }
    $password = [string]$Payload.obsPassword
    $sceneName = [string]$Payload.sceneName; if ([string]::IsNullOrWhiteSpace($sceneName)) { $sceneName='MARU LIVE' }
    $sourceName = [string]$Payload.sourceName; if ([string]::IsNullOrWhiteSpace($sourceName)) { $sourceName='MARU_OBS_LIVE' }
    $windowTitle = [string]$Payload.windowTitle; if ([string]::IsNullOrWhiteSpace($windowTitle)) { $windowTitle='MARU_OBS_LIVE' }
    $script:LastObsPort = $obsPort; $script:LastObsPassword = $password

    Ensure-ObsRunning | Out-Null
    $connected = $false
    for ($i=0; $i -lt 22; $i++) {
        if (Test-TcpPort $obsPort) { $connected=$true; break }
        Start-Sleep -Milliseconds 650
    }
    if (-not $connected) { throw "OBS WebSocket 포트 $obsPort 에 연결할 수 없습니다. OBS → 도구 → WebSocket 서버 설정에서 서버를 켜 주세요." }

    $ws = Connect-Obs $obsPort $password
    try {
        $prepared = Ensure-MaruSceneAndSource $ws $sceneName $sourceName $windowTitle
        $streamActive = $false; $message = 'OBS 장면과 MARU 창 캡처를 자동 연결하고 원곡 오디오 캡처를 켰습니다.'
        if ($Payload.startStream -ne $false) {
            $status = Invoke-ObsRequest $ws 'GetStreamStatus'
            $streamActive = [bool]$status.outputActive
            if (-not $streamActive) {
                try {
                    Invoke-ObsRequest $ws 'StartStream' | Out-Null
                    Start-Sleep -Milliseconds 600
                    $status = Invoke-ObsRequest $ws 'GetStreamStatus'
                    $streamActive = [bool]$status.outputActive
                    if ($streamActive) { $message = 'OBS 장면·원곡 오디오 캡처 연결과 스트리밍 시작을 완료했습니다.' }
                } catch {
                    $message = 'OBS 장면은 자동 연결됐지만 스트리밍 시작은 실패했습니다. OBS의 BIGO 스트림/송출 설정을 먼저 확인하세요. ' + $_.Exception.Message
                }
            } else { $message='OBS가 이미 송출 중이며 MARU 장면으로 전환했습니다.' }
        }
        return @{ ok=$true; streamActive=$streamActive; sceneName=$prepared.sceneName; sourceName=$prepared.sourceName; window=$prepared.window; captureAudio=$prepared.captureAudio; message=$message }
    } finally {
        try { $ws.Dispose() } catch {}
    }
}

function Stop-MaruObs($Payload) {
    $port = $script:LastObsPort; $password=$script:LastObsPassword
    if ($Payload.obsPort) { $port=[int]$Payload.obsPort }
    if ($null -ne $Payload.obsPassword) { $password=[string]$Payload.obsPassword }
    $ws = Connect-Obs $port $password
    try {
        $status = Invoke-ObsRequest $ws 'GetStreamStatus'
        if ([bool]$status.outputActive) { Invoke-ObsRequest $ws 'StopStream' | Out-Null; Start-Sleep -Milliseconds 400 }
        return @{ ok=$true; streamActive=$false; message='OBS 프로그램은 유지하고 송출만 종료했습니다.' }
    } finally { try { $ws.Dispose() } catch {} }
}

function Get-Status {
    $obsRunning = [bool](Get-Process obs64 -ErrorAction SilentlyContinue | Select-Object -First 1)
    $obsConnected = Test-TcpPort $script:LastObsPort
    return @{ ok=$true; helper='MARU OBS Helper V0.22.89'; obsRunning=$obsRunning; obsConnected=$obsConnected; obsPort=$script:LastObsPort }
}

function Read-HttpRequest($Client) {
    $stream = $Client.GetStream(); $stream.ReadTimeout=5000
    $ms = New-Object System.IO.MemoryStream
    $buffer = New-Object byte[] 8192
    $headerEnd = -1; $contentLength=0
    while ($true) {
        $count = $stream.Read($buffer,0,$buffer.Length)
        if ($count -le 0) { break }
        $ms.Write($buffer,0,$count)
        $all = $ms.ToArray()
        if ($headerEnd -lt 0) {
            $txt = [System.Text.Encoding]::ASCII.GetString($all)
            $headerEnd = $txt.IndexOf("`r`n`r`n")
            if ($headerEnd -ge 0) {
                $headerText = $txt.Substring(0,$headerEnd)
                $m = [regex]::Match($headerText, '(?im)^Content-Length:\s*(\d+)\s*$')
                if ($m.Success) { $contentLength=[int]$m.Groups[1].Value }
            }
        }
        if ($headerEnd -ge 0 -and $all.Length -ge ($headerEnd+4+$contentLength)) { break }
        if ($all.Length -gt 1048576) { throw 'HTTP 요청이 너무 큽니다.' }
    }
    $bytes=$ms.ToArray();$ms.Dispose()
    $text=[System.Text.Encoding]::UTF8.GetString($bytes)
    $idx=$text.IndexOf("`r`n`r`n"); if($idx -lt 0){throw '잘못된 HTTP 요청입니다.'}
    $head=$text.Substring(0,$idx);$body=$text.Substring($idx+4)
    $lines=$head -split "`r`n";$first=$lines[0] -split ' '
    return @{ method=$first[0]; path=$first[1]; body=$body }
}

function Write-HttpResponse($Client, [int]$Status, $Object, [bool]$NoBody=$false) {
    $stream=$Client.GetStream();
    $statusText = if($Status -eq 200){'OK'}elseif($Status -eq 204){'No Content'}elseif($Status -eq 400){'Bad Request'}else{'Internal Server Error'}
    $json = if($NoBody){''}else{($Object | ConvertTo-Json -Depth 10 -Compress)}
    $bodyBytes=[System.Text.Encoding]::UTF8.GetBytes($json)
    $headers = "HTTP/1.1 $Status $statusText`r`nContent-Type: application/json; charset=utf-8`r`nContent-Length: $($bodyBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, POST, OPTIONS`r`nAccess-Control-Allow-Headers: Content-Type`r`nAccess-Control-Allow-Private-Network: true`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
    $headBytes=[System.Text.Encoding]::ASCII.GetBytes($headers)
    $stream.Write($headBytes,0,$headBytes.Length)
    if(-not $NoBody -and $bodyBytes.Length -gt 0){$stream.Write($bodyBytes,0,$bodyBytes.Length)}
    $stream.Flush()
}

Write-Log 'MARU OBS Helper V0.22.89 started.'
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $script:HelperPort)
$listener.Start()
Write-Host "MARU OBS Helper V0.22.89 - http://127.0.0.1:$($script:HelperPort)"
Write-Host '이 창은 방송 중 닫지 마세요. Ctrl+C로 종료할 수 있습니다.'
try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $req=Read-HttpRequest $client
            if($req.method -eq 'OPTIONS'){Write-HttpResponse $client 204 @{} $true;continue}
            $path=([Uri]("http://127.0.0.1"+$req.path)).AbsolutePath
            $payload=@{}
            if($req.body){try{$payload=$req.body|ConvertFrom-Json}catch{$payload=@{}}}
            if($path -eq '/api/status'){$result=Get-Status;Write-HttpResponse $client 200 $result;continue}
            if($path -eq '/api/start'){$result=Start-MaruObs $payload;Write-HttpResponse $client 200 $result;continue}
            if($path -eq '/api/stop'){$result=Stop-MaruObs $payload;Write-HttpResponse $client 200 $result;continue}
            Write-HttpResponse $client 400 @{ok=$false;message='지원하지 않는 요청입니다.'}
        } catch {
            Write-Log ('ERROR ' + $_.Exception.Message)
            try { Write-HttpResponse $client 500 @{ok=$false;message=$_.Exception.Message} } catch {}
        } finally { try{$client.Close()}catch{} }
    }
} finally {
    try{$listener.Stop()}catch{}
    Write-Log 'MARU OBS Helper stopped.'
}
