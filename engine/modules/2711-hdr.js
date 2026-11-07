
var hdr = Ie(function (W5) {
  var IJo =
      (W5 && W5.__createBinding) ||
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
    DJo =
      (W5 && W5.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    yJo =
      (W5 && W5.__importStar) ||
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
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") IJo(r, t, s[a]);
          }
          return (DJo(r, t), r);
        };
      })();
  Object.defineProperty(W5, "__esModule", { value: !0 });
  W5.toMessageSignatureBundle = MJo;
  W5.toDSSEBundle = xJo;
  var hAi = yJo(B4e()),
    wTe = Hae();
  function MJo(e, t) {
    let r = wTe.crypto.digest("sha256", e.data);
    return hAi.toMessageSignatureBundle({
      digest: r,
      signature: t.signature,
      certificate: t.key.$case === "x509Certificate" ? wTe.pem.toDER(t.key.certificate) : void 0,
      keyHint: t.key.$case === "publicKey" ? t.key.hint : void 0,
      certificateChain: !0,
    });
  }
  function xJo(e, t, r) {
    return hAi.toDSSEBundle({
      artifact: e.data,
      artifactType: e.type,
      signature: t.signature,
      certificate: t.key.$case === "x509Certificate" ? wTe.pem.toDER(t.key.certificate) : void 0,
      keyHint: t.key.$case === "publicKey" ? t.key.hint : void 0,
      certificateChain: r,
    });
  }
});