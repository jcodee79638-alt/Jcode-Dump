
var Yzn = Ie(function (Qzn) {
  Object.defineProperty(Qzn, "__esModule", { value: !0 });
  Qzn.range = Qzn.balanced = void 0;
  var b6o = (e, t, r) => {
    let s = e instanceof RegExp ? zzn(e, r) : e,
      a = t instanceof RegExp ? zzn(t, r) : t,
      H = s !== null && a != null && Qzn.range(s, a, r);
    return (
      H && {
        start: H[0],
        end: H[1],
        pre: r.slice(0, H[0]),
        body: r.slice(H[0] + s.length, H[1]),
        post: r.slice(H[1] + a.length),
      }
    );
  };
  Qzn.balanced = b6o;
  var zzn = (e, t) => {
      let r = t.match(e);
      return r ? r[0] : null;
    },
    j6o = (e, t, r) => {
      let s,
        a,
        H,
        u = void 0,
        f,
        d = r.indexOf(e),
        _ = r.indexOf(t, d + 1),
        L = d;
      if (d >= 0 && _ > 0) {
        if (e === t) return [d, _];
        ((s = []), (H = r.length));
        while (L >= 0 && !f) {
          if (L === d) (s.push(L), (d = r.indexOf(e, L + 1)));
          else if (s.length === 1) {
            let I = s.pop();
            if (I !== void 0) f = [I, _];
          } else {
            if (((a = s.pop()), a !== void 0 && a < H)) ((H = a), (u = _));
            _ = r.indexOf(t, L + 1);
          }
          L = d < _ && d >= 0 ? d : _;
        }
        if (s.length && u !== void 0) f = [H, u];
      }
      return f;
    };
  Qzn.range = j6o;
});