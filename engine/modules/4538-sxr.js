
async function sxr() {
  if (ixr.platform === "darwin") {
    let e = await ZMr();
    return { name: await exr(e), id: e };
  }
  if (ixr.platform === "linux") {
    let { stdout: e } = await w2a("xdg-mime", ["query", "default", "x-scheme-handler/http"]),
      t = e.trim();
    return { name: k2a(t.replace(/.desktop$/, "").replace("-", " ")), id: t };
  }
  if (ixr.platform === "win32") return rxr();
  throw Error("Only macOS, Linux, and Windows are supported");
}