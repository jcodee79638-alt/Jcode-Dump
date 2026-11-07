
async function sRi(e, t, r = fetch) {
  let s = await rFa(e, "oauth-protected-resource", r, {
    protocolVersion: t?.protocolVersion,
    metadataUrl: t?.resourceMetadataUrl,
  });
  if (!s || s.status === 404)
    throw (
      await s?.body?.cancel(),
      Error("Resource server does not implement OAuth 2.0 Protected Resource Metadata.")
    );
  if (!s.ok)
    throw (
      await s.body?.cancel(),
      Error(`HTTP ${s.status} trying to load well-known OAuth protected resource metadata.`)
    );
  return XBi.parse(await s.json());
}