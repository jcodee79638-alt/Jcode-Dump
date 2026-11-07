
var ymr = Ie(function (sLc, Kmi) {
  var { lstat: Yea, readlink: Zea } = cr("fs/promises"),
    { resolve: uqe, basename: eta, dirname: tta } = cr("path"),
    Yyt = (e, t, r, s) => {
      if (s > 2000) throw Jmi(e);
      if (((e = uqe(e)), t.has(e))) return Promise.resolve(t.get(e));
      let a = tta(e),
        H = eta(e);
      if (H && t.has(a)) return nta(a, H, t, r, s);
      if (!H) return (t.set(a, a), Promise.resolve(a));
      return Yyt(a, t, r, s + 1).then(() => Yyt(e, t, r, s + 1));
    },
    rta = (e, t) => {
      if (t.has(e)) return Promise.resolve(t.get(e));
      let r = Yea(e).then((s) => (t.set(e, s), s));
      return (t.set(e, r), r);
    },
    Jmi = (e) =>
      Object.assign(Error(`ELOOP: too many symbolic links encountered, stat '${e}'`), {
        errno: -62,
        syscall: "stat",
        code: "ELOOP",
        path: e,
      }),
    nta = (e, t, r, s, a) => {
      let H = r.get(e);
      if (typeof H > "u") throw Error("in realpathChild without parent being in realpath cache");
      let u = uqe(H, t);
      return rta(u, s).then((f) => {
        if (!f.isSymbolicLink()) return (r.set(uqe(e, t), u), u);
        return Zea(u)
          .then((d) => {
            let _ = uqe(H, d);
            if (u === _) throw Jmi(u);
            return Yyt(_, r, s, a + 1);
          })
          .then((d) => (r.set(uqe(e, t), d), d));
      });
    };
  Kmi.exports = Yyt;
});