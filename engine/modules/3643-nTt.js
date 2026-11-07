
function nTt(e, t) {
  if ("_idmap" in e) {
    let s = e,
      a = f5e({ ...t, processors: eCi }),
      H = {};
    for (let d of s._idmap.entries()) {
      let [_, L] = d;
      Dg(L, a);
    }
    let u = {},
      f = { registry: s, uri: t?.uri, defs: H };
    a.external = f;
    for (let d of s._idmap.entries()) {
      let [_, L] = d;
      (p5e(a, L), wN(u, _, d5e(a, L)));
    }
    if (Object.keys(H).length > 0) {
      let d = a.target === "draft-2020-12" ? "$defs" : "definitions";
      u.__shared = { [d]: H };
    }
    return { schemas: u };
  }
  let r = f5e({ ...t, processors: eCi });
  return (Dg(e, r), p5e(r, e), d5e(r, e));
}