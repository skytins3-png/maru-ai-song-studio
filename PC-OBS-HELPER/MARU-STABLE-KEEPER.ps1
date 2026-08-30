$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Helper=Join-Path $Here 'MARU-OBS-Helper.ps1'
$AdbWatch=Join-Path $Here 'MARU-ADB-USB-WATCH.ps1'
$AdbInstall=Join-Path $Here 'MARU-INSTALL-ADB.ps1'
$Adb=Join-Path $Here 'platform-tools\adb.exe'
$StopFlag=Join-Path $Here '.maru-stable-stop'
$PidFile=Join-Path $Here '.maru-keeper.pid'
$Log=Join-Path $Here 'MARU-STABLE-KEEPER.log'

function Log([string]$m){
  try{Add-Content -LiteralPath $Log -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss')+'  '+$m) -Encoding UTF8}catch{}
}
function HelperHealthy {
  try{
    $r=Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 'http://127.0.0.1:8765/api/status'
    return ($r.StatusCode -eq 200)
  }catch{return $false}
}
function FindProc([string]$needle){
  try{
    return @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
      Where-Object { $_.CommandLine -like ('*'+$needle+'*') -and $_.ProcessId -ne $PID })
  }catch{return @()}
}
function StartHidden([string]$script){
  try{
    Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @(
      '-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',$script
    ) | Out-Null
    return $true
  }catch{
    Log ('START ERROR '+$script+' :: '+$_.Exception.Message)
    return $false
  }
}

# Duplicate keeper guard.
try{
  if(Test-Path -LiteralPath $PidFile){
    $oldPid=[int](Get-Content -Raw -LiteralPath $PidFile)
    $old=Get-Process -Id $oldPid -ErrorAction SilentlyContinue
    if($old){
      Log ('Another keeper already runs. PID '+$oldPid)
      exit 0
    }
  }
}catch{}
try{Set-Content -LiteralPath $PidFile -Value $PID -Encoding ASCII}catch{}

# START-MARU explicitly clears intentional-stop before launching us.
if(Test-Path -LiteralPath $StopFlag){
  Log 'Intentional stop flag exists. Keeper exits.'
  Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue
  exit 0
}

Log ('MARU V0.23.09 stable keeper started. PID '+$PID)

# Start Helper immediately once, not after several polling rounds.
if(-not(HelperHealthy)){
  Log 'Initial Helper start.'
  StartHidden $Helper | Out-Null
}
if((Test-Path -LiteralPath $Adb) -and @(FindProc 'MARU-ADB-USB-WATCH.ps1').Count -eq 0){
  Log 'Initial ADB watcher start.'
  StartHidden $AdbWatch | Out-Null
}elseif(-not(Test-Path -LiteralPath $Adb) -and @(FindProc 'MARU-INSTALL-ADB.ps1').Count -eq 0){
  Log 'ADB missing -> background install.'
  StartHidden $AdbInstall | Out-Null
}

$helperFail=0
$adbFail=0
while($true){
  if(Test-Path -LiteralPath $StopFlag){
    Log 'Complete-stop flag found. Keeper exits without recovery.'
    break
  }

  if(HelperHealthy){
    $helperFail=0
  }else{
    $helperFail++
    Log ('Helper health miss '+$helperFail+'/3')
    if($helperFail -ge 3){
      foreach($p in @(FindProc 'MARU-OBS-Helper.ps1')){
        try{Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue}catch{}
      }
      Start-Sleep -Milliseconds 500
      if(-not(Test-Path -LiteralPath $StopFlag)){
        Log 'Confirmed Helper failure -> restart once.'
        StartHidden $Helper | Out-Null
      }
      $helperFail=0
    }
  }

  if(Test-Path -LiteralPath $Adb){
    if(@(FindProc 'MARU-ADB-USB-WATCH.ps1').Count -gt 0){
      $adbFail=0
    }else{
      $adbFail++
      if($adbFail -ge 3 -and -not(Test-Path -LiteralPath $StopFlag)){
        Log 'ADB watcher exited -> restart once.'
        StartHidden $AdbWatch | Out-Null
        $adbFail=0
      }
    }
  }else{
    $adbFail=0
    if(@(FindProc 'MARU-INSTALL-ADB.ps1').Count -eq 0){
      Log 'ADB still missing -> installer retry.'
      StartHidden $AdbInstall | Out-Null
    }
  }

  Start-Sleep -Seconds 5
}

try{Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue}catch{}
Log 'Stable keeper stopped.'
