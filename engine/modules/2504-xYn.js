
var xYn = Ie(function (Suc, MYn) {
  var yOo = ({ visit: e, filter: t = () => !0, getChildren: r, tree: s }) => {
      let a = [],
        H = new Map(),
        u = () => {
          while (a.length) {
            let L = a.shift(),
              I = f(L);
            if (dur(I)) return I.then(() => u());
          }
          return H.get(s);
        },
        f = (L) => {
          if (H.has(L)) return H.get(L);
          H.set(L, null);
          let I = e ? e(L) : L;
          if (dur(I)) {
            let D = I.then((S) => (H.set(L, S), d(L)));
            return (H.set(L, D), D);
          } else return (H.set(L, I), d(L));
        },
        d = (L) => {
          let I = r(L, H.get(L));
          return dur(I) ? I.then(_) : _(I);
        },
        _ = (L) => {
          ((L = (L || []).filter(t)), a.push(...L));
        };
      return (a.push(s), u());
    },
    dur = (e) => e && typeof e.then === "function";
  MYn.exports = yOo;
});