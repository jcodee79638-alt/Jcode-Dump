
async function M5i() {
  let e = hc.join(
    process.env.DOTNET_CLI_HOME ?? ZCe.homedir(),
    ".dotnet",
    "tools",
    "roslyn-language-server.cmd",
  );
  return (await ewe(e)) ? e : void 0;
}