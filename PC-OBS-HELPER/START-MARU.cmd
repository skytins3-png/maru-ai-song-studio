@echo off
setlocal
cd /d "%~dp0"
title MARU V0.23.08
start "" /min powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0MARU-BOOTSTRAP.ps1"
exit /b 0
