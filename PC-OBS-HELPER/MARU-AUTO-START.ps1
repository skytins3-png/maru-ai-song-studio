$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Keeper=Join-Path $Here 'MARU-STABLE-KEEPER.ps1'
$StopFlag=Join-Path $Here '.maru-stable-stop'

# Starting MARU cancels a previous intentional stop.
Remove-Item -LiteralPath $StopFlag -Force -ErrorAction SilentlyContinue

$running=Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like '*MARU-STABLE-KEEPER.ps1*' -and $_.ProcessId -ne $PID } |
  Select-Object -First 1

if(-not $running){
  Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @(
    '-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$Keeper
  ) | Out-Null
}

# Wait until Helper responds, but do not create duplicate Helper processes.
for($i=0;$i -lt 20;$i++){
  try{
    $r=Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 'http://127.0.0.1:8765/api/status'
    if($r.StatusCode -eq 200){break}
  }catch{}
  Start-Sleep -Milliseconds 500
}
