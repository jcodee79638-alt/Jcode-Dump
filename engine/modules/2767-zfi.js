
var zfi = Ie(function (Kfi) {
  Object.defineProperty(Kfi, "__esModule", { value: !0 });
  Kfi.join = SQo;
  var Jfi = cr("url");
  function SQo(e, t) {
    return new Jfi.URL(TQo(e) + vQo(t)).toString();
  }
  function TQo(e) {
    return e.endsWith("/") ? e : e + "/";
  }
  function vQo(e) {
    return e.startsWith("/") ? e.slice(1) : e;
  }
});