
var Uli = Ie(function (Oli) {
  Object.defineProperty(Oli, "__esModule", { value: !0 });
  Oli.isDefined = KKo;
  Oli.isObject = kli;
  Oli.isStringArray = zKo;
  Oli.isObjectArray = QKo;
  Oli.isStringRecord = YKo;
  Oli.isObjectRecord = ZKo;
  function KKo(e) {
    return e !== void 0;
  }
  function kli(e) {
    return typeof e === "object" && e !== null;
  }
  function zKo(e) {
    return Array.isArray(e) && e.every((t) => typeof t === "string");
  }
  function QKo(e) {
    return Array.isArray(e) && e.every(kli);
  }
  function YKo(e) {
    return (
      typeof e === "object" &&
      e !== null &&
      Object.keys(e).every((t) => typeof t === "string") &&
      Object.values(e).every((t) => typeof t === "string")
    );
  }
  function ZKo(e) {
    return (
      typeof e === "object" &&
      e !== null &&
      Object.keys(e).every((t) => typeof t === "string") &&
      Object.values(e).every((t) => typeof t === "object" && t !== null)
    );
  }
});