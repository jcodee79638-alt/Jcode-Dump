
async function zGa() {
  let e = [
    process.env.VSCODE_EXTENSIONS,
    hc.join(ZCe.homedir(), ".vscode", "extensions"),
    hc.join(ZCe.homedir(), ".vscode-insiders", "extensions"),
    hc.join(ZCe.homedir(), ".vscode-server", "extensions"),
    hc.join(ZCe.homedir(), ".vscode-server-insiders", "extensions"),
  ].filter((t) => t !== void 0);
  for (let t of [...new Set(e)]) {
    let r = await Y_.readdir(t, { withFileTypes: !0 }).catch(() => []),
      s = await Promise.all(
        r
          .filter((a) => a.isDirectory() && a.name.startsWith("ms-dotnettools.csharp-"))
          .map(async (a) => ({
            path: hc.join(t, a.name, ".razorExtension"),
            modified:
              (
                await Y_.stat(hc.join(t, a.name)).catch(() => {
                  return;
                })
              )?.mtimeMs ?? 0,
          })),
      );
    for (let a of s.sort((H, u) => u.modified - H.modified).map((H) => H.path)) {
      let H = {
        compiler: hc.join(a, "Microsoft.CodeAnalysis.Razor.Compiler.dll"),
        targets: hc.join(a, "Targets", "Microsoft.NET.Sdk.Razor.DesignTime.targets"),
        extension: hc.join(a, "Microsoft.VisualStudioCode.RazorExtension.dll"),
      };
      if ((await ewe(H.compiler)) && (await ewe(H.targets)) && (await ewe(H.extension))) return H;
    }
  }
}