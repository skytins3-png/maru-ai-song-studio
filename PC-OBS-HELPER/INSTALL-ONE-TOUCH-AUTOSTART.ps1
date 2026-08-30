param()
$ErrorActionPreference='Stop'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Auto=Join-Path $Here 'MARU-AUTO-START.ps1'
$Platform=Join-Path $Here 'platform-tools'
$Adb=Join-Path $Platform 'adb.exe'

Write-Host ''
Write-Host 'MARU V0.23.02 USB AUTO SETUP' -ForegroundColor Cyan
Write-Host 'USB tethering / file transfer / QR / address entry will not be used.'
Write-Host ''

if(-not(Test-Path -LiteralPath $Adb)){
  Write-Host 'Installing official Android Platform Tools automatically...'
  $zip=Join-Path $env:TEMP 'maru-platform-tools.zip'
  $tmp=Join-Path $env:TEMP ('maru-platform-tools-'+[Guid]::NewGuid().ToString('N'))
  Invoke-WebRequest -UseBasicParsing -Uri 'https://dl.google.com/android/repository/platform-tools-latest-windows.zip' -OutFile $zip
  New-Item -ItemType Directory -Path $tmp -Force | Out-Null
  Expand-Archive -LiteralPath $zip -DestinationPath $tmp -Force
  if(Test-Path -LiteralPath $Platform){Remove-Item -Recurse -Force -LiteralPath $Platform}
  Move-Item -LiteralPath (Join-Path $tmp 'platform-tools') -Destination $Platform
  Remove-Item -Force -LiteralPath $zip -ErrorAction SilentlyContinue
  Remove-Item -Recurse -Force -LiteralPath $tmp -ErrorAction SilentlyContinue
}

$runKey='HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
$cmd='powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "'+$Auto+'"'
New-Item -Path $runKey -Force | Out-Null
Set-ItemProperty -Path $runKey -Name 'MARUOBSHelper' -Value $cmd -Type String

& powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File $Auto
Start-Sleep -Seconds 2

try{
  $desktop=[Environment]::GetFolderPath('Desktop')
  @"
[InternetShortcut]
URL=https://skytins3-png.github.io/maru-ai-song-studio/?v=2302
IconIndex=0
"@ | Set-Content -LiteralPath (Join-Path $desktop 'MARU 원터치 방송.url') -Encoding Unicode
}catch{}

try { Set-Content -LiteralPath (Join-Path $Here '.maru-2302-ready') -Value 'ready' -Encoding ASCII } catch {}

Write-Host ''
Write-Host 'PC automatic setup is finished.' -ForegroundColor Green
Write-Host 'Android security requires ONE approval only:' -ForegroundColor Yellow
Write-Host 'Turn on USB debugging once, then tap Allow when the phone asks to trust this PC.'
Write-Host 'After that: plug in USB cable -> MARU connects automatically.'
Write-Host ''
Start-Process 'https://skytins3-png.github.io/maru-ai-song-studio/?v=2302'
