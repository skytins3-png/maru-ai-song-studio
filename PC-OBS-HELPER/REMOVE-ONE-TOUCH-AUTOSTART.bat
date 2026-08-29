@echo off
cd /d "%~dp0"
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0REMOVE-ONE-TOUCH-AUTOSTART.ps1"
pause
