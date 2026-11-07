
async function Wee(e, t) {
  {
    let r = E5i.resolve(e),
      s = E5i.resolve(t),
      a = `$global:ProgressPreference = 'SilentlyContinue'; Expand-Archive -Path '${r}' -DestinationPath '${s}' -Force`;
    await lR(["powershell", "-NoProfile", "-NonInteractive", "-Command", a]);
    return;
  }
  await lR(["unzip", "-o", "-q", e, "-d", t]);
}