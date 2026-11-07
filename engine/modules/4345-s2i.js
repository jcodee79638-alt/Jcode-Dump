
var s2i = Ie(function (i2i) {
  Object.defineProperty(i2i, "__esModule", { value: !0 });
  var n2i = Y1r(),
    bUa = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (e) => n2i.validateTuple(e, "items"),
    };
  i2i.default = bUa;
});