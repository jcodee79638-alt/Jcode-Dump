
var r_r = Ie(function (ILc, j_i) {
  var { resolve: T_i, dirname: ora, sep: ara } = cr("path"),
    { lstat: Hra } = cr("fs/promises"),
    cra = (e) => {
      if (e.code !== "ENOENT") throw e;
    },
    Ara = p_i(),
    ura = Gmr(),
    lra = t_r(),
    i1t = new Set(),
    b_i = ({ to: e, from: t }) =>
      Promise.reject(
        Object.assign(Error("EEXIST: file already exists"), { path: e, dest: t, code: "EEXIST" }),
      ),
    fra = ({ er: e, from: t, to: r }) =>
      e.code === "ENOENT" ? null : e.code === "ENOTASHIM" ? b_i({ from: t, to: r }) : Promise.reject(e),
    v_i = Symbol("skip - missing or already installed"),
    pra = ({ path: e, to: t, from: r, absFrom: s, force: a }) => {
      let H = [t, t + ".cmd", t + ".ps1"];
      for (let u of H) {
        if (i1t.has(u)) return !0;
        i1t.add(u);
      }
      return Promise.all([...H, s].map((u) => Hra(u).catch(cra)))
        .then((u) => {
          let [, , , f] = u;
          if (!f) return v_i;
          if (a) return !1;
          return Promise.all(
            H.map((d, _) => [d, u[_]]).map(([d, _]) => {
              if (!_) return !1;
              return ura(d).then(
                (L) => {
                  L = T_i(ora(t), L);
                  let I = T_i(e);
                  if (L !== I && !L.startsWith(I + ara)) return b_i({ from: r, to: t, path: e });
                  return !1;
                },
                (L) => fra({ er: L, from: r, to: t }),
              );
            }),
          );
        })
        .then((u) => u !== v_i && dra(s, t));
    },
    dra = (e, t) => Ara(e, t).then(() => lra(e)),
    mra = () => {
      for (let e of i1t) i1t.delete(e);
    };
  j_i.exports = Object.assign(pra, { resetSeen: mra });
});