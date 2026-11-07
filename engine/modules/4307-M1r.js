
var M1r = Ie(function (cNi) {
  Object.defineProperty(cNi, "__esModule", { value: !0 });
  cNi.getRules = cNi.isJSONType = void 0;
  var eka = ["string", "number", "integer", "boolean", "null", "object", "array"],
    tka = new Set(eka);
  function rka(e) {
    return typeof e == "string" && tka.has(e);
  }
  cNi.isJSONType = rka;
  function nka() {
    let e = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] },
    };
    return {
      types: { ...e, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
      post: { rules: [] },
      all: {},
      keywords: {},
    };
  }
  cNi.getRules = nka;
});