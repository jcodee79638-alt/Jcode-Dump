
var kf = Ie(function (KL) {
  Object.defineProperty(KL, "__esModule", { value: !0 });
  KL.trace =
    KL.propagation =
    KL.metrics =
    KL.diag =
    KL.context =
    KL.INVALID_SPAN_CONTEXT =
    KL.INVALID_TRACEID =
    KL.INVALID_SPANID =
    KL.isValidSpanId =
    KL.isValidTraceId =
    KL.isSpanContextValid =
    KL.createTraceState =
    KL.TraceFlags =
    KL.SpanStatusCode =
    KL.SpanKind =
    KL.SamplingDecision =
    KL.ProxyTracerProvider =
    KL.ProxyTracer =
    KL.defaultTextMapSetter =
    KL.defaultTextMapGetter =
    KL.ValueType =
    KL.createNoopMeter =
    KL.DiagLogLevel =
    KL.DiagConsoleLogger =
    KL.ROOT_CONTEXT =
    KL.createContextKey =
    KL.baggageEntryMetadataFromString =
      void 0;
  var oLo = fHr();
  Object.defineProperty(KL, "baggageEntryMetadataFromString", {
    enumerable: !0,
    get: function () {
      return oLo.baggageEntryMetadataFromString;
    },
  });
  var tOn = qVe();
  Object.defineProperty(KL, "createContextKey", {
    enumerable: !0,
    get: function () {
      return tOn.createContextKey;
    },
  });
  Object.defineProperty(KL, "ROOT_CONTEXT", {
    enumerable: !0,
    get: function () {
      return tOn.ROOT_CONTEXT;
    },
  });
  var aLo = wkn();
  Object.defineProperty(KL, "DiagConsoleLogger", {
    enumerable: !0,
    get: function () {
      return aLo.DiagConsoleLogger;
    },
  });
  var HLo = z$t();
  Object.defineProperty(KL, "DiagLogLevel", {
    enumerable: !0,
    get: function () {
      return HLo.DiagLogLevel;
    },
  });
  var cLo = IHr();
  Object.defineProperty(KL, "createNoopMeter", {
    enumerable: !0,
    get: function () {
      return cLo.createNoopMeter;
    },
  });
  var ALo = Xkn();
  Object.defineProperty(KL, "ValueType", {
    enumerable: !0,
    get: function () {
      return ALo.ValueType;
    },
  });
  var rOn = yHr();
  Object.defineProperty(KL, "defaultTextMapGetter", {
    enumerable: !0,
    get: function () {
      return rOn.defaultTextMapGetter;
    },
  });
  Object.defineProperty(KL, "defaultTextMapSetter", {
    enumerable: !0,
    get: function () {
      return rOn.defaultTextMapSetter;
    },
  });
  var uLo = wHr();
  Object.defineProperty(KL, "ProxyTracer", {
    enumerable: !0,
    get: function () {
      return uLo.ProxyTracer;
    },
  });
  var lLo = kHr();
  Object.defineProperty(KL, "ProxyTracerProvider", {
    enumerable: !0,
    get: function () {
      return lLo.ProxyTracerProvider;
    },
  });
  var fLo = q6n();
  Object.defineProperty(KL, "SamplingDecision", {
    enumerable: !0,
    get: function () {
      return fLo.SamplingDecision;
    },
  });
  var pLo = X6n();
  Object.defineProperty(KL, "SpanKind", {
    enumerable: !0,
    get: function () {
      return pLo.SpanKind;
    },
  });
  var dLo = K6n();
  Object.defineProperty(KL, "SpanStatusCode", {
    enumerable: !0,
    get: function () {
      return dLo.SpanStatusCode;
    },
  });
  var mLo = THr();
  Object.defineProperty(KL, "TraceFlags", {
    enumerable: !0,
    get: function () {
      return mLo.TraceFlags;
    },
  });
  var _Lo = H8n();
  Object.defineProperty(KL, "createTraceState", {
    enumerable: !0,
    get: function () {
      return _Lo.createTraceState;
    },
  });
  var zHr = ngt();
  Object.defineProperty(KL, "isSpanContextValid", {
    enumerable: !0,
    get: function () {
      return zHr.isSpanContextValid;
    },
  });
  Object.defineProperty(KL, "isValidTraceId", {
    enumerable: !0,
    get: function () {
      return zHr.isValidTraceId;
    },
  });
  Object.defineProperty(KL, "isValidSpanId", {
    enumerable: !0,
    get: function () {
      return zHr.isValidSpanId;
    },
  });
  var QHr = egt();
  Object.defineProperty(KL, "INVALID_SPANID", {
    enumerable: !0,
    get: function () {
      return QHr.INVALID_SPANID;
    },
  });
  Object.defineProperty(KL, "INVALID_TRACEID", {
    enumerable: !0,
    get: function () {
      return QHr.INVALID_TRACEID;
    },
  });
  Object.defineProperty(KL, "INVALID_SPAN_CONTEXT", {
    enumerable: !0,
    get: function () {
      return QHr.INVALID_SPAN_CONTEXT;
    },
  });
  var lgt = l8n();
  Object.defineProperty(KL, "context", {
    enumerable: !0,
    get: function () {
      return lgt.context;
    },
  });
  var fgt = m8n();
  Object.defineProperty(KL, "diag", {
    enumerable: !0,
    get: function () {
      return fgt.diag;
    },
  });
  var pgt = S8n();
  Object.defineProperty(KL, "metrics", {
    enumerable: !0,
    get: function () {
      return pgt.metrics;
    },
  });
  var dgt = X8n();
  Object.defineProperty(KL, "propagation", {
    enumerable: !0,
    get: function () {
      return dgt.propagation;
    },
  });
  var mgt = eOn();
  Object.defineProperty(KL, "trace", {
    enumerable: !0,
    get: function () {
      return mgt.trace;
    },
  });
  KL.default = {
    context: lgt.context,
    diag: fgt.diag,
    metrics: pgt.metrics,
    propagation: dgt.propagation,
    trace: mgt.trace,
  };
});