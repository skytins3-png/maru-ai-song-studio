$ErrorActionPreference = 'Stop'
$Port = 8765
$ActionScript = Join-Path $PSScriptRoot 'MARU-OBS-Action.ps1'
$LogFile = Join-Path $PSScriptRoot 'MARU-OBS-Helper.log'
$HelperVersion = 'V0.23.05'

$script:SyncState = @{
    sessionId = ''
    manifest = $null
    manifestPending = $false
    packet = $null
    ackSeq = 0
    ended = $false
    completed = $false
    startedAt = ''
    lastActivity = ''
}

$script:UsbState = @{sessionId='';manifest=$null;registeredAt='';lastMobilePoll='';command=$null;commandDispatched=$false;requestId='';trackId='';assets=@{};ready=$false;error='';playState='idle';playUpdatedAt=''}

function Log-Line([string]$Text) {
    try {
        $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
        Add-Content -LiteralPath $LogFile -Value ($stamp + '  ' + $Text) -Encoding UTF8
    } catch {}
}

function Test-Port([int]$PortNumber) {
    $c = New-Object System.Net.Sockets.TcpClient
    try {
        $ar = $c.BeginConnect('127.0.0.1', $PortNumber, $null, $null)
        if (-not $ar.AsyncWaitHandle.WaitOne(350)) { return $false }
        $c.EndConnect($ar)
        return $c.Connected
    } catch { return $false }
    finally { try { $c.Close() } catch {} }
}

function Test-PrivateIPv4([string]$Ip) {
    if ($Ip -match '^10\.') { return $true }
    if ($Ip -match '^192\.168\.') { return $true }
    if ($Ip -match '^172\.(\d+)\.') {
        $n = [int]$Matches[1]
        return ($n -ge 16 -and $n -le 31)
    }
    return $false
}

