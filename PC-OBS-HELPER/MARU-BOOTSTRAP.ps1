$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
Start-Process -FilePath "$env:SystemRoot\System32\wscript.exe" -WindowStyle Hidden -ArgumentList @((Join-Path $Here 'START-MARU.vbs')) | Out-Null
