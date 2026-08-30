@echo off
setlocal
cd /d "%~dp0"
title MARU V0.23.01 AUTO USB + OBS
echo ============================================================
echo   MARU V0.23.01 AUTO USB + OBS
echo   USB tethering / file transfer / QR are NOT required
echo ============================================================
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0MARU-AUTO-START.ps1"
echo MARU automatic services started.
echo You can close this window.
echo.
pause
