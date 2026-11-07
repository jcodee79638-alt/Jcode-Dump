
var H_r = Ie(function (jLc, shi) {
  var ona = R_i(),
    ana = G_i(),
    Hna = (e) => {
      let { path: t, pkg: r, force: s, global: a, top: H } = e;
      if (H && !a) return Promise.resolve();
      return Promise.all([
        ona({ path: t, pkg: r, top: H, force: s || !H }),
        ana({ path: t, pkg: r, top: H, force: s }),
      ]);
    },
    nhi = r_r(),
    ihi = o1t(),
    cna = () => {
      (nhi.resetSeen(), ihi.resetSeen());
    },
    Ana = Y_i(),
    una = rhi();
  shi.exports = Object.assign(Hna, { checkBins: Ana, resetSeen: cna, getPaths: una });
});