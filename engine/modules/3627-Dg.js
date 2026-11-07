
function Dg(e, t, r = { path: [], schemaPath: [] }) {
  var s;
  let a = e._zod.def,
    H = t.seen.get(e);
  if (H) {
    if ((H.count++, r.schemaPath.includes(e))) H.cycle = r.path;
    return H.schema;
  }
  let u = { schema: {}, count: 1, cycle: void 0, path: r.path };
  (t.seen.set(e, u), (t.sharedDefsExtractedFor = void 0), (t.sharedEmitDoneFor = void 0));
  let f = e._zod.toJSONSchema?.();
  if (f) u.schema = f;
  else {
    let L = { ...r, schemaPath: [...r.schemaPath, e], path: r.path };
    if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, u.schema, L);
    else {
      let D = u.schema,
        S = t.processors[a.type];
      if (!S) throw Error(`[toJSONSchema]: Non-representable type encountered: ${a.type}`);
      S(e, t, D, L);
    }
    let I = e._zod.parent;
    if (I) {
      if (!u.ref) u.ref = I;
      (Dg(I, t, L), (t.seen.get(I).isParent = !0));
    }
  }
  let d = t.metadataRegistry.get(e);
  if (d) u5e(u.schema, d);
  if (t.io === "input" && Nw(e)) (delete u.schema.examples, delete u.schema.default);
  if (t.io === "input" && "_prefault" in u.schema) (s = u.schema).default ?? (s.default = u.schema._prefault);
  return (delete u.schema._prefault, t.seen.get(e).schema);
}