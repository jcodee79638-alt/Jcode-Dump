
function hEi() {
  return Array.from(
    new Set(
      [UH("pwsh"), UH("powershell"), sLr(), process.env.COMSPEC || "cmd.exe"]
        .filter((e) => Boolean(e))
        .map(HLr),
    ),
  );
}