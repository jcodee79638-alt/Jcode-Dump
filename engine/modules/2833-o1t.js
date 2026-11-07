
var o1t = Ie(function (DLc, O_i) {
  var { resolve: _ra, dirname: P_i, sep: hra } = cr("path"),
    { lstat: C_i, mkdir: Lra, readlink: $ra, rm: n_r, symlink: w_i } = cr("fs/promises"),
    { log: gra } = mg(),
    k_i = (e) => {
      if (e.code === "ENOENT") return;
      if (e.code === "EACCES") {
        gra.warn("error adding file", e.message);
        return;
      }
      throw e;
    },
    i_r = { recursive: !0, force: !0 },
    s1t = new Set(),
    s_r = Symbol("skip - missing or already installed"),
    o_r = Symbol("clobber - ours or in forceful mode"),
    Era = async ({ path: e, to: t, from: r, absFrom: s, force: a }) => {
      if (s1t.has(t)) return !1;
      return (
        s1t.add(t),
        Promise.all([C_i(s).catch(k_i), C_i(t).catch(k_i)])
          .then(([H, u]) => {
            if (!H) return s_r;
            if (u) {
              if (!u.isSymbolicLink()) return a && n_r(t, i_r).then(() => o_r);
              return $ra(t).then((f) => {
                if (f === r) return s_r;
                if (((f = _ra(P_i(t), f)), f === e || f.startsWith(e + hra) || a))
                  return n_r(t, i_r).then(() => o_r);
                return !1;
              });
            } else return Lra(P_i(t), { recursive: !0 });
          })
          .then((H) => {
            if (H === s_r) return !1;
            return w_i(r, t, "file")
              .catch((u) => {
                if (H === o_r || a) return n_r(t, i_r).then(() => w_i(r, t, "file"));
                throw u;
              })
              .then(() => !0);
          })
      );
    },
    Ira = () => {
      for (let e of s1t) s1t.delete(e);
    };
  O_i.exports = Object.assign(Era, { resetSeen: Ira });
});