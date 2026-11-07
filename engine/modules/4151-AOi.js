
function AOi(e) {
  var t, r, s;
  function a(H) {
    var u,
      f,
      d,
      _ = this;
    if (!(_ instanceof a)) return new a(H);
    if (((_.constructor = a), Z8i(H))) {
      if (((_.s = H.s), Uf))
        if (!H.d || H.e > a.maxE) ((_.e = NaN), (_.d = null));
        else if (H.e < a.minE) ((_.e = 0), (_.d = [0]));
        else ((_.e = H.e), (_.d = H.d.slice()));
      else ((_.e = H.e), (_.d = H.d ? H.d.slice() : H.d));
      return;
    }
    if (((d = typeof H), d === "number")) {
      if (H === 0) {
        ((_.s = 1 / H < 0 ? -1 : 1), (_.e = 0), (_.d = [0]));
        return;
      }
      if (H < 0) ((H = -H), (_.s = -1));
      else _.s = 1;
      if (H === ~~H && H < 1e7) {
        for (u = 0, f = H; f >= 10; f /= 10) u++;
        if (Uf)
          if (u > a.maxE) ((_.e = NaN), (_.d = null));
          else if (u < a.minE) ((_.e = 0), (_.d = [0]));
          else ((_.e = u), (_.d = [H]));
        else ((_.e = u), (_.d = [H]));
        return;
      }
      if (H * 0 !== 0) {
        if (!H) _.s = NaN;
        ((_.e = NaN), (_.d = null));
        return;
      }
      return nvt(_, H.toString());
    }
    if (d === "string") {
      if ((f = H.charCodeAt(0)) === 45) ((H = H.slice(1)), (_.s = -1));
      else {
        if (f === 43) H = H.slice(1);
        _.s = 1;
      }
      return iOi.test(H) ? nvt(_, H) : Zva(_, H);
    }
    if (d === "bigint") {
      if (H < 0) ((H = -H), (_.s = -1));
      else _.s = 1;
      return nvt(_, H.toString());
    }
    throw Error(xHe + H);
  }
  if (
    ((a.prototype = fa),
    (a.ROUND_UP = 0),
    (a.ROUND_DOWN = 1),
    (a.ROUND_CEIL = 2),
    (a.ROUND_FLOOR = 3),
    (a.ROUND_HALF_UP = 4),
    (a.ROUND_HALF_DOWN = 5),
    (a.ROUND_HALF_EVEN = 6),
    (a.ROUND_HALF_CEIL = 7),
    (a.ROUND_HALF_FLOOR = 8),
    (a.EUCLID = 9),
    (a.config = a.set = fba),
    (a.clone = AOi),
    (a.isDecimal = Z8i),
    (a.abs = tba),
    (a.acos = rba),
    (a.acosh = nba),
    (a.add = iba),
    (a.asin = sba),
    (a.asinh = oba),
    (a.atan = aba),
    (a.atanh = Hba),
    (a.atan2 = cba),
    (a.cbrt = Aba),
    (a.ceil = uba),
    (a.clamp = lba),
    (a.cos = pba),
    (a.cosh = dba),
    (a.div = mba),
    (a.exp = _ba),
    (a.floor = hba),
    (a.hypot = Lba),
    (a.ln = $ba),
    (a.log = gba),
    (a.log10 = Iba),
    (a.log2 = Eba),
    (a.max = Dba),
    (a.min = yba),
    (a.mod = Mba),
    (a.mul = xba),
    (a.pow = Sba),
    (a.random = Tba),
    (a.round = vba),
    (a.sign = bba),
    (a.sin = jba),
    (a.sinh = Pba),
    (a.sqrt = Cba),
    (a.sub = wba),
    (a.sum = kba),
    (a.tan = Oba),
    (a.tanh = Uba),
    (a.trunc = Nba),
    e === void 0)
  )
    e = {};
  if (e) {
    if (e.defaults !== !0) {
      s = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (t = 0; t < s.length;) if (!e.hasOwnProperty((r = s[t++]))) e[r] = this[r];
    }
  }
  return (a.config(e), a);
}