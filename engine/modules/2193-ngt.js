
var ngt = Ie(function (I6n) {
  Object.defineProperty(I6n, "__esModule", { value: !0 });
  I6n.wrapSpanContext = I6n.isSpanContextValid = I6n.isValidSpanId = I6n.isValidTraceId = void 0;
  var rgt = egt(),
    $6n = tgt(),
    Tho = /^([0-9a-f]{32})$/i,
    vho = /^[0-9a-f]{16}$/i;
  function g6n(e) {
    return Tho.test(e) && e !== rgt.INVALID_TRACEID;
  }
  I6n.isValidTraceId = g6n;
  function E6n(e) {
    return vho.test(e) && e !== rgt.INVALID_SPANID;
  }
  I6n.isValidSpanId = E6n;
  function bho(e) {
    return g6n(e.traceId) && E6n(e.spanId);
  }
  I6n.isSpanContextValid = bho;
  function jho(e) {
    return new $6n.NonRecordingSpan(e);
  }
  I6n.wrapSpanContext = jho;
});