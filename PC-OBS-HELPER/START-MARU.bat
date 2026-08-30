@echo off

cd /d "%~dp0"

start "" "%SystemRoot%\System32\wscript.exe" "%~dp0START-MARU.vbs"

exit /b 0

