
function Zva(e, t) {
  var r, s, a, H, u, f, d, _, L;
  if (t.indexOf("_") > -1) {
    if (((t = t.replace(/(\d)_(?=\d)/g, "$1")), iOi.test(t))) return nvt(e, t);
  } else if (t === "Infinity" || t === "NaN") {
    if (!+t) e.s = NaN;
    return ((e.e = NaN), (e.d = null), e);
  }
  if (Jva.test(t)) ((r = 16), (t = t.toLowerCase()));
  else if (Xva.test(t)) r = 2;
  else if (Kva.test(t)) r = 8;
  else throw Error(xHe + t);
  if (((H = t.search(/p/i)), H > 0)) ((d = +t.slice(H + 1)), (t = t.substring(2, H)));
  else t = t.slice(2);
  if (((H = t.indexOf(".")), (u = H >= 0), (s = e.constructor), u))
    ((t = t.replace(".", "")), (f = t.length), (H = f - H), (a = oOi(s, new s(r), H, H * 2)));
  ((_ = rvt(t, r, _7)), (L = _.length - 1));
  for (H = L; _[H] === 0; --H) _.pop();
  if (H < 0) return new s(e.s * 0);
  if (((e.e = Hvt(_, L)), (e.d = _), (Uf = !1), u)) e = yg(e, a, f * 4);
  if (d) e = e.times(Math.abs(d) < 54 ? lx(2, d) : BB.pow(2, d));
  return ((Uf = !0), e);
}