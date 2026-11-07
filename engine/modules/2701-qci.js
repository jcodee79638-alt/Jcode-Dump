
var qci = Ie(function (R5) {
  var VXo =
      (R5 && R5.__createBinding) ||
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
    qXo =
      (R5 && R5.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    GXo =
      (R5 && R5.__importStar) ||
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
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") VXo(r, t, s[a]);
          }
          return (qXo(r, t), r);
        };
      })();
  Object.defineProperty(R5, "__esModule", { value: !0 });
  R5.SignedCertificateTimestamp = void 0;
  var XXo = GXo(jTe()),
    wDt = R4e();
  class pdr {
    version;
    logID;
    timestamp;
    extensions;
    hashAlgorithm;
    signatureAlgorithm;
    signature;
    constructor(e) {
      ((this.version = e.version),
        (this.logID = e.logID),
        (this.timestamp = e.timestamp),
        (this.extensions = e.extensions),
        (this.hashAlgorithm = e.hashAlgorithm),
        (this.signatureAlgorithm = e.signatureAlgorithm),
        (this.signature = e.signature));
    }
    get datetime() {
      return new Date(Number(this.timestamp.readBigInt64BE()));
    }
    get algorithm() {
      switch (this.hashAlgorithm) {
        case 0:
          return "none";
        case 1:
          return "md5";
        case 2:
          return "sha1";
        case 3:
          return "sha224";
        case 4:
          return "sha256";
        case 5:
          return "sha384";
        case 6:
          return "sha512";
        default:
          return "unknown";
      }
    }
    verify(e, t) {
      let r = new wDt.ByteStream();
      if (
        (r.appendChar(this.version),
        r.appendChar(0),
        r.appendView(this.timestamp),
        r.appendUint16(1),
        r.appendView(e),
        r.appendUint16(this.extensions.byteLength),
        this.extensions.byteLength > 0)
      )
        r.appendView(this.extensions);
      return XXo.verify(r.buffer, t, this.signature, this.algorithm);
    }
    static parse(e) {
      let t = new wDt.ByteStream(e),
        r = t.getUint8(),
        s = t.getBlock(32),
        a = t.getBlock(8),
        H = t.getUint16(),
        u = t.getBlock(H),
        f = t.getUint8(),
        d = t.getUint8(),
        _ = t.getUint16(),
        L = t.getBlock(_);
      if (t.position !== e.length) throw Error("SCT buffer length mismatch");
      return new pdr({
        version: r,
        logID: s,
        timestamp: a,
        extensions: u,
        hashAlgorithm: f,
        signatureAlgorithm: d,
        signature: L,
      });
    }
  }
  R5.SignedCertificateTimestamp = pdr;
});