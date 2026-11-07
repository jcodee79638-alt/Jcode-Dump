
var Ici = Ie(function (Eci) {
  Object.defineProperty(Eci, "__esModule", { value: !0 });
  Eci.preAuthEncoding = hXo;
  var _Xo = "DSSEv1";
  function hXo(e, t) {
    let r = Buffer.from(e, "utf-8");
    return Buffer.concat([
      Buffer.from(`${_Xo} ${r.length} `, "ascii"),
      r,
      Buffer.from(` ${t.length} `, "ascii"),
      t,
    ]);
  }
});