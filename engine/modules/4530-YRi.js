
async function YRi(e, { humanReadableOutput: t = !0, signal: r } = {}) {
  if (M2a.platform !== "darwin") throw Error("macOS only");
  let s = t ? [] : ["-ss"],
    a = {};
  if (r) a.signal = r;
  let { stdout: H } = await T2a("osascript", ["-e", e, s], a);
  return H.trim();
}