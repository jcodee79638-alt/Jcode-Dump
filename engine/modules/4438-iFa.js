
async function iFa(e, t) {
  let r, s;
  try {
    if (
      ((r = await sRi(e, { resourceMetadataUrl: t?.resourceMetadataUrl }, t?.fetchFn)),
      r.authorization_servers && r.authorization_servers.length > 0)
    )
      s = r.authorization_servers[0];
  } catch {}
  if (!s) s = String(new URL("/", e));
  let a = await oRi(s, { fetchFn: t?.fetchFn });
  return { authorizationServerUrl: s, authorizationServerMetadata: a, resourceMetadata: r };
}