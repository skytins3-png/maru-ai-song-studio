@echo off
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "try { Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:8765/api/quit' -TimeoutSec 2 ^| Out-Null } catch {}"
exit /b 0
