
var jpr = Ie(function (pdc, AHi) {
  var HHi = e_e(),
    Zoe = UAr(),
    MGo = ky(),
    xGo = I7e(),
    { Minipass: SGo } = Ny(),
    { log: oHi } = mg(),
    TGo = nIt(),
    vGo = r_e(),
    uDt = rTe(),
    bGo = k4e(),
    eae = t_e(),
    jGo = nHi(),
    PGo = sHi(),
    CGo = /^[a-f0-9]{40,64}$/,
    ADt = (e, t) => (e.sshurl && !(e.https && e.auth) && aHi(e.sshurl(t))) || (e.https && aHi(e.https(t))),
    aHi = (e) => e && `git+${e}`.replace(/^(git\+)+/, "git+"),
    wGo = (e, t) => {
      let r = Error(`Commit mismatch: expected SHA ${e} and cloned HEAD ${t}`);
      return ((r.code = "EGITCHECKOUT"), (r.sha = e), (r.head = t), r);
    };
  class cHi extends vGo {
    constructor(e, t) {
      super(e, t);
      if (this.opts.integrity)
        (delete this.opts.integrity,
          oHi.warn(`skipping integrity check for git dependency ${this.spec.fetchSpec}`));
      if (((this.resolvedRef = null), this.spec.hosted))
        this.from = this.spec.hosted.shortcut({ noCommittish: !1 });
      if (this.spec.gitCommittish && CGo.test(this.spec.gitCommittish))
        ((this.resolvedSha = this.spec.gitCommittish),
          (this.resolved = this.spec.hosted
            ? ADt(this.spec.hosted, { noCommittish: !1 })
            : this.spec.rawSpec));
      else this.resolvedSha = "";
      this.Arborist = t.Arborist || null;
    }
    static repoUrl(e, t) {
      return ADt(e, t);
    }
    get types() {
      return ["git"];
    }
    resolve() {
      if (this.resolved) return super.resolve();
      let e = this.spec.hosted;
      return e ? this.#e(e) : this.#r(this.spec.fetchSpec);
    }
    #e(e) {
      return this.#r(e.https && e.https()).catch((t) => {
        if (t instanceof Zoe.errors.GitPathspecError) throw t;
        let r = e.sshurl && e.sshurl();
        if (!r || e.auth) throw t;
        return this.#r(r);
      });
    }
    #r(e) {
      if (!e) return Promise.reject(Error(`No git url for ${this.spec}`));
      let t = this.spec.gitRange,
        r = this.spec.name;
      return Zoe.revs(e, this.opts)
        .then((s) =>
          t
            ? xGo({ versions: s.versions, "dist-tags": s["dist-tags"], name: r }, t, this.opts)
            : this.spec.gitCommittish
              ? s.refs[this.spec.gitCommittish] || s.refs[s.shas[this.spec.gitCommittish]]
              : s.refs.HEAD,
        )
        .then((s) => {
          if (!s || !s.sha) return this.#i();
          return ((this.resolvedRef = s), (this.resolvedSha = s.sha), this.#n(s.sha), this.resolved);
        });
    }
    #t(e) {
      this.resolved = !this.spec.hosted ? e : ADt(MGo(e).hosted, { noCommittish: !1 });
    }
    #n(e) {
      this.#t(jGo(this.spec, e));
    }
    #i() {
      return this.#a(() => this.resolved);
    }
    #s(e) {
      return this[eae.readPackageJson](e).then((t) => {
        let r = t.scripts;
        if (
          !t.workspaces &&
          (!r || !(r.postinstall || r.build || r.preinstall || r.install || r.prepack || r.prepare))
        )
          return;
        let s = !process.env._PACOTE_NO_PREPARE_
          ? []
          : process.env._PACOTE_NO_PREPARE_.split(`
`);
        if (s.includes(this.resolved)) {
          oHi.info("prepare", "skip prepare, already seen", this.resolved);
          return;
        }
        return (
          s.push(this.resolved),
          PGo(
            this.npmBin,
            [].concat(this.npmInstallCmd).concat(this.npmCliConfig),
            e,
            {
              ...process.env,
              _PACOTE_NO_PREPARE_: s.join(`
`),
            },
            { message: "git dep preparation failed" },
          )
        );
      });
    }
    [eae.tarballFromResolved]() {
      let e = new SGo();
      return (
        (e.resolved = this.resolved),
        (e.from = this.from),
        this.#a((t) =>
          this.#s(t).then(
            () =>
              new Promise((r, s) => {
                if (!this.Arborist)
                  throw Error("GitFetcher requires an Arborist constructor to pack a tarball");
                let H = new TGo(`file:${t}`, {
                  ...this.opts,
                  Arborist: this.Arborist,
                  resolved: null,
                  integrity: null,
                })[eae.tarballFromResolved]();
                (H.on("error", s), H.on("end", r), H.pipe(e));
              }),
          ),
        ).catch((t) => e.emit("error", t)),
        e
      );
    }
    #a(e, t = !0) {
      let r = { tmpPrefix: "git-clone" },
        s = this.resolvedSha || this.spec.gitCommittish,
        a = this.spec.hosted,
        H = this.resolved;
      return (
        (t = t && a && H === ADt(a, { noCommittish: !1 }) && a.tarball),
        HHi.tmp.withTmp(this.cache, r, async (u) => {
          if (t) {
            let d = this.spec.name ? `${this.spec.name}@` : "";
            return new bGo(a.tarball({ noCommittish: !1 }), {
              ...this.opts,
              allowGitIgnore: !0,
              pkgid: `git:${d}${this.resolved}`,
              resolved: this.resolved,
              integrity: null,
            })
              .extract(u)
              .then(
                () => e(`${u}${this.spec.gitSubdir || ""}`),
                (_) => {
                  if ((typeof _.statusCode === "number" && _.statusCode >= 400) || /^TAR_/.test(_.code))
                    return this.#a(e, !1);
                  else throw _;
                },
              );
          }
          let f = await (a ? this.#c(s, u) : this.#H(this.spec.fetchSpec, s, u));
          if (this.resolvedSha && this.resolvedSha !== f) throw wGo(this.resolvedSha, f);
          if (((this.resolvedSha = f), !this.resolved)) await this.#n(f);
          return e(`${u}${this.spec.gitSubdir || ""}`);
        })
      );
    }
    #c(e, t) {
      let r = this.spec.hosted;
      return this.#H(r.https({ noCommittish: !0 }), e, t).catch((s) => {
        if (s instanceof Zoe.errors.GitPathspecError) throw s;
        let a = r.sshurl && r.sshurl({ noCommittish: !0 });
        if (!a || r.auth) throw s;
        return this.#H(a, e, t);
      });
    }
    #H(e, t, r) {
      let { opts: s, spec: a } = this;
      return Zoe.clone(e, t, r, { ...s, spec: a });
    }
    manifest() {
      if (this.package) return Promise.resolve(this.package);
      return this.spec.hosted && this.resolved
        ? uDt.prototype.manifest.apply(this)
        : this.#a((e) =>
            this[eae.readPackageJson](e).then(
              (t) => (this.package = { ...t, _resolved: this.resolved, _from: this.from }),
            ),
          );
    }
    packument() {
      return uDt.prototype.packument.apply(this);
    }
  }
  AHi.exports = cHi;
});