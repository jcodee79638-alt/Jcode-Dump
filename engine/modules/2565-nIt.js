
var nIt = Ie(function ($fc, pri) {
  var { resolve: fBo } = cr("path"),
    pBo = Oti(),
    dBo = tIt(),
    uri = Mlr(),
    { Minipass: mBo } = Ny(),
    _Bo = r_e(),
    lri = rTe(),
    rIt = t_e(),
    Ari = cri();
  class fri extends _Bo {
    constructor(e, t) {
      super(e, t);
      ((this.resolved = this.spec.fetchSpec),
        (this.tree = t.tree || null),
        (this.Arborist = t.Arborist || null));
    }
    static tarCreateOptions(e) {
      return Ari(e);
    }
    get types() {
      return ["directory"];
    }
    #e() {
      return this.manifest().then((e) => {
        if (!e.scripts || !e.scripts.prepare) return;
        if (this.opts.ignoreScripts) return;
        let t = this.opts.foregroundScripts ? "inherit" : "pipe";
        return dBo({
          scriptShell: this.opts.scriptShell || void 0,
          pkg: e,
          event: "prepare",
          path: this.resolved,
          stdio: t,
          env: {
            npm_package_resolved: this.resolved,
            npm_package_integrity: this.integrity,
            npm_package_json: fBo(this.resolved, "package.json"),
          },
        });
      });
    }
    [rIt.tarballFromResolved]() {
      if (!this.tree && !this.Arborist)
        throw Error("DirFetcher requires either a tree or an Arborist constructor to pack");
      let e = new mBo();
      ((e.resolved = this.resolved), (e.integrity = this.integrity));
      let { prefix: t, workspaces: r } = this.opts;
      return (
        this.#e()
          .then(async () => {
            if (!this.tree) {
              let s = new this.Arborist({ path: this.resolved });
              this.tree = await s.loadActual();
            }
            return pBo(this.tree, { path: this.resolved, prefix: t, workspaces: r });
          })
          .then((s) =>
            uri
              .c(Ari(this.package), s)
              .on("error", (a) => e.emit("error", a))
              .pipe(e),
          )
          .catch((s) => e.emit("error", s)),
        e
      );
    }
    manifest() {
      if (this.package) return Promise.resolve(this.package);
      return this[rIt.readPackageJson](this.resolved).then(
        (e) =>
          (this.package = {
            ...e,
            _integrity: this.integrity && String(this.integrity),
            _resolved: this.resolved,
            _from: this.from,
          }),
      );
    }
    packument() {
      return lri.prototype.packument.apply(this);
    }
  }
  pri.exports = fri;
});