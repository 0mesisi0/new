# Registers the daily and weekly pipeline runs in Windows Task Scheduler for the current user.
# Run once from PowerShell inside the repository:  powershell -ExecutionPolicy Bypass -File pipeline\runner\schedule.ps1
$repo = (Resolve-Path "$PSScriptRoot\..\..").Path
$node = (Get-Command node).Source
$daily = New-ScheduledTaskAction -Execute $node -Argument "pipeline\runner\run.mjs daily" -WorkingDirectory $repo
$weekly = New-ScheduledTaskAction -Execute $node -Argument "pipeline\runner\run.mjs feedback" -WorkingDirectory $repo
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -WakeToRun -ExecutionTimeLimit (New-TimeSpan -Hours 2)
Register-ScheduledTask -TaskName "Haruhanpan daily (research+idea)" -Action $daily -Trigger (New-ScheduledTaskTrigger -Daily -At 4:10am) -Settings $settings -Force | Out-Null
Register-ScheduledTask -TaskName "Haruhanpan weekly feedback" -Action $weekly -Trigger (New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At 3:40am) -Settings $settings -Force | Out-Null
Write-Host "Registered. Check them in Task Scheduler (taskschd.msc). Remove with: Unregister-ScheduledTask -TaskName 'Haruhanpan*'"
