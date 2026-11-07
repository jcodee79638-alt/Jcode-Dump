
var lqi = 30000,
  dqi,
  D4a,
  y4a,
  M4a,
  x4a,
  zbr = (e) => {
    if (e.startsWith("file://")) return uqi(e);
    if (e.startsWith("/") || /^[a-z]:/i.test(e)) return e;
    let t = new URL(e, import.meta.url);
    return uqi(t);
  },
  U4a,
  N4a,
  B4a,
  hqi;