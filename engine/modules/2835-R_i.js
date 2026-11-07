
var R_i = Ie(function (MLc, B_i) {
  var xra = vve(),
    Sra = e1t(),
    { dirname: Tra, resolve: F_i, relative: vra } = cr("path"),
    bra = xra ? r_r() : N_i(),
    jra = gSe(),
    Pra = ({ path: e, pkg: t, top: r, force: s }) => {
      if (((t = jra(t)), !t.bin)) return Promise.resolve([]);
      let a = [],
        H = Sra({ path: e, top: r });
      for (let [u, f] of Object.entries(t.bin)) {
        let d = F_i(H, u),
          _ = F_i(e, f),
          L = vra(Tra(d), _);
        a.push(bra({ path: e, from: L, to: d, absFrom: _, force: s }));
      }
      return Promise.all(a);
    };
  B_i.exports = Pra;
});