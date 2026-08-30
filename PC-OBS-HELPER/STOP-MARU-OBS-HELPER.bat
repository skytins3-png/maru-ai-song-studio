@echo off
cd /d "%~dp0"
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command ^
  "$here='%~dp0';" ^
  "Set-Content -LiteralPath (Join-Path $here '.maru-stable-stop') -Value 'manual-complete-stop' -Encoding ASCII;" ^
  "try{Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:8765/api/maru/complete-stop' -Method Post -ContentType 'application/json' -Body '{}' -TimeoutSec 2|Out-Null}catch{};" ^
  "Get-CimInstance Win32_Process -ErrorAction SilentlyContinue|Where-Object{$_.CommandLine -like '*MARU-OBS-Helper.ps1*' -or $_.CommandLine -like '*MARU-ADB-USB-WATCH.ps1*' -or $_.CommandLine -like '*MARU-KEEPER.vbs*'}|ForEach-Object{Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue}"
exit /b 0
