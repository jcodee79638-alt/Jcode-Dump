
var fHr = Ie(function (Skn) {
  Object.defineProperty(Skn, "__esModule", { value: !0 });
  Skn.baggageEntryMetadataFromString = Skn.createBaggage = void 0;
  var ykn = bme(),
    Mkn = gkn(),
    xkn = Dkn(),
    Z_o = ykn.DiagAPI.instance();
  function eho(e = {}) {
    return new Mkn.BaggageImpl(new Map(Object.entries(e)));
  }
  Skn.createBaggage = eho;
  function tho(e) {
    if (typeof e !== "string")
      (Z_o.error(`Cannot create baggage metadata from unknown type: ${typeof e}`), (e = ""));
    return {
      __TYPE__: xkn.baggageEntryMetadataSymbol,
      toString() {
        return e;
      },
    };
  }
  Skn.baggageEntryMetadataFromString = tho;
});