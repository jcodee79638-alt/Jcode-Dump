
function qen(e, t = Date.now()) {
  let r = QDe(e);
  if (
    r.token_type !== "Bearer" ||
    r.expires_in !== 300 ||
    typeof r.access_token !== "string" ||
    typeof r.refresh_token !== "string"
  )
    throw new Sc();
  return Ven({ accessToken: r.access_token, refreshToken: r.refresh_token, expiresAt: t + 300000 });
}