
var O5n = Ie(function (w5n) {
  Object.defineProperty(w5n, "__esModule", { value: !0 });
  w5n.validateAndNormalizeHeaders = void 0;
  var C5n = kf();
  function vPo(e) {
    let t = {};
    return (
      Object.entries(e ?? {}).forEach(([r, s]) => {
        if (typeof s < "u") t[r] = String(s);
        else C5n.diag.warn(`Header "${r}" has invalid value (${s}) and will be ignored`);
      }),
      t
    );
  }
  w5n.validateAndNormalizeHeaders = vPo;
});