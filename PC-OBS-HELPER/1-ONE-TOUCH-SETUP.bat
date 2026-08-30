@echo off
setlocal
cd /d "%~dp0"
title MARU V0.23.01 ONE-TIME AUTO SETUP
echo ============================================================
echo   MARU V0.23.01 ONE-TIME AUTO SETUP
echo   After this, USB cable + one-touch broadcast only
echo ============================================================
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALL-ONE-TOUCH-AUTOSTART.ps1"
echo.
pause
