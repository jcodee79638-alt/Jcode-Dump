
function MJs(e) {
  let t = [],
    r = "";
  for (;;) {
    let s = anr("{", "}", e);
    if (!s) {
      let d = e.split(",");
      return ((d[0] = r + d[0]), cnr(t, d), t);
    }
    let { pre: a, body: H, post: u } = s,
      f = a.split(",");
    if (((f[0] = r + f[0]), (f[f.length - 1] += "{" + H + "}"), !u.length)) return (cnr(t, f), t);
    ((r = f.pop()), cnr(t, f), (e = u));
  }
}