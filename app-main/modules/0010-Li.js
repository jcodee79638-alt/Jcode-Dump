
var Li,
  Uo,
  Nt,
  Jo,
  Wo,
  ke,
  _e,
  _r,
  Mr,
  zr,
  Ti,
  qi = function (e, t) {
    var n = new _e(31);
    for (var i = 0; i < 31; ++i) n[i] = t += 1 << e[i - 1];
    var r = new _r(n[30]);
    for (var i = 1; i < 30; ++i) for (var s = n[i]; s < n[i + 1]; ++s) r[s] = ((s - n[i]) << 5) | i;
    return { b: n, r };
  },
  Nt,
  Ho,
  jr,
  Di,
  uc,
  Ri,
  Ir,
  Ke,
  D,
  sn = function (e, t, n) {
    var i = e.length,
      r = 0,
      s = new _e(t);
    for (; r < i; ++r) if (e[r]) ++s[e[r] - 1];
    var o = new _e(t);
    for (r = 1; r < t; ++r) o[r] = (o[r - 1] + s[r - 1]) << 1;
    var l;
    if (n) {
      l = new _e(1 << t);
      var u = 15 - t;
      for (r = 0; r < i; ++r)
        if (e[r]) {
          var p = (r << 4) | e[r],
            w = t - e[r],
            f = o[e[r] - 1]++ << w;
          for (var h = f | ((1 << w) - 1); f <= h; ++f) l[Ir[f] >> u] = p;
        }
    } else {
      l = new _e(i);
      for (r = 0; r < i; ++r) if (e[r]) l[r] = Ir[o[e[r] - 1]++] >> (15 - e[r]);
    }
    return l;
  },
  Et,
  D,
  D,
  D,
  D,
  Mn,
  D,
  Go,
  Yo,
  $i = function (e) {
    return ((e + 7) / 8) | 0;
  },
  Bi = function (e, t, n) {
    if (t == null || t < 0) t = 0;
    if (n == null || n > e.length) n = e.length;
    return new ke(e.subarray(t, n));
  },
  Vo,
  zn = function (e, t, n) {
    var i = Error(t || Vo[e]);
    if (((i.code = e), Error.captureStackTrace)) Error.captureStackTrace(i, zn);
    if (!n) throw i;
    return i;
  },
  nt = function (e, t, n) {
    n <<= t & 7;
    var i = (t / 8) | 0;
    ((e[i] |= n), (e[i + 1] |= n >> 8));
  },
  nn = function (e, t, n) {
    n <<= t & 7;
    var i = (t / 8) | 0;
    ((e[i] |= n), (e[i + 1] |= n >> 8), (e[i + 2] |= n >> 16));
  },
  Pr = function (e, t) {
    var n = [];
    for (var i = 0; i < e.length; ++i) if (e[i]) n.push({ s: i, f: e[i] });
    var r = n.length,
      s = n.slice();
    if (!r) return { t: Ui, l: 0 };
    if (r == 1) {
      var o = new ke(n[0].s + 1);
      return ((o[n[0].s] = 1), { t: o, l: 1 });
    }
    (n.sort(function (y, v) {
      return y.f - v.f;
    }),
      n.push({ s: -1, f: 25001 }));
    var l = n[0],
      u = n[1],
      p = 0,
      w = 1,
      f = 2;
    n[0] = { s: -1, f: l.f + u.f, l, r: u };
    while (w != r - 1)
      ((l = n[n[p].f < n[f].f ? p++ : f++]),
        (u = n[p != w && n[p].f < n[f].f ? p++ : f++]),
        (n[w++] = { s: -1, f: l.f + u.f, l, r: u }));
    var h = s[0].s;
    for (var i = 1; i < r; ++i) if (s[i].s > h) h = s[i].s;
    var m = new _e(h + 1),
      b = Tr(n[w - 1], m, 0);
    if (b > t) {
      var i = 0,
        C = 0,
        g = b - t,
        k = 1 << g;
      s.sort(function (v, E) {
        return m[E.s] - m[v.s] || v.f - E.f;
      });
      for (; i < r; ++i) {
        var a = s[i].s;
        if (m[a] > t) ((C += k - (1 << (b - m[a]))), (m[a] = t));
        else break;
      }
      C >>= g;
      while (C > 0) {
        var d = s[i].s;
        if (m[d] < t) C -= 1 << (t - m[d]++ - 1);
        else ++i;
      }
      for (; i >= 0 && C; --i) {
        var c = s[i].s;
        if (m[c] == t) (--m[c], ++C);
      }
      b = t;
    }
    return { t: new ke(m), l: b };
  },
  Tr = function (e, t, n) {
    return e.s == -1 ? Math.max(Tr(e.l, t, n + 1), Tr(e.r, t, n + 1)) : (t[e.s] = n);
  },
  _i = function (e) {
    var t = e.length;
    while (t && !e[--t]);
    var n = new _e(++t),
      i = 0,
      r = e[0],
      s = 1,
      o = function (u) {
        n[i++] = u;
      };
    for (var l = 1; l <= t; ++l)
      if (e[l] == r && l != t) ++s;
      else {
        if (!r && s > 2) {
          for (; s > 138; s -= 138) o(32754);
          if (s > 2) (o(s > 10 ? ((s - 11) << 5) | 28690 : ((s - 3) << 5) | 12305), (s = 0));
        } else if (s > 3) {
          (o(r), --s);
          for (; s > 6; s -= 6) o(8304);
          if (s > 2) (o(((s - 3) << 5) | 8208), (s = 0));
        }
        while (s--) o(r);
        ((s = 1), (r = e[l]));
      }
    return { c: n.subarray(0, i), n: t };
  },
  rn = function (e, t) {
    var n = 0;
    for (var i = 0; i < t.length; ++i) n += e[i] * t[i];
    return n;
  },
  Fi = function (e, t, n) {
    var i = n.length,
      r = $i(t + 2);
    ((e[r] = i & 255), (e[r + 1] = i >> 8), (e[r + 2] = e[r] ^ 255), (e[r + 3] = e[r + 1] ^ 255));
    for (var s = 0; s < i; ++s) e[r + s + 4] = n[s];
    return (r + 4 + i) * 8;
  },
  Mi = function (e, t, n, i, r, s, o, l, u, p, w) {
    (nt(t, w++, n), ++r[256]);
    var f = Pr(r, 15),
      { t: h, l: m } = f,
      b = Pr(s, 15),
      { t: C, l: g } = b,
      k = _i(h),
      { c: a, n: d } = k,
      c = _i(C),
      { c: y, n: v } = c,
      E = new _e(19);
    for (var S = 0; S < a.length; ++S) ++E[a[S] & 31];
    for (var S = 0; S < y.length; ++S) ++E[y[S] & 31];
    var x = Pr(E, 7),
      { t: I, l: U } = x,
      B = 19;
    for (; B > 4 && !I[Ti[B - 1]]; --B);
    var K = (p + 5) << 3,
      J = rn(r, Et) + rn(s, Mn) + o,
      H = rn(r, h) + rn(s, C) + o + 14 + 3 * B + rn(E, I) + 2 * E[16] + 3 * E[17] + 7 * E[18];
    if (u >= 0 && K <= J && K <= H) return Fi(t, w, e.subarray(u, u + p));
    var O, V, fe, Je;
    if ((nt(t, w, 1 + (H < J)), (w += 2), H < J)) {
      ((O = sn(h, m, 0)), (V = h), (fe = sn(C, g, 0)), (Je = C));
      var hr = sn(I, U, 0);
      (nt(t, w, d - 257), nt(t, w + 5, v - 1), nt(t, w + 10, B - 4), (w += 14));
      for (var S = 0; S < B; ++S) nt(t, w + 3 * S, I[Ti[S]]);
      w += 3 * B;
      var Ve = [a, y];
      for (var Qt = 0; Qt < 2; ++Qt) {
        var Rt = Ve[Qt];
        for (var S = 0; S < Rt.length; ++S) {
          var Ze = Rt[S] & 31;
          if ((nt(t, w, hr[Ze]), (w += I[Ze]), Ze > 15)) (nt(t, w, (Rt[S] >> 5) & 127), (w += Rt[S] >> 12));
        }
      }
    } else ((O = Go), (V = Et), (fe = Yo), (Je = Mn));
    for (var S = 0; S < l; ++S) {
      var be = i[S];
      if (be > 255) {
        var Ze = (be >> 18) & 31;
        if ((nn(t, w, O[Ze + 257]), (w += V[Ze + 257]), Ze > 7)) (nt(t, w, (be >> 23) & 31), (w += Mr[Ze]));
        var _t = be & 31;
        if ((nn(t, w, fe[_t]), (w += Je[_t]), _t > 3)) (nn(t, w, (be >> 5) & 8191), (w += zr[_t]));
      } else (nn(t, w, O[be]), (w += V[be]));
    }
    return (nn(t, w, O[256]), w + V[256]);
  },
  Zo,
  Ui,
  Ko = function (e, t, n, i, r, s) {
    var o = s.z || e.length,
      l = new ke(i + o + 5 * (1 + Math.ceil(o / 7000)) + r),
      u = l.subarray(i, l.length - r),
      p = s.l,
      w = (s.r || 0) & 7;
    if (t) {
      if (w) u[0] = s.r >> 3;
      var f = Zo[t - 1],
        h = f >> 13,
        m = f & 8191,
        b = (1 << n) - 1,
        C = s.p || new _e(32768),
        g = s.h || new _e(b + 1),
        k = Math.ceil(n / 3),
        a = 2 * k,
        d = function (gr) {
          return (e[gr] ^ (e[gr + 1] << k) ^ (e[gr + 2] << a)) & b;
        },
        c = new _r(25000),
        y = new _e(288),
        v = new _e(32),
        E = 0,
        S = 0,
        x = s.i || 0,
        I = 0,
        U = s.w || 0,
        B = 0;
      for (; x + 2 < o; ++x) {
        var K = d(x),
          J = x & 32767,
          H = g[K];
        if (((C[J] = H), (g[K] = J), U <= x)) {
          var O = o - x;
          if ((E > 7000 || I > 24576) && (O > 423 || !p)) {
            ((w = Mi(e, u, 0, c, y, v, S, I, B, x - B, w)), (I = E = S = 0), (B = x));
            for (var V = 0; V < 286; ++V) y[V] = 0;
            for (var V = 0; V < 30; ++V) v[V] = 0;
          }
          var fe = 2,
            Je = 0,
            hr = m,
            Ve = (J - H) & 32767;
          if (O > 2 && K == d(x - Ve)) {
            var Qt = Math.min(h, O) - 1,
              Rt = Math.min(32767, x),
              Ze = Math.min(258, O);
            while (Ve <= Rt && --hr && J != H) {
              if (e[x + fe] == e[x + fe - Ve]) {
                var be = 0;
                for (; be < Ze && e[x + be] == e[x + be - Ve]; ++be);
                if (be > fe) {
                  if (((fe = be), (Je = Ve), be > Qt)) break;
                  var _t = Math.min(Ve, be - 2),
                    di = 0;
                  for (var V = 0; V < _t; ++V) {
                    var mr = (x - Ve + V) & 32767,
                      Mo = C[mr],
                      li = (mr - Mo) & 32767;
                    if (li > di) ((di = li), (H = mr));
                  }
                }
              }
              ((J = H), (H = C[J]), (Ve += (J - H) & 32767));
            }
          }
          if (Je) {
            c[I++] = 268435456 | (jr[fe] << 18) | Ri[Je];
            var ui = jr[fe] & 31,
              fi = Ri[Je] & 31;
            ((S += Mr[ui] + zr[fi]), ++y[257 + ui], ++v[fi], (U = x + fe), ++E);
          } else ((c[I++] = e[x]), ++y[e[x]]);
        }
      }
      for (x = Math.max(x, U); x < o; ++x) ((c[I++] = e[x]), ++y[e[x]]);
      if (((w = Mi(e, u, p, c, y, v, S, I, B, x - B, w)), !p))
        ((s.r = (w & 7) | (u[(w / 8) | 0] << 3)), (w -= 7), (s.h = g), (s.p = C), (s.i = x), (s.w = U));
    } else {
      for (var x = s.w || 0; x < o + p; x += 65535) {
        var wr = x + 65535;
        if (wr >= o) ((u[(w / 8) | 0] = p), (wr = o));
        w = Fi(u, w + 1, e.subarray(x, wr));
      }
      s.i = o;
    }
    return Bi(l, 0, i + $i(w) + r);
  },
  Qo,
  Xo = function () {
    var e = -1;
    return {
      p: function (t) {
        var n = e;
        for (var i = 0; i < t.length; ++i) n = Qo[(n & 255) ^ t[i]] ^ (n >>> 8);
        e = n;
      },
      d: function () {
        return ~e;
      },
    };
  },
  ea = function (e, t, n, i, r) {
    if (!r) {
      if (((r = { l: 1 }), t.dictionary)) {
        var s = t.dictionary.subarray(-32768),
          o = new ke(s.length + e.length);
        (o.set(s), o.set(e, s.length), (e = o), (r.w = s.length));
      }
    }
    return Ko(
      e,
      t.level == null ? 6 : t.level,
      t.mem == null
        ? r.l
          ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5)
          : 20
        : 12 + t.mem,
      n,
      i,
      r,
    );
  },
  Ji = function (e, t) {
    var n = {};
    for (var i in e) n[i] = e[i];
    for (var i in t) n[i] = t[i];
    return n;
  },
  ye = function (e, t, n) {
    for (; n; ++t) ((e[t] = n), (n >>>= 8));
  },
  Wi = function (e, t, n, i) {
    for (var r in e) {
      var s = e[r],
        o = t + r,
        l = i;
      if (Array.isArray(s)) ((l = Ji(i, s[1])), (s = s[0]));
      if (ArrayBuffer.isView(s)) n[o] = [s, l];
      else ((n[(o += "/")] = [new ke(0), l]), Wi(s, o, n, i));
    }
  },
  zi,
  na,
  ra = 0,
  Rr = function (e) {
    var t = 0;
    if (e)
      for (var n in e) {
        var i = e[n].length;
        if (i > 65535) zn(9);
        t += i + 4;
      }
    return t;
  },
  Oi = function (e, t, n, i, r, s, o, l) {
    var u = i.length,
      p = n.extra,
      w = l && l.length,
      f = Rr(p);
    if ((ye(e, t, o != null ? 33639248 : 67324752), (t += 4), o != null)) ((e[t++] = 20), (e[t++] = n.os));
    ((e[t] = 20),
      (t += 2),
      (e[t++] = (n.flag << 1) | (s < 0 && 8)),
      (e[t++] = r && 8),
      (e[t++] = n.compression & 255),
      (e[t++] = n.compression >> 8));
    var h = new Date(n.mtime == null ? Date.now() : n.mtime),
      m = h.getFullYear() - 1980;
    if (m < 0 || m > 119) zn(10);
    if (
      (ye(
        e,
        t,
        (m << 25) |
          ((h.getMonth() + 1) << 21) |
          (h.getDate() << 16) |
          (h.getHours() << 11) |
          (h.getMinutes() << 5) |
          (h.getSeconds() >> 1),
      ),
      (t += 4),
      s != -1)
    )
      (ye(e, t, n.crc), ye(e, t + 4, s < 0 ? -s - 2 : s), ye(e, t + 8, n.size));
    if ((ye(e, t + 12, u), ye(e, t + 14, f), (t += 16), o != null))
      (ye(e, t, w), ye(e, t + 6, n.attrs), ye(e, t + 10, o), (t += 14));
    if ((e.set(i, t), (t += u), f))
      for (var b in p) {
        var C = p[b],
          g = C.length;
        (ye(e, t, +b), ye(e, t + 2, g), e.set(C, t + 4), (t += 4 + g));
      }
    if (w) (e.set(l, t), (t += w));
    return t;
  },
  ia = function (e, t, n, i, r) {
    (ye(e, t, 101010256), ye(e, t + 8, n), ye(e, t + 10, n), ye(e, t + 12, i), ye(e, t + 16, r));
  };