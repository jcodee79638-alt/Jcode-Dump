
var uOi = ne(() => {
  /*!
   *  decimal.js v10.5.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   */ ((ZDr = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -Lje,
    maxE: Lje,
    crypto: !1,
  }),
    (xHe = avt + "Invalid argument: "),
    (tOi = avt + "Precision limit exceeded"),
    (rOi = avt + "crypto unavailable"),
    (EP = Math.floor),
    (lx = Math.pow),
    (Xva = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i),
    (Jva = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i),
    (Kva = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i),
    (iOi = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i),
    (Qva = ivt.length - 1),
    (eyr = svt.length - 1),
    (fa = { toStringTag: nOi }));
  fa.absoluteValue = fa.abs = function () {
    var e = new this.constructor(this);
    if (e.s < 0) e.s = 1;
    return Wu(e);
  };
  fa.ceil = function () {
    return Wu(new this.constructor(this), this.e + 1, 2);
  };
  fa.clampedTo = fa.clamp = function (e, t) {
    var r,
      s = this,
      a = s.constructor;
    if (((e = new a(e)), (t = new a(t)), !e.s || !t.s)) return new a(NaN);
    if (e.gt(t)) throw Error(xHe + t);
    return ((r = s.cmp(e)), r < 0 ? e : s.cmp(t) > 0 ? t : new a(s));
  };
  fa.comparedTo = fa.cmp = function (e) {
    var t,
      r,
      s,
      a,
      H = this,
      u = H.d,
      f = (e = new H.constructor(e)).d,
      d = H.s,
      _ = e.s;
    if (!u || !f) return !d || !_ ? NaN : d !== _ ? d : u === f ? 0 : !u ^ (d < 0) ? 1 : -1;
    if (!u[0] || !f[0]) return u[0] ? d : f[0] ? -_ : 0;
    if (d !== _) return d;
    if (H.e !== e.e) return (H.e > e.e) ^ (d < 0) ? 1 : -1;
    ((s = u.length), (a = f.length));
    for (t = 0, r = s < a ? s : a; t < r; ++t) if (u[t] !== f[t]) return (u[t] > f[t]) ^ (d < 0) ? 1 : -1;
    return s === a ? 0 : (s > a) ^ (d < 0) ? 1 : -1;
  };
  fa.cosine = fa.cos = function () {
    var e,
      t,
      r = this,
      s = r.constructor;
    if (!r.d) return new s(NaN);
    if (!r.d[0]) return new s(1);
    return (
      (e = s.precision),
      (t = s.rounding),
      (s.precision = e + Math.max(r.e, r.sd()) + Cl),
      (s.rounding = 1),
      (r = Yva(s, cOi(s, r))),
      (s.precision = e),
      (s.rounding = t),
      Wu(Hee == 2 || Hee == 3 ? r.neg() : r, e, t, !0)
    );
  };
  fa.cubeRoot = fa.cbrt = function () {
    var e,
      t,
      r,
      s,
      a,
      H,
      u,
      f,
      d,
      _,
      L = this,
      I = L.constructor;
    if (!L.isFinite() || L.isZero()) return new I(L);
    if (((Uf = !1), (H = L.s * lx(L.s * L, 0.3333333333333333)), !H || Math.abs(H) == 1 / 0)) {
      if (((r = fb(L.d)), (e = L.e), (H = (e - r.length + 1) % 3))) r += H == 1 || H == -2 ? "0" : "00";
      if (((H = lx(r, 0.3333333333333333)), (e = EP((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))), H == 1 / 0))
        r = "5e" + e;
      else ((r = H.toExponential()), (r = r.slice(0, r.indexOf("e") + 1) + e));
      ((s = new I(r)), (s.s = L.s));
    } else s = new I(H.toString());
    u = (e = I.precision) + 3;
    for (;;)
      if (
        ((f = s),
        (d = f.times(f).times(f)),
        (_ = d.plus(L)),
        (s = yg(_.plus(L).times(f), _.plus(d), u + 2, 1)),
        fb(f.d).slice(0, u) === (r = fb(s.d)).slice(0, u))
      )
        if (((r = r.slice(u - 3, u + 1)), r == "9999" || (!a && r == "4999"))) {
          if (!a) {
            if ((Wu(f, e + 1, 0), f.times(f).times(f).eq(L))) {
              s = f;
              break;
            }
          }
          ((u += 4), (a = 1));
        } else {
          if (!+r || (!+r.slice(1) && r.charAt(0) == "5"))
            (Wu(s, e + 1, 1), (t = !s.times(s).times(s).eq(L)));
          break;
        }
    return ((Uf = !0), Wu(s, e, I.rounding, t));
  };
  fa.decimalPlaces = fa.dp = function () {
    var e,
      t = this.d,
      r = NaN;
    if (t) {
      if (((e = t.length - 1), (r = (e - EP(this.e / Cl)) * Cl), (e = t[e]), e))
        for (; e % 10 == 0; e /= 10) r--;
      if (r < 0) r = 0;
    }
    return r;
  };
  fa.dividedBy = fa.div = function (e) {
    return yg(this, new this.constructor(e));
  };
  fa.dividedToIntegerBy = fa.divToInt = function (e) {
    var t = this,
      r = t.constructor;
    return Wu(yg(t, new r(e), 0, 1, 1), r.precision, r.rounding);
  };
  fa.equals = fa.eq = function (e) {
    return this.cmp(e) === 0;
  };
  fa.floor = function () {
    return Wu(new this.constructor(this), this.e + 1, 3);
  };
  fa.greaterThan = fa.gt = function (e) {
    return this.cmp(e) > 0;
  };
  fa.greaterThanOrEqualTo = fa.gte = function (e) {
    var t = this.cmp(e);
    return t == 1 || t === 0;
  };
  fa.hyperbolicCosine = fa.cosh = function () {
    var e,
      t,
      r,
      s,
      a,
      H = this,
      u = H.constructor,
      f = new u(1);
    if (!H.isFinite()) return new u(H.s ? 1 / 0 : NaN);
    if (H.isZero()) return f;
    if (
      ((r = u.precision),
      (s = u.rounding),
      (u.precision = r + Math.max(H.e, H.sd()) + 4),
      (u.rounding = 1),
      (a = H.d.length),
      a < 32)
    )
      ((e = Math.ceil(a / 3)), (t = (1 / cvt(4, e)).toString()));
    else ((e = 16), (t = "2.3283064365386962890625e-10"));
    H = $je(u, 1, H.times(t), new u(1), !0);
    var d,
      _ = e,
      L = new u(8);
    for (; _--;) ((d = H.times(H)), (H = f.minus(d.times(L.minus(d.times(L))))));
    return Wu(H, (u.precision = r), (u.rounding = s), !0);
  };
  fa.hyperbolicSine = fa.sinh = function () {
    var e,
      t,
      r,
      s,
      a = this,
      H = a.constructor;
    if (!a.isFinite() || a.isZero()) return new H(a);
    if (
      ((t = H.precision),
      (r = H.rounding),
      (H.precision = t + Math.max(a.e, a.sd()) + 4),
      (H.rounding = 1),
      (s = a.d.length),
      s < 3)
    )
      a = $je(H, 2, a, a, !0);
    else {
      ((e = 1.4 * Math.sqrt(s)),
        (e = e > 16 ? 16 : e | 0),
        (a = a.times(1 / cvt(5, e))),
        (a = $je(H, 2, a, a, !0)));
      var u,
        f = new H(5),
        d = new H(16),
        _ = new H(20);
      for (; e--;) ((u = a.times(a)), (a = a.times(f.plus(u.times(d.times(u).plus(_))))));
    }
    return ((H.precision = t), (H.rounding = r), Wu(a, t, r, !0));
  };
  fa.hyperbolicTangent = fa.tanh = function () {
    var e,
      t,
      r = this,
      s = r.constructor;
    if (!r.isFinite()) return new s(r.s);
    if (r.isZero()) return new s(r);
    return (
      (e = s.precision),
      (t = s.rounding),
      (s.precision = e + 7),
      (s.rounding = 1),
      yg(r.sinh(), r.cosh(), (s.precision = e), (s.rounding = t))
    );
  };
  fa.inverseCosine = fa.acos = function () {
    var e = this,
      t = e.constructor,
      r = e.abs().cmp(1),
      { precision: s, rounding: a } = t;
    if (r !== -1) return r === 0 ? (e.isNeg() ? PX(t, s, a) : new t(0)) : new t(NaN);
    if (e.isZero()) return PX(t, s + 4, a).times(0.5);
    return (
      (t.precision = s + 6),
      (t.rounding = 1),
      (e = new t(1).minus(e).div(e.plus(1)).sqrt().atan()),
      (t.precision = s),
      (t.rounding = a),
      e.times(2)
    );
  };
  fa.inverseHyperbolicCosine = fa.acosh = function () {
    var e,
      t,
      r = this,
      s = r.constructor;
    if (r.lte(1)) return new s(r.eq(1) ? 0 : NaN);
    if (!r.isFinite()) return new s(r);
    return (
      (e = s.precision),
      (t = s.rounding),
      (s.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4),
      (s.rounding = 1),
      (Uf = !1),
      (r = r.times(r).minus(1).sqrt().plus(r)),
      (Uf = !0),
      (s.precision = e),
      (s.rounding = t),
      r.ln()
    );
  };
  fa.inverseHyperbolicSine = fa.asinh = function () {
    var e,
      t,
      r = this,
      s = r.constructor;
    if (!r.isFinite() || r.isZero()) return new s(r);
    return (
      (e = s.precision),
      (t = s.rounding),
      (s.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6),
      (s.rounding = 1),
      (Uf = !1),
      (r = r.times(r).plus(1).sqrt().plus(r)),
      (Uf = !0),
      (s.precision = e),
      (s.rounding = t),
      r.ln()
    );
  };
  fa.inverseHyperbolicTangent = fa.atanh = function () {
    var e,
      t,
      r,
      s,
      a = this,
      H = a.constructor;
    if (!a.isFinite()) return new H(NaN);
    if (a.e >= 0) return new H(a.abs().eq(1) ? a.s / 0 : a.isZero() ? a : NaN);
    if (((e = H.precision), (t = H.rounding), (s = a.sd()), Math.max(s, e) < 2 * -a.e - 1))
      return Wu(new H(a), e, t, !0);
    return (
      (H.precision = r = s - a.e),
      (a = yg(a.plus(1), new H(1).minus(a), r + e, 1)),
      (H.precision = e + 4),
      (H.rounding = 1),
      (a = a.ln()),
      (H.precision = e),
      (H.rounding = t),
      a.times(0.5)
    );
  };
  fa.inverseSine = fa.asin = function () {
    var e,
      t,
      r,
      s,
      a = this,
      H = a.constructor;
    if (a.isZero()) return new H(a);
    if (((t = a.abs().cmp(1)), (r = H.precision), (s = H.rounding), t !== -1)) {
      if (t === 0) return ((e = PX(H, r + 4, s).times(0.5)), (e.s = a.s), e);
      return new H(NaN);
    }
    return (
      (H.precision = r + 6),
      (H.rounding = 1),
      (a = a.div(new H(1).minus(a.times(a)).sqrt().plus(1)).atan()),
      (H.precision = r),
      (H.rounding = s),
      a.times(2)
    );
  };
  fa.inverseTangent = fa.atan = function () {
    var e,
      t,
      r,
      s,
      a,
      H,
      u,
      f,
      d,
      _ = this,
      L = _.constructor,
      { precision: I, rounding: D } = L;
    if (!_.isFinite()) {
      if (!_.s) return new L(NaN);
      if (I + 4 <= eyr) return ((u = PX(L, I + 4, D).times(0.5)), (u.s = _.s), u);
    } else if (_.isZero()) return new L(_);
    else if (_.abs().eq(1) && I + 4 <= eyr) return ((u = PX(L, I + 4, D).times(0.25)), (u.s = _.s), u);
    ((L.precision = f = I + 10), (L.rounding = 1), (r = Math.min(28, (f / Cl + 2) | 0)));
    for (e = r; e; --e) _ = _.div(_.times(_).plus(1).sqrt().plus(1));
    ((Uf = !1), (t = Math.ceil(f / Cl)), (s = 1), (d = _.times(_)), (u = new L(_)), (a = _));
    for (; e !== -1;)
      if (
        ((a = a.times(d)),
        (H = u.minus(a.div((s += 2)))),
        (a = a.times(d)),
        (u = H.plus(a.div((s += 2)))),
        u.d[t] !== void 0)
      )
        for (e = t; u.d[e] === H.d[e] && e--;);
    if (r) u = u.times(2 << (r - 1));
    return ((Uf = !0), Wu(u, (L.precision = I), (L.rounding = D), !0));
  };
  fa.isFinite = function () {
    return !!this.d;
  };
  fa.isInteger = fa.isInt = function () {
    return !!this.d && EP(this.e / Cl) > this.d.length - 2;
  };
  fa.isNaN = function () {
    return !this.s;
  };
  fa.isNegative = fa.isNeg = function () {
    return this.s < 0;
  };
  fa.isPositive = fa.isPos = function () {
    return this.s > 0;
  };
  fa.isZero = function () {
    return !!this.d && this.d[0] === 0;
  };
  fa.lessThan = fa.lt = function (e) {
    return this.cmp(e) < 0;
  };
  fa.lessThanOrEqualTo = fa.lte = function (e) {
    return this.cmp(e) < 1;
  };
  fa.logarithm = fa.log = function (e) {
    var t,
      r,
      s,
      a,
      H,
      u,
      f,
      d,
      _ = this,
      L = _.constructor,
      { precision: I, rounding: D } = L,
      S = 5;
    if (e == null) ((e = new L(10)), (t = !0));
    else {
      if (((e = new L(e)), (r = e.d), e.s < 0 || !r || !r[0] || e.eq(1))) return new L(NaN);
      t = e.eq(10);
    }
    if (((r = _.d), _.s < 0 || !r || !r[0] || _.eq(1)))
      return new L(r && !r[0] ? -1 / 0 : _.s != 1 ? NaN : r ? 0 : 1 / 0);
    if (t)
      if (r.length > 1) H = !0;
      else {
        for (a = r[0]; a % 10 === 0;) a /= 10;
        H = a !== 1;
      }
    if (
      ((Uf = !1),
      (f = I + S),
      (u = MHe(_, f)),
      (s = t ? ovt(L, f + 10) : MHe(e, f)),
      (d = yg(u, s, f, 1)),
      oXe(d.d, (a = I), D))
    )
      do
        if (((f += 10), (u = MHe(_, f)), (s = t ? ovt(L, f + 10) : MHe(e, f)), (d = yg(u, s, f, 1)), !H)) {
          if (+fb(d.d).slice(a + 1, a + 15) + 1 == 100000000000000) d = Wu(d, I + 1, 0);
          break;
        }
      while (oXe(d.d, (a += 10), D));
    return ((Uf = !0), Wu(d, I, D));
  };
  fa.minus = fa.sub = function (e) {
    var t,
      r,
      s,
      a,
      H,
      u,
      f,
      d,
      _,
      L,
      I,
      D,
      S = this,
      T = S.constructor;
    if (((e = new T(e)), !S.d || !e.d)) {
      if (!S.s || !e.s) e = new T(NaN);
      else if (S.d) e.s = -e.s;
      else e = new T(e.d || S.s !== e.s ? S : NaN);
      return e;
    }
    if (S.s != e.s) return ((e.s = -e.s), S.plus(e));
    if (((_ = S.d), (D = e.d), (f = T.precision), (d = T.rounding), !_[0] || !D[0])) {
      if (D[0]) e.s = -e.s;
      else if (_[0]) e = new T(S);
      else return new T(d === 3 ? -0 : 0);
      return Uf ? Wu(e, f, d) : e;
    }
    if (((r = EP(e.e / Cl)), (L = EP(S.e / Cl)), (_ = _.slice()), (H = L - r), H)) {
      if (((I = H < 0), I)) ((t = _), (H = -H), (u = D.length));
      else ((t = D), (r = L), (u = _.length));
      if (((s = Math.max(Math.ceil(f / Cl), u) + 2), H > s)) ((H = s), (t.length = 1));
      t.reverse();
      for (s = H; s--;) t.push(0);
      t.reverse();
    } else {
      if (((s = _.length), (u = D.length), (I = s < u), I)) u = s;
      for (s = 0; s < u; s++)
        if (_[s] != D[s]) {
          I = _[s] < D[s];
          break;
        }
      H = 0;
    }
    if (I) ((t = _), (_ = D), (D = t), (e.s = -e.s));
    u = _.length;
    for (s = D.length - u; s > 0; --s) _[u++] = 0;
    for (s = D.length; s > H;) {
      if (_[--s] < D[s]) {
        for (a = s; a && _[--a] === 0;) _[a] = _7 - 1;
        (--_[a], (_[s] += _7));
      }
      _[s] -= D[s];
    }
    for (; _[--u] === 0;) _.pop();
    for (; _[0] === 0; _.shift()) --r;
    if (!_[0]) return new T(d === 3 ? -0 : 0);
    return ((e.d = _), (e.e = Hvt(_, r)), Uf ? Wu(e, f, d) : e);
  };
  fa.modulo = fa.mod = function (e) {
    var t,
      r = this,
      s = r.constructor;
    if (((e = new s(e)), !r.d || !e.s || (e.d && !e.d[0]))) return new s(NaN);
    if (!e.d || (r.d && !r.d[0])) return Wu(new s(r), s.precision, s.rounding);
    if (((Uf = !1), s.modulo == 9)) ((t = yg(r, e.abs(), 0, 3, 1)), (t.s *= e.s));
    else t = yg(r, e, 0, s.modulo, 1);
    return ((t = t.times(e)), (Uf = !0), r.minus(t));
  };
  fa.naturalExponential = fa.exp = function () {
    return tyr(this);
  };
  fa.naturalLogarithm = fa.ln = function () {
    return MHe(this);
  };
  fa.negated = fa.neg = function () {
    var e = new this.constructor(this);
    return ((e.s = -e.s), Wu(e));
  };
  fa.plus = fa.add = function (e) {
    var t,
      r,
      s,
      a,
      H,
      u,
      f,
      d,
      _,
      L,
      I = this,
      D = I.constructor;
    if (((e = new D(e)), !I.d || !e.d)) {
      if (!I.s || !e.s) e = new D(NaN);
      else if (!I.d) e = new D(e.d || I.s === e.s ? I : NaN);
      return e;
    }
    if (I.s != e.s) return ((e.s = -e.s), I.minus(e));
    if (((_ = I.d), (L = e.d), (f = D.precision), (d = D.rounding), !_[0] || !L[0])) {
      if (!L[0]) e = new D(I);
      return Uf ? Wu(e, f, d) : e;
    }
    if (((H = EP(I.e / Cl)), (s = EP(e.e / Cl)), (_ = _.slice()), (a = H - s), a)) {
      if (a < 0) ((r = _), (a = -a), (u = L.length));
      else ((r = L), (s = H), (u = _.length));
      if (((H = Math.ceil(f / Cl)), (u = H > u ? H + 1 : u + 1), a > u)) ((a = u), (r.length = 1));
      r.reverse();
      for (; a--;) r.push(0);
      r.reverse();
    }
    if (((u = _.length), (a = L.length), u - a < 0)) ((a = u), (r = L), (L = _), (_ = r));
    for (t = 0; a;) ((t = ((_[--a] = _[a] + L[a] + t) / _7) | 0), (_[a] %= _7));
    if (t) (_.unshift(t), ++s);
    for (u = _.length; _[--u] == 0;) _.pop();
    return ((e.d = _), (e.e = Hvt(_, s)), Uf ? Wu(e, f, d) : e);
  };
  fa.precision = fa.sd = function (e) {
    var t,
      r = this;
    if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(xHe + e);
    if (r.d) {
      if (((t = sOi(r.d)), e && r.e + 1 > t)) t = r.e + 1;
    } else t = NaN;
    return t;
  };
  fa.round = function () {
    var e = this,
      t = e.constructor;
    return Wu(new t(e), e.e + 1, t.rounding);
  };
  fa.sine = fa.sin = function () {
    var e,
      t,
      r = this,
      s = r.constructor;
    if (!r.isFinite()) return new s(NaN);
    if (r.isZero()) return new s(r);
    return (
      (e = s.precision),
      (t = s.rounding),
      (s.precision = e + Math.max(r.e, r.sd()) + Cl),
      (s.rounding = 1),
      (r = eba(s, cOi(s, r))),
      (s.precision = e),
      (s.rounding = t),
      Wu(Hee > 2 ? r.neg() : r, e, t, !0)
    );
  };
  fa.squareRoot = fa.sqrt = function () {
    var e,
      t,
      r,
      s,
      a,
      H,
      u = this,
      { d: f, e: d, s: _, constructor: L } = u;
    if (_ !== 1 || !f || !f[0]) return new L(!_ || (_ < 0 && (!f || f[0])) ? NaN : f ? u : 1 / 0);
    if (((Uf = !1), (_ = Math.sqrt(+u)), _ == 0 || _ == 1 / 0)) {
      if (((t = fb(f)), (t.length + d) % 2 == 0)) t += "0";
      if (((_ = Math.sqrt(t)), (d = EP((d + 1) / 2) - (d < 0 || d % 2)), _ == 1 / 0)) t = "5e" + d;
      else ((t = _.toExponential()), (t = t.slice(0, t.indexOf("e") + 1) + d));
      s = new L(t);
    } else s = new L(_.toString());
    r = (d = L.precision) + 3;
    for (;;)
      if (
        ((H = s),
        (s = H.plus(yg(u, H, r + 2, 1)).times(0.5)),
        fb(H.d).slice(0, r) === (t = fb(s.d)).slice(0, r))
      )
        if (((t = t.slice(r - 3, r + 1)), t == "9999" || (!a && t == "4999"))) {
          if (!a) {
            if ((Wu(H, d + 1, 0), H.times(H).eq(u))) {
              s = H;
              break;
            }
          }
          ((r += 4), (a = 1));
        } else {
          if (!+t || (!+t.slice(1) && t.charAt(0) == "5")) (Wu(s, d + 1, 1), (e = !s.times(s).eq(u)));
          break;
        }
    return ((Uf = !0), Wu(s, d, L.rounding, e));
  };
  fa.tangent = fa.tan = function () {
    var e,
      t,
      r = this,
      s = r.constructor;
    if (!r.isFinite()) return new s(NaN);
    if (r.isZero()) return new s(r);
    return (
      (e = s.precision),
      (t = s.rounding),
      (s.precision = e + 10),
      (s.rounding = 1),
      (r = r.sin()),
      (r.s = 1),
      (r = yg(r, new s(1).minus(r.times(r)).sqrt(), e + 10, 0)),
      (s.precision = e),
      (s.rounding = t),
      Wu(Hee == 2 || Hee == 4 ? r.neg() : r, e, t, !0)
    );
  };
  fa.times = fa.mul = function (e) {
    var t,
      r,
      s,
      a,
      H,
      u,
      f,
      d,
      _,
      L = this,
      { constructor: I, d: D } = L,
      S = (e = new I(e)).d;
    if (((e.s *= L.s), !D || !D[0] || !S || !S[0]))
      return new I(!e.s || (D && !D[0] && !S) || (S && !S[0] && !D) ? NaN : !D || !S ? e.s / 0 : e.s * 0);
    if (((r = EP(L.e / Cl) + EP(e.e / Cl)), (d = D.length), (_ = S.length), d < _))
      ((H = D), (D = S), (S = H), (u = d), (d = _), (_ = u));
    ((H = []), (u = d + _));
    for (s = u; s--;) H.push(0);
    for (s = _; --s >= 0;) {
      t = 0;
      for (a = d + s; a > s;)
        ((f = H[a] + S[s] * D[a - s - 1] + t), (H[a--] = (f % _7) | 0), (t = (f / _7) | 0));
      H[a] = ((H[a] + t) % _7) | 0;
    }
    for (; !H[--u];) H.pop();
    if (t) ++r;
    else H.shift();
    return ((e.d = H), (e.e = Hvt(H, r)), Uf ? Wu(e, I.precision, I.rounding) : e);
  };
  fa.toBinary = function (e, t) {
    return ryr(this, 2, e, t);
  };
  fa.toDecimalPlaces = fa.toDP = function (e, t) {
    var r = this,
      s = r.constructor;
    if (((r = new s(r)), e === void 0)) return r;
    if ((V8(e, 0, SHe), t === void 0)) t = s.rounding;
    else V8(t, 0, 8);
    return Wu(r, e + r.e + 1, t);
  };
  fa.toExponential = function (e, t) {
    var r,
      s = this,
      a = s.constructor;
    if (e === void 0) r = CX(s, !0);
    else {
      if ((V8(e, 0, SHe), t === void 0)) t = a.rounding;
      else V8(t, 0, 8);
      ((s = Wu(new a(s), e + 1, t)), (r = CX(s, !0, e + 1)));
    }
    return s.isNeg() && !s.isZero() ? "-" + r : r;
  };
  fa.toFixed = function (e, t) {
    var r,
      s,
      a = this,
      H = a.constructor;
    if (e === void 0) r = CX(a);
    else {
      if ((V8(e, 0, SHe), t === void 0)) t = H.rounding;
      else V8(t, 0, 8);
      ((s = Wu(new H(a), e + a.e + 1, t)), (r = CX(s, !1, e + s.e + 1)));
    }
    return a.isNeg() && !a.isZero() ? "-" + r : r;
  };
  fa.toFraction = function (e) {
    var t,
      r,
      s,
      a,
      H,
      u,
      f,
      d,
      _,
      L,
      I,
      D,
      S = this,
      { d: T, constructor: C } = S;
    if (!T) return new C(S);
    if (
      ((_ = r = new C(1)),
      (s = d = new C(0)),
      (t = new C(s)),
      (H = t.e = sOi(T) - S.e - 1),
      (u = H % Cl),
      (t.d[0] = lx(10, u < 0 ? Cl + u : u)),
      e == null)
    )
      e = H > 0 ? t : _;
    else {
      if (((f = new C(e)), !f.isInt() || f.lt(_))) throw Error(xHe + f);
      e = f.gt(t) ? (H > 0 ? t : _) : f;
    }
    ((Uf = !1), (f = new C(fb(T))), (L = C.precision), (C.precision = H = T.length * Cl * 2));
    for (;;) {
      if (((I = yg(f, t, 0, 1, 1)), (a = r.plus(I.times(s))), a.cmp(e) == 1)) break;
      ((r = s),
        (s = a),
        (a = _),
        (_ = d.plus(I.times(a))),
        (d = a),
        (a = t),
        (t = f.minus(I.times(a))),
        (f = a));
    }
    return (
      (a = yg(e.minus(r), s, 0, 1, 1)),
      (d = d.plus(a.times(_))),
      (r = r.plus(a.times(s))),
      (d.s = _.s = S.s),
      (D =
        yg(_, s, H, 1)
          .minus(S)
          .abs()
          .cmp(yg(d, r, H, 1).minus(S).abs()) < 1
          ? [_, s]
          : [d, r]),
      (C.precision = L),
      (Uf = !0),
      D
    );
  };
  fa.toHexadecimal = fa.toHex = function (e, t) {
    return ryr(this, 16, e, t);
  };
  fa.toNearest = function (e, t) {
    var r = this,
      s = r.constructor;
    if (((r = new s(r)), e == null)) {
      if (!r.d) return r;
      ((e = new s(1)), (t = s.rounding));
    } else {
      if (((e = new s(e)), t === void 0)) t = s.rounding;
      else V8(t, 0, 8);
      if (!r.d) return e.s ? r : e;
      if (!e.d) {
        if (e.s) e.s = r.s;
        return e;
      }
    }
    if (e.d[0]) ((Uf = !1), (r = yg(r, e, 0, t, 1).times(e)), (Uf = !0), Wu(r));
    else ((e.s = r.s), (r = e));
    return r;
  };
  fa.toNumber = function () {
    return +this;
  };
  fa.toOctal = function (e, t) {
    return ryr(this, 8, e, t);
  };
  fa.toPower = fa.pow = function (e) {
    var t,
      r,
      s,
      a,
      H,
      u,
      f = this,
      d = f.constructor,
      _ = +(e = new d(e));
    if (!f.d || !e.d || !f.d[0] || !e.d[0]) return new d(lx(+f, _));
    if (((f = new d(f)), f.eq(1))) return f;
    if (((s = d.precision), (H = d.rounding), e.eq(1))) return Wu(f, s, H);
    if (((t = EP(e.e / Cl)), t >= e.d.length - 1 && (r = _ < 0 ? -_ : _) <= zva))
      return ((a = oOi(d, f, r, s)), e.s < 0 ? new d(1).div(a) : Wu(a, s, H));
    if (((u = f.s), u < 0)) {
      if (t < e.d.length - 1) return new d(NaN);
      if ((e.d[t] & 1) == 0) u = 1;
      if (f.e == 0 && f.d[0] == 1 && f.d.length == 1) return ((f.s = u), f);
    }
    if (
      ((r = lx(+f, _)),
      (t =
        r == 0 || !isFinite(r) ? EP(_ * (Math.log("0." + fb(f.d)) / Math.LN10 + f.e + 1)) : new d(r + "").e),
      t > d.maxE + 1 || t < d.minE - 1)
    )
      return new d(t > 0 ? u / 0 : 0);
    if (
      ((Uf = !1),
      (d.rounding = f.s = 1),
      (r = Math.min(12, (t + "").length)),
      (a = tyr(e.times(MHe(f, s + r)), s)),
      a.d)
    ) {
      if (((a = Wu(a, s + 5, 1)), oXe(a.d, s, H))) {
        if (
          ((t = s + 10),
          (a = Wu(tyr(e.times(MHe(f, t + r)), t), t + 5, 1)),
          +fb(a.d).slice(s + 1, s + 15) + 1 == 100000000000000)
        )
          a = Wu(a, s + 1, 0);
      }
    }
    return ((a.s = u), (Uf = !0), (d.rounding = H), Wu(a, s, H));
  };
  fa.toPrecision = function (e, t) {
    var r,
      s = this,
      a = s.constructor;
    if (e === void 0) r = CX(s, s.e <= a.toExpNeg || s.e >= a.toExpPos);
    else {
      if ((V8(e, 1, SHe), t === void 0)) t = a.rounding;
      else V8(t, 0, 8);
      ((s = Wu(new a(s), e, t)), (r = CX(s, e <= s.e || s.e <= a.toExpNeg, e)));
    }
    return s.isNeg() && !s.isZero() ? "-" + r : r;
  };
  fa.toSignificantDigits = fa.toSD = function (e, t) {
    var r = this,
      s = r.constructor;
    if (e === void 0) ((e = s.precision), (t = s.rounding));
    else if ((V8(e, 1, SHe), t === void 0)) t = s.rounding;
    else V8(t, 0, 8);
    return Wu(new s(r), e, t);
  };
  fa.toString = function () {
    var e = this,
      t = e.constructor,
      r = CX(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
    return e.isNeg() && !e.isZero() ? "-" + r : r;
  };
  fa.truncated = fa.trunc = function () {
    return Wu(new this.constructor(this), this.e + 1, 1);
  };
  fa.valueOf = fa.toJSON = function () {
    var e = this,
      t = e.constructor,
      r = CX(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
    return e.isNeg() ? "-" + r : r;
  };
  yg = (function () {
    function e(s, a, H) {
      var u,
        f = 0,
        d = s.length;
      for (s = s.slice(); d--;) ((u = s[d] * a + f), (s[d] = (u % H) | 0), (f = (u / H) | 0));
      if (f) s.unshift(f);
      return s;
    }
    function t(s, a, H, u) {
      var f, d;
      if (H != u) d = H > u ? 1 : -1;
      else
        for (f = d = 0; f < H; f++)
          if (s[f] != a[f]) {
            d = s[f] > a[f] ? 1 : -1;
            break;
          }
      return d;
    }
    function r(s, a, H, u) {
      var f = 0;
      for (; H--;) ((s[H] -= f), (f = s[H] < a[H] ? 1 : 0), (s[H] = f * u + s[H] - a[H]));
      for (; !s[0] && s.length > 1;) s.shift();
    }
    return function (s, a, H, u, f, d) {
      var _,
        L,
        I,
        D,
        S,
        T,
        C,
        O,
        B,
        V,
        q,
        Z,
        se,
        ae,
        z,
        Ae,
        le,
        Be,
        Te,
        Lt,
        Ht = s.constructor,
        Se = s.s == a.s ? 1 : -1,
        _e = s.d,
        we = a.d;
      if (!_e || !_e[0] || !we || !we[0])
        return new Ht(
          !s.s || !a.s || (_e ? we && _e[0] == we[0] : !we)
            ? NaN
            : (_e && _e[0] == 0) || !we
              ? Se * 0
              : Se / 0,
        );
      if (d) ((S = 1), (L = s.e - a.e));
      else ((d = _7), (S = Cl), (L = EP(s.e / S) - EP(a.e / S)));
      ((Te = we.length), (le = _e.length), (B = new Ht(Se)), (V = B.d = []));
      for (I = 0; we[I] == (_e[I] || 0); I++);
      if (we[I] > (_e[I] || 0)) L--;
      if (H == null) ((ae = H = Ht.precision), (u = Ht.rounding));
      else if (f) ae = H + (s.e - a.e) + 1;
      else ae = H;
      if (ae < 0) (V.push(1), (T = !0));
      else {
        if (((ae = (ae / S + 2) | 0), (I = 0), Te == 1)) {
          ((D = 0), (we = we[0]), ae++);
          for (; (I < le || D) && ae--; I++)
            ((z = D * d + (_e[I] || 0)), (V[I] = (z / we) | 0), (D = (z % we) | 0));
          T = D || I < le;
        } else {
          if (((D = (d / (we[0] + 1)) | 0), D > 1))
            ((we = e(we, D, d)), (_e = e(_e, D, d)), (Te = we.length), (le = _e.length));
          ((Ae = Te), (q = _e.slice(0, Te)), (Z = q.length));
          for (; Z < Te;) q[Z++] = 0;
          if (((Lt = we.slice()), Lt.unshift(0), (Be = we[0]), we[1] >= d / 2)) ++Be;
          do {
            if (((D = 0), (_ = t(we, q, Te, Z)), _ < 0)) {
              if (((se = q[0]), Te != Z)) se = se * d + (q[1] || 0);
              if (((D = (se / Be) | 0), D > 1)) {
                if (D >= d) D = d - 1;
                if (((C = e(we, D, d)), (O = C.length), (Z = q.length), (_ = t(C, q, O, Z)), _ == 1))
                  (D--, r(C, Te < O ? Lt : we, O, d));
              } else {
                if (D == 0) _ = D = 1;
                C = we.slice();
              }
              if (((O = C.length), O < Z)) C.unshift(0);
              if ((r(q, C, Z, d), _ == -1)) {
                if (((Z = q.length), (_ = t(we, q, Te, Z)), _ < 1)) (D++, r(q, Te < Z ? Lt : we, Z, d));
              }
              Z = q.length;
            } else if (_ === 0) (D++, (q = [0]));
            if (((V[I++] = D), _ && q[0])) q[Z++] = _e[Ae] || 0;
            else ((q = [_e[Ae]]), (Z = 1));
          } while ((Ae++ < le || q[0] !== void 0) && ae--);
          T = q[0] !== void 0;
        }
        if (!V[0]) V.shift();
      }
      if (S == 1) ((B.e = L), (eOi = T));
      else {
        for (I = 1, D = V[0]; D >= 10; D /= 10) I++;
        ((B.e = I + L * S - 1), Wu(B, f ? H + B.e + 1 : H, u, T));
      }
      return B;
    };
  })();
  fa[Symbol.for("nodejs.util.inspect.custom")] = fa.toString;
  fa[Symbol.toStringTag] = "Decimal";
  BB = fa.constructor = AOi(ZDr);
  ivt = new BB(ivt);
  svt = new BB(svt);
});