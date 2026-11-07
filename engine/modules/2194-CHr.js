
var CHr = Ie(function (S6n) {
  Object.defineProperty(S6n, "__esModule", { value: !0 });
  S6n.NoopTracer = void 0;
  var y6n = XVe(),
    igt = jHr(),
    zxe = tgt(),
    M6n = ngt(),
    PHr = y6n.ContextAPI.getInstance();
  class x6n {
    startSpan(e, t, r = PHr.active()) {
      if (Boolean(t === null || t === void 0 ? void 0 : t.root)) return new zxe.NonRecordingSpan();
      let a = r && igt.getSpanContext(r);
      if (kho(a) && M6n.isSpanContextValid(a)) return new zxe.NonRecordingSpan(a);
      else return new zxe.NonRecordingSpan();
    }
    startActiveSpan(e, t, r, s) {
      let a, H, u;
      if (arguments.length < 2) return;
      else if (arguments.length === 2) u = t;
      else if (arguments.length === 3) ((a = t), (u = r));
      else ((a = t), (H = r), (u = s));
      let f = H !== null && H !== void 0 ? H : PHr.active(),
        d = this.startSpan(e, a, f),
        _ = igt.setSpan(f, d);
      return PHr.with(_, u, void 0, d);
    }
  }
  S6n.NoopTracer = x6n;
  function kho(e) {
    return (
      typeof e === "object" &&
      typeof e.spanId === "string" &&
      typeof e.traceId === "string" &&
      typeof e.traceFlags === "number"
    );
  }
});