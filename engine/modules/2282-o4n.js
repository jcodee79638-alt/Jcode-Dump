
var o4n = Ie(function (Loe) {
  Object.defineProperty(Loe, "__esModule", { value: !0 });
  Loe.noopDetector =
    Loe.serviceInstanceIdDetector =
    Loe.processDetector =
    Loe.osDetector =
    Loe.hostDetector =
    Loe.envDetector =
      void 0;
  var Kbo = KVn();
  Object.defineProperty(Loe, "envDetector", {
    enumerable: !0,
    get: function () {
      return Kbo.envDetector;
    },
  });
  var Bgt = r4n();
  Object.defineProperty(Loe, "hostDetector", {
    enumerable: !0,
    get: function () {
      return Bgt.hostDetector;
    },
  });
  Object.defineProperty(Loe, "osDetector", {
    enumerable: !0,
    get: function () {
      return Bgt.osDetector;
    },
  });
  Object.defineProperty(Loe, "processDetector", {
    enumerable: !0,
    get: function () {
      return Bgt.processDetector;
    },
  });
  Object.defineProperty(Loe, "serviceInstanceIdDetector", {
    enumerable: !0,
    get: function () {
      return Bgt.serviceInstanceIdDetector;
    },
  });
  var zbo = s4n();
  Object.defineProperty(Loe, "noopDetector", {
    enumerable: !0,
    get: function () {
      return zbo.noopDetector;
    },
  });
});