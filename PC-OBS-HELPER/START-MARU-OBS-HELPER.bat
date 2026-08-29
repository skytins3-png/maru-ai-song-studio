@echo off
chcp 65001 >nul
cd /d "%~dp0"
title MARU OBS Helper V0.22.87
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0MARU-OBS-Helper.ps1"
if errorlevel 1 (
  echo.
  echo MARU OBS Helper 실행 중 오류가 발생했습니다.
  echo 위 오류 내용을 확인해 주세요.
  pause
)
