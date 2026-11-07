
async function TVa(e, t, r) {
  let s = fbr.get(t);
  if (s) return s;
  let a = (async () => {
    let u = await new G7i().exchangeRefreshToken({ instanceUrl: t, refreshToken: e.refresh, clientId: r }),
      f = J7i(),
      d = JSON.parse(BLe.readFileSync(f, "utf-8"));
    return (
      (d.gitlab = {
        type: "oauth",
        refresh: u.refreshToken,
        access: u.accessToken,
        expires: u.expiresAt,
        enterpriseUrl: t,
      }),
      BLe.writeFileSync(f, JSON.stringify(d, null, 2), { mode: 384 }),
      u.accessToken
    );
  })();
  fbr.set(t, a);
  try {
    return await a;
  } finally {
    fbr.delete(t);
  }
}