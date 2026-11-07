
var ati = Ie(function (alc, oti) {
  var nB = cr("fs"),
    S5 = cr("path"),
    BFo = cr("events").EventEmitter,
    RFo = gSe();
  class r4e extends BFo {
    constructor(e) {
      e = e || {};
      super(e);
      if (
        ((this.path = S5.resolve(e.path || process.cwd())), (this.parent = e.parent || null), this.parent)
      ) {
        if (((this.result = this.parent.result), !this.parent.parent)) {
          let t = S5.basename(this.path),
            r = S5.basename(S5.dirname(this.path));
          this.result.add(/^@/.test(r) ? r + "/" + t : t);
        }
        ((this.root = this.parent.root), (this.packageJsonCache = this.parent.packageJsonCache));
      } else
        ((this.result = new Set()),
          (this.root = this.path),
          (this.packageJsonCache = e.packageJsonCache || new Map()));
      ((this.seen = new Set()),
        (this.didDone = !1),
        (this.children = 0),
        (this.node_modules = []),
        (this.package = null),
        (this.bundle = null));
    }
    addListener(e, t) {
      return this.on(e, t);
    }
    on(e, t) {
      let r = super.on(e, t);
      if (e === "done" && this.didDone) this.emit("done", this.result);
      return r;
    }
    done() {
      if (!this.didDone)
        if (((this.didDone = !0), !this.parent)) {
          let e = Array.from(this.result);
          ((this.result = e), this.emit("done", e));
        } else this.emit("done");
    }
    start() {
      let e = S5.resolve(this.path, "package.json");
      if (this.packageJsonCache.has(e)) this.onPackage(this.packageJsonCache.get(e));
      else this.readPackageJson(e);
      return this;
    }
    readPackageJson(e) {
      nB.readFile(e, (t, r) => (t ? this.done() : this.onPackageJson(e, r)));
    }
    onPackageJson(e, t) {
      try {
        this.package = RFo(JSON.parse(t + ""));
      } catch (r) {
        return this.done();
      }
      (this.packageJsonCache.set(e, this.package), this.onPackage(this.package));
    }
    allDepsBundled(e) {
      return Object.keys(e.dependencies || {}).concat(Object.keys(e.optionalDependencies || {}));
    }
    onPackage(e) {
      let t = this.parent ? this.allDepsBundled(e) : e.bundleDependencies || e.bundledDependencies || [],
        r = Array.from(new Set(Array.isArray(t) ? t : t === !0 ? this.allDepsBundled(e) : Object.keys(t)));
      if (!r.length) return this.done();
      ((this.bundle = r), this.readModules());
    }
    readModules() {
      WFo(this.path + "/node_modules", (e, t) => (e ? this.onReaddir([]) : this.onReaddir(t)));
    }
    onReaddir(e) {
      if (((this.node_modules = e), this.bundle.forEach((t) => this.childDep(t)), this.children === 0))
        this.done();
    }
    childDep(e) {
      if (this.node_modules.indexOf(e) !== -1) {
        if (!this.seen.has(e)) (this.seen.add(e), this.child(e));
      } else if (this.parent) this.parent.childDep(e);
    }
    child(e) {
      let t = this.path + "/node_modules/" + e;
      this.children += 1;
      let r = new r4e({ path: t, parent: this });
      (r.on("done", () => {
        if (--this.children === 0) this.done();
      }),
        r.start());
    }
  }
  class qEt extends r4e {
    start() {
      return (super.start(), this.done(), this);
    }
    readPackageJson(e) {
      try {
        this.onPackageJson(e, nB.readFileSync(e));
      } catch {}
      return this;
    }
    readModules() {
      try {
        this.onReaddir(VFo(this.path + "/node_modules"));
      } catch {
        this.onReaddir([]);
      }
    }
    child(e) {
      new qEt({ path: this.path + "/node_modules/" + e, parent: this }).start();
    }
  }
  var WFo = (e, t) => {
      nB.readdir(e, (r, s) => {
        if (r) t(r);
        else {
          let a = s.filter((H) => /^@/.test(H));
          if (!a.length) t(null, s);
          else {
            let H = s.filter((f) => !/^@/.test(f)),
              u = a.length;
            a.forEach((f) => {
              nB.readdir(e + "/" + f, (d, _) => {
                if (d || !_.length) H.push(f);
                else
                  H.push.apply(
                    H,
                    _.map((L) => f + "/" + L),
                  );
                if (--u === 0) t(null, H);
              });
            });
          }
        }
      });
    },
    VFo = (e) => {
      let t = nB.readdirSync(e),
        r = t.filter((a) => !/^@/.test(a)),
        s = t
          .filter((a) => /^@/.test(a))
          .map((a) => {
            try {
              let H = nB.readdirSync(e + "/" + a);
              return H.length ? H.map((u) => a + "/" + u) : [a];
            } catch (H) {
              return [a];
            }
          })
          .reduce((a, H) => a.concat(H), []);
      return r.concat(s);
    },
    GEt = (e, t) => {
      let r = new Promise((s, a) => {
        new r4e(e).on("done", s).on("error", a).start();
      });
      return t ? r.then((s) => t(null, s), t) : r;
    },
    qFo = (e) => new qEt(e).start().result;
  oti.exports = GEt;
  GEt.sync = qFo;
  GEt.BundleWalker = r4e;
  GEt.BundleWalkerSync = qEt;
});