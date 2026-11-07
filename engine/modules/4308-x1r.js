
var x1r = Ie(function (fNi) {
  Object.defineProperty(fNi, "__esModule", { value: !0 });
  fNi.shouldUseRule = fNi.shouldUseGroup = fNi.schemaHasRulesForType = void 0;
  function ska({ schema: e, self: t }, r) {
    let s = t.RULES.types[r];
    return s && s !== !0 && uNi(e, s);
  }
  fNi.schemaHasRulesForType = ska;
  function uNi(e, t) {
    return t.rules.some((r) => lNi(e, r));
  }
  fNi.shouldUseGroup = uNi;
  function lNi(e, t) {
    var r;
    return (
      e[t.keyword] !== void 0 ||
      ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((s) => e[s] !== void 0))
    );
  }
  fNi.shouldUseRule = lNi;
});