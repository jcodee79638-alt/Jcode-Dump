
function _Ve(e) {
  let t = e.segments.map(Yor).filter(Boolean);
  if (!GHo(e.host) || !t.length || t.some((a) => !XHo(a))) return;
  let r = t.join("/"),
    s = e.host.toLowerCase();
  return {
    host: s,
    path: r,
    segments: t,
    owner: t.length === 2 ? t[0] : void 0,
    repo: t[t.length - 1],
    remote: e.remote ?? (s === "github.com" ? Tvn(r) : `https://${s}/${r}.git`),
    label: s === "github.com" && t.length === 2 ? r : `${s}/${r}`,
    protocol: e.protocol,
  };
}