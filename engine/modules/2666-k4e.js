
var k4e = Ie(function (udc, tHi) {
  var gGo = w4e(),
    { Minipass: EGo } = Ny(),
    IGo = r_e(),
    HDt = rTe(),
    cDt = t_e(),
    Zai = bpr().version;
  class eHi extends IGo {
    constructor(e, t) {
      super(e, t);
      this.resolved = this.spec.fetchSpec;
      let r = new URL(this.resolved);
      if (
        this.replaceRegistryHost !== "never" &&
        (this.replaceRegistryHost === "always" || this.replaceRegistryHost === r.host)
      )
        this.resolved = new URL(r.pathname, this.registry).href;
      let s = this.spec.name ? `${this.spec.name}@` : "";
      this.pkgid = t.pkgid ? t.pkgid : `remote:${s}${this.resolved}`;
    }
    get [cDt.cacheFetches]() {
      return !1;
    }
    [cDt.tarballFromResolved]() {
      let e = new EGo();
      e.hasIntegrityEmitter = !0;
      let t = {
        ...this.opts,
        headers: this.#e(),
        spec: this.spec,
        integrity: this.integrity,
        algorithms: [this.pickIntegrityAlgorithm()],
      };
      return (
        gGo(this.resolved, t)
          .then((r) => {
            (r.body.on("error", (s) => e.emit("error", s)),
              r.body.on("integrity", (s) => {
                ((this.integrity = s), e.emit("integrity", s));
              }),
              r.body.pipe(e));
          })
          .catch((r) => e.emit("error", r)),
        e
      );
    }
    #e() {
      return {
        "user-agent": this.opts.userAgent || `pacote/${Zai} node/${process.version}`,
        ...(this.opts.headers || {}),
        "pacote-version": Zai,
        "pacote-req-type": "tarball",
        "pacote-pkg-id": this.pkgid,
        ...(this.integrity ? { "pacote-integrity": String(this.integrity) } : {}),
        ...(this.opts.headers || {}),
      };
    }
    get types() {
      return ["remote"];
    }
    packument() {
      return HDt.prototype.packument.apply(this);
    }
    manifest() {
      return HDt.prototype.manifest.apply(this);
    }
  }
  tHi.exports = eHi;
});