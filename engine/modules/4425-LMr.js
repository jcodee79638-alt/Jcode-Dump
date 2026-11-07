
async function LMr(e, { serverUrl: t, authorizationCode: r, scope: s, resourceMetadataUrl: a, fetchFn: H }) {
  let u = await e.discoveryState?.(),
    f,
    d,
    _,
    L = a;
  if (!L && u?.resourceMetadataUrl) L = new URL(u.resourceMetadataUrl);
  if (u?.authorizationServerUrl) {
    if (
      ((d = u.authorizationServerUrl),
      (f = u.resourceMetadata),
      (_ = u.authorizationServerMetadata ?? (await oRi(d, { fetchFn: H }))),
      !f)
    )
      try {
        f = await sRi(t, { resourceMetadataUrl: L }, H);
      } catch {}
    if (_ !== u.authorizationServerMetadata || f !== u.resourceMetadata)
      await e.saveDiscoveryState?.({
        authorizationServerUrl: String(d),
        resourceMetadataUrl: L?.toString(),
        resourceMetadata: f,
        authorizationServerMetadata: _,
      });
  } else {
    let le = await iFa(t, { resourceMetadataUrl: L, fetchFn: H });
    ((d = le.authorizationServerUrl),
      (_ = le.authorizationServerMetadata),
      (f = le.resourceMetadata),
      await e.saveDiscoveryState?.({
        authorizationServerUrl: String(d),
        resourceMetadataUrl: L?.toString(),
        resourceMetadata: f,
        authorizationServerMetadata: _,
      }));
  }
  let I = String(d),
    D = await Z9a(t, e, f),
    S = D && f && !e.validateResourceURL ? f.resource : D,
    T = Q9a({
      requestedScope: s,
      resourceMetadata: f,
      authServerMetadata: _,
      clientMetadata: e.clientMetadata,
    }),
    C = await Promise.resolve(e.clientInformation()),
    O = gMr(C, I),
    B = e.saveClientInformation !== void 0 && !!e.redirectUrl;
  if (C && !O && !B) throw iRi(C, I);
  let V = O?.issuer == null ? O : void 0,
    q = async () => {
      try {
        if (V) await e.saveClientInformation?.({ ...V, issuer: I });
      } catch {}
    };
  if (!O) {
    if (r !== void 0)
      throw Error("Existing OAuth client information is required when exchanging an authorization code");
    let le = _?.client_id_metadata_document_supported === !0,
      Be = e.clientMetadataUrl;
    if (Be && !Y9a(Be))
      throw new rPe(`clientMetadataUrl must be a valid HTTPS URL with a non-root pathname, got: ${Be}`);
    if (le && Be) ((O = { client_id: Be, issuer: I }), await e.saveClientInformation?.(O));
    else {
      if (!e.saveClientInformation)
        throw Error("OAuth client information must be saveable for dynamic registration");
      ((O = {
        ...(await cFa(d, { metadata: _, clientMetadata: e.clientMetadata, scope: T, fetchFn: H })),
        issuer: I,
      }),
        await e.saveClientInformation(O));
    }
  }
  let Z = !e.redirectUrl;
  if (r !== void 0 || Z) {
    let le = await HFa(e, d, { metadata: _, resource: S, authorizationCode: r, fetchFn: H });
    return (await q(), await e.saveTokens({ ...le, issuer: I }), "AUTHORIZED");
  }
  let se = gMr(await e.tokens(), I);
  if (se?.refresh_token && se.issuer == null)
    console.warn(
      "[mcp-sdk] stored OAuth tokens have no 'issuer' property (saved by an earlier version, or by a provider that does not keep it) and are used as-is; make sure your OAuthClientProvider stores what saveTokens() and saveClientInformation() receive unchanged.",
    );
  if (se?.refresh_token)
    try {
      let le = await aFa(d, {
        metadata: _,
        clientInformation: O,
        refreshToken: se.refresh_token,
        resource: S,
        addClientAuthentication: e.addClientAuthentication,
        fetchFn: H,
      });
      return (await q(), await e.saveTokens({ ...le, issuer: I }), "AUTHORIZED");
    } catch (le) {
      if (!(le instanceof z1) || le instanceof rce);
      else throw le;
    }
  let ae = e.state ? await e.state() : void 0,
    { authorizationUrl: z, codeVerifier: Ae } = await sFa(d, {
      metadata: _,
      clientInformation: O,
      state: ae,
      redirectUrl: e.redirectUrl,
      scope: T,
      resource: S,
    });
  return (await e.saveCodeVerifier(Ae), await e.redirectToAuthorization(z), "REDIRECT");
}