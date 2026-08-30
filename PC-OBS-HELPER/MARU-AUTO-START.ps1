$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Helper=Join-Path $Here 'MARU-OBS-Helper.ps1'
$Watcher=Join-Path $Here 'MARU-ADB-USB-WATCH.ps1'

# Helper
$helperUp=$false
try{
  $r=Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 'http://127.0.0.1:8765/api/status'
  if($r.StatusCode -eq 200){$helperUp=$true}
}catch{}
if(-not $helperUp){
  Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @('-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$Helper)
}

# ADB bridge watcher
$watching=Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like '*MARU-ADB-USB-WATCH.ps1*' } |
  Select-Object -First 1
if(-not $watching){
  Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @('-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$Watcher)
}
