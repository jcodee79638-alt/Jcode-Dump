
var YHi = Ie(function (zHi) {
  Object.defineProperty(zHi, "__esModule", { value: !0 });
  zHi.envelopeToJSON = zHi.envelopeFromJSON = zHi.bundleToJSON = zHi.bundleFromJSON = void 0;
  var iae = _Z(),
    yDt = IDt(),
    TTe = idr(),
    O5o = (e) => {
      let t = iae.Bundle.fromJSON(e);
      switch (t.mediaType) {
        case yDt.BUNDLE_V01_MEDIA_TYPE:
          TTe.assertBundleV01(t);
          break;
        case yDt.BUNDLE_V02_MEDIA_TYPE:
          TTe.assertBundleV02(t);
          break;
        default:
          TTe.assertBundleLatest(t);
          break;
      }
      return t;
    };
  zHi.bundleFromJSON = O5o;
  var U5o = (e) => iae.Bundle.toJSON(e);
  zHi.bundleToJSON = U5o;
  var N5o = (e) => iae.Envelope.fromJSON(e);
  zHi.envelopeFromJSON = N5o;
  var F5o = (e) => iae.Envelope.toJSON(e);
  zHi.envelopeToJSON = F5o;
});