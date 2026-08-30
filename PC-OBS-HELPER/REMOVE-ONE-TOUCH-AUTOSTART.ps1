$runKey='HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
Remove-ItemProperty -Path $runKey -Name 'MARUOBSHelper' -ErrorAction SilentlyContinue
try{
  $startup=[Environment]::GetFolderPath('Startup')
  Remove-Item -LiteralPath (Join-Path $startup 'MARU-Helper-AutoStart.cmd') -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath (Join-Path $startup 'MARU-Stable-Keeper-AutoStart.cmd') -Force -ErrorAction SilentlyContinue
}catch{}
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Content -LiteralPath (Join-Path $Here '.maru-stable-stop') -Value 'autostart-removed' -Encoding ASCII
Write-Host 'MARU stable automatic Helper startup was removed.'
