
async function sFa(
  e,
  { metadata: t, clientInformation: r, redirectUrl: s, scope: a, state: H, resource: u },
) {
  let f;
  if (t) {
    if (((f = new URL(t.authorization_endpoint)), !t.response_types_supported.includes(_Mr)))
      throw Error(`Incompatible auth server: does not support response type ${_Mr}`);
    if (t.code_challenge_methods_supported && !t.code_challenge_methods_supported.includes(hMr))
      throw Error(`Incompatible auth server: does not support code challenge method ${hMr}`);
  } else f = new URL("/authorize", e);
  let d = await pMr(),
    { code_verifier: _, code_challenge: L } = d;
  if (
    (f.searchParams.set("response_type", _Mr),
    f.searchParams.set("client_id", r.client_id),
    f.searchParams.set("code_challenge", L),
    f.searchParams.set("code_challenge_method", hMr),
    f.searchParams.set("redirect_uri", String(s)),
    H)
  )
    f.searchParams.set("state", H);
  if (a) f.searchParams.set("scope", a);
  if (a?.split(" ").includes("offline_access")) f.searchParams.append("prompt", "consent");
  if (u) f.searchParams.set("resource", aRi(u));
  return { authorizationUrl: f, codeVerifier: _ };
}