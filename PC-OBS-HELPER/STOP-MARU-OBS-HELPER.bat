@echo off
chcp 65001 >nul
for /f "tokens=2" %%P in ('tasklist /fi "imagename eq powershell.exe" /fo csv /nh ^| findstr /i "powershell.exe"') do rem Helper 창에서 Ctrl+C 또는 창 닫기를 권장합니다.
echo MARU OBS Helper 창에서 Ctrl+C를 누르거나 창을 닫아 주세요.
pause
