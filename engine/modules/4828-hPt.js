
async function hPt(e, t, r) {
  if ((aTr(), (e = await e), i3a(e))) {
    if (e instanceof File) return e;
    return XPe([await e.arrayBuffer()], e.name);
  }
  if (s3a(e)) {
    let a = await e.blob();
    return (t || (t = new URL(e.url).pathname.split(/[\\/]/).pop()), XPe(await HTr(a), t, r));
  }
  let s = await HTr(e);
  if ((t || (t = DKe(e)), !r?.type)) {
    let a = s.find((H) => typeof H === "object" && "type" in H && H.type);
    if (typeof a === "string") r = { ...r, type: a };
  }
  return XPe(s, t, r);
}