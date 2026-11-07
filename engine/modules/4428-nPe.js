
function nPe(e) {
  let t = e.headers.get("WWW-Authenticate");
  if (!t) return {};
  let [r, s] = t.split(" ");
  if (r.toLowerCase() !== "bearer" || !s) return {};
  let a = $Mr(e, "resource_metadata") || void 0,
    H;
  if (a)
    try {
      H = new URL(a);
    } catch {}
  let u = $Mr(e, "scope") || void 0,
    f = $Mr(e, "error") || void 0;
  return { resourceMetadataUrl: H, scope: u, error: f };
}