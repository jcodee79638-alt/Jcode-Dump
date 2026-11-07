
var G_i = Ie(function (SLc, q_i) {
  var { dirname: Ora, relative: Ura, join: Nra, resolve: V_i, basename: Fra } = cr("path"),
    Bra = o1t(),
    Rra = a_r(),
    Wra = async ({ path: e, pkg: t, top: r, force: s }) => {
      let a = Rra({ path: e, top: r });
      if (!a || !Array.isArray(t?.man) || !t.man.length) return [];
      let H = [];
      for (let u of new Set(t.man)) {
        if (!u || typeof u !== "string") continue;
        u = Nra("/", u).replace(/\\|:/g, "/").slice(1);
        let f = u.match(/\.([0-9]+)(\.gz)?$/);
        if (!f)
          throw Object.assign(
            Error(`invalid man entry name
Man files must end with a number, and optionally a .gz suffix if they are compressed.`),
            { code: "EBADMAN", path: e, pkgid: t._id, man: u },
          );
        let d = f[1],
          _ = Fra(u),
          L = V_i(e, u);
        if (L.indexOf(e) !== 0)
          throw Object.assign(Error("invalid man entry"), { code: "EBADMAN", path: e, pkgid: t._id, man: u });
        let I = V_i(a, "man" + d, _),
          D = Ura(Ora(I), L);
        H.push(Bra({ from: D, to: I, path: e, absFrom: L, force: s }));
      }
      return Promise.all(H);
    };
  q_i.exports = Wra;
});