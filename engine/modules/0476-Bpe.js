
var Bpe = ne(() => {
  YA();
  BH();
  KH();
  Dd();
  PW();
  rw = _i("effect/Path");
  ((t2s = /%/g), (r2s = /\\/g), (n2s = /\n/g), (i2s = /\r/g), (s2s = /\t/g));
  (($ft = rw.of({
    [WQ]: WQ,
    resolve: Ccn,
    normalize(e) {
      if (e.length === 0) return ".";
      let t = e.charCodeAt(0) === 47,
        r = e.charCodeAt(e.length - 1) === 47;
      if (((e = Pcn(e, !t)), e.length === 0 && !t)) e = ".";
      if (e.length > 0 && r) e += "/";
      if (t) return "/" + e;
      return e;
    },
    isAbsolute(e) {
      return e.length > 0 && e.charCodeAt(0) === 47;
    },
    join() {
      if (arguments.length === 0) return ".";
      let e;
      for (let t = 0; t < arguments.length; ++t) {
        let r = arguments[t];
        if (r.length > 0)
          if (e === void 0) e = r;
          else e += "/" + r;
      }
      if (e === void 0) return ".";
      return $ft.normalize(e);
    },
    relative(e, t) {
      if (e === t) return "";
      if (((e = $ft.resolve(e)), (t = $ft.resolve(t)), e === t)) return "";
      let r = 1;
      for (; r < e.length; ++r) if (e.charCodeAt(r) !== 47) break;
      let s = e.length,
        a = s - r,
        H = 1;
      for (; H < t.length; ++H) if (t.charCodeAt(H) !== 47) break;
      let f = t.length - H,
        d = a < f ? a : f,
        _ = -1,
        L = 0;
      for (; L <= d; ++L) {
        if (L === d) {
          if (f > d) {
            if (t.charCodeAt(H + L) === 47) return t.slice(H + L + 1);
            else if (L === 0) return t.slice(H + L);
          } else if (a > d) {
            if (e.charCodeAt(r + L) === 47) _ = L;
            else if (L === 0) _ = 0;
          }
          break;
        }
        let D = e.charCodeAt(r + L),
          S = t.charCodeAt(H + L);
        if (D !== S) break;
        else if (D === 47) _ = L;
      }
      let I = "";
      for (L = r + _ + 1; L <= s; ++L)
        if (L === s || e.charCodeAt(L) === 47)
          if (I.length === 0) I += "..";
          else I += "/..";
      if (I.length > 0) return I + t.slice(H + _);
      else {
        if (((H += _), t.charCodeAt(H) === 47)) ++H;
        return t.slice(H);
      }
    },
    dirname(e) {
      if (e.length === 0) return ".";
      let t = e.charCodeAt(0),
        r = t === 47,
        s = -1,
        a = !0;
      for (let H = e.length - 1; H >= 1; --H)
        if (((t = e.charCodeAt(H)), t === 47)) {
          if (!a) {
            s = H;
            break;
          }
        } else a = !1;
      if (s === -1) return r ? "/" : ".";
      if (r && s === 1) return "//";
      return e.slice(0, s);
    },
    basename(e, t) {
      let r = 0,
        s = -1,
        a = !0,
        H;
      if (t !== void 0 && t.length > 0 && t.length <= e.length) {
        if (t.length === e.length && t === e) return "";
        let u = t.length - 1,
          f = -1;
        for (H = e.length - 1; H >= 0; --H) {
          let d = e.charCodeAt(H);
          if (d === 47) {
            if (!a) {
              r = H + 1;
              break;
            }
          } else {
            if (f === -1) ((a = !1), (f = H + 1));
            if (u >= 0)
              if (d === t.charCodeAt(u)) {
                if (--u === -1) s = H;
              } else ((u = -1), (s = f));
          }
        }
        if (r === s) s = f;
        else if (s === -1) s = e.length;
        return e.slice(r, s);
      } else {
        for (H = e.length - 1; H >= 0; --H)
          if (e.charCodeAt(H) === 47) {
            if (!a) {
              r = H + 1;
              break;
            }
          } else if (s === -1) ((a = !1), (s = H + 1));
        if (s === -1) return "";
        return e.slice(r, s);
      }
    },
    extname(e) {
      let t = -1,
        r = 0,
        s = -1,
        a = !0,
        H = 0;
      for (let u = e.length - 1; u >= 0; --u) {
        let f = e.charCodeAt(u);
        if (f === 47) {
          if (!a) {
            r = u + 1;
            break;
          }
          continue;
        }
        if (s === -1) ((a = !1), (s = u + 1));
        if (f === 46) {
          if (t === -1) t = u;
          else if (H !== 1) H = 1;
        } else if (t !== -1) H = -1;
      }
      if (t === -1 || s === -1 || H === 0 || (H === 1 && t === s - 1 && t === r + 1)) return "";
      return e.slice(t, s);
    },
    format: function (t) {
      if (t === null || typeof t !== "object")
        throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t);
      return QFs("/", t);
    },
    parse(e) {
      let t = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0) return t;
      let r = e.charCodeAt(0),
        s = r === 47,
        a;
      if (s) ((t.root = "/"), (a = 1));
      else a = 0;
      let H = -1,
        u = 0,
        f = -1,
        d = !0,
        _ = e.length - 1,
        L = 0;
      for (; _ >= a; --_) {
        if (((r = e.charCodeAt(_)), r === 47)) {
          if (!d) {
            u = _ + 1;
            break;
          }
          continue;
        }
        if (f === -1) ((d = !1), (f = _ + 1));
        if (r === 46) {
          if (H === -1) H = _;
          else if (L !== 1) L = 1;
        } else if (H !== -1) L = -1;
      }
      if (H === -1 || f === -1 || L === 0 || (L === 1 && H === f - 1 && H === u + 1)) {
        if (f !== -1)
          if (u === 0 && s) t.base = t.name = e.slice(1, f);
          else t.base = t.name = e.slice(u, f);
      } else {
        if (u === 0 && s) ((t.name = e.slice(1, H)), (t.base = e.slice(1, f)));
        else ((t.name = e.slice(u, H)), (t.base = e.slice(u, f)));
        t.ext = e.slice(H, f);
      }
      if (u > 0) t.dir = e.slice(0, u - 1);
      else if (s) t.dir = "/";
      return t;
    },
    sep: "/",
    fromFileUrl: YFs,
    toFileUrl: e2s,
    toNamespacedPath: Za,
  })),
    (wcn = bf(rw)($ft)));
});