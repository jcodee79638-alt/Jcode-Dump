
function JIa(e, t) {
  if (fSt === e) return;
  if (dX) zTi();
  try {
    let r = t ?? "opencode.local",
      s = `opencode-${e}`;
    ((dX = new KTi.Bonjour()),
      dX.publish({ name: s, type: "http", host: r, port: e, txt: { path: "/" } }).on("error", () => {}),
      (fSt = e));
  } catch {
    if (dX)
      try {
        dX.destroy();
      } catch {}
    ((dX = void 0), (fSt = void 0));
  }
}