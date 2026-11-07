
var ppi = Ie(function (ave) {
  var cpi =
    (ave && ave.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(ave, "__esModule", { value: !0 });
  ave.TUFClient = void 0;
  var Dae = cpi(cr("fs")),
    rqe = cpi(cr("path")),
    Api = rpi(),
    upi = byt(),
    vyt = npi(),
    lpi = api(),
    nmr = "targets";
  class fpi {
    updater;
    constructor(e) {
      let t = new URL(e.mirrorURL),
        r = encodeURIComponent(t.host + t.pathname.replace(/\/$/, "")),
        s = rqe.default.join(e.cachePath, r);
      (GQo(s),
        XQo({ cachePath: s, mirrorURL: e.mirrorURL, tufRootPath: e.rootPath, forceInit: e.forceInit }),
        (this.updater = JQo({
          mirrorURL: e.mirrorURL,
          cachePath: s,
          forceCache: e.forceCache,
          retry: e.retry,
          timeout: e.timeout,
        })));
    }
    async refresh() {
      return this.updater.refresh();
    }
    getTarget(e) {
      return lpi.readTarget(this.updater, e);
    }
  }
  ave.TUFClient = fpi;
  function GQo(e) {
    let t = rqe.default.join(e, nmr);
    if (!Dae.default.existsSync(e)) Dae.default.mkdirSync(e, { recursive: !0 });
    if (!Dae.default.existsSync(t)) Dae.default.mkdirSync(t);
  }
  function XQo({ cachePath: e, mirrorURL: t, tufRootPath: r, forceInit: s }) {
    let a = rqe.default.join(e, "root.json");
    if (!Dae.default.existsSync(a) || s)
      if (r) Dae.default.copyFileSync(r, a);
      else {
        let u = Hpi()[t];
        if (!u)
          throw new upi.TUFError({
            code: "TUF_INIT_CACHE_ERROR",
            message: `No root.json found for mirror: ${t}`,
          });
        (Dae.default.writeFileSync(a, Buffer.from(u["root.json"], "base64")),
          Object.entries(u.targets).forEach(([f, d]) => {
            Dae.default.writeFileSync(rqe.default.join(e, nmr, f), Buffer.from(d, "base64"));
          }));
      }
  }
  function JQo(e) {
    let t = {
      fetchTimeout: e.timeout,
      fetchRetry: e.retry,
      userAgent: `${encodeURIComponent(vyt.name)}/${vyt.version}`,
    };
    return new Api.Updater({
      metadataBaseUrl: e.mirrorURL,
      targetBaseUrl: `${e.mirrorURL}/targets`,
      metadataDir: e.cachePath,
      targetDir: rqe.default.join(e.cachePath, nmr),
      forceCache: e.forceCache,
      config: t,
    });
  }
});