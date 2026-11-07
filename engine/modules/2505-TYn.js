
var TYn = Ie(function (Tuc, SYn) {
  var MOo = ({ visit: e, filter: t, getChildren: r, tree: s }) => {
      let a = [],
        H = new Map(),
        u = () => {
          while (a.length) {
            let L = a.pop(),
              I = f(L);
            if (mur(I)) return I.then(() => u());
          }
          return H.get(s);
        },
        f = (L) => {
          if (H.has(L)) return H.get(L);
          H.set(L, null);
          let I = e ? e(L) : L;
          if (mur(I)) {
            let D = I.then((S) => (H.set(L, S), d(L)));
            return (H.set(L, D), D);
          } else return (H.set(L, I), d(L));
        },
        d = (L) => {
          let I = r(L, H.get(L));
          return mur(I) ? I.then(_) : _(I);
        },
        _ = (L) => {
          ((L = (L || []).filter(t)), a.push(...L));
        };
      return (a.push(s), u());
    },
    mur = (e) => e && typeof e.then === "function";
  SYn.exports = MOo;
});