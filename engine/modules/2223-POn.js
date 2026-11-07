
var POn = Ie(function (bOn) {
  Object.defineProperty(bOn, "__esModule", { value: !0 });
  bOn.W3CBaggagePropagator = void 0;
  var eSe = kf(),
    TOn = JVe(),
    c5 = tcr(),
    loe = ncr();
  class vOn {
    inject(e, t, r) {
      let s = eSe.propagation.getBaggage(e);
      if (!s || TOn.isTracingSuppressed(e)) return;
      let a = loe
          .getKeyPairs(s)
          .filter((u) => u.length <= c5.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS)
          .slice(0, c5.BAGGAGE_MAX_NAME_VALUE_PAIRS),
        H = loe.serializeKeyPairs(a);
      if (H.length > 0) r.set(t, c5.BAGGAGE_HEADER, H);
    }
    extract(e, t, r) {
      let s = r.get(t, c5.BAGGAGE_HEADER);
      if (!s) return e;
      let a = {},
        H = 0,
        u = 0;
      if (Array.isArray(s))
        for (let f = 0; f < s.length; f++) [H, u] = loe.parseBaggageHeaderString(s[f], a, H, u);
      else [H] = loe.parseBaggageHeaderString(s, a, H, u);
      if (H === 0) return e;
      return eSe.propagation.setBaggage(e, eSe.propagation.createBaggage(a));
    }
    fields() {
      return [c5.BAGGAGE_HEADER];
    }
  }
  bOn.W3CBaggagePropagator = vOn;
});