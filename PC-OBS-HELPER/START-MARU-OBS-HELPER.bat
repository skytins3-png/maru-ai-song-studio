@echo off
setlocal
cd /d "%~dp0"
title MARU OBS Helper Launcher V0.22.96
where powershell.exe >nul 2>nul
if errorlevel 1 (
  echo PowerShell was not found.
  pause
  exit /b 1
)
start "MARU OBS Helper V0.22.96" powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0MARU-OBS-Helper.ps1"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8765/"
exit /b 0
