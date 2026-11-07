
async function Ewi(e) {
  var t;
  let r = globalThis.process,
    s = (t = r == null ? void 0 : r.getBuiltinModule) == null ? void 0 : t.call(r, e);
  if (s == null) throw Error(`Node.js built-in module ${e} is unavailable`);
  return s;
}