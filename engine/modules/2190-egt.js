
var egt = Ie(function (o6n) {
  Object.defineProperty(o6n, "__esModule", { value: !0 });
  o6n.INVALID_SPAN_CONTEXT = o6n.INVALID_TRACEID = o6n.INVALID_SPANID = void 0;
  var s6n = THr();
  o6n.INVALID_SPANID = "0000000000000000";
  o6n.INVALID_TRACEID = "00000000000000000000000000000000";
  o6n.INVALID_SPAN_CONTEXT = {
    traceId: o6n.INVALID_TRACEID,
    spanId: o6n.INVALID_SPANID,
    traceFlags: s6n.TraceFlags.NONE,
  };
});