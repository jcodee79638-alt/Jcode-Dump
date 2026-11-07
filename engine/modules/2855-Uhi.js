
var Uhi = Ie(function (Ohi) {
  Object.defineProperty(Ohi, "__esModule", { value: !0 });
  Ohi.MAX_NESTING_DEPTH = void 0;
  Ohi.default = Ona;
  Ohi.MAX_NESTING_DEPTH = 256;
  function Ona(e) {
    return Number.isSafeInteger(e) && e >= 0 ? e : Ohi.MAX_NESTING_DEPTH;
  }
});