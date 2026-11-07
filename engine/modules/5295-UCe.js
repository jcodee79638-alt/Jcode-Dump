
var UCe = Ie(function (Eqi) {
  Object.defineProperty(Eqi, "__esModule", { value: !0 });
  Eqi.stringArray = Eqi.array = Eqi.func = Eqi.error = Eqi.number = Eqi.string = Eqi.boolean = void 0;
  function R4a(e) {
    return e === !0 || e === !1;
  }
  Eqi.boolean = R4a;
  function $qi(e) {
    return typeof e === "string" || e instanceof String;
  }
  Eqi.string = $qi;
  function W4a(e) {
    return typeof e === "number" || e instanceof Number;
  }
  Eqi.number = W4a;
  function V4a(e) {
    return e instanceof Error;
  }
  Eqi.error = V4a;
  function q4a(e) {
    return typeof e === "function";
  }
  Eqi.func = q4a;
  function gqi(e) {
    return Array.isArray(e);
  }
  Eqi.array = gqi;
  function G4a(e) {
    return gqi(e) && e.every((t) => $qi(t));
  }
  Eqi.stringArray = G4a;
});