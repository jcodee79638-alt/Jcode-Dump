
async function bjt(e, t, r) {
  if ((qxr(), (e = await e), t || (t = $Je(e)), KBa(e))) {
    if (e instanceof File && t == null && r == null) return e;
    return fLe([await e.arrayBuffer()], t ?? e.name, { type: e.type, lastModified: e.lastModified, ...r });
  }
  if (zBa(e)) {
    let a = await e.blob();
    return (t || (t = new URL(e.url).pathname.split(/[\\/]/).pop()), fLe(await Xxr(a), t, r));
  }
  let s = await Xxr(e);
  if (!r?.type) {
    let a = s.find((H) => typeof H === "object" && "type" in H && H.type);
    if (typeof a === "string") r = { ...r, type: a };
  }
  return fLe(s, t, r);
}