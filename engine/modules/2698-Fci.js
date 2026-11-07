
var Fci = Ie(function (N5) {
  var PXo =
      (N5 && N5.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            if (s === void 0) s = r;
            var a = Object.getOwnPropertyDescriptor(t, r);
            if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable))
              a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              };
            Object.defineProperty(e, s, a);
          }
        : function (e, t, r, s) {
            if (s === void 0) s = r;
            e[s] = t[r];
          }),
    CXo =
      (N5 && N5.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    wXo =
      (N5 && N5.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (r) {
                var s = [];
                for (var a in r) if (Object.prototype.hasOwnProperty.call(r, a)) s[s.length] = a;
                return s;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var r = {};
          if (t != null) {
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") PXo(r, t, s[a]);
          }
          return (CXo(r, t), r);
        };
      })();
  Object.defineProperty(N5, "__esModule", { value: !0 });
  N5.TSTInfo = void 0;
  var kci = wXo(jTe()),
    Oci = PDt(),
    Uci = Adr();
  class Nci {
    root;
    constructor(e) {
      this.root = e;
    }
    get version() {
      return this.root.subs[0].toInteger();
    }
    get genTime() {
      return this.root.subs[4].toDate();
    }
    get messageImprintHashAlgorithm() {
      let e = this.messageImprintObj.subs[0].subs[0].toOID();
      return Oci.SHA2_HASH_ALGOS[e];
    }
    get messageImprintHashedMessage() {
      return this.messageImprintObj.subs[1].value;
    }
    get raw() {
      return this.root.toDER();
    }
    verify(e) {
      let t = kci.digest(this.messageImprintHashAlgorithm, e);
      if (!kci.bufferEqual(t, this.messageImprintHashedMessage))
        throw new Uci.RFC3161TimestampVerificationError("message imprint does not match artifact");
    }
    get messageImprintObj() {
      return this.root.subs[2];
    }
  }
  N5.TSTInfo = Nci;
});