
function b3e(...e) {
  if (e[0] === void 0 || typeof e[0] === "string")
    return v3e(e[0] === void 0 ? new dmt() : new dmt(e[0]), e[1]);
  let { connection: t, client: r, ...s } = e[0];
  if (r) return v3e(r, s);
  if (typeof t === "object") {
    let { source: a, ...H } = t;
    return v3e(new dmt(a, Object.values(H).filter((u) => u !== void 0).length ? H : void 0), s);
  }
  return v3e(new dmt(t), s);
}