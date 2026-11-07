
function lIi(e) {
  let t = lRe(e);
  if (Object.keys(t.definitions).length === 0) return t.schema;
  return { ...t.schema, $defs: t.definitions };
}