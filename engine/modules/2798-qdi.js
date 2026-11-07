
var qdi = Ie(function (yB) {
  var XZo =
      (yB && yB.__createBinding) ||
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
    JZo =
      (yB && yB.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    Wdi =
      (yB && yB.__importStar) ||
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
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") XZo(r, t, s[a]);
          }
          return (JZo(r, t), r);
        };
      })();
  Object.defineProperty(yB, "__esModule", { value: !0 });
  yB.sign = zZo;
  yB.attest = QZo;
  yB.verify = YZo;
  yB.createVerifier = Vdi;
  var Eve = B4e(),
    KZo = Wdi(byt()),
    gve = Byt(),
    $ve = Wdi(Rdi());
  async function zZo(e, t = {}) {
    let s = await $ve.createBundleBuilder("messageSignature", t).create({ data: e });
    return Eve.bundleToJSON(s);
  }
  async function QZo(e, t, r = {}) {
    let a = await $ve.createBundleBuilder("dsseEnvelope", r).create({ data: e, type: t });
    return Eve.bundleToJSON(a);
  }
  async function YZo(e, t, r) {
    let s;
    if (Buffer.isBuffer(t)) s = t;
    else r = t;
    return (await Vdi(r)).verify(e, s);
  }
  async function Vdi(e = {}) {
    let t = await KZo.getTrustedRoot({
        mirrorURL: e.tufMirrorURL,
        rootPath: e.tufRootPath,
        cachePath: e.tufCachePath,
        forceCache: e.tufForceCache,
        retry: e.retry ?? $ve.DEFAULT_RETRY,
        timeout: e.timeout ?? $ve.DEFAULT_TIMEOUT,
      }),
      r = e.keySelector ? $ve.createKeyFinder(e.keySelector) : void 0,
      s = gve.toTrustMaterial(t, r),
      a = { ctlogThreshold: e.ctLogThreshold, tlogThreshold: e.tlogThreshold },
      H = new gve.Verifier(s, a),
      u = $ve.createVerificationPolicy(e);
    return {
      verify: (f, d) => {
        let _ = Eve.bundleFromJSON(f),
          L = gve.toSignedEntity(_, d);
        return H.verify(L, u);
      },
    };
  }
});