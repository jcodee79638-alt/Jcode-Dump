
function sn(c) {
  const t = c.get("Content-Disposition");
  if (t) {
    let e = Vr(t);
    if (e.includes("%"))
      try {
        e = decodeURIComponent(e);
      } catch {}
    if (js(e)) return e;
  }
  return null;
}