$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Helper=Join-Path $Here 'MARU-OBS-Helper.ps1'
$AdbWatch=Join-Path $Here 'MARU-ADB-USB-WATCH.ps1'
$StopFlag=Join-Path $Here '.maru-stable-stop'
$Log=Join-Path $Here 'MARU-STABLE-KEEPER.log'

function Log([string]$m){
  try{Add-Content -LiteralPath $Log -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss')+'  '+$m) -Encoding UTF8}catch{}
}
function Helper-Healthy {
  try{
    $r=Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 'http://127.0.0.1:8765/api/status'
    return ($r.StatusCode -eq 200)
  }catch{return $false}
}
function Find-Proc([string]$needle){
  try{
    return @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
      Where-Object { $_.CommandLine -like ('*'+$needle+'*') -and $_.ProcessId -ne $PID })
  }catch{return @()}
}
function Start-Hidden([string]$script){
  Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @(
    '-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$script
  ) | Out-Null
}

# A normal MARU start always means "stay alive" again.
Remove-Item -LiteralPath $StopFlag -Force -ErrorAction SilentlyContinue
Log 'Stable Keeper started.'

if(-not(Helper-Healthy)){
  Log 'Initial Helper start.'
  Start-Hidden $Helper
}
if(@(Find-Proc 'MARU-ADB-USB-WATCH.ps1').Count -eq 0){
  Log 'Initial ADB watcher start.'
  Start-Hidden $AdbWatch
}

$helperFail=0
$adbFail=0

while($true){
  if(Test-Path -LiteralPath $StopFlag){
    Log 'Intentional complete-stop flag found. Keeper exits without recovery.'
    break
  }

  # Healthy Helper is left completely untouched.
  if(Helper-Healthy){
    $helperFail=0
  }else{
    $helperFail++
    Log ('Helper health miss '+$helperFail+'/3')
    if($helperFail -ge 3){
      # Only now is this treated as a real crash/hang.
      foreach($p in @(Find-Proc 'MARU-OBS-Helper.ps1')){
        try{Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue}catch{}
      }
      Start-Sleep -Milliseconds 600
      if(-not(Test-Path -LiteralPath $StopFlag)){
        Log 'Abnormal Helper failure confirmed -> one recovery start.'
        Start-Hidden $Helper
      }
      $helperFail=0
    }
  }

  # USB cable loss does not affect this process. Only watcher process death is recovered.
  if(@(Find-Proc 'MARU-ADB-USB-WATCH.ps1').Count -gt 0){
    $adbFail=0
  }else{
    $adbFail++
    Log ('ADB watcher process miss '+$adbFail+'/3')
    if($adbFail -ge 3 -and -not(Test-Path -LiteralPath $StopFlag)){
      Log 'ADB watcher abnormal exit confirmed -> one recovery start.'
      Start-Hidden $AdbWatch
      $adbFail=0
    }
  }

  Start-Sleep -Seconds 5
}
