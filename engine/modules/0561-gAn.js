
function gAn(e, t) {
  let r = lRe(e);
  if (t === "draft-2020-12") {
    let s = r.schema;
    if (Object.keys(r.definitions).length > 0) s.$defs = r.definitions;
    return s;
  } else if (t === "draft-07") {
    let s = hAn(r),
      a = s.schema;
    if (Object.keys(s.definitions).length > 0) a.definitions = s.definitions;
    return a;
  }
  throw new globalThis.Error(`Unsupported target: ${t}`);
}