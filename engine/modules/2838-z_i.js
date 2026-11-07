
var z_i = Ie(function (TLc, K_i) {
  var Vra = vve(),
    qra = e1t(),
    { resolve: a1t, dirname: X_i, sep: J_i } = cr("path"),
    Gra = Gmr(),
    { readlink: Xra } = cr("fs/promises"),
    Jra = async ({ bin: e, path: t, top: r, global: s, force: a }) => {
      if (a || !s || !r) return;
      let H = a1t(qra({ path: t, top: r }), e);
      return ((t = a1t(t)), Vra ? Yra({ target: H, path: t }) : zra({ target: H, path: t }));
    },
    Kra = async ({ er: e, target: t }) => (e.code === "ENOENT" ? null : H1t({ target: t })),
    zra = async ({ target: e, path: t }) => {
      let r = await Xra(e).catch((u) => Kra({ er: u, target: e }));
      if (!r) return;
      let a = a1t(X_i(e), r).toLowerCase(),
        H = t.toLowerCase();
      if (a !== H && !a.startsWith(H + J_i)) return H1t({ target: e });
    },
    Qra = ({ er: e, target: t }) => (e.code === "ENOENT" ? null : H1t({ target: t })),
    H1t = ({ target: e }) =>
      Promise.reject(Object.assign(Error("EEXIST: file already exists"), { path: e, code: "EEXIST" })),
    Yra = async ({ target: e, path: t }) => {
      let r = [e, e + ".cmd", e + ".ps1"];
      await Promise.all(
        r.map(async (s) => {
          let a = await Gra(s).catch((d) => Qra({ er: d, target: s }));
          if (!a) return;
          let u = a1t(X_i(s), a.replace(/\\/g, "/")).toLowerCase(),
            f = t.toLowerCase();
          if (u !== f && !u.startsWith(f + J_i)) return H1t({ target: s });
        }),
      );
    };
  K_i.exports = Jra;
});