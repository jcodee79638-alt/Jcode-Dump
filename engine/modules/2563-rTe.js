
var rTe = Ie(function (hfc, ari) {
  var { resolve: aBo } = cr("path"),
    { stat: HBo, chmod: cBo } = cr("fs/promises"),
    iri = e_e(),
    sri = VSe(),
    ABo = r_e(),
    tTe = t_e();
  class ori extends ABo {
    constructor(e, t) {
      super(e, t);
      this.resolved = this.spec.fetchSpec;
    }
    get types() {
      return ["file"];
    }
    manifest() {
      if (this.package) return Promise.resolve(this.package);
      return iri.tmp.withTmp(this.cache, this.opts, (e) =>
        this.extract(e)
          .then(() => this[tTe.readPackageJson](e))
          .then(
            (t) =>
              (this.package = {
                ...t,
                _integrity: this.integrity && String(this.integrity),
                _resolved: this.resolved,
                _from: this.from,
              }),
          ),
      );
    }
    #e(e, t) {
      if (!e.bin) return Promise.resolve();
      return Promise.all(
        Object.keys(e.bin).map(async (r) => {
          let s = aBo(t, e.bin[r]);
          try {
            let a = await HBo(s),
              H = a.mode | 73;
            if (H === a.mode) return;
            await cBo(s, H);
          } catch {}
        }),
      );
    }
    extract(e) {
      return super.extract(e).then((t) =>
        this.package
          ? t
          : this[tTe.readPackageJson](e)
              .then((r) => this.#e(r, e))
              .then(() => t),
      );
    }
    [tTe.tarballFromResolved]() {
      return new sri.ReadStream(this.resolved);
    }
    packument() {
      return this.manifest().then((e) => ({
        name: e.name,
        "dist-tags": { [this.defaultTag]: e.version },
        versions: {
          [e.version]: {
            ...e,
            dist: { tarball: `file:${this.resolved}`, integrity: this.integrity && String(this.integrity) },
          },
        },
      }));
    }
  }
  ari.exports = ori;
});