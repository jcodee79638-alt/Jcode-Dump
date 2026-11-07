
function v5s(e) {
  let t = [],
    r = "";
  for (;;) {
    let s = n0n("{", "}", e);
    if (!s) {
      let d = e.split(",");
      return ((d[0] = r + d[0]), krr(t, d), t);
    }
    let { pre: a, body: H, post: u } = s,
      f = a.split(",");
    if (((f[0] = r + f[0]), (f[f.length - 1] += "{" + H + "}"), !u.length)) return (krr(t, f), t);
    ((r = f.pop()), krr(t, f), (e = u));
  }
}