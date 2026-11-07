
function HLr(e) {
  let t = ui.windowsPath(e);
  if (Cqe.win32.dirname(t) !== ".") {
    if (t.startsWith("/") && J_e(t) === "bash") return sLr() || t;
    return t;
  }
  if (J_e(t) === "bash") return sLr() || UH(t) || t;
  return UH(t) || t;
}