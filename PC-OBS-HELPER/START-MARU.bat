@echo off
setlocal
cd /d "%~dp0"
title MARU V0.23.04 STABLE AUTO

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command ^
  "$here='%~dp0';" ^
  "$flag=Join-Path $here '.maru-2304-ready';" ^
  "$setup=Join-Path $here 'INSTALL-ONE-TOUCH-AUTOSTART.ps1';" ^
  "$auto=Join-Path $here 'MARU-AUTO-START.ps1';" ^
  "if(-not(Test-Path -LiteralPath $flag)){" ^
  "  & powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File $setup;" ^
  "  if($LASTEXITCODE -eq 0){Set-Content -LiteralPath $flag -Value 'ready' -Encoding ASCII}" ^
  "}else{" ^
  "  & powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File $auto;" ^
  "  Start-Process 'https://skytins3-png.github.io/maru-ai-song-studio/?v=2304'" ^
  "}"
exit /b 0
