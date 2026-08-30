$run='HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
Remove-ItemProperty -Path $run -Name 'MARUStableKeeper' -ErrorAction SilentlyContinue
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Content -LiteralPath (Join-Path $Here '.maru-stable-stop') -Value 'autostart-removed' -Encoding ASCII
Write-Host 'MARU automatic keeper startup removed.'
