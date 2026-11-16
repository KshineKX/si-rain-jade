import{execFileSync}from'node:child_process';import path from'node:path';import{fileURLToPath}from'node:url';
export function validateProcessEvidence(e){
 if(!e?.queryOk||e.appContainer||e.selfProcessVisible!==true||e.selfCimVisible!==true||!Array.isArray(e.processIds)||!Array.isArray(e.cimIds))throw Error('Cannot verify DSH shutdown from this restricted or unavailable process view. Use a normal desktop terminal; no files changed.');
 const a=[...new Set(e.processIds||[])].sort((x,y)=>x-y),b=[...new Set(e.cimIds||[])].sort((x,y)=>x-y);
 if(a.length||b.length)throw Error('DSH is still running. Save work and exit from the tray; no process is closed automatically.');
 if(JSON.stringify(a)!==JSON.stringify(b))throw Error('Process queries disagree; preserve current files.');
 return{clear:true,methods:['Get-Process','CIM'],appContainer:false};
}
export function assertDshStopped(){
 if(process.platform!=='win32')throw Error('Automatic shutdown verification is only supported on Windows; no files changed.');
 const script=String.raw`$ErrorActionPreference='Stop'
try {
 Add-Type -TypeDefinition 'using System;using System.Runtime.InteropServices;public static class SiTokenView{[DllImport("kernel32.dll")]public static extern IntPtr GetCurrentProcess();[DllImport("advapi32.dll",SetLastError=true)]public static extern bool OpenProcessToken(IntPtr h,uint a,out IntPtr t);[DllImport("advapi32.dll",SetLastError=true)]public static extern bool GetTokenInformation(IntPtr t,int c,out int v,int n,out int r);[DllImport("kernel32.dll")]public static extern bool CloseHandle(IntPtr h);}'
 $taskToken=[IntPtr]::Zero;$taskFlag=0;$taskLength=0
 if(-not [SiTokenView]::OpenProcessToken([SiTokenView]::GetCurrentProcess(),8,[ref]$taskToken)){throw 'Token query unavailable'}
 try {if(-not [SiTokenView]::GetTokenInformation($taskToken,29,[ref]$taskFlag,4,[ref]$taskLength)){throw 'Token classification unavailable'}} finally {[SiTokenView]::CloseHandle($taskToken)|Out-Null}
 $taskProcesses=@(Get-Process -ErrorAction Stop)
 $taskCim=@(Get-CimInstance Win32_Process -Filter "Name = 'DeepSeek Harness.exe' OR ProcessId = $PID" -ErrorAction Stop)
 $taskA=@($taskProcesses | Where-Object ProcessName -eq 'DeepSeek Harness' | ForEach-Object Id)
 $taskB=@($taskCim | Where-Object Name -eq 'DeepSeek Harness.exe' | ForEach-Object ProcessId)
 @{queryOk=$true;appContainer=($taskFlag -ne 0);selfProcessVisible=(@($taskProcesses|Where-Object Id -eq $PID).Count -eq 1);selfCimVisible=(@($taskCim|Where-Object ProcessId -eq $PID).Count -eq 1);processIds=$taskA;cimIds=$taskB}|ConvertTo-Json -Compress
} catch {@{queryOk=$false;appContainer=$true;processIds=@();cimIds=@()}|ConvertTo-Json -Compress}`;
 let evidence;try{evidence=JSON.parse(execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',script],{encoding:'utf8',windowsHide:true,timeout:20000}));}catch{throw Error('Shutdown verification failed; installer refuses to continue. No files changed.');}
 return validateProcessEvidence(evidence);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(assertDshStopped()));}catch(e){console.error(e.message);process.exitCode=2;}}
