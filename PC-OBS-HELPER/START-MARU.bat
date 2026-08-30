@echo off
setlocal
cd /d "%~dp0"
title MARU V0.23.05 AUTO START

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0MARU-BOOTSTRAP.ps1"
set "RC=%ERRORLEVEL%"

if not "%RC%"=="0" (
  echo.
  echo MARU start was blocked or failed.
  echo Please take a picture of this window.
  echo Log: %~dp0MARU-BOOTSTRAP.log
  echo.
  pause
  exit /b %RC%
)

exit /b 0
