$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$StopFlag=Join-Path $Here '.maru-stable-stop'
$Keeper=Join-Path $Here 'MARU-STABLE-KEEPER.ps1'
if(Test-Path -LiteralPath $StopFlag){exit 0}
$running=Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like '*MARU-STABLE-KEEPER.ps1*' -and $_.ProcessId -ne $PID } |
  Select-Object -First 1
if(-not $running){
  Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @(
    '-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$Keeper
  ) | Out-Null
}
