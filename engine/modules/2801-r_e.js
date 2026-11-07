
var r_e = Ie(function (qhc, omi) {
  var { basename: oea, dirname: emi } = cr("path"),
    { rm: aea, mkdir: tmi } = cr("fs/promises"),
    Gyt = fN(),
    Dve = e_e(),
    nmi = VSe(),
    Hea = hlr(),
    imi = ky(),
    { promiseRetry: cea } = L7e(),
    yve = BV(),
    smi = Mlr(),
    { Minipass: Aea } = Ny(),
    { log: xae } = mg(),
    Z5 = t_e(),
    rmi = Mti(),
    uea = Slr(),
    lea = Tlr(),
    fea = (e) => Gyt.prepare(e).then((t) => t.content),
    pea = (e) => Gyt.normalize(e).then((t) => t.content);
  class hmr {
    constructor(e, t) {
      if (!t || typeof t !== "object") throw TypeError("options object is required");
      if (
        ((this.spec = imi(e, t.where)),
        (this.allowGitIgnore = !!t.allowGitIgnore),
        (this.from = this.spec.registry ? `${this.spec.name}@${this.spec.rawSpec}` : this.spec.saveSpec),
        this.#t(),
        (this.opts = { ...t }),
        (this.cache = t.cache || rmi().cacache),
        (this.tufCache = t.tufCache || rmi().tufcache),
        (this.resolved = t.resolved || null),
        (this.defaultIntegrityAlgorithm = t.defaultIntegrityAlgorithm || "sha512"),
        typeof t.integrity === "string")
      )
        this.opts.integrity = yve.parse(t.integrity);
      ((this.package = null),
        (this.type = this.constructor.name),
        (this.fmode = t.fmode || 438),
        (this.dmode = t.dmode || 511),
        (this.umask = t.umask || 0),
        (this.preferOnline = !!t.preferOnline),
        (this.preferOffline = !!t.preferOffline),
        (this.offline = !!t.offline),
        (this.before = t.before),
        (this.fullMetadata = this.before ? !0 : !!t.fullMetadata),
        (this.fullReadJson = !!t.fullReadJson),
        (this[Z5.readPackageJson] = this.fullReadJson ? fea : pea),
        (this.replaceRegistryHost =
          !t.replaceRegistryHost || t.replaceRegistryHost === "npmjs"
            ? "registry.npmjs.org"
            : t.replaceRegistryHost),
        (this.defaultTag = t.defaultTag || "latest"),
        (this.registry = lea(t.registry || "https://registry.npmjs.org")),
        (this.npmBin = t.npmBin || "npm"),
        (this.npmInstallCmd = t.npmInstallCmd || ["install", "--force"]),
        (this.npmCliConfig = t.npmCliConfig || [
          `--cache=${emi(this.cache)}`,
          `--prefer-offline=${!!this.preferOffline}`,
          `--prefer-online=${!!this.preferOnline}`,
          `--offline=${!!this.offline}`,
          ...(this.before ? [`--before=${this.before.toISOString()}`] : []),
          "--no-progress",
          "--no-save",
          "--no-audit",
          "--include=dev",
          "--include=peer",
          "--include=optional",
          "--no-package-lock-only",
          "--no-dry-run",
        ]));
    }
    get integrity() {
      return this.opts.integrity || null;
    }
    set integrity(e) {
      if (!e) return;
      e = yve.parse(e);
      let t = this.opts.integrity;
      if (t) t.merge(e);
      else this.opts.integrity = e;
    }
    get notImplementedError() {
      return Error("not implemented in this fetcher type: " + this.type);
    }
    resolve() {
      return this.resolved ? Promise.resolve(this.resolved) : Promise.reject(this.notImplementedError);
    }
    packument() {
      return Promise.reject(this.notImplementedError);
    }
    manifest() {
      return Promise.reject(this.notImplementedError);
    }
    [Z5.tarballFromResolved]() {
      throw this.notImplementedError;
    }
    tarball() {
      return this.tarballStream((e) =>
        e
          .concat()
          .then(
            (t) => (
              (t.integrity = this.integrity && String(this.integrity)),
              (t.resolved = this.resolved),
              (t.from = this.from),
              t
            ),
          ),
      );
    }
    #e() {
      let e = Date.now(),
        t = Dve.get.stream.byDigest(this.cache, this.integrity, this.opts),
        r = Date.now() - e;
      return (xae.http("cache", `${this.spec} ${r}ms (cache hit)`), t);
    }
    get [Z5.cacheFetches]() {
      return !0;
    }
    #r(e) {
      if (!this.opts.cache || !this[Z5.cacheFetches]) {
        if (e.hasIntegrityEmitter) return (e.on("integrity", (a) => (this.integrity = a)), e);
        let s = yve.integrityStream(this.opts);
        return (
          s.on("integrity", (a) => (this.integrity = a)),
          e.on("error", (a) => s.emit("error", a)),
          e.pipe(s)
        );
      }
      let t = new Aea();
      (e.on("error", (s) => t.emit("error", s)), e.pipe(t, { end: !1 }));
      let r = Dve.put.stream(this.opts.cache, `pacote:tarball:${this.from}`, this.opts);
      return (
        r.on("integrity", (s) => (this.integrity = s)),
        r.on("error", (s) => e.emit("error", s)),
        e.pipe(r),
        r
          .promise()
          .catch(() => {})
          .then(() => t.end()),
        t
      );
    }
    pickIntegrityAlgorithm() {
      return this.integrity ? this.integrity.pickAlgorithm(this.opts) : this.defaultIntegrityAlgorithm;
    }
    isDataCorruptionError(e) {
      return e.code === "EINTEGRITY" || e.code === "Z_DATA_ERROR";
    }
    get types() {
      return !1;
    }
    #t() {
      if (this.types && !this.types.includes(this.spec.type))
        throw TypeError(
          `Wrong spec type (${this.spec.type}) for ${this.constructor.name}. Supported types: ${this.types.join(", ")}`,
        );
    }
    isRetriableError(e) {
      return this.isDataCorruptionError(e) || e.code === "ENOENT" || e.code === "EISDIR";
    }
    tarballStream(e) {
      let t =
          !this.preferOnline && this.integrity && this.resolved
            ? e(this.#e()).catch((s) => {
                if (this.isDataCorruptionError(s))
                  return (
                    xae.warn(
                      "tarball",
                      `cached data for ${this.spec} (${this.integrity}) seems to be corrupted. Refreshing cache.`,
                    ),
                    this.cleanupCached().then(() => {
                      throw s;
                    })
                  );
                else throw s;
              })
            : null,
        r = (s) => {
          if (s) {
            if (!this.isRetriableError(s)) throw s;
            xae.silly("tarball", `no local data for ${this.spec}. Extracting by manifest.`);
          }
          return this.resolve().then(() =>
            cea(
              (a) =>
                e(this.#r(this[Z5.tarballFromResolved]())).catch((H) => {
                  if (this.isRetriableError(H))
                    return (
                      xae.warn(
                        "tarball",
                        `tarball data for ${this.spec} (${this.integrity}) seems to be corrupted. Trying again.`,
                      ),
                      this.cleanupCached().then(() => a(H))
                    );
                  throw H;
                }),
              { retries: 1, minTimeout: 0, maxTimeout: 0 },
            ),
          );
        };
      return t ? t.catch(r) : r();
    }
    cleanupCached() {
      return Dve.rm.content(this.cache, this.integrity, this.opts);
    }
    #n(e) {
      return Hea({ path: e, depth: 1 }).then((t) =>
        Promise.all(t.map((r) => aea(r, { recursive: !0, force: !0 }))),
      );
    }
    async #i(e) {
      return (await this.#n(e), await tmi(e, { recursive: !0 }));
    }
    async extract(e) {
      return (await this.#i(e), this.tarballStream((t) => this.#a(e, t)));
    }
    #s(e) {
      return this.tarballStream(
        (t) =>
          new Promise((r, s) => {
            let a = new nmi.WriteStream(e);
            (t.on("error", (H) => a.emit("error", H)),
              a.on("error", (H) => s(H)),
              a.on("close", () =>
                r({
                  integrity: this.integrity && String(this.integrity),
                  resolved: this.resolved,
                  from: this.from,
                }),
              ),
              t.pipe(a));
          }),
      );
    }
    async tarballFile(e) {
      let t = emi(e);
      return (await tmi(t, { recursive: !0 }), this.#s(e));
    }
    #a(e, t) {
      let r = smi.x(this.#H({ cwd: e })),
        s = new Promise((a, H) => {
          (r.on("end", () => {
            a({
              resolved: this.resolved,
              integrity: this.integrity && String(this.integrity),
              from: this.from,
            });
          }),
            r.on("error", (u) => {
              (xae.warn("tar", u.message), xae.silly("tar", u), H(u));
            }),
            t.on("error", (u) => H(u)));
        });
      return (t.pipe(r), s);
    }
    #c(e, t, r) {
      let s = /Directory|GNUDumpDir/.test(r) ? this.dmode : /File$/.test(r) ? this.fmode : 0,
        a = uea(this.package, e) ? 73 : 0;
      return ((t | s) & ~this.umask) | a | 384;
    }
    #H({ cwd: e }) {
      let t = new Set();
      return {
        cwd: e,
        noChmod: !0,
        noMtime: !0,
        filter: (r, s) => {
          if (/Link$/.test(s.type)) return !1;
          if (((s.mode = this.#c(s.path, s.mode, s.type)), /File$/.test(s.type))) {
            let a = oea(s.path);
            if (a === ".npmignore") t.add(s.path);
            else if (a === ".gitignore" && !this.allowGitIgnore) {
              let H = s.path.replace(/\.gitignore$/, ".npmignore");
              if (t.has(H)) return !1;
              s.path = H;
            }
            return !0;
          }
        },
        strip: 1,
        onwarn: (r, s, a) => {
          (xae.warn("tar", r, s), xae.silly("tar", r, s, a));
        },
        umask: this.umask,
        preserveOwner: !1,
      };
    }
  }
  omi.exports = hmr;
  var dea = jpr(),
    mea = _mr(),
    _ea = rTe(),
    hea = nIt(),
    Lea = k4e(),
    iqe = ({ allow: e = "all", isRoot: t = !1, allowType: r, spec: s }) => {
      if (e === "all") return !0;
      if (e !== "none" && t) return !0;
      throw Object.assign(
        Error(`Fetching${e === "root" ? " non-root" : ""} packages of type "${r}" have been disabled`),
        { code: `EALLOW${r.toUpperCase()}`, package: s.toString() },
      );
    };
  hmr.get = (e, t = {}) => {
    let r = imi(e, t.where);
    switch (r.type) {
      case "git":
        return (iqe({ allow: t.allowGit, isRoot: t._isRoot, allowType: "git", spec: r }), new dea(r, t));
      case "remote":
        return (
          iqe({ allow: t.allowRemote, isRoot: t._isRoot, allowType: "remote", spec: r }),
          new Lea(r, t)
        );
      case "version":
      case "range":
      case "tag":
      case "alias":
        return (
          iqe({ allow: t.allowRegistry, isRoot: t._isRoot, allowType: "registry", spec: r }),
          new mea(r.subSpec || r, t)
        );
      case "file":
        return (iqe({ allow: t.allowFile, isRoot: t._isRoot, allowType: "file", spec: r }), new _ea(r, t));
      case "directory":
        return (
          iqe({ allow: t.allowDirectory, isRoot: t._isRoot, allowType: "directory", spec: r }),
          new hea(r, t)
        );
      default:
        throw TypeError("Unknown spec type: " + r.type);
    }
  };
});