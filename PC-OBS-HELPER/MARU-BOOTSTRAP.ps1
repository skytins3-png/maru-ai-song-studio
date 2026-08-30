param()
$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Keeper=Join-Path $Here 'MARU-STABLE-KEEPER.ps1'
$StopFlag=Join-Path $Here '.maru-stable-stop'
$Log=Join-Path $Here 'MARU-BOOTSTRAP.log'
$Url='https://skytins3-png.github.io/maru-ai-song-studio/?v=2307'

function Log([string]$m){
  try{Add-Content -LiteralPath $Log -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss')+'  '+$m) -Encoding UTF8}catch{}
}
function HelperUp {
  try{
    $r=Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 'http://127.0.0.1:8765/api/status'
    return ($r.StatusCode -eq 200)
  }catch{return $false}
}
function KeeperRunning {
  try{
    return [bool](Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
      Where-Object { $_.CommandLine -like '*MARU-STABLE-KEEPER.ps1*' -and $_.ProcessId -ne $PID } |
      Select-Object -First 1)
  }catch{return $false}
}

Log '===== MARU V0.23.07 bootstrap ====='
Remove-Item -LiteralPath $StopFlag -Force -ErrorAction SilentlyContinue

# Remove Mark-of-the-Web from our own extracted script files when Windows permits it.
# Failure here is harmless.
try{
  Get-ChildItem -LiteralPath $Here -File -ErrorAction SilentlyContinue | Unblock-File -ErrorAction SilentlyContinue
}catch{}

# Register current-user auto-start. No admin rights required.
try{
  $run='HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
  New-Item -Path $run -Force | Out-Null
  $cmd='powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "'+$Keeper+'"'
  Set-ItemProperty -Path $run -Name 'MARUStableKeeper' -Value $cmd -Type String
  Log 'HKCU auto-start registered.'
}catch{Log ('Auto-start registration failed: '+$_.Exception.Message)}

if(-not(KeeperRunning)){
  try{
    Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @(
      '-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$Keeper
    ) | Out-Null
    Log 'Keeper start requested.'
  }catch{Log ('Keeper start failed: '+$_.Exception.Message)}
}

# Wait for Helper first, then open MARU.
$up=$false
for($i=0;$i -lt 24;$i++){
  if(HelperUp){$up=$true;break}
  Start-Sleep -Milliseconds 500
}
try{Start-Process $Url}catch{try{Start-Process explorer.exe $Url}catch{}}
if($up){Log 'Helper UP; MARU opened.'}else{Log 'Helper not yet UP; MARU opened and will keep waiting.'}

exit 0
