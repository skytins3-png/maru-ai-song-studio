$ErrorActionPreference='SilentlyContinue'
$Here=Split-Path -Parent $MyInvocation.MyCommand.Path
$Adb=Join-Path $Here 'platform-tools\adb.exe'
$State=Join-Path $Here 'MARU-ADB-STATE.json'

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

& $Adb start-server | Out-Null
Write-State 'starting' 'Waiting for Android USB device.'

while($true){
  try{
    $rows=@(& $Adb devices)
    $device=$null
    $unauth=$null
    foreach($line in $rows){
      if($line -match '^([^\s]+)\s+device\s*$'){$device=$Matches[1];break}
      if($line -match '^([^\s]+)\s+unauthorized\s*$'){$unauth=$Matches[1]}
    }

    if($device){
      & $Adb -s $device reverse tcp:8765 tcp:8765 | Out-Null
      if($LASTEXITCODE -eq 0){
        Write-State 'ready' 'ADB USB bridge ready. Tethering, MTP and QR are not required.' $device
      }else{
        Write-State 'error' 'ADB reverse failed.' $device
      }
    }elseif($unauth){
      Write-State 'unauthorized' 'Tap Allow on the Android USB debugging authorization popup.' $unauth
    }else{
      Write-State 'no_device' 'Connect the Android phone with a data-capable USB cable.'
    }
  }catch{
    Write-State 'error' $_.Exception.Message
  }
  Start-Sleep -Seconds 2
}
