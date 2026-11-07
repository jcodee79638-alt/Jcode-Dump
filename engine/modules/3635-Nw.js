
function Nw(e, t) {
  let r = t ?? { seen: new Set() };
  if (r.seen.has(e)) return !1;
  r.seen.add(e);
  let s = e._zod.def;
  if (s.type === "transform") return !0;
  if (s.type === "array") return Nw(s.element, r);
  if (s.type === "set") return Nw(s.valueType, r);
  if (s.type === "lazy") return Nw(s.getter(), r);
  if (
    s.type === "promise" ||
    s.type === "optional" ||
    s.type === "nonoptional" ||
    s.type === "nullable" ||
    s.type === "readonly" ||
    s.type === "default" ||
    s.type === "prefault" ||
    s.type === "catch"
  )
    return Nw(s.innerType, r);
  if (s.type === "intersection") return Nw(s.left, r) || Nw(s.right, r);
  if (s.type === "record" || s.type === "map") return Nw(s.keyType, r) || Nw(s.valueType, r);
  if (s.type === "pipe") {
    if (e._zod.traits.has("$ZodCodec")) return !0;
    return Nw(s.in, r) || Nw(s.out, r);
  }
  if (s.type === "object") {
    for (let a in s.shape) if (Nw(s.shape[a], r)) return !0;
    return !1;
  }
  if (s.type === "union") {
    for (let a of s.options) if (Nw(a, r)) return !0;
    return !1;
  }
  if (s.type === "tuple") {
    for (let a of s.items) if (Nw(a, r)) return !0;
    if (s.rest && Nw(s.rest, r)) return !0;
    return !1;
  }
  return !1;
}