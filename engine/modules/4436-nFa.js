
function nFa(e) {
  let t = typeof e === "string" ? new URL(e) : e,
    r = t.pathname !== "/",
    s = [];
  if (!r)
    return (
      s.push({ url: new URL("/.well-known/oauth-authorization-server", t.origin), type: "oauth" }),
      s.push({ url: new URL("/.well-known/openid-configuration", t.origin), type: "oidc" }),
      s
    );
  let a = t.pathname;
  if (a.endsWith("/")) a = a.slice(0, -1);
  return (
    s.push({ url: new URL(`/.well-known/oauth-authorization-server${a}`, t.origin), type: "oauth" }),
    s.push({ url: new URL(`/.well-known/openid-configuration${a}`, t.origin), type: "oidc" }),
    s.push({ url: new URL(`${a}/.well-known/openid-configuration`, t.origin), type: "oidc" }),
    s
  );
}