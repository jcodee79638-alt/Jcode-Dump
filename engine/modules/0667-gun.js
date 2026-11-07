
var gun = (e) =>
    BU({
      b3: `${e.traceId}-${e.spanId}-${e.sampled ? "1" : "0"}${xv(e.parent, { onNone: () => "", onSome: (t) => `-${t.spanId}` })}`,
      traceparent: `00-${e.traceId}-${e.spanId}-${e.sampled ? "01" : "00"}`,
    }),
  Eun = (e) => {
    let t = oRs(e);
    if (Nu(t)) return t;
    if (((t = rRs(e)), Nu(t))) return t;
    return nRs(e);
  },
  rRs = (e) => {
    if (!("b3" in e)) return eH();
    let t = e.b3.split("-");
    if (t.length < 2) return eH();
    return Lo(_ye({ traceId: t[0], spanId: t[1], sampled: t[2] ? t[2] === "1" : !0 }));
  },
  nRs = (e) => {
    if (!e["x-b3-traceid"] || !e["x-b3-spanid"]) return eH();
    return Lo(
      _ye({
        traceId: e["x-b3-traceid"],
        spanId: e["x-b3-spanid"],
        sampled: e["x-b3-sampled"] ? e["x-b3-sampled"] === "1" : !0,
      }),
    );
  },
  iRs,
  sRs,
  oRs = (e) => {
    if (!e.traceparent) return eH();
    let t = e.traceparent.split("-");
    if (t.length !== 4) return eH();
    let [r, s, a, H] = t;
    switch (r) {
      case "00": {
        if (iRs.test(s) === !1 || sRs.test(a) === !1) return eH();
        return Lo(_ye({ traceId: s, spanId: a, sampled: (parseInt(H, 16) & 1) === 1 }));
      }
      default:
        return eH();
    }
  };