
var OWn = Ie(function (wWn) {
  Object.defineProperty(wWn, "__esModule", { value: !0 });
  wWn.W3CTraceContextPropagator =
    wWn.parseTraceParent =
    wWn.TRACE_STATE_HEADER =
    wWn.TRACE_PARENT_HEADER =
      void 0;
  var hoe = kf(),
    bWn = JVe(),
    jWn = Acr();
  wWn.TRACE_PARENT_HEADER = "traceparent";
  wWn.TRACE_STATE_HEADER = "tracestate";
  var KTo = "00",
    zTo = "(?!ff)[\\da-f]{2}",
    QTo = "(?![0]{32})[\\da-f]{32}",
    YTo = "(?![0]{16})[\\da-f]{16}",
    ZTo = "[\\da-f]{2}",
    evo = new RegExp(`^\\s?(${zTo})-(${QTo})-(${YTo})-(${ZTo})(-.*)?\\s?$`);
  function PWn(e) {
    let t = evo.exec(e);
    if (!t) return null;
    if (t[1] === "00" && t[5]) return null;
    return { traceId: t[2], spanId: t[3], traceFlags: parseInt(t[4], 16) };
  }
  wWn.parseTraceParent = PWn;
  class CWn {
    inject(e, t, r) {
      let s = hoe.trace.getSpanContext(e);
      if (!s || bWn.isTracingSuppressed(e) || !hoe.isSpanContextValid(s)) return;
      let a = `${KTo}-${s.traceId}-${s.spanId}-0${Number(s.traceFlags || hoe.TraceFlags.NONE).toString(16)}`;
      if ((r.set(t, wWn.TRACE_PARENT_HEADER, a), s.traceState))
        r.set(t, wWn.TRACE_STATE_HEADER, s.traceState.serialize());
    }
    extract(e, t, r) {
      let s = r.get(t, wWn.TRACE_PARENT_HEADER);
      if (!s) return e;
      let a = Array.isArray(s) ? s[0] : s;
      if (typeof a !== "string") return e;
      let H = PWn(a);
      if (!H) return e;
      H.isRemote = !0;
      let u = r.get(t, wWn.TRACE_STATE_HEADER);
      if (u) {
        let f = Array.isArray(u) ? u.join(",") : u;
        H.traceState = new jWn.TraceState(typeof f === "string" ? f : void 0);
      }
      return hoe.trace.setSpanContext(e, H);
    }
    fields() {
      return [wWn.TRACE_PARENT_HEADER, wWn.TRACE_STATE_HEADER];
    }
  }
  wWn.W3CTraceContextPropagator = CWn;
});