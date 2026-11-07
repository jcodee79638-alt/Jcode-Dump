
var tsi = Ie(function (hpc, esi) {
  var { URL: dWo, format: mWo } = cr("url"),
    _Wo = { auth: !1, fragment: !1, search: !0, unicode: !1 },
    hWo = (e) => {
      let t = new dWo(e.url);
      return `make-fetch-happen:request-cache:${mWo(t, _Wo)}`;
    };
  esi.exports = hWo;
});