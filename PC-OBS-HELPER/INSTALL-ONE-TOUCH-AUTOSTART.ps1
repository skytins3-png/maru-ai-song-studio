$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Keeper=Join-Path $Here 'MARU-KEEPER.vbs'
$Run='HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
New-Item -Path $Run -Force | Out-Null
$cmd='"'+$env:SystemRoot+'\System32\wscript.exe" "'+$Keeper+'"'
Set-ItemProperty -Path $Run -Name 'MARUStableKeeper' -Value $cmd
Start-Process -FilePath "$env:SystemRoot\System32\wscript.exe" -WindowStyle Hidden -ArgumentList @((Join-Path $Here 'START-MARU.vbs')) | Out-Null
