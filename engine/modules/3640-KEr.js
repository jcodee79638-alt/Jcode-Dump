
function KEr(e, t, r) {
  if (t.$ref) {
    if (r.has(t)) return t;
    r.add(t);
    let T = e.get(t)?.def;
    if (!T) return t;
    let C = KEr(e, T, r);
    return C === T ? t : C;
  }
  for (let T of ["anyOf", "oneOf"]) {
    let C = t[T];
    if (!Array.isArray(C)) continue;
    let O = C.map((B) => KEr(e, B, r));
    if (O.some((B, V) => B !== C[V])) t = { ...t, [T]: O };
  }
  let s = Array.isArray(t.type) ? t.type : [t.type],
    a = !s.includes("string") && s.some((T) => T === "number" || T === "integer"),
    H = t.enum ?? (t.const !== void 0 ? [t.const] : void 0);
  if (!a && !H?.some((T) => typeof T === "number")) return t;
  let {
    minimum: u,
    maximum: f,
    exclusiveMinimum: d,
    exclusiveMaximum: _,
    multipleOf: L,
    format: I,
    id: D,
    ...S
  } = t;
  if (S.enum) S.enum = S.enum.map((T) => (typeof T === "number" ? String(T) : T));
  else if (typeof S.const === "number") S.const = String(S.const);
  if (!a) return S;
  if (((S.type = "string"), !H)) S.pattern = (s.includes("number") ? i5e : AEr).source;
  return S;
}