
function B5e() {
  var e, t;
  return (t = (e = globalThis == null ? void 0 : globalThis.performance) == null ? void 0 : e.now()) != null
    ? t
    : Date.now();
}