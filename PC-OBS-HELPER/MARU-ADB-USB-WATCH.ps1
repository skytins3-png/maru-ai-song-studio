$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Adb=Join-Path $Here 'platform-tools\adb.exe'
$State=Join-Path $Here 'MARU-ADB-STATE.json'
$StopFlag=Join-Path $Here '.maru-stable-stop'

function Write-State([string]$state,[string]$message,[string]$serial=''){
  try{
    @{state=$state;message=$message;serial=$serial;updatedAt=(Get-Date).ToString('o')} |
      ConvertTo-Json -Compress |
      Set-Content -LiteralPath $State -Encoding UTF8
  }catch{}
}

if(-not(Test-Path -LiteralPath $Adb)){
  Write-State 'adb_missing' 'Android Platform Tools are not installed.'
  exit 2
}

Remove-Item -LiteralPath $StopFlag -Force -ErrorAction SilentlyContinue
& $Adb start-server | Out-Null
Write-State 'starting' 'USB auto link is waiting for the phone.'

$lastSerial=''
while($true){
  if(Test-Path -LiteralPath $StopFlag){
    Write-State 'stopped' 'MARU complete exit.'
    try{ & $Adb kill-server | Out-Null }catch{}
    break
  }

  try{
    $rows=@(& $Adb devices)
    $device=$null
    $unauth=$null
    foreach($line in $rows){
      if($line -match '^([^\s]+)\s+device\s*$'){$device=$Matches[1];break}
      if($line -match '^([^\s]+)\s+unauthorized\s*$'){$unauth=$Matches[1]}
    }

    if($device){
      # Re-apply reverse safely. This is idempotent and also repairs USB reconnect/resume.
      & $Adb -s $device reverse tcp:8765 tcp:8765 | Out-Null
      if($LASTEXITCODE -eq 0){
        $lastSerial=$device
        Write-State 'ready' 'USB auto link is continuously active.' $device
      }else{
        Write-State 'error' 'USB bridge could not be refreshed.' $device
      }
    }elseif($unauth){
      Write-State 'unauthorized' 'Tap Allow on the Android USB debugging authorization popup.' $unauth
    }else{
      # IMPORTANT: phone removal is not a process stop. Stay alive and wait forever.
      $lastSerial=''
      Write-State 'no_device' 'Phone disconnected. Waiting for USB cable; MARU Helper remains running.'
    }
  }catch{
    Write-State 'error' ('USB link check: '+$_.Exception.Message)
  }

  Start-Sleep -Seconds 3
}
