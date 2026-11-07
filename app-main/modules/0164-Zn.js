
async function Zn(e, t) {
  if (L.default.isAbsolute(e))
    return Gn(
      e,
      Vn(t).some((n) => he(n) === he(L.default.dirname(e))),
    );
  if (e.includes("/") || e.includes("\\")) {
    let n = L.default.resolve(t, e);
    if (!Kn(t, n)) throw Error("Choose an executable inside the project or on PATH.");
    return Gn(n);
  }
  for (let n of Vn(t))
    for (let i of process.platform === "win32" ? [e, `${e}.exe`, `${e}.com`] : [e]) {
      let r = await Gn(L.default.join(n, i), !0).catch(() => {
        return;
      });
      if (r) return r;
    }
  throw Error(`The ${e.slice(0, 80)} runtime is unavailable. Install it yourself, then reopen Jac Code.`);
}