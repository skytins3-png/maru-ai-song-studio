param(
    [Parameter(Mandatory=$true)][ValidateSet('start','stop')][string]$Mode,
    [Parameter(Mandatory=$true)][string]$PayloadBase64
)
$ErrorActionPreference = 'Stop'

function Out-Result($Object) {
    $Object | ConvertTo-Json -Depth 12 -Compress
}
function Fail([string]$Message) {
    Out-Result @{ ok=$false; message=$Message }
    exit 1
}
function Decode-Payload([string]$B64) {
    $bytes = [Convert]::FromBase64String($B64)
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)
    if ([string]::IsNullOrWhiteSpace($text)) { return @{} }
    return ($text | ConvertFrom-Json)
}
function Test-Port([int]$Port) {
    $c = New-Object System.Net.Sockets.TcpClient
    try {
        $ar = $c.BeginConnect('127.0.0.1', $Port, $null, $null)
        if (-not $ar.AsyncWaitHandle.WaitOne(500)) { return $false }
        $c.EndConnect($ar)
        return $c.Connected
    } catch { return $false }
    finally { try { $c.Close() } catch {} }
}
function Find-ObsPath {
    $list = @()
    if ($env:ProgramFiles) { $list += (Join-Path $env:ProgramFiles 'obs-studio\bin\64bit\obs64.exe') }
    $pf86 = ${env:ProgramFiles(x86)}
    if ($pf86) { $list += (Join-Path $pf86 'obs-studio\bin\64bit\obs64.exe') }
    if ($env:LOCALAPPDATA) { $list += (Join-Path $env:LOCALAPPDATA 'Programs\obs-studio\bin\64bit\obs64.exe') }
    foreach ($p in $list) { if (Test-Path -LiteralPath $p) { return $p } }
    return $null
}
function Ensure-ObsRunning {
    $p = Get-Process obs64 -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($p) { return }
    $obs = Find-ObsPath
    if (-not $obs) { throw 'OBS Studio was not found. Install OBS Studio first.' }
    Start-Process -FilePath $obs -WorkingDirectory (Split-Path -Parent $obs) | Out-Null
    for ($i=0; $i -lt 24; $i++) {
        Start-Sleep -Milliseconds 500
        if (Get-Process obs64 -ErrorAction SilentlyContinue | Select-Object -First 1) { return }
    }
    throw 'OBS Studio did not start.'
}
function Sha256B64([string]$Text) {
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try { return [Convert]::ToBase64String($sha.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($Text))) }
    finally { $sha.Dispose() }
}
function Send-Json($Ws, $Object) {
    $json = $Object | ConvertTo-Json -Depth 12 -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $seg = [System.ArraySegment[byte]]::new($bytes, 0, $bytes.Length)
    $Ws.SendAsync($seg, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).GetAwaiter().GetResult() | Out-Null
}
function Receive-Json($Ws) {
    $buf = New-Object byte[] 65536
    $ms = New-Object System.IO.MemoryStream
    try {
        do {
            $seg = [System.ArraySegment[byte]]::new($buf, 0, $buf.Length)
            $r = $Ws.ReceiveAsync($seg, [System.Threading.CancellationToken]::None).GetAwaiter().GetResult()
            if ($r.MessageType -eq [System.Net.WebSockets.WebSocketMessageType]::Close) { throw 'OBS WebSocket closed.' }
            if ($r.Count -gt 0) { $ms.Write($buf, 0, $r.Count) }
        } until ($r.EndOfMessage)
        return ([System.Text.Encoding]::UTF8.GetString($ms.ToArray()) | ConvertFrom-Json)
    } finally { $ms.Dispose() }
}
function Connect-Obs([int]$Port, [string]$Password) {
    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $ws.ConnectAsync([Uri]("ws://127.0.0.1:$Port"), [System.Threading.CancellationToken]::None).GetAwaiter().GetResult() | Out-Null
    $hello = Receive-Json $ws
    if ([int]$hello.op -ne 0) { throw 'Invalid OBS WebSocket hello.' }
    $id = @{ rpcVersion=1; eventSubscriptions=0 }
    if ($hello.d.authentication) {
        if ([string]::IsNullOrEmpty($Password)) { throw 'OBS WebSocket password is required.' }
        $secret = Sha256B64 ($Password + [string]$hello.d.authentication.salt)
        $id.authentication = Sha256B64 ($secret + [string]$hello.d.authentication.challenge)
    }
    Send-Json $ws @{ op=1; d=$id }
    $ok = Receive-Json $ws
    if ([int]$ok.op -ne 2) { throw 'OBS WebSocket authentication failed.' }
    return $ws
}
function Req($Ws, [string]$Type, $Data=$null) {
    $id = [Guid]::NewGuid().ToString('N')
    $d = @{ requestType=$Type; requestId=$id }
    if ($null -ne $Data) { $d.requestData=$Data }
    Send-Json $Ws @{ op=6; d=$d }
    while ($true) {
        $m = Receive-Json $Ws
        if ([int]$m.op -ne 7) { continue }
        if ([string]$m.d.requestId -ne $id) { continue }
        if (-not $m.d.requestStatus.result) {
            $msg = [string]$m.d.requestStatus.comment
            if ([string]::IsNullOrWhiteSpace($msg)) { $msg = 'OBS request failed: ' + $Type }
            throw $msg
        }
        return $m.d.responseData
    }
}
function TryReq($Ws, [string]$Type, $Data=$null) {
    try { return Req $Ws $Type $Data } catch { return $null }
}
function Prepare-Scene($Ws, [string]$SceneName, [string]$SourceName, [string]$WindowTitle) {
    $sc = Req $Ws 'GetSceneList'
    $exists = $false
    foreach ($s in @($sc.scenes)) { if ([string]$s.sceneName -eq $SceneName) { $exists=$true; break } }
    if (-not $exists) { Req $Ws 'CreateScene' @{ sceneName=$SceneName } | Out-Null }
    $ins = Req $Ws 'GetInputList'
    $inputExists = $false
    foreach ($i in @($ins.inputs)) { if ([string]$i.inputName -eq $SourceName) { $inputExists=$true; break } }
    if (-not $inputExists) {
        $made = Req $Ws 'CreateInput' @{ sceneName=$SceneName; inputName=$SourceName; inputKind='window_capture'; inputSettings=@{}; sceneItemEnabled=$true }
        $sceneItemId = $made.sceneItemId
    } else {
        $item = TryReq $Ws 'GetSceneItemId' @{ sceneName=$SceneName; sourceName=$SourceName }
        if ($item) { $sceneItemId=$item.sceneItemId }
        else { $sceneItemId=(Req $Ws 'CreateSceneItem' @{ sceneName=$SceneName; sourceName=$SourceName; sceneItemEnabled=$true }).sceneItemId }
    }
    $props = $null
    for ($a=0; $a -lt 10; $a++) {
        $props = TryReq $Ws 'GetInputPropertiesListPropertyItems' @{ inputName=$SourceName; propertyName='window' }
        if ($props -and @($props.propertyItems).Count -gt 0) { break }
        Start-Sleep -Milliseconds 350
    }
    if (-not $props) { throw 'OBS could not read the window list. Open MARU_OBS_LIVE first.' }
    $match = $null
    foreach ($it in @($props.propertyItems)) {
        if ([string]$it.itemName -like "*$WindowTitle*" -or [string]$it.itemValue -like "*$WindowTitle*") { $match=$it; break }
    }
    if (-not $match) { throw 'MARU_OBS_LIVE window was not found. Open the MARU broadcast window first.' }
    Req $Ws 'SetInputSettings' @{ inputName=$SourceName; inputSettings=@{ window=[string]$match.itemValue; capture_cursor=$false; capture_audio=$true }; overlay=$true } | Out-Null
    Req $Ws 'SetCurrentProgramScene' @{ sceneName=$SceneName } | Out-Null
    $v = Req $Ws 'GetVideoSettings'
    $bw=[double]$v.baseWidth; $bh=[double]$v.baseHeight
    if ($bw -le 0) { $bw=1920 }; if ($bh -le 0) { $bh=1080 }
    Req $Ws 'SetSceneItemTransform' @{ sceneName=$SceneName; sceneItemId=[int]$sceneItemId; sceneItemTransform=@{ positionX=0.0; positionY=0.0; boundsType='OBS_BOUNDS_SCALE_INNER'; boundsWidth=$bw; boundsHeight=$bh; alignment=5 } } | Out-Null
}

