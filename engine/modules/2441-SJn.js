
var SJn = Ie(function (Rcc, xJn) {
  var { URL: MJn } = cr("url");
  xJn.exports = (e) => {
    let t = new MJn(e),
      r = `${t.protocol}//${t.host}${t.pathname}`,
      s = new MJn(".", r);
    return `//${s.host}${s.pathname}`;
  };
});