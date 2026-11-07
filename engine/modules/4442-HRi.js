
async function HRi(
  e,
  {
    metadata: t,
    tokenRequestParams: r,
    clientInformation: s,
    addClientAuthentication: a,
    resource: H,
    fetchFn: u,
  },
) {
  let f = t?.token_endpoint ? new URL(t.token_endpoint) : new URL("/token", e),
    d = new Headers({ "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" });
  if (H) r.set("resource", aRi(H));
  if (a) await a(d, r, f, t);
  else if (s) {
    let L = t?.token_endpoint_auth_methods_supported ?? [],
      I = W9a(s, L);
    V9a(I, s, d, r);
  }
  let _ = await YX(u ?? fetch)(f, { method: "POST", headers: d, body: r });
  if (!_.ok) throw await nRi(_);
  return K9a.parse(await _.json());
}