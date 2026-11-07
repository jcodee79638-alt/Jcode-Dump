
function o$t(e) {
  let t = qHo(e);
  if (!t) return;
  let r = t.match(/^github:([^/\s]+)\/([^/\s]+)$/);
  if (r) return _Ve({ host: "github.com", segments: [r[1], r[2]] });
  if (!t.includes("://")) {
    let s = t.match(/^(?:[^@/\s]+@)?([^:/\s]+):(.+)$/);
    if (s) return _Ve({ host: s[1], segments: Qor(s[2]), remote: t });
    let a = Qor(t);
    if (a.length >= 2 && JHo(a[0])) return _Ve({ host: a[0], segments: a.slice(1) });
    if (a.length === 2) return _Ve({ host: "github.com", segments: a });
  }
  try {
    let s = new URL(t);
    if (s.protocol === "file:") return zHo({ url: s, remote: t });
    let a = Qor(s.pathname);
    return _Ve({
      host: s.host,
      segments: a,
      remote: s.host === "github.com" ? Tvn(a.join("/")) : t,
      protocol: s.protocol,
    });
  } catch {
    return;
  }
}