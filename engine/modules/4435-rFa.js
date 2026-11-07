
async function rFa(e, t, r, s) {
  let a = new URL(e),
    H = s?.protocolVersion ?? Sje,
    u;
  if (s?.metadataUrl) u = new URL(s.metadataUrl);
  else {
    let d = eFa(t, a.pathname);
    ((u = new URL(d, s?.metadataServerUrl ?? a)), (u.search = a.search));
  }
  let f = await rRi(u, H, r);
  if (!s?.metadataUrl && tFa(f, a.pathname)) {
    let d = new URL(`/.well-known/${t}`, a);
    f = await rRi(d, H, r);
  }
  return f;
}