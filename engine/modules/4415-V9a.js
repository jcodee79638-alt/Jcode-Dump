
function V9a(e, t, r, s) {
  let { client_id: a, client_secret: H } = t;
  switch (e) {
    case "client_secret_basic":
      q9a(a, H, r);
      return;
    case "client_secret_post":
      G9a(a, H, s);
      return;
    case "none":
      X9a(a, s);
      return;
    default:
      throw Error(`Unsupported client authentication method: ${e}`);
  }
}