
var xci = Ie(function (Mci) {
  Object.defineProperty(Mci, "__esModule", { value: !0 });
  Mci.base64Encode = $Xo;
  Mci.base64Decode = gXo;
  var Dci = "base64",
    yci = "utf-8";
  function $Xo(e) {
    return Buffer.from(e, yci).toString(Dci);
  }
  function gXo(e) {
    return Buffer.from(e, Dci).toString(yci);
  }
});