
function rqi(e) {
  if (e === "pwsh") return "PowerShell (7+)";
  if (e === "powershell") return "Windows PowerShell (5.1)";
  if (e === "cmd") return "cmd.exe";
  return e;
}