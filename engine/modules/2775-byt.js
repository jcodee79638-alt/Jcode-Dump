
var byt = Ie(function (imr) {
  Object.defineProperty(imr, "__esModule", { value: !0 });
  imr.TUFError = imr.DEFAULT_MIRROR_URL = void 0;
  imr.getTrustedRoot = ZQo;
  imr.initTUF = eYo;
  var dpi = _Z(),
    mpi = Tli(),
    _pi = ppi();
  imr.DEFAULT_MIRROR_URL = "https://tuf-repo-cdn.sigstore.dev";
  var KQo = "sigstore-js",
    zQo = { retries: 2 },
    QQo = 5000,
    YQo = "trusted_root.json";
  async function ZQo(e = {}) {
    let r = await hpi(e).getTarget(YQo);
    return dpi.TrustedRoot.fromJSON(JSON.parse(r));
  }
  async function eYo(e = {}) {
    let t = hpi(e);
    return t.refresh().then(() => t);
  }
  function hpi(e) {
    return new _pi.TUFClient({
      cachePath: e.cachePath || mpi.appDataPath(KQo),
      rootPath: e.rootPath,
      mirrorURL: e.mirrorURL || imr.DEFAULT_MIRROR_URL,
      retry: e.retry ?? zQo,
      timeout: e.timeout ?? QQo,
      forceCache: e.forceCache ?? !1,
      forceInit: e.forceInit ?? e.force ?? !1,
    });
  }
  var tYo = rmr();
  Object.defineProperty(imr, "TUFError", {
    enumerable: !0,
    get: function () {
      return tYo.TUFError;
    },
  });
});