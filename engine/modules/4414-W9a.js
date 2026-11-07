
function W9a(e, t) {
  let r = e.client_secret !== void 0;
  if (
    "token_endpoint_auth_method" in e &&
    e.token_endpoint_auth_method &&
    R9a(e.token_endpoint_auth_method) &&
    (t.length === 0 || t.includes(e.token_endpoint_auth_method))
  )
    return e.token_endpoint_auth_method;
  if (t.length === 0) return r ? "client_secret_basic" : "none";
  if (r && t.includes("client_secret_basic")) return "client_secret_basic";
  if (r && t.includes("client_secret_post")) return "client_secret_post";
  if (t.includes("none")) return "none";
  return r ? "client_secret_post" : "none";
}