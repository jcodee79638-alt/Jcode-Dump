
function hVi(e) {
  if (!e || typeof e !== "object") return !1;
  return !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}