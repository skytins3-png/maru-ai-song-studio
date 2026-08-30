@echo off
setlocal
cd /d "%~dp0"
title MARU V0.23.02 AUTO START

echo ============================================================
echo   MARU V0.23.02 AUTO START
echo   First run setup + Helper + USB auto bridge + MARU launch
echo ============================================================
echo.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command ^
  "$here='%~dp0';" ^
  "$flag=Join-Path $here '.maru-2302-ready';" ^
  "$setup=Join-Path $here 'INSTALL-ONE-TOUCH-AUTOSTART.ps1';" ^
  "$auto=Join-Path $here 'MARU-AUTO-START.ps1';" ^
  "if(-not(Test-Path -LiteralPath $flag)){" ^
  "  Write-Host 'First run: automatic setup is starting...' -ForegroundColor Cyan;" ^
  "  & powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File $setup;" ^
  "  if($LASTEXITCODE -eq 0){Set-Content -LiteralPath $flag -Value 'ready' -Encoding ASCII}" ^
  "}else{" ^
  "  & powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File $auto;" ^
  "  Start-Sleep -Milliseconds 800;" ^
  "  Start-Process 'https://skytins3-png.github.io/maru-ai-song-studio/?v=2302'" ^
  "}"

echo.
echo MARU auto start command finished.
echo This window can be closed.
timeout /t 2 >nul
