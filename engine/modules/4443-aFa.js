
async function aFa(
  e,
  { metadata: t, clientInformation: r, refreshToken: s, resource: a, addClientAuthentication: H, fetchFn: u },
) {
  let f = new URLSearchParams({ grant_type: "refresh_token", refresh_token: s }),
    d = await HRi(e, {
      metadata: t,
      tokenRequestParams: f,
      clientInformation: r,
      addClientAuthentication: H,
      resource: a,
      fetchFn: u,
    });
  return { refresh_token: s, ...d };
}