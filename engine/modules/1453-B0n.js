
function B0n(e, t = {}) {
  if (!e) return [];
  let { max: r = $Js, maxLength: s = gJs, maxDepth: a = EJs, maxRewrites: H = IJs } = t;
  if (e.slice(0, 2) === "{}") e = "\\{\\}" + e.slice(2);
  return Anr(DJs(e), r, s, a, 0, H, !0).map(yJs);
}