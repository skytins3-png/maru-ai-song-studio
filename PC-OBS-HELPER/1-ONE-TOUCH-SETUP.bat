@echo off
setlocal
cd /d "%~dp0"
title MARU V0.22.99 ONE-TOUCH SETUP

echo ============================================================
echo   MARU V0.22.99 ONE-TOUCH SETUP
echo   Run this ONCE. Future Helper launches are automatic.
echo ============================================================
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALL-ONE-TOUCH-AUTOSTART.ps1"
echo.
echo ============================================================
echo   MARU V0.22.99 ONE-TOUCH SETUP FINISHED
echo ============================================================
echo.
pause
