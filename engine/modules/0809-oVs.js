
function oVs(e, t) {
  let r = HVs(t) ? t : Ll({ ...aVs(e), layer: t, deps: [], tag: e.tag });
  if (e.name !== r.name) throw Error(`Cannot replace ${e.name} with ${r.name}`);
  if (e.tag !== r.tag) throw Error(`Cannot replace ${e.name} across tags`);
  return r;
}