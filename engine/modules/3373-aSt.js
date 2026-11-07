
var aSt = Ie(function (oTi) {
  Object.defineProperty(oTi, "__esModule", { value: !0 });
  oTi.default = FEa;
  var iTi = /[A-Z]/g;
  function sTi(e) {
    return e.toLowerCase();
  }
  function FEa(e, t) {
    let r = e.replace(iTi, sTi),
      s = t.replace(iTi, sTi);
    return r === s;
  }
});