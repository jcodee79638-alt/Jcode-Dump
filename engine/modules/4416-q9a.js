
function q9a(e, t, r) {
  if (!t) throw Error("client_secret_basic authentication requires a client_secret");
  let s = btoa(`${e}:${t}`);
  r.set("Authorization", `Basic ${s}`);
}