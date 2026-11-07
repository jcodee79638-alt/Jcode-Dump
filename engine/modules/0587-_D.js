
function _D(e) {
  return (t) => {
    let r = {},
      s = {},
      a = (f) => (d) => f.includes(d[e]);
    return (H(t), Object.assign(t, { cases: r, isAnyOf: a, guards: s, match: u }));
    function H(f) {
      let d = f.ast;
      if (vpe(d) && "members" in f && globalThis.Array.isArray(f.members) && f.members.every(GW))
        return f.members.forEach(H);
      let _ = vBe(d);
      if (_.length > 0) {
        let L = _.find((I) => I.key === e)?.literal;
        if (RAt(L)) {
          ((r[L] = f), (s[L] = Jie(I1e(f))));
          return;
        }
      }
      throw new globalThis.Error("No literal or unique symbol found");
    }
    function u() {
      if (arguments.length === 1) {
        let _ = arguments[0];
        return function (L) {
          return _[L[e]](L);
        };
      }
      let f = arguments[0];
      return arguments[1][f[e]](f);
    }
  };
}