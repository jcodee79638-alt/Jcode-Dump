
var qa = _e(Fe, 9, 1),
  Qa = _e(En, 5, 1),
  vs = function (c) {
    for (var t = c[0], e = 1; e < c.length; ++e) c[e] > t && (t = c[e]);
    return t;
  },
  Ct = function (c, t, e) {
    var s = (t / 8) | 0;
    return ((c[s] | (c[s + 1] << 8)) >> (t & 7)) & e;
  },
  ws = function (c, t) {
    var e = (t / 8) | 0;
    return (c[e] | (c[e + 1] << 8) | (c[e + 2] << 16)) >> (t & 7);
  },
  Ja = function (c) {
    return ((c + 7) / 8) | 0;
  },
  li = function (c, t, e) {
    return (
      (t == null || t < 0) && (t = 0),
      (e == null || e > c.length) && (e = c.length),
      new At(c.subarray(t, e))
    );
  },
  Za = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data",
  ],
  gt = function (c, t, e) {
    var s = new Error(t || Za[c]);
    if (((s.code = c), Error.captureStackTrace && Error.captureStackTrace(s, gt), !e)) throw s;
    return s;
  },
  to = function (c, t, e, s) {
    var i = c.length,
      n = s ? s.length : 0;
    if (!i || (t.f && !t.l)) return e || new At(0);
    var r = !e,
      a = r || t.i != 2,
      o = t.i;
    r && (e = new At(i * 3));
    var l = function (ee) {
        var se = e.length;
        if (ee > se) {
          var me = new At(Math.max(se * 2, ee));
          (me.set(e), (e = me));
        }
      },
      h = t.f || 0,
      d = t.p || 0,
      u = t.b || 0,
      f = t.l,
      p = t.d,
      g = t.m,
      m = t.n,
      b = i * 8;
    do {
      if (!f) {
        h = Ct(c, d, 1);
        var y = Ct(c, d + 1, 3);
        if (((d += 3), y))
          if (y == 1) ((f = qa), (p = Qa), (g = 9), (m = 5));
          else if (y == 2) {
            var S = Ct(c, d, 31) + 257,
              x = Ct(c, d + 10, 15) + 4,
              _ = S + Ct(c, d + 5, 31) + 1;
            d += 14;
            for (var E = new At(_), P = new At(19), C = 0; C < x; ++C) P[Wa[C]] = Ct(c, d + C * 3, 7);
            d += x * 3;
            for (var R = vs(P), L = (1 << R) - 1, O = _e(P, R, 1), C = 0; C < _;) {
              var W = O[Ct(c, d, L)];
              d += W & 15;
              var A = W >> 4;
              if (A < 16) E[C++] = A;
              else {
                var I = 0,
                  F = 0;
                for (
                  A == 16
                    ? ((F = 3 + Ct(c, d, 3)), (d += 2), (I = E[C - 1]))
                    : A == 17
                      ? ((F = 3 + Ct(c, d, 7)), (d += 3))
                      : A == 18 && ((F = 11 + Ct(c, d, 127)), (d += 7));
                  F--;
                )
                  E[C++] = I;
              }
            }
            var et = E.subarray(0, S),
              it = E.subarray(S);
            ((g = vs(et)), (m = vs(it)), (f = _e(et, g, 1)), (p = _e(it, m, 1)));
          } else gt(1);
        else {
          var A = Ja(d) + 4,
            w = c[A - 4] | (c[A - 3] << 8),
            v = A + w;
          if (v > i) {
            o && gt(0);
            break;
          }
          (a && l(u + w), e.set(c.subarray(A, v), u), (t.b = u += w), (t.p = d = v * 8), (t.f = h));
          continue;
        }
        if (d > b) {
          o && gt(0);
          break;
        }
      }
      a && l(u + 131072);
      for (var Ht = (1 << g) - 1, ot = (1 << m) - 1, q = d; ; q = d) {
        var I = f[ws(c, d) & Ht],
          X = I >> 4;
        if (((d += I & 15), d > b)) {
          o && gt(0);
          break;
        }
        if ((I || gt(2), X < 256)) e[u++] = X;
        else if (X == 256) {
          ((q = d), (f = null));
          break;
        } else {
          var Ut = X - 254;
          if (X > 264) {
            var C = X - 257,
              Nt = An[C];
            ((Ut = Ct(c, d, (1 << Nt) - 1) + xn[C]), (d += Nt));
          }
          var Pt = p[ws(c, d) & ot],
            J = Pt >> 4;
          (Pt || gt(3), (d += Pt & 15));
          var it = Ka[J];
          if (J > 3) {
            var Nt = vn[J];
            ((it += ws(c, d) & ((1 << Nt) - 1)), (d += Nt));
          }
          if (d > b) {
            o && gt(0);
            break;
          }
          a && l(u + 131072);
          var Oe = u + Ut;
          if (u < it) {
            var Re = n - it,
              us = Math.min(it, Oe);
            for (Re + u < 0 && gt(3); u < us; ++u) e[u] = s[Re + u];
          }
          for (; u < Oe; ++u) e[u] = e[u - it];
        }
      }
      ((t.l = f), (t.p = q), (t.b = u), (t.f = h), f && ((h = 1), (t.m = g), (t.d = p), (t.n = m)));
    } while (!h);
    return u != e.length && r ? li(e, 0, u) : e.subarray(0, u);
  },
  eo = new At(0),
  Rt = function (c, t) {
    return c[t] | (c[t + 1] << 8);
  },
  xt = function (c, t) {
    return (c[t] | (c[t + 1] << 8) | (c[t + 2] << 16) | (c[t + 3] << 24)) >>> 0;
  },
  Ss = function (c, t) {
    return xt(c, t) + xt(c, t + 4) * 4294967296;
  };