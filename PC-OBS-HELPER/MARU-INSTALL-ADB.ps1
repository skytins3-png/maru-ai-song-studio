param()
$ErrorActionPreference='Stop'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Platform=Join-Path $Here 'platform-tools'
$Adb=Join-Path $Platform 'adb.exe'
$Log=Join-Path $Here 'MARU-BOOTSTRAP.log'
$Done=Join-Path $Here '.maru-adb-installed'

function Log([string]$m){
  try{Add-Content -LiteralPath $Log -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss')+'  '+$m) -Encoding UTF8}catch{}
}
function Download-PlatformTools([string]$dest){
  $url='https://dl.google.com/android/repository/platform-tools-latest-windows.zip'
  try{
    Log 'ADB download: Invoke-WebRequest'
    Invoke-WebRequest -UseBasicParsing -TimeoutSec 90 -Uri $url -OutFile $dest
    if((Test-Path $dest) -and (Get-Item $dest).Length -gt 100000){return}
  }catch{Log ('Invoke-WebRequest failed: '+$_.Exception.Message)}
  try{
    if(Get-Command Start-BitsTransfer -ErrorAction SilentlyContinue){
      Log 'ADB download: BITS'
      Start-BitsTransfer -Source $url -Destination $dest
      if((Test-Path $dest) -and (Get-Item $dest).Length -gt 100000){return}
    }
  }catch{Log ('BITS failed: '+$_.Exception.Message)}
  try{
    $curl=Get-Command curl.exe -ErrorAction SilentlyContinue
    if($curl){
      Log 'ADB download: curl.exe'
      & $curl.Source -L --fail --connect-timeout 20 --max-time 120 -o $dest $url
      if($LASTEXITCODE -eq 0 -and (Test-Path $dest) -and (Get-Item $dest).Length -gt 100000){return}
    }
  }catch{Log ('curl failed: '+$_.Exception.Message)}
  throw 'Google Android Platform Tools download failed.'
}

try{
  if(Test-Path -LiteralPath $Adb){
    Set-Content -LiteralPath $Done -Value 'ready' -Encoding ASCII
    Log 'ADB already installed.'
    exit 0
  }

  Log 'ADB background install started.'
  $zip=Join-Path $env:TEMP ('maru-platform-tools-'+[Guid]::NewGuid().ToString('N')+'.zip')
  $tmp=Join-Path $env:TEMP ('maru-platform-tools-'+[Guid]::NewGuid().ToString('N'))
  Download-PlatformTools $zip
  New-Item -ItemType Directory -Path $tmp -Force | Out-Null
  Expand-Archive -LiteralPath $zip -DestinationPath $tmp -Force

  $src=Join-Path $tmp 'platform-tools'
  if(-not(Test-Path (Join-Path $src 'adb.exe'))){throw 'adb.exe was not found in the downloaded package.'}
  if(Test-Path -LiteralPath $Platform){Remove-Item -Recurse -Force -LiteralPath $Platform}
  Move-Item -LiteralPath $src -Destination $Platform
  Set-Content -LiteralPath $Done -Value 'ready' -Encoding ASCII

  try{Remove-Item -Force -LiteralPath $zip -ErrorAction SilentlyContinue}catch{}
  try{Remove-Item -Recurse -Force -LiteralPath $tmp -ErrorAction SilentlyContinue}catch{}

  Log 'ADB install completed.'

  # Start server; the existing keeper will start/restart watcher if needed.
  try{& $Adb start-server | Out-Null}catch{}
  exit 0
}catch{
  Log ('ADB INSTALL ERROR: '+$_.Exception.Message)
  try{
    Set-Content -LiteralPath (Join-Path $Here 'MARU-ADB-INSTALL-ERROR.txt') -Value $_.Exception.Message -Encoding UTF8
  }catch{}
  exit 2
}
