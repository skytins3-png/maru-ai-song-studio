$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$StopFlag=Join-Path $Here '.maru-stable-stop'
if(Test-Path -LiteralPath $StopFlag){exit 0}
Start-Process -FilePath "$env:SystemRoot\System32\wscript.exe" -WindowStyle Hidden -ArgumentList @((Join-Path $Here 'MARU-KEEPER.vbs')) | Out-Null
