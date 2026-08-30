param()
$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Auto=Join-Path $Here 'MARU-AUTO-START.ps1'
$Helper=Join-Path $Here 'MARU-OBS-Helper.ps1'
$AdbInstall=Join-Path $Here 'MARU-INSTALL-ADB.ps1'
$Adb=Join-Path $Here 'platform-tools\adb.exe'
$Log=Join-Path $Here 'MARU-BOOTSTRAP.log'
$Url='https://skytins3-png.github.io/maru-ai-song-studio/?v=2305'

function Log([string]$m){
  try{Add-Content -LiteralPath $Log -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss')+'  '+$m) -Encoding UTF8}catch{}
}
function Helper-Up {
  try{
    $r=Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 'http://127.0.0.1:8765/api/status'
    return ($r.StatusCode -eq 200)
  }catch{return $false}
}
function Register-AutoStart {
  try{
    $runKey='HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
    $cmd='powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "'+$Auto+'"'
    New-Item -Path $runKey -Force | Out-Null
    Set-ItemProperty -Path $runKey -Name 'MARUOBSHelper' -Value $cmd -Type String
  }catch{Log ('Run-key registration failed: '+$_.Exception.Message)}

  try{
    $startup=[Environment]::GetFolderPath('Startup')
    $cmdFile=Join-Path $startup 'MARU-Stable-Keeper-AutoStart.cmd'
    $line='@start "" powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "'+$Auto+'"'
    Set-Content -LiteralPath $cmdFile -Value $line -Encoding ASCII
  }catch{Log ('Startup fallback registration failed: '+$_.Exception.Message)}
}
function Open-Maru {
  try{Start-Process $Url; return}catch{}
  try{Start-Process explorer.exe $Url; return}catch{}
  try{& cmd.exe /c start "" $Url}catch{}
}

Log '===== MARU V0.23.05 bootstrap start ====='

# 1) ALWAYS start the stable keeper/helper first.
try{
  & powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File $Auto | Out-Null
}catch{Log ('MARU-AUTO-START failed: '+$_.Exception.Message)}

# Direct fallback: if the keeper did not make Helper respond, start Helper once directly.
for($i=0;$i -lt 12 -and -not(Helper-Up);$i++){Start-Sleep -Milliseconds 400}
if(-not(Helper-Up)){
  Log 'Helper not ready from keeper -> direct fallback start.'
  try{
    Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @(
      '-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$Helper
    ) | Out-Null
  }catch{Log ('Direct Helper fallback failed: '+$_.Exception.Message)}
  for($i=0;$i -lt 12 -and -not(Helper-Up);$i++){Start-Sleep -Milliseconds 400}
}

if(Helper-Up){Log 'Helper is UP.'}else{Log 'Helper is still DOWN. Security software may be blocking PowerShell.'}

# 2) Open MARU even if ADB installation later fails.
Open-Maru
Log 'MARU page open requested.'

# 3) Register automatic startup idempotently.
Register-AutoStart

# 4) ADB is optional to Helper startup. Install it independently in the background.
if(-not(Test-Path -LiteralPath $Adb)){
  $installRunning=Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like '*MARU-INSTALL-ADB.ps1*' -and $_.ProcessId -ne $PID } |
    Select-Object -First 1
  if(-not $installRunning){
    Log 'Starting ADB installer in background.'
    try{
      Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @(
        '-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$AdbInstall
      ) | Out-Null
    }catch{Log ('ADB installer start failed: '+$_.Exception.Message)}
  }
}else{
  Log 'ADB already available.'
}

try{Set-Content -LiteralPath (Join-Path $Here '.maru-2305-ready') -Value 'ready' -Encoding ASCII}catch{}
Log '===== bootstrap end ====='
