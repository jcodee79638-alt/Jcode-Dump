
function v3e(e, t = {}) {
  let r = new zdt(),
    s;
  if (t.logger === !0) s = new rLn();
  else if (t.logger !== !1) s = t.logger;
  let a;
  if (t.schema) {
    let f = w_n(t.schema, O_n);
    a = { fullSchema: t.schema, schema: f.tables, tableNamesMap: f.tableNamesMap };
  }
  let H = t.relations ?? {},
    u = new ELn("sync", r, new $Ln(e, r, H, a, { logger: s, useJitMappers: rmn(t.jit) }), H, a);
  return ((u.$client = e), u);
}