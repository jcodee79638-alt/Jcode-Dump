
var bD = Ie(function ($l) {
  Object.defineProperty($l, "__esModule", { value: !0 });
  $l.diagLogLevelFromString =
    $l.BindOnceFuture =
    $l.urlMatches =
    $l.isUrlIgnored =
    $l.callWithTimeout =
    $l.TimeoutError =
    $l.merge =
    $l.TraceState =
    $l.unsuppressTracing =
    $l.suppressTracing =
    $l.isTracingSuppressed =
    $l.setRPCMetadata =
    $l.getRPCMetadata =
    $l.deleteRPCMetadata =
    $l.RPCType =
    $l.parseTraceParent =
    $l.W3CTraceContextPropagator =
    $l.TRACE_STATE_HEADER =
    $l.TRACE_PARENT_HEADER =
    $l.CompositePropagator =
    $l.otperformance =
    $l.getStringListFromEnv =
    $l.getNumberFromEnv =
    $l.getBooleanFromEnv =
    $l.getStringFromEnv =
    $l._globalThis =
    $l.SDK_INFO =
    $l.parseKeyPairsIntoRecord =
    $l.ExportResultCode =
    $l.unrefTimer =
    $l.timeInputToHrTime =
    $l.millisToHrTime =
    $l.isTimeInputHrTime =
    $l.isTimeInput =
    $l.hrTimeToTimeStamp =
    $l.hrTimeToSeconds =
    $l.hrTimeToNanoseconds =
    $l.hrTimeToMilliseconds =
    $l.hrTimeToMicroseconds =
    $l.hrTimeDuration =
    $l.hrTime =
    $l.getTimeOrigin =
    $l.addHrTimes =
    $l.loggingErrorHandler =
    $l.setGlobalErrorHandler =
    $l.globalErrorHandler =
    $l.sanitizeAttributes =
    $l.isAttributeValue =
    $l.AnchoredClock =
    $l.W3CBaggagePropagator =
      void 0;
  $l.internal = void 0;
  var Svo = POn();
  Object.defineProperty($l, "W3CBaggagePropagator", {
    enumerable: !0,
    get: function () {
      return Svo.W3CBaggagePropagator;
    },
  });
  var Tvo = OOn();
  Object.defineProperty($l, "AnchoredClock", {
    enumerable: !0,
    get: function () {
      return Tvo.AnchoredClock;
    },
  });
  var MVn = WOn();
  Object.defineProperty($l, "isAttributeValue", {
    enumerable: !0,
    get: function () {
      return MVn.isAttributeValue;
    },
  });
  Object.defineProperty($l, "sanitizeAttributes", {
    enumerable: !0,
    get: function () {
      return MVn.sanitizeAttributes;
    },
  });
  var xVn = QOn();
  Object.defineProperty($l, "globalErrorHandler", {
    enumerable: !0,
    get: function () {
      return xVn.globalErrorHandler;
    },
  });
  Object.defineProperty($l, "setGlobalErrorHandler", {
    enumerable: !0,
    get: function () {
      return xVn.setGlobalErrorHandler;
    },
  });
  var vvo = icr();
  Object.defineProperty($l, "loggingErrorHandler", {
    enumerable: !0,
    get: function () {
      return vvo.loggingErrorHandler;
    },
  });
  var cN = uWn();
  Object.defineProperty($l, "addHrTimes", {
    enumerable: !0,
    get: function () {
      return cN.addHrTimes;
    },
  });
  Object.defineProperty($l, "getTimeOrigin", {
    enumerable: !0,
    get: function () {
      return cN.getTimeOrigin;
    },
  });
  Object.defineProperty($l, "hrTime", {
    enumerable: !0,
    get: function () {
      return cN.hrTime;
    },
  });
  Object.defineProperty($l, "hrTimeDuration", {
    enumerable: !0,
    get: function () {
      return cN.hrTimeDuration;
    },
  });
  Object.defineProperty($l, "hrTimeToMicroseconds", {
    enumerable: !0,
    get: function () {
      return cN.hrTimeToMicroseconds;
    },
  });
  Object.defineProperty($l, "hrTimeToMilliseconds", {
    enumerable: !0,
    get: function () {
      return cN.hrTimeToMilliseconds;
    },
  });
  Object.defineProperty($l, "hrTimeToNanoseconds", {
    enumerable: !0,
    get: function () {
      return cN.hrTimeToNanoseconds;
    },
  });
  Object.defineProperty($l, "hrTimeToSeconds", {
    enumerable: !0,
    get: function () {
      return cN.hrTimeToSeconds;
    },
  });
  Object.defineProperty($l, "hrTimeToTimeStamp", {
    enumerable: !0,
    get: function () {
      return cN.hrTimeToTimeStamp;
    },
  });
  Object.defineProperty($l, "isTimeInput", {
    enumerable: !0,
    get: function () {
      return cN.isTimeInput;
    },
  });
  Object.defineProperty($l, "isTimeInputHrTime", {
    enumerable: !0,
    get: function () {
      return cN.isTimeInputHrTime;
    },
  });
  Object.defineProperty($l, "millisToHrTime", {
    enumerable: !0,
    get: function () {
      return cN.millisToHrTime;
    },
  });
  Object.defineProperty($l, "timeInputToHrTime", {
    enumerable: !0,
    get: function () {
      return cN.timeInputToHrTime;
    },
  });
  var bvo = pWn();
  Object.defineProperty($l, "unrefTimer", {
    enumerable: !0,
    get: function () {
      return bvo.unrefTimer;
    },
  });
  var jvo = hWn();
  Object.defineProperty($l, "ExportResultCode", {
    enumerable: !0,
    get: function () {
      return jvo.ExportResultCode;
    },
  });
  var Pvo = ncr();
  Object.defineProperty($l, "parseKeyPairsIntoRecord", {
    enumerable: !0,
    get: function () {
      return Pvo.parseKeyPairsIntoRecord;
    },
  });
  var kme = ocr();
  Object.defineProperty($l, "SDK_INFO", {
    enumerable: !0,
    get: function () {
      return kme.SDK_INFO;
    },
  });
  Object.defineProperty($l, "_globalThis", {
    enumerable: !0,
    get: function () {
      return kme._globalThis;
    },
  });
  Object.defineProperty($l, "getStringFromEnv", {
    enumerable: !0,
    get: function () {
      return kme.getStringFromEnv;
    },
  });
  Object.defineProperty($l, "getBooleanFromEnv", {
    enumerable: !0,
    get: function () {
      return kme.getBooleanFromEnv;
    },
  });
  Object.defineProperty($l, "getNumberFromEnv", {
    enumerable: !0,
    get: function () {
      return kme.getNumberFromEnv;
    },
  });
  Object.defineProperty($l, "getStringListFromEnv", {
    enumerable: !0,
    get: function () {
      return kme.getStringListFromEnv;
    },
  });
  Object.defineProperty($l, "otperformance", {
    enumerable: !0,
    get: function () {
      return kme.otperformance;
    },
  });
  var Cvo = EWn();
  Object.defineProperty($l, "CompositePropagator", {
    enumerable: !0,
    get: function () {
      return Cvo.CompositePropagator;
    },
  });
  var vgt = OWn();
  Object.defineProperty($l, "TRACE_PARENT_HEADER", {
    enumerable: !0,
    get: function () {
      return vgt.TRACE_PARENT_HEADER;
    },
  });
  Object.defineProperty($l, "TRACE_STATE_HEADER", {
    enumerable: !0,
    get: function () {
      return vgt.TRACE_STATE_HEADER;
    },
  });
  Object.defineProperty($l, "W3CTraceContextPropagator", {
    enumerable: !0,
    get: function () {
      return vgt.W3CTraceContextPropagator;
    },
  });
  Object.defineProperty($l, "parseTraceParent", {
    enumerable: !0,
    get: function () {
      return vgt.parseTraceParent;
    },
  });
  var bgt = RWn();
  Object.defineProperty($l, "RPCType", {
    enumerable: !0,
    get: function () {
      return bgt.RPCType;
    },
  });
  Object.defineProperty($l, "deleteRPCMetadata", {
    enumerable: !0,
    get: function () {
      return bgt.deleteRPCMetadata;
    },
  });
  Object.defineProperty($l, "getRPCMetadata", {
    enumerable: !0,
    get: function () {
      return bgt.getRPCMetadata;
    },
  });
  Object.defineProperty($l, "setRPCMetadata", {
    enumerable: !0,
    get: function () {
      return bgt.setRPCMetadata;
    },
  });
  var fcr = JVe();
  Object.defineProperty($l, "isTracingSuppressed", {
    enumerable: !0,
    get: function () {
      return fcr.isTracingSuppressed;
    },
  });
  Object.defineProperty($l, "suppressTracing", {
    enumerable: !0,
    get: function () {
      return fcr.suppressTracing;
    },
  });
  Object.defineProperty($l, "unsuppressTracing", {
    enumerable: !0,
    get: function () {
      return fcr.unsuppressTracing;
    },
  });
  var wvo = Acr();
  Object.defineProperty($l, "TraceState", {
    enumerable: !0,
    get: function () {
      return wvo.TraceState;
    },
  });
  var kvo = tVn();
  Object.defineProperty($l, "merge", {
    enumerable: !0,
    get: function () {
      return kvo.merge;
    },
  });
  var SVn = iVn();
  Object.defineProperty($l, "TimeoutError", {
    enumerable: !0,
    get: function () {
      return SVn.TimeoutError;
    },
  });
  Object.defineProperty($l, "callWithTimeout", {
    enumerable: !0,
    get: function () {
      return SVn.callWithTimeout;
    },
  });
  var TVn = HVn();
  Object.defineProperty($l, "isUrlIgnored", {
    enumerable: !0,
    get: function () {
      return TVn.isUrlIgnored;
    },
  });
  Object.defineProperty($l, "urlMatches", {
    enumerable: !0,
    get: function () {
      return TVn.urlMatches;
    },
  });
  var Ovo = _Vn();
  Object.defineProperty($l, "BindOnceFuture", {
    enumerable: !0,
    get: function () {
      return Ovo.BindOnceFuture;
    },
  });
  var Uvo = gVn();
  Object.defineProperty($l, "diagLogLevelFromString", {
    enumerable: !0,
    get: function () {
      return Uvo.diagLogLevelFromString;
    },
  });
  var vVn = yVn();
  $l.internal = { _export: vVn._export };
});