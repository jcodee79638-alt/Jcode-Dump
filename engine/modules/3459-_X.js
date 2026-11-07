
function _X(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let r = t; r < e.issues.length; r++) if (e.issues[r]?.continue !== !0) return !0;
  return !1;
}