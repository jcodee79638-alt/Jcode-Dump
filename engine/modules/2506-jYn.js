
var jYn = Ie(function (vuc, bYn) {
  var xOo = TYn(),
    vYn = ({ visit: e, leave: t, filter: r = () => !0, seen: s = new Map(), getChildren: a, tree: H }) => {
      if (!t) return xOo({ visit: e, filter: r, getChildren: a, tree: H });
      if (s.has(H)) return s.get(H);
      s.set(H, null);
      let u = () => {
          let L = e ? e(H) : H;
          if (_ur(L)) {
            let I = L.then((D) => (s.set(H, D), f()));
            return (s.set(H, I), I);
          } else return (s.set(H, L), f());
        },
        f = () => {
          let L = a(H, s.get(H));
          return _ur(L) ? L.then(d) : d(L);
        },
        d = (L) => {
          let I = (L || [])
            .filter(r)
            .map((D) => vYn({ visit: e, leave: t, filter: r, seen: s, getChildren: a, tree: D }));
          return I.some(_ur) ? Promise.all(I).then(_) : _(I);
        },
        _ = (L) => {
          let I = t(s.get(H), L);
          return (s.set(H, I), I);
        };
      return u();
    },
    _ur = (e) => e && typeof e.then === "function";
  bYn.exports = vYn;
});