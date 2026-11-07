
function qee(e, t = {}) {
  if (Array.isArray(e)) return e.map((a) => qee(a));
  if (!rk(e)) return e;
  let r = Array.isArray(e.required) ? new Set(e.required.filter((a) => typeof a === "string")) : void 0,
    s = Object.fromEntries(
      Object.entries(e).map(([a, H]) => [
        a,
        a === "properties" && rk(H)
          ? Object.fromEntries(Object.entries(H).map(([u, f]) => [u, qee(f, { stripNull: !r?.has(u) })]))
          : qee(H),
      ]),
    );
  if (s.additionalProperties === !0) delete s.additionalProperties;
  if (t.stripNull && Array.isArray(s.anyOf)) {
    let a = s.anyOf.filter((H) => !rk(H) || H.type !== "null");
    if (a.length !== s.anyOf.length) return qee({ ...s, anyOf: a });
  }
  if (Array.isArray(s.anyOf)) {
    let a = s.anyOf,
      H = a.find((f) => rk(f) && f.type === "number"),
      u = a.filter((f) => rk(f) && Array.isArray(f.enum) && f.enum.every((d) => PXa(d)));
    if (H && u.length === a.length - 1) {
      let { anyOf: f, ...d } = s;
      return qee({ ...H, ...d });
    }
    if (CXa(a)) {
      let { anyOf: f, ...d } = s;
      return qee({ type: "object", properties: {}, ...d });
    }
    if (a.length === 1 && rk(a[0])) {
      let { anyOf: f, ...d } = s;
      return qee({ ...a[0], ...d });
    }
  }
  if (Array.isArray(s.allOf) && s.allOf.every(rk) && wXa(s.allOf, s)) {
    let { allOf: a, ...H } = s;
    return qee({ ...Object.assign({}, ...a), ...H });
  }
  if (s.type === "integer" && s.maximum === void 0)
    return { minimum: Number.MIN_SAFE_INTEGER, ...s, maximum: Number.MAX_SAFE_INTEGER };
  return s;
}