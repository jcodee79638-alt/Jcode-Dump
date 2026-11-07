
function Krr(e, t, r, s, a, H, u) {
  if (a > s) return [e];
  let f = [""],
    d = 0,
    _ = !1,
    L = !0;
  for (;;) {
    let I = n0n("{", "}", e);
    if (!I) return O3e(f, e, [""], t, r, _);
    let D = I.pre;
    if (/\$$/.test(D)) {
      if (((f = O3e(f, D + "{" + I.body + "}", [""], t, r, _ && !I.post.length)), (L = !1), !I.post.length))
        break;
      e = I.post;
      continue;
    }
    let S = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(I.body),
      T = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(I.body),
      C = S || T,
      O = I.body.indexOf(",") >= 0;
    if (!C && !O) {
      if (d < H && I.post.match(/,(?!,).*\}/)) {
        (d++, (e = I.pre + "{" + I.body + rnr + I.post), (u = !0));
        continue;
      }
      return O3e(f, D + "{" + I.body + "}" + I.post, [""], t, r, _);
    }
    L && ((_ = u && !C), (L = !1));
    let B;
    if (C) B = k5s(I.body, T, t, r);
    else {
      let V = v5s(I.body);
      if (
        V.length === 1 &&
        V[0] !== void 0 &&
        ((V = Krr(V[0], t, r, s, a + 1, H, !1).map(j5s)), V.length === 1)
      ) {
        if (((f = O3e(f, D + V[0], [""], t, r, _ && !I.post.length)), !I.post.length)) break;
        e = I.post;
        continue;
      }
      let q = _ && !I.post.length && !D;
      for (let se = 0; q && se < f.length; se++) f[se] && (q = !1);
      B = [];
      let Z = 0;
      e: for (let se = 0; se < V.length; se++) {
        let ae = Krr(V[se], t, r, s, a + 1, H, !1);
        for (let z = 0; z < ae.length; z++) {
          let Ae = ae[z];
          if (!(q && !Ae)) {
            if (B.length >= t || Z + Ae.length > r) break e;
            (B.push(Ae), (Z += Ae.length));
          }
        }
      }
    }
    if (((f = O3e(f, D, B, t, r, _ && !I.post.length)), !I.post.length)) break;
    e = I.post;
  }
  return f;
}