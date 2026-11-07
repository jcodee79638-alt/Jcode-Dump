
function iXi(e) {
  let t = nXi.get(e);
  if (t) return t;
  let r = lRe(e, { additionalProperties: !0 }),
    s = qee({
      $schema: v2s,
      ...r.schema,
      ...(Object.keys(r.definitions).length > 0 ? { $defs: r.definitions } : {}),
    }),
    a = kXa(SCt(s));
  if (!jXa(a)) throw Error("tool JSON Schema helper produced a non-schema value");
  return (nXi.set(e, a), a);
}