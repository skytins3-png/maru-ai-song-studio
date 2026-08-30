@echo off
setlocal
cd /d "%~dp0"
title MARU OBS Helper V0.23.00 - ONE TOUCH USB LIVE

echo ============================================================
echo   MARU OBS Helper V0.23.00 - ONE TOUCH USB LIVE
echo   THIS WINDOW MUST STAY OPEN WHILE USING MARU / OBS
echo ============================================================
echo.

where powershell.exe >nul 2>nul
if errorlevel 1 (
  echo [ERROR] PowerShell was not found.
  echo.
  pause
  exit /b 1
)

echo Starting MARU Helper V0.23.00...
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0MARU-OBS-Helper.ps1"

set "RC=%ERRORLEVEL%"
echo.
echo ============================================================
echo   MARU Helper V0.23.00 stopped. Exit code: %RC%
echo   If you see an ERROR above, take a photo and send it.
echo ============================================================
echo.
pause
exit /b %RC%
