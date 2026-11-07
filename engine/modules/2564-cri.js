
var cri = Ie(function (Lfc, Hri) {
  var uBo = Slr(),
    lBo = (e) => ({
      cwd: e._resolved,
      prefix: "package/",
      portable: !0,
      gzip: { level: 9 },
      filter: (t, r) => {
        if (uBo(e, t)) r.mode |= 73;
        return !0;
      },
      mtime: new Date("1985-10-26T08:15:00.000Z"),
    });
  Hri.exports = lBo;
});