
var Y_i = Ie(function (vLc, Q_i) {
  var Zra = z_i(),
    ena = gSe(),
    tna = async ({ pkg: e, path: t, top: r, global: s, force: a }) => {
      if (a || !s || !r) return;
      if (((e = ena(e)), !e.bin)) return;
      await Promise.all(Object.keys(e.bin).map((H) => Zra({ bin: H, path: t, top: r, global: s, force: a })));
    };
  Q_i.exports = tna;
});