
function d5e(e, t) {
  let r = e.seen.get(t);
  if (!r) throw Error("Unprocessed schema. This is a bug in Zod.");
  let s = (f) => {
    let d = e.seen.get(f);
    if (d.ref === null) return;
    let _ = d.def ?? d.schema,
      L = { ..._ },
      I = d.ref;
    if (((d.ref = null), I)) {
      s(I);
      let S = e.seen.get(I),
        T = S.schema;
      if (T.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0"))
        ((_.allOf = _.allOf ?? []), _.allOf.push(T));
      else u5e(_, T);
      if ((u5e(_, L), f._zod.parent === I))
        for (let O in _) {
          if (O === "$ref" || O === "allOf") continue;
          if (!(O in L)) delete _[O];
        }
      if (T.$ref && S.def)
        for (let O in _) {
          if (O === "$ref" || O === "allOf") continue;
          if (O in S.def && JSON.stringify(_[O]) === JSON.stringify(S.def[O])) delete _[O];
        }
    }
    let D = f._zod.parent;
    if (D && D !== I) {
      s(D);
      let S = e.seen.get(D);
      if (S?.schema.$ref) {
        if (((_.$ref = S.schema.$ref), S.def))
          for (let T in _) {
            if (T === "$ref" || T === "allOf") continue;
            if (T in S.def && JSON.stringify(_[T]) === JSON.stringify(S.def[T])) delete _[T];
          }
      }
    }
    e.override({ zodSchema: f, jsonSchema: _, path: d.path ?? [] });
  };
  if (!e.external || e.sharedEmitDoneFor !== e.external) {
    for (let f of [...e.seen.entries()].reverse()) s(f[0]);
    if (e.target !== "openapi-3.0") for (let f of e.seen.entries()) XPi(f[1].def ?? f[1].schema);
    for (let f of e.deferred) f();
    if (e.intersections.length) {
      let f = new Map();
      for (let d of e.seen.values())
        for (let _ of [d.schema, d.def]) {
          let L = _?.allOf;
          if (!Array.isArray(L)) continue;
          let I = f.get(L);
          if (I) I.push(_);
          else f.set(L, [_]);
        }
      for (let d of e.intersections) for (let _ of f.get(d) ?? []) zDa(_);
    }
  }
  let a = {};
  if (e.target === "draft-2020-12") a.$schema = "https://json-schema.org/draft/2020-12/schema";
  else if (e.target === "draft-07") a.$schema = "http://json-schema.org/draft-07/schema#";
  else if (e.target === "draft-04") a.$schema = "http://json-schema.org/draft-04/schema#";
  else if (e.target === "openapi-3.0");
  if (e.external?.uri) {
    let f = e.external.registry.get(t)?.id;
    if (!f) throw Error("Schema is missing an `id` property");
    a.$id = e.external.uri(f);
  }
  u5e(a, r.defId ? r.schema : (r.def ?? r.schema));
  let H = e.metadataRegistry.get(t)?.id;
  if (H !== void 0 && a.id === H) delete a.id;
  let u = e.external?.defs ?? {};
  if (!e.external || e.sharedEmitDoneFor !== e.external)
    for (let f of e.seen.entries()) {
      let d = f[1];
      if (d.def && d.defId) {
        if (d.def.id === d.defId) delete d.def.id;
        wN(u, d.defId, d.def);
      }
    }
  if (e.external) e.sharedEmitDoneFor = e.external;
  if (e.external);
  else if (Object.keys(u).length > 0)
    if (e.target === "draft-2020-12") a.$defs = u;
    else a.definitions = u;
  try {
    let f = JSON.parse(JSON.stringify(a));
    return (
      Object.defineProperty(f, "~standard", {
        value: {
          ...t["~standard"],
          jsonSchema: { input: l5e(t, "input", e.processors), output: l5e(t, "output", e.processors) },
        },
        enumerable: !1,
        writable: !1,
      }),
      f
    );
  } catch (f) {
    throw Error("Error converting schema to JSON.");
  }
}