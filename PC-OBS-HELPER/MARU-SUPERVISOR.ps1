$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
& powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File (Join-Path $Here 'MARU-STABLE-KEEPER.ps1')
