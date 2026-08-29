$ErrorActionPreference = 'Stop'
$Port = 8765
$ActionScript = Join-Path $PSScriptRoot 'MARU-OBS-Action.ps1'
$LogFile = Join-Path $PSScriptRoot 'MARU-OBS-Helper.log'
$HelperVersion = 'V0.22.93'

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
    foreach ($line in $lines) {
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
    return @{ method = $method; path = $path; body = $body }
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
    Write-Host 'PHONE DIRECT SYNC ADDRESS:' -ForegroundColor Cyan
    foreach ($ip in $lanIps) { Write-Host ("  http://" + $ip + ":8765") -ForegroundColor Cyan }
    Write-Host 'If Windows Firewall asks, allow Private networks.' -ForegroundColor Yellow
} else {
    Write-Host 'No private LAN IPv4 address was detected. Check Wi-Fi/LAN connection.' -ForegroundColor Yellow
}
Write-Host ''
Write-Host 'Keep this window open while broadcasting or syncing.'
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
                    directSync=$true; directSyncVersion=1; lanIps=$ips; lanUrls=$urls;
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

            if ($path -eq '/api/quit') {
                Send-Response $client 200 @{ ok=$true; message='Helper is stopping.' }
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
