
var Kli = Ie(function (Jli) {
  Object.defineProperty(Jli, "__esModule", { value: !0 });
  Jli.encodeOIDString = mzo;
  var dzo = 6;
  function mzo(e) {
    let t = e.split("."),
      r = parseInt(t[0], 10) * 40 + parseInt(t[1], 10),
      s = [];
    t.slice(2).forEach((H) => {
      let u = _zo(parseInt(H, 10));
      s.push(...u);
    });
    let a = Buffer.from([r, ...s]);
    return Buffer.from([dzo, a.length, ...a]);
  }
  function _zo(e) {
    let t = [],
      r = 0;
    while (e > 0) (t.unshift((e & 127) | r), (e >>= 7), (r = 128));
    return t;
  }
});