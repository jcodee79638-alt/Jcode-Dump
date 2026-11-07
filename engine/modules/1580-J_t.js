
function J_t(e, t) {
  let r = t.replace(/[\r\n]+$/, "");
  if (!r) return e;
  let s = ui.windowsPath(r);
  if (hw.isAbsolute(s)) return hw.normalize(s);
  return hw.resolve(e, s);
}