function Get-LanIPv4 {
    $out = New-Object System.Collections.Generic.List[string]
    try {
        foreach ($nic in [System.Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces()) {
            if ($nic.OperationalStatus -ne [System.Net.NetworkInformation.OperationalStatus]::Up) { continue }
            if ($nic.NetworkInterfaceType -eq [System.Net.NetworkInformation.NetworkInterfaceType]::Loopback) { continue }
            try {
                foreach ($u in $nic.GetIPProperties().UnicastAddresses) {
                    if ($u.Address.AddressFamily -ne [System.Net.Sockets.AddressFamily]::InterNetwork) { continue }
                    $ip = $u.Address.ToString()
                    if (Test-PrivateIPv4 $ip) { if (-not $out.Contains($ip)) { $out.Add($ip) } }
                }
            } catch {}
        }
    } catch {}
    return @($out)
}

function Get-PnaId {
    try {
        foreach ($nic in [System.Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces()) {
            if ($nic.OperationalStatus -ne [System.Net.NetworkInformation.OperationalStatus]::Up) { continue }
            $raw = $nic.GetPhysicalAddress().ToString()
            if ($raw -match '^[0-9A-Fa-f]{12}$') {
                return (($raw.ToUpper() -split '(.{2})' | Where-Object { $_ }) -join ':')
            }
        }
    } catch {}
    return '02:00:00:00:00:01'
}

function Read-Request($Client) {
    $stream = $Client.GetStream()
    $stream.ReadTimeout = 20000
    $headerBytes = New-Object System.Collections.Generic.List[byte]
    $match = 0
    while ($true) {
        $b = $stream.ReadByte()
        if ($b -lt 0) { throw 'Connection closed before headers.' }
        $headerBytes.Add([byte]$b)
        if ($headerBytes.Count -gt 65536) { throw 'Request headers are too large.' }
        if (($match -eq 0 -and $b -eq 13) -or ($match -eq 2 -and $b -eq 13)) { $match++ }
        elseif (($match -eq 1 -and $b -eq 10) -or ($match -eq 3 -and $b -eq 10)) { $match++ }
        else { $match = $(if ($b -eq 13) { 1 } else { 0 }) }
        if ($match -eq 4) { break }
    }
    $headerText = [System.Text.Encoding]::ASCII.GetString($headerBytes.ToArray())
    $lines = $headerText -split "`r`n"
    if ($lines.Count -lt 1 -or [string]::IsNullOrWhiteSpace($lines[0])) { throw 'Empty request.' }
    $parts = $lines[0].Split(' ')
    if ($parts.Count -lt 2) { throw 'Invalid request line.' }
    $method = $parts[0].ToUpperInvariant()
    $path = $parts[1]
    [long]$contentLength = 0
    $headers = @{}
    foreach ($line in $lines) {
        if ($line -match '^([^:]+):\s*(.*)$') { $headers[$Matches[1].Trim().ToLowerInvariant()] = $Matches[2].Trim() }
        if ($line -match '^Content-Length:\s*(\d+)\s*$') { $contentLength = [long]$Matches[1] }
    }
    if ($contentLength -gt 4MB) { throw 'Request body is too large.' }
    $bodyBytes = New-Object byte[] ([int]$contentLength)
    $read = 0
    while ($read -lt $contentLength) {
        $n = $stream.Read($bodyBytes, $read, [int]($contentLength - $read))
        if ($n -le 0) { throw 'Connection closed while reading body.' }
        $read += $n
    }
    $body = if ($contentLength -gt 0) { [System.Text.Encoding]::UTF8.GetString($bodyBytes) } else { '' }
    return @{ method = $method; path = $path; body = $body; headers = $headers }
}

function Send-Response($Client, [int]$StatusCode, $Object, [bool]$NoBody = $false) {
    $stream = $Client.GetStream()
    switch ($StatusCode) {
        200 { $statusText = 'OK' }
        204 { $statusText = 'No Content' }
        400 { $statusText = 'Bad Request' }
        404 { $statusText = 'Not Found' }
        409 { $statusText = 'Conflict' }
        default { $statusText = 'Internal Server Error' }
    }
    if ($NoBody) { $json = '' } else { $json = $Object | ConvertTo-Json -Depth 30 -Compress }
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $pnaName = 'MARU-PC'
    $pnaId = Get-PnaId
    $headers = "HTTP/1.1 $StatusCode $statusText`r`n" +
               "Content-Type: application/json; charset=utf-8`r`n" +
               "Content-Length: $($bodyBytes.Length)`r`n" +
               "Access-Control-Allow-Origin: *`r`n" +
               "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
               "Access-Control-Allow-Headers: Content-Type`r`n" +
               "Access-Control-Allow-Private-Network: true`r`n" +
               "Private-Network-Access-Name: $pnaName`r`n" +
               "Private-Network-Access-ID: $pnaId`r`n" +
               "Cache-Control: no-store`r`n" +
               "Connection: close`r`n`r`n"
    $headBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
    $stream.Write($headBytes, 0, $headBytes.Length)
    if (-not $NoBody -and $bodyBytes.Length -gt 0) { $stream.Write($bodyBytes, 0, $bodyBytes.Length) }
    $stream.Flush()
}

function Body-Json([string]$Body) {
    if ([string]::IsNullOrWhiteSpace($Body)) { return $null }
    return ($Body | ConvertFrom-Json)
}

function Reset-SyncState {
    $script:SyncState.sessionId = ''
    $script:SyncState.manifest = $null
    $script:SyncState.manifestPending = $false
    $script:SyncState.packet = $null
    $script:SyncState.ackSeq = 0
    $script:SyncState.ended = $false
    $script:SyncState.completed = $false
    $script:SyncState.startedAt = ''
    $script:SyncState.lastActivity = ''
}

function Sync-Summary {
    return @{
        sessionId = [string]$script:SyncState.sessionId
        active = -not [string]::IsNullOrWhiteSpace([string]$script:SyncState.sessionId)
        manifestPending = [bool]$script:SyncState.manifestPending
        packetPending = ($null -ne $script:SyncState.packet)
        ackSeq = [int]$script:SyncState.ackSeq
        ended = [bool]$script:SyncState.ended
        completed = [bool]$script:SyncState.completed
        startedAt = [string]$script:SyncState.startedAt
        lastActivity = [string]$script:SyncState.lastActivity
    }
}


function Get-QueryParam($Uri,[string]$Name){try{$q=[string]$Uri.Query;if($q.StartsWith('?')){$q=$q.Substring(1)};foreach($part in($q -split '&')){if([string]::IsNullOrWhiteSpace($part)){continue};$kv=$part -split '=',2;if([System.Uri]::UnescapeDataString($kv[0]) -eq $Name){if($kv.Count -gt 1){return [System.Uri]::UnescapeDataString($kv[1].Replace('+',' '))};return ''}}}catch{};return ''}
function Dispose-UsbAssets{try{foreach($k in @($script:UsbState.assets.Keys)){$a=$script:UsbState.assets[$k];try{if($null -ne $a.stream){$a.stream.Dispose()}}catch{}}}catch{};$script:UsbState.assets=@{}}
function Reset-UsbTrack{Dispose-UsbAssets;$script:UsbState.command=$null;$script:UsbState.commandDispatched=$false;$script:UsbState.requestId='';$script:UsbState.trackId='';$script:UsbState.ready=$false;$script:UsbState.error='';$script:UsbState.playState='idle';$script:UsbState.playUpdatedAt=(Get-Date).ToString('o')}
function Reset-UsbAll{Reset-UsbTrack;$script:UsbState.sessionId='';$script:UsbState.manifest=$null;$script:UsbState.registeredAt='';$script:UsbState.lastMobilePoll=''}
function Usb-AssetSummary{$h=@{};foreach($k in @($script:UsbState.assets.Keys)){$a=$script:UsbState.assets[$k];$h[$k]=@{complete=[bool]$a.complete;received=[long]$a.received;size=[long]$a.size;type=[string]$a.type;name=[string]$a.name;nextChunk=[int]$a.nextChunk;totalChunks=[int]$a.totalChunks}};return $h}

function Get-UsbCurrentEntry{
    try{
        if($null -eq $script:UsbState.manifest -or [string]::IsNullOrWhiteSpace([string]$script:UsbState.trackId)){return $null}
        foreach($e in @($script:UsbState.manifest.entries)){
            if([string]$e.id -eq [string]$script:UsbState.trackId){return $e}
        }
    }catch{}
    return $null
}
function Usb-Progress{[double]$expected=0;[double]$received=0;foreach($k in @($script:UsbState.assets.Keys)){$a=$script:UsbState.assets[$k];$received+=[double]$a.received;if([long]$a.size -gt 0){$expected+=[double]$a.size}};if($expected -le 0){return 0};return [Math]::Min(99,[Math]::Round(($received/$expected)*100))}
function Get-UsbPreferredIPv4{$preferred=New-Object System.Collections.Generic.List[string];$other=New-Object System.Collections.Generic.List[string];try{foreach($nic in [System.Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces()){if($nic.OperationalStatus -ne [System.Net.NetworkInformation.OperationalStatus]::Up){continue};if($nic.NetworkInterfaceType -eq [System.Net.NetworkInformation.NetworkInterfaceType]::Loopback){continue};$label=([string]$nic.Name+' '+[string]$nic.Description);foreach($u in $nic.GetIPProperties().UnicastAddresses){if($u.Address.AddressFamily -ne [System.Net.Sockets.AddressFamily]::InterNetwork){continue};$ip=$u.Address.ToString();if(-not(Test-PrivateIPv4 $ip)){continue};if($label -match '(?i)USB|RNDIS|Remote NDIS|Android|Samsung|Mobile|Tether'){if(-not $preferred.Contains($ip)){$preferred.Add($ip)}}elseif(-not $other.Contains($ip)){$other.Add($ip)}}}}catch{};foreach($ip in $other){if(-not $preferred.Contains($ip)){$preferred.Add($ip)}};return @($preferred)}
function Send-BinaryResponse($Client,$Req,$Asset){if($null -eq $Asset -or -not [bool]$Asset.complete -or $null -eq $Asset.stream){Send-Response $Client 404 @{ok=$false;message='USB media is not ready.'};return};$net=$Client.GetStream();$len=[long]$Asset.stream.Length;$start=[long]0;$end=$len-1;$partial=$false;try{$range=[string]$Req.headers['range'];if($range -match '^bytes=(\d*)-(\d*)'){if(-not[string]::IsNullOrWhiteSpace($Matches[1])){$start=[long]$Matches[1]};if(-not[string]::IsNullOrWhiteSpace($Matches[2])){$end=[long]$Matches[2]};if($end -ge $len){$end=$len-1};if($start -lt 0){$start=0};if($start -le $end){$partial=$true}}}catch{};$count=[long]($end-$start+1);$code=if($partial){206}else{200};$text=if($partial){'Partial Content'}else{'OK'};$type=if([string]::IsNullOrWhiteSpace([string]$Asset.type)){'application/octet-stream'}else{[string]$Asset.type};$h="HTTP/1.1 $code $text`r`nContent-Type: $type`r`nContent-Length: $count`r`nAccept-Ranges: bytes`r`n"+$(if($partial){"Content-Range: bytes $start-$end/$len`r`n"}else{''})+"Access-Control-Allow-Origin: *`r`nAccess-Control-Allow-Private-Network: true`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n";$hb=[System.Text.Encoding]::ASCII.GetBytes($h);$net.Write($hb,0,$hb.Length);$Asset.stream.Position=$start;$buf=New-Object byte[] 65536;[long]$remaining=$count;while($remaining -gt 0){$want=[int][Math]::Min([long]$buf.Length,$remaining);$n=$Asset.stream.Read($buf,0,$want);if($n -le 0){break};$net.Write($buf,0,$n);$remaining-=$n};$net.Flush()}

function Invoke-Action([string]$Mode, [string]$Body) {
    if (-not (Test-Path -LiteralPath $ActionScript)) { throw 'MARU-OBS-Action.ps1 is missing.' }
    if ([string]::IsNullOrEmpty($Body)) { $Body = '{}' }
    $payloadBytes = [System.Text.Encoding]::UTF8.GetBytes($Body)
    $payloadB64 = [Convert]::ToBase64String($payloadBytes)
    $outFile = Join-Path $env:TEMP ('maru_obs_action_' + [Guid]::NewGuid().ToString('N') + '.txt')
    $errFile = Join-Path $env:TEMP ('maru_obs_action_' + [Guid]::NewGuid().ToString('N') + '.err')
    try {
        $args = @('-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$ActionScript,'-Mode',$Mode,'-PayloadBase64',$payloadB64)
        $p = Start-Process -FilePath 'powershell.exe' -ArgumentList $args -Wait -PassThru -WindowStyle Hidden -RedirectStandardOutput $outFile -RedirectStandardError $errFile
        $out = ''
        if (Test-Path $outFile) { $out = (Get-Content -LiteralPath $outFile -Raw -ErrorAction SilentlyContinue) }
        $err = ''
        if (Test-Path $errFile) { $err = (Get-Content -LiteralPath $errFile -Raw -ErrorAction SilentlyContinue) }
        if ($p.ExitCode -ne 0) {
            if ([string]::IsNullOrWhiteSpace($err)) { $err = 'OBS action failed with exit code ' + $p.ExitCode }
            throw $err.Trim()
        }
        if ([string]::IsNullOrWhiteSpace($out)) { throw 'OBS action returned no data.' }
        return ($out.Trim() | ConvertFrom-Json)
    } finally {
        Remove-Item -LiteralPath $outFile -Force -ErrorAction SilentlyContinue
        Remove-Item -LiteralPath $errFile -Force -ErrorAction SilentlyContinue
    }
}

Clear-Host
Write-Host ("MARU OBS Helper " + $HelperVersion)
Write-Host '[1/3] PowerShell started.'
Log-Line ('Helper ' + $HelperVersion + ' launch requested.')

$listener = $null
try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
    $listener.Start()
} catch {
    Write-Host ('[ERROR] Port 8765 could not be opened: ' + $_.Exception.Message) -ForegroundColor Red
    Log-Line ('PORT ERROR: ' + $_.Exception.Message)
    Write-Host 'Close any older MARU helper window, then run START-MARU-OBS-HELPER.bat again.'
    Read-Host 'Press Enter to close'
    exit 2
}

$lanIps = @(Get-LanIPv4)
Write-Host '[2/3] Local/LAN port 8765 opened.' -ForegroundColor Green
Write-Host '[3/3] READY - http://127.0.0.1:8765' -ForegroundColor Green
if ($lanIps.Count -gt 0) {
    Write-Host ''
    Write-Host 'USB / PHONE LIVE ADDRESS:' -ForegroundColor Cyan
    foreach ($ip in $lanIps) { Write-Host ("  http://" + $ip + ":8765") -ForegroundColor Cyan }
    Write-Host 'If Windows Firewall asks, allow Private networks.' -ForegroundColor Yellow
} else {
    Write-Host 'ADB USB auto mode is used. USB tethering is not required.' -ForegroundColor Yellow
}
Write-Host ''
Write-Host 'Helper stays alive in the background until MARU Complete Exit is used.'
Write-Host 'Ctrl+C stops the helper.'
Write-Host ''
Log-Line ('READY on 0.0.0.0:' + $Port + '; LAN=' + ($lanIps -join ','))

$running = $true
try {
    while ($running) {
        $client = $listener.AcceptTcpClient()
        try {
            $req = Read-Request $client
            if ($req.method -eq 'OPTIONS') {
                Send-Response $client 204 @{} $true
                continue
            }
            $uri = New-Object System.Uri(('http://127.0.0.1' + $req.path))
            $path = $uri.AbsolutePath

            if ($path -eq '/' -or $path -eq '/api/status') {
                $obsRunning = [bool](Get-Process obs64 -ErrorAction SilentlyContinue | Select-Object -First 1)
                $ips = @(Get-LanIPv4)
                $urls = @($ips | ForEach-Object { 'http://' + $_ + ':' + $Port })
                $result = @{
                    ok=$true; helper=('MARU OBS Helper ' + $HelperVersion); ready=$true;
                    obsRunning=$obsRunning; obsConnected=(Test-Port 4455); obsPort=4455;
                    directSync=$true; directSyncVersion=1; lanIps=$ips; lanUrls=$urls; usbStream=$true; usbStreamVersion=1; usbIps=@(Get-UsbPreferredIPv4); usbUrls=@((Get-UsbPreferredIPv4) | ForEach-Object { 'http://' + $_ + ':' + $Port });
                    sync=(Sync-Summary); message='Helper is ready.'
                }
                Send-Response $client 200 $result
                continue
            }

            if ($path -eq '/api/start') {
                $result = Invoke-Action 'start' $req.body
                Send-Response $client 200 $result
                continue
            }
            if ($path -eq '/api/stop') {
                $result = Invoke-Action 'stop' $req.body
                Send-Response $client 200 $result
                continue
            }

            if ($path -eq '/api/direct/begin' -and $req.method -eq 'POST') {
                $j = Body-Json $req.body
                if ($null -eq $j -or $null -eq $j.manifest -or $null -eq $j.manifest.entries) { throw 'Direct sync manifest is missing.' }
                Reset-SyncState
                $script:SyncState.sessionId = [Guid]::NewGuid().ToString('N')
                $script:SyncState.manifest = $j.manifest
                $script:SyncState.manifestPending = $true
                $script:SyncState.startedAt = (Get-Date).ToString('o')
                $script:SyncState.lastActivity = $script:SyncState.startedAt
                Log-Line ('DIRECT BEGIN session=' + $script:SyncState.sessionId + ' count=' + @($j.manifest.entries).Count)
                Send-Response $client 200 @{ ok=$true; sessionId=$script:SyncState.sessionId; message='Direct sync session started.' }
                continue
            }

            if ($path -eq '/api/direct/manifest-ack' -and $req.method -eq 'POST') {
                $j = Body-Json $req.body
                if ([string]$j.sessionId -eq [string]$script:SyncState.sessionId) {
                    $script:SyncState.manifestPending = $false
                    $script:SyncState.lastActivity = (Get-Date).ToString('o')
                }
                Send-Response $client 200 (@{ok=$true} + (Sync-Summary))
                continue
            }

            if ($path -eq '/api/direct/chunk' -and $req.method -eq 'POST') {
                $j = Body-Json $req.body
                if ($null -eq $j) { throw 'Direct sync chunk is empty.' }
                if ([string]$j.sessionId -ne [string]$script:SyncState.sessionId) {
                    Send-Response $client 200 @{ok=$false;sessionMismatch=$true;message='Direct sync session changed.'}
                    continue
                }
                $seq = [int]$j.seq
                if ($seq -le [int]$script:SyncState.ackSeq) {
                    Send-Response $client 200 @{ok=$true;accepted=$true;alreadyAcked=$true;ackSeq=[int]$script:SyncState.ackSeq}
                    continue
                }
                if ($null -ne $script:SyncState.packet) {
                    if ([int]$script:SyncState.packet.seq -eq $seq) {
                        Send-Response $client 200 @{ok=$true;accepted=$true;pending=$true;ackSeq=[int]$script:SyncState.ackSeq}
                    } else {
                        Send-Response $client 200 @{ok=$false;busy=$true;pendingSeq=[int]$script:SyncState.packet.seq;ackSeq=[int]$script:SyncState.ackSeq}
                    }
                    continue
                }
                if ([string]::IsNullOrWhiteSpace([string]$j.data)) { throw 'Direct sync chunk data is missing.' }
                $script:SyncState.packet = $j
                $script:SyncState.lastActivity = (Get-Date).ToString('o')
                Send-Response $client 200 @{ok=$true;accepted=$true;pending=$true;ackSeq=[int]$script:SyncState.ackSeq}
                continue
            }

            if ($path -eq '/api/direct/poll' -and $req.method -eq 'GET') {
                $result = Sync-Summary
                $result.ok = $true
                if ($script:SyncState.manifestPending -and $null -ne $script:SyncState.manifest) { $result.manifest = $script:SyncState.manifest }
                if ($null -ne $script:SyncState.packet) { $result.packet = $script:SyncState.packet }
                Send-Response $client 200 $result
                continue
            }

            if ($path -eq '/api/direct/state' -and $req.method -eq 'GET') {
                $result = Sync-Summary
                $result.ok = $true
                Send-Response $client 200 $result
                continue
            }

            if ($path -eq '/api/direct/ack' -and $req.method -eq 'POST') {
                $j = Body-Json $req.body
                if ([string]$j.sessionId -eq [string]$script:SyncState.sessionId -and $null -ne $script:SyncState.packet) {
                    $seq = [int]$j.seq
                    if ([int]$script:SyncState.packet.seq -eq $seq) {
                        $script:SyncState.ackSeq = $seq
                        $script:SyncState.packet = $null
                        $script:SyncState.lastActivity = (Get-Date).ToString('o')
                    }
                }
                $result = Sync-Summary; $result.ok=$true
                Send-Response $client 200 $result
                continue
            }

            if ($path -eq '/api/direct/end' -and $req.method -eq 'POST') {
                $j = Body-Json $req.body
                if ([string]$j.sessionId -eq [string]$script:SyncState.sessionId) {
                    $script:SyncState.ended = $true
                    $script:SyncState.lastActivity = (Get-Date).ToString('o')
                    Log-Line ('DIRECT END session=' + $script:SyncState.sessionId + ' ackSeq=' + $script:SyncState.ackSeq)
                }
                $result = Sync-Summary; $result.ok=$true
                Send-Response $client 200 $result
                continue
            }

            if ($path -eq '/api/direct/complete' -and $req.method -eq 'POST') {
                $j = Body-Json $req.body
                if ([string]$j.sessionId -eq [string]$script:SyncState.sessionId) {
                    $script:SyncState.completed = $true
                    $script:SyncState.lastActivity = (Get-Date).ToString('o')
                    Log-Line ('DIRECT COMPLETE session=' + $script:SyncState.sessionId)
                }
                $result = Sync-Summary; $result.ok=$true
                Send-Response $client 200 $result
                continue
            }

            if ($path -eq '/api/direct/cancel' -and $req.method -eq 'POST') {
                $old = [string]$script:SyncState.sessionId
                Reset-SyncState
                Log-Line ('DIRECT CANCEL session=' + $old)
                Send-Response $client 200 @{ok=$true;message='Direct sync cancelled.'}
                continue
            }


            if($path -eq '/api/usb/register' -and $req.method -eq 'POST'){$j=Body-Json $req.body;if($null -eq $j -or $null -eq $j.manifest -or $null -eq $j.manifest.entries){throw 'USB manifest is missing.'};Reset-UsbAll;$script:UsbState.sessionId=[Guid]::NewGuid().ToString('N');$script:UsbState.manifest=$j.manifest;$script:UsbState.registeredAt=(Get-Date).ToString('o');$script:UsbState.lastMobilePoll=$script:UsbState.registeredAt;Log-Line('USB REGISTER session='+$script:UsbState.sessionId+' count='+@($j.manifest.entries).Count);Send-Response $client 200 @{ok=$true;sessionId=$script:UsbState.sessionId;message='USB mobile library registered in memory only.'};continue}
            if($path -eq '/api/usb/manifest' -and $req.method -eq 'GET'){Send-Response $client 200 @{ok=$true;sessionId=[string]$script:UsbState.sessionId;manifest=$script:UsbState.manifest;registeredAt=[string]$script:UsbState.registeredAt;ready=[bool](-not[string]::IsNullOrWhiteSpace([string]$script:UsbState.sessionId))};continue}
            if($path -eq '/api/usb/request' -and $req.method -eq 'POST'){$j=Body-Json $req.body;if([string]::IsNullOrWhiteSpace([string]$script:UsbState.sessionId)){throw 'USB mobile is not connected.'};if([string]::IsNullOrWhiteSpace([string]$j.trackId)){throw 'USB trackId is missing.'};Reset-UsbTrack;$script:UsbState.requestId=[Guid]::NewGuid().ToString('N');$script:UsbState.trackId=[string]$j.trackId;$assets=@($j.assets);if($assets.Count -eq 0){$assets=@('blob')};$script:UsbState.command=@{requestId=$script:UsbState.requestId;trackId=$script:UsbState.trackId;assets=$assets};$script:UsbState.commandDispatched=$false;$script:UsbState.playState='loading';$script:UsbState.playUpdatedAt=(Get-Date).ToString('o');Send-Response $client 200 @{ok=$true;requestId=$script:UsbState.requestId};continue}
            if($path -eq '/api/usb/mobile-command' -and $req.method -eq 'GET'){$sid=Get-QueryParam $uri 'sessionId';if($sid -ne [string]$script:UsbState.sessionId){Send-Response $client 200 @{ok=$false;message='USB session mismatch.'};continue};$script:UsbState.lastMobilePoll=(Get-Date).ToString('o');$cmd=$null;if($null -ne $script:UsbState.command -and -not[bool]$script:UsbState.commandDispatched){$cmd=$script:UsbState.command;$script:UsbState.commandDispatched=$true};Send-Response $client 200 @{ok=$true;command=$cmd};continue}
            if($path -eq '/api/usb/chunk' -and $req.method -eq 'POST'){$j=Body-Json $req.body;if([string]$j.sessionId -ne [string]$script:UsbState.sessionId -or [string]$j.requestId -ne [string]$script:UsbState.requestId){Send-Response $client 409 @{ok=$false;message='USB request changed.'};continue};$asset=[string]$j.asset;if([string]::IsNullOrWhiteSpace($asset)){throw 'USB asset missing.'};if(-not $script:UsbState.assets.ContainsKey($asset)){$script:UsbState.assets[$asset]=@{stream=New-Object System.IO.MemoryStream;type=[string]$j.type;name=[string]$j.name;complete=$false;received=[long]0;size=[long]0;nextChunk=0;totalChunks=[int]$j.totalChunks}};$a=$script:UsbState.assets[$asset];$idx=[int]$j.chunkIndex;if($idx -lt [int]$a.nextChunk){Send-Response $client 200 @{ok=$true;accepted=$true;already=$true};continue};if($idx -ne [int]$a.nextChunk){Send-Response $client 409 @{ok=$false;message='USB chunk order mismatch.'};continue};$bytes=[Convert]::FromBase64String([string]$j.data);$a.stream.Write($bytes,0,$bytes.Length);$a.received=[long]$a.received+$bytes.Length;$a.nextChunk=[int]$a.nextChunk+1;Send-Response $client 200 @{ok=$true;accepted=$true;received=[long]$a.received};continue}
            if($path -eq '/api/usb/asset-end' -and $req.method -eq 'POST'){$j=Body-Json $req.body;if([string]$j.requestId -ne [string]$script:UsbState.requestId){Send-Response $client 409 @{ok=$false;message='USB request changed.'};continue};$asset=[string]$j.asset;if($script:UsbState.assets.ContainsKey($asset)){$a=$script:UsbState.assets[$asset];$a.complete=$true;$a.size=[long]$j.size;if(-not[string]::IsNullOrWhiteSpace([string]$j.type)){$a.type=[string]$j.type};$a.stream.Position=0};Send-Response $client 200 @{ok=$true;assets=(Usb-AssetSummary)};continue}
            if($path -eq '/api/usb/ready' -and $req.method -eq 'POST'){$j=Body-Json $req.body;if([string]$j.requestId -ne [string]$script:UsbState.requestId){Send-Response $client 409 @{ok=$false;message='USB request changed.'};continue};$blob=$script:UsbState.assets['blob'];if($null -eq $blob -or -not[bool]$blob.complete){throw 'USB original media is incomplete.'};$script:UsbState.ready=$true;$script:UsbState.playState='ready';$script:UsbState.playUpdatedAt=(Get-Date).ToString('o');Log-Line('USB READY request='+$script:UsbState.requestId+' bytes='+[string]$blob.received);Send-Response $client 200 @{ok=$true;ready=$true;assets=(Usb-AssetSummary)};continue}
            if($path -eq '/api/usb/track-state' -and $req.method -eq 'GET'){$rid=Get-QueryParam $uri 'requestId';$same=($rid -eq [string]$script:UsbState.requestId);Send-Response $client 200 @{ok=$true;requestId=[string]$script:UsbState.requestId;trackId=[string]$script:UsbState.trackId;ready=([bool]$script:UsbState.ready -and $same);progress=(Usb-Progress);assets=(Usb-AssetSummary);error=[string]$script:UsbState.error};continue}

            if($path -eq '/api/usb/play-state' -and $req.method -eq 'POST'){
                $j=Body-Json $req.body
                if(-not [string]::IsNullOrWhiteSpace([string]$j.requestId) -and [string]$j.requestId -ne [string]$script:UsbState.requestId){
                    Send-Response $client 409 @{ok=$false;message='USB request changed.'};continue
                }
                $st=[string]$j.state
                if($st -notin @('loading','ready','playing','paused','stopped')){$st='playing'}
                $script:UsbState.playState=$st
                $script:UsbState.playUpdatedAt=(Get-Date).ToString('o')
                Send-Response $client 200 @{ok=$true;playState=$script:UsbState.playState};continue
            }
            if($path -eq '/api/usb/current' -and $req.method -eq 'GET'){
                $entry=Get-UsbCurrentEntry
                Send-Response $client 200 @{
                    ok=$true
                    sessionId=[string]$script:UsbState.sessionId
                    requestId=[string]$script:UsbState.requestId
                    trackId=[string]$script:UsbState.trackId
                    ready=[bool]$script:UsbState.ready
                    playState=[string]$script:UsbState.playState
                    playUpdatedAt=[string]$script:UsbState.playUpdatedAt
                    assets=(Usb-AssetSummary)
                    entry=$entry
                }
                continue
            }
            if($path -eq '/api/usb/media' -and $req.method -eq 'GET'){$rid=Get-QueryParam $uri 'requestId';$asset=Get-QueryParam $uri 'asset';if($rid -ne [string]$script:UsbState.requestId -or -not $script:UsbState.assets.ContainsKey($asset)){Send-Response $client 404 @{ok=$false;message='USB media request not found.'};continue};Send-BinaryResponse $client $req $script:UsbState.assets[$asset];continue}
            if($path -eq '/api/usb/release' -and $req.method -eq 'POST'){Reset-UsbTrack;Send-Response $client 200 @{ok=$true;message='USB RAM buffer released.'};continue}


            if($path -eq '/api/adb/status' -and $req.method -eq 'GET'){
                $stateFile=Join-Path $PSScriptRoot 'MARU-ADB-STATE.json'
                $state=@{state='starting';message='ADB bridge starting.'}
                try{
                    if(Test-Path -LiteralPath $stateFile){
                        $state=(Get-Content -Raw -LiteralPath $stateFile -Encoding UTF8 | ConvertFrom-Json)
                    }
                }catch{}
                Send-Response $client 200 @{ok=$true;state=[string]$state.state;message=[string]$state.message;serial=[string]$state.serial;updatedAt=[string]$state.updatedAt}
                continue
            }


            if ($path -eq '/api/maru/complete-stop' -and $req.method -eq 'POST') {
                # Intentional full MARU shutdown. The stop flag prevents the keeper
                # from treating this as a crash and starting Helper/ADB again.
                $stopFlag = Join-Path $PSScriptRoot '.maru-stable-stop'
                try { Set-Content -LiteralPath $stopFlag -Value 'user-complete-exit' -Encoding ASCII } catch {}
                try { Reset-UsbTrack } catch {}
                Send-Response $client 200 @{ ok=$true; intentional=$true; message='MARU Helper is stopping intentionally.' }
                Log-Line 'Intentional MARU complete stop requested.'
                $running = $false
                continue
            }

            if ($path -eq '/api/quit') {
                Send-Response $client 200 @{ ok=$true; message='Helper maintenance stop requested.' }
                $running = $false
                continue
            }
            Send-Response $client 404 @{ ok=$false; message='Unsupported request.' }
        } catch {
            Log-Line ('REQUEST ERROR: ' + $_.Exception.Message)
            try { Send-Response $client 500 @{ ok=$false; message=$_.Exception.Message } } catch {}
        } finally {
            try { $client.Close() } catch {}
        }
    }
} finally {
    try { $listener.Stop() } catch {}
    Log-Line 'Helper stopped.'
}
