
async function HFa(e, t, { metadata: r, resource: s, authorizationCode: a, fetchFn: H } = {}) {
  let u = async () => {
      let L = await e.clientInformation(),
        I = gMr(L, String(t));
      if (L && !I) throw iRi(L, String(t));
      return I;
    },
    f = await u(),
    d = e.clientMetadata.scope,
    _;
  if (e.prepareTokenRequest) _ = await e.prepareTokenRequest(d);
  if (!_) {
    if (!a) throw Error("Either provider.prepareTokenRequest() or authorizationCode is required");
    if (!e.redirectUrl) throw Error("redirectUrl is required for authorization_code flow");
    let L = await e.codeVerifier();
    _ = oFa(a, L, e.redirectUrl);
  }
  return (
    f ?? (f = await u()),
    HRi(t, {
      metadata: r,
      tokenRequestParams: _,
      clientInformation: f,
      addClientAuthentication: e.addClientAuthentication,
      resource: s,
      fetchFn: H,
    })
  );
}