try {
    $payload = Decode-Payload $PayloadBase64
    $port = 4455
    if ($payload.obsPort) { $port=[int]$payload.obsPort }
    $password = [string]$payload.obsPassword
    if ($Mode -eq 'start') {
        Ensure-ObsRunning
        for ($i=0; $i -lt 24; $i++) { if (Test-Port $port) { break }; Start-Sleep -Milliseconds 500 }
        if (-not (Test-Port $port)) { throw "OBS WebSocket port $port is not open. Enable WebSocket Server in OBS Tools menu." }
        $ws = Connect-Obs $port $password
        try {
            $scene = [string]$payload.sceneName; if ([string]::IsNullOrWhiteSpace($scene)) { $scene='MARU LIVE' }
            $source = [string]$payload.sourceName; if ([string]::IsNullOrWhiteSpace($source)) { $source='MARU_OBS_LIVE' }
            $window = [string]$payload.windowTitle; if ([string]::IsNullOrWhiteSpace($window)) { $window='MARU_OBS_LIVE' }
            Prepare-Scene $ws $scene $source $window
            $streamActive=$false
            if ($payload.startStream -ne $false) {
                $st = Req $ws 'GetStreamStatus'; $streamActive=[bool]$st.outputActive
                if (-not $streamActive) {
                    try { Req $ws 'StartStream' | Out-Null; Start-Sleep -Milliseconds 500; $streamActive=[bool](Req $ws 'GetStreamStatus').outputActive } catch {}
                }
            }
            Out-Result @{ ok=$true; streamActive=$streamActive; sceneName=$scene; sourceName=$source; captureAudio=$true; message='OBS and MARU window are connected.' }
        } finally { try { $ws.Dispose() } catch {} }
    } else {
        if (-not (Test-Port $port)) { Out-Result @{ok=$true;streamActive=$false;message='OBS is not connected.'}; exit 0 }
        $ws = Connect-Obs $port $password
        try {
            $st=Req $ws 'GetStreamStatus'
            if ([bool]$st.outputActive) { Req $ws 'StopStream' | Out-Null }
            Out-Result @{ok=$true;streamActive=$false;message='OBS streaming stopped.'}
        } finally { try{$ws.Dispose()}catch{} }
    }
    exit 0
} catch {
    Fail $_.Exception.Message
}
