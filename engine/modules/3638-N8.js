
function N8(e) {
  let t = {},
    r = e._zod.def,
    s = e._zod.traits.has("$ZodCheck") ? [e, ...(r.checks ?? [])] : (r.checks ?? []);
  for (let H of s) QDa[H._zod.def.check]?.(t, H._zod.def);
  let a = e._zod.bag;
  if (a.minimum !== void 0) Xbe(t, "minimum", a.minimum);
  if (a.exclusiveMinimum !== void 0) Xbe(t, "exclusiveMinimum", a.exclusiveMinimum);
  if (a.maximum !== void 0) Jbe(t, "maximum", a.maximum);
  if (a.exclusiveMaximum !== void 0) Jbe(t, "exclusiveMaximum", a.exclusiveMaximum);
  if (a.multipleOf !== void 0) tCi(t, a.multipleOf);
  if (a.format !== void 0) {
    if ((t.format ?? (t.format = a.format), a.format.includes("int"))) t.isInt = !0;
  }
  if (a.mime) nCi(t, a.mime);
  for (let H of a.patterns ?? []) rCi(t, H);
  return t;
}