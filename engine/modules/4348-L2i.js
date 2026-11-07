
var L2i = Ie(function (m2i) {
  Object.defineProperty(m2i, "__esModule", { value: !0 });
  m2i.validateSchemaDeps = m2i.validatePropertyDeps = m2i.error = void 0;
  var qje = fd(),
    f2i = x_(),
    zX = JB();
  m2i.error = {
    message: ({ params: { property: e, depsCount: t, deps: r } }) =>
      qje.str`must have ${t === 1 ? "property" : "properties"} ${r} when property ${e} is present`,
    params: ({ params: { property: e, depsCount: t, deps: r, missingProperty: s } }) => qje._`{property: ${e},
    missingProperty: ${s},
    depsCount: ${t},
    deps: ${r}}`,
  };
  var NUa = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: m2i.error,
    code(e) {
      let [t, r] = FUa(e);
      (p2i(e, t), d2i(e, r));
    },
  };
  function FUa({ schema: e }) {
    let t = {},
      r = {};
    for (let s in e) {
      if (s === "__proto__") continue;
      let a = Array.isArray(e[s]) ? t : r;
      a[s] = e[s];
    }
    return [t, r];
  }
  function p2i(e, t = e.schema) {
    let { gen: r, data: s, it: a } = e;
    if (Object.keys(t).length === 0) return;
    let H = r.let("missing");
    for (let u in t) {
      let f = t[u];
      if (f.length === 0) continue;
      let d = zX.propertyInData(r, s, u, a.opts.ownProperties);
      if ((e.setParams({ property: u, depsCount: f.length, deps: f.join(", ") }), a.allErrors))
        r.if(d, () => {
          for (let _ of f) zX.checkReportMissingProp(e, _);
        });
      else (r.if(qje._`${d} && (${zX.checkMissingProp(e, f, H)})`), zX.reportMissingProp(e, H), r.else());
    }
  }
  m2i.validatePropertyDeps = p2i;
  function d2i(e, t = e.schema) {
    let { gen: r, data: s, keyword: a, it: H } = e,
      u = r.name("valid");
    for (let f in t) {
      if (f2i.alwaysValidSchema(H, t[f])) continue;
      (r.if(
        zX.propertyInData(r, s, f, H.opts.ownProperties),
        () => {
          let d = e.subschema({ keyword: a, schemaProp: f }, u);
          e.mergeValidEvaluated(d, u);
        },
        () => r.var(u, !0),
      ),
        e.ok(u));
    }
  }
  m2i.validateSchemaDeps = d2i;
  m2i.default = NUa;
});