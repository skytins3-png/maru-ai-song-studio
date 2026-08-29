$runKey='HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
Remove-ItemProperty -Path $runKey -Name 'MARUOBSHelper' -ErrorAction SilentlyContinue
Write-Host 'MARU Helper autostart was removed.'
