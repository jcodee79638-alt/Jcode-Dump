
function hX(e, t, r) {
  var s;
  let a = e.inst?._zod?.traits;
  if (a?.has("$ZodType"))
    if (a.has("$ZodCheck")) (s = e).schema ?? (s.schema = e.inst);
    else e.schema = e.inst;
  let H = e.schema !== e.inst ? e.schema?._zod.def?.error : void 0,
    u = e.message
      ? e.message
      : (zGe(e.inst?._zod.def?.error?.(e)) ??
        zGe(H?.(e)) ??
        zGe(t?.error?.(e)) ??
        zGe(r.customError?.(e)) ??
        zGe(r.localeError?.(e)) ??
        "Invalid input"),
    f = {};
  for (let d of Object.keys(e)) {
    if (d === "inst" || d === "schema" || d === "continue" || d === "input" || d === "__proto__") continue;
    f[d] = e[d];
  }
  if ((f.path ?? (f.path = []), (f.message = u), t?.reportInput)) f.input = e.input;
  return f;
}