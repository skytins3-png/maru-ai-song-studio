param()

$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Helper = Join-Path $Here 'MARU-OBS-Helper.ps1'
if (-not (Test-Path -LiteralPath $Helper)) { throw 'MARU-OBS-Helper.ps1 not found.' }

$runKey = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
$cmd = 'powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "' + $Helper + '"'
New-Item -Path $runKey -Force | Out-Null
Set-ItemProperty -Path $runKey -Name 'MARUOBSHelper' -Value $cmd -Type String

# Start it now if the local helper is not already responding.
$running = $false
try {
  $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 'http://127.0.0.1:8765/api/status'
  if ($r.StatusCode -eq 200) { $running = $true }
} catch {}

if (-not $running) {
  Start-Process -FilePath 'powershell.exe' -WindowStyle Hidden -ArgumentList @(
    '-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$Helper
  )
  Start-Sleep -Seconds 2
}

# Create a desktop URL shortcut for convenience.
try {
  $desktop = [Environment]::GetFolderPath('Desktop')
  $urlFile = Join-Path $desktop 'MARU 원터치 방송.url'
  @"
[InternetShortcut]
URL=https://skytins3-png.github.io/maru-ai-song-studio/?v=2300
IconIndex=0
"@ | Set-Content -LiteralPath $urlFile -Encoding Unicode
} catch {}

$ok = $false
try {
  $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec 4 'http://127.0.0.1:8765/api/status'
  if ($r.StatusCode -eq 200) { $ok = $true }
} catch {}

if ($ok) {
  Write-Host ''
  Write-Host 'ONE-TOUCH READY' -ForegroundColor Green
  Write-Host 'MARU Helper will start automatically when you sign in to Windows.'
  Write-Host 'A MARU one-touch shortcut was added to the Desktop.'
} else {
  Write-Host ''
  Write-Host 'AUTOSTART REGISTERED, BUT HELPER DID NOT RESPOND YET.' -ForegroundColor Yellow
  Write-Host 'Run START-MARU-OBS-HELPER.bat once and check the error message.'
}

Start-Process 'https://skytins3-png.github.io/maru-ai-song-studio/?v=2300'
