@echo off
setlocal
title MARU Helper Check
echo Checking http://127.0.0.1:8765 ...
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command ^
  "try { $r=Invoke-WebRequest -UseBasicParsing -TimeoutSec 3 http://127.0.0.1:8765/api/status; Write-Host '[OK] Helper is running.' -ForegroundColor Green; Write-Host $r.Content } catch { Write-Host '[FAIL] Helper is not running.' -ForegroundColor Red; Write-Host $_.Exception.Message }"
echo.
pause
