
function b4a(e, t, r) {
  let s = e.toUpperCase();
  if (s === "HOME") return Qbr.homedir();
  if (s === "PWD") return t;
  if (s === "PSHOME") return zLe.dirname(r);
}