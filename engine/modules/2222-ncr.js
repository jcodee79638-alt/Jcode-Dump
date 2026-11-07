
var ncr = Ie(function (xOn) {
  Object.defineProperty(xOn, "__esModule", { value: !0 });
  xOn.parseKeyPairsIntoRecord =
    xOn.parseBaggageHeaderString =
    xOn.parsePairKeyValue =
    xOn.getKeyPairs =
    xOn.serializeKeyPairs =
      void 0;
  var MOn = kf(),
    v1 = tcr();
  function wLo(e) {
    return e.reduce((t, r) => {
      let s = `${t}${t !== "" ? v1.BAGGAGE_ITEMS_SEPARATOR : ""}${r}`;
      return s.length > v1.BAGGAGE_MAX_TOTAL_LENGTH ? t : s;
    }, "");
  }
  xOn.serializeKeyPairs = wLo;
  function kLo(e) {
    return e.getAllEntries().map(([t, r]) => {
      let s = `${encodeURIComponent(t)}=${encodeURIComponent(r.value)}`;
      if (r.metadata !== void 0) s += v1.BAGGAGE_PROPERTIES_SEPARATOR + r.metadata.toString();
      return s;
    });
  }
  xOn.getKeyPairs = kLo;
  function rcr(e) {
    if (!e) return;
    let t = e.indexOf(v1.BAGGAGE_PROPERTIES_SEPARATOR),
      r = t === -1 ? e : e.substring(0, t),
      s = r.indexOf(v1.BAGGAGE_KEY_PAIR_SEPARATOR);
    if (s <= 0) return;
    let a = r.substring(0, s).trim(),
      H = r.substring(s + 1).trim();
    if (!a || !H) return;
    let u, f;
    try {
      ((u = decodeURIComponent(a)), (f = decodeURIComponent(H)));
    } catch {
      return;
    }
    let d;
    if (t !== -1 && t < e.length - 1) {
      let _ = e.substring(t + 1);
      d = MOn.baggageEntryMetadataFromString(_);
    }
    return { key: u, value: f, metadata: d };
  }
  xOn.parsePairKeyValue = rcr;
  function OLo(e, t, r, s) {
    let a = 0;
    while (a < e.length && r < v1.BAGGAGE_MAX_NAME_VALUE_PAIRS) {
      let H = e.indexOf(v1.BAGGAGE_ITEMS_SEPARATOR, a),
        u = H === -1 ? e.length : H,
        f = u - a;
      if (f <= v1.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS) {
        let d = rcr(e.substring(a, u));
        if (d) {
          let _ = (r === 0 ? 0 : 1) + f;
          if (s + _ > v1.BAGGAGE_MAX_TOTAL_LENGTH) break;
          ((t[d.key] = d.metadata ? { value: d.value, metadata: d.metadata } : { value: d.value }),
            r++,
            (s += _));
        }
      }
      if (H === -1) break;
      a = H + 1;
    }
    return [r, s];
  }
  xOn.parseBaggageHeaderString = OLo;
  function ULo(e) {
    let t = {};
    if (typeof e === "string" && e.length > 0)
      e.split(v1.BAGGAGE_ITEMS_SEPARATOR).forEach((r) => {
        let s = rcr(r);
        if (s !== void 0 && s.value.length > 0) t[s.key] = s.value;
      });
    return t;
  }
  xOn.parseKeyPairsIntoRecord = ULo;
});