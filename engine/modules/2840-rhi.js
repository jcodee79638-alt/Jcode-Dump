
var rhi = Ie(function (bLc, thi) {
  var rna = e1t(),
    nna = a_r(),
    { resolve: Z_i, basename: ehi, extname: ina } = cr("path"),
    sna = vve();
  thi.exports = ({ path: e, pkg: t, global: r, top: s }) => {
    if (s && !r) return [];
    let a = [],
      H = rna({ path: e, top: s });
    if (t.bin)
      for (let d of Object.keys(t.bin)) {
        let _ = Z_i(H, d);
        if ((a.push(_), sna)) (a.push(_ + ".cmd"), a.push(_ + ".ps1"));
      }
    let u = nna({ path: e, top: s }),
      f = [];
    if (u && t.man && Array.isArray(t.man) && t.man.length)
      for (let d of t.man) {
        if (!/.\.[0-9]+(\.gz)?$/.test(d)) return a;
        let _ = ina(ehi(d, ".gz")).slice(1),
          L = ehi(d);
        f.push(Z_i(u, "man" + _, L));
      }
    return f.length ? [...a, ...f] : a;
  };
});