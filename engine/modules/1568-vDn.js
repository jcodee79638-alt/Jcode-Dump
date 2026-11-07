
var vDn = Ie(function (rWH, TDn) {
  var WMe = cr("fs"),
    LQs = SDn();
  function $Qs(e) {
    let r = Buffer.alloc(150),
      s;
    try {
      ((s = WMe.openSync(e, "r")), WMe.readSync(s, r, 0, 150, 0), WMe.closeSync(s));
    } catch (a) {}
    return LQs(r.toString());
  }
  TDn.exports = $Qs;
});