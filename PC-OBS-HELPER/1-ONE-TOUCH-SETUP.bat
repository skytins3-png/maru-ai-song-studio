@echo off
setlocal
cd /d "%~dp0"
title MARU ONE-TOUCH SETUP V0.22.98
echo ============================================================
echo   MARU V0.22.98 ONE-TOUCH SETUP
echo   Run this ONCE. Future Helper launches are automatic.
echo ============================================================
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALL-ONE-TOUCH-AUTOSTART.ps1"
echo.
echo Setup finished.
echo If MARU opened, use the big ONE-TOUCH BROADCAST button.
echo.
pause
