
async function KGa(e) {
  if (!UH("dotnet")) return;
  if (e) return;
  if (
    (await zCe(["dotnet", "tool", "install", "--global", "roslyn-language-server", "--prerelease"], {
      stdout: "pipe",
      stderr: "pipe",
      stdin: "pipe",
    }).exited) !== 0
  )
    return;
  let s = UH("roslyn-language-server");
  if (s) return s;
  let a = await M5i();
  if (a) return a;
}