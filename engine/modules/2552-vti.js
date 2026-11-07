
var vti = Ie(function (ofc, Tti) {
  var nP = cr("fs"),
    QSe = cr("path"),
    D2o = cr("events").EventEmitter,
    y2o = v7e().Minimatch;
  class c4e extends D2o {
    constructor(e) {
      e = e || {};
      super(e);
      ((this.isSymbolicLink = e.isSymbolicLink),
        (this.path = e.path || process.cwd()),
        (this.basename = QSe.basename(this.path)),
        (this.ignoreFiles = e.ignoreFiles || [".ignore"]),
        (this.ignoreRules = {}),
        (this.parent = e.parent || null),
        (this.includeEmpty = !!e.includeEmpty),
        (this.root = this.parent ? this.parent.root : this.path),
        (this.follow = !!e.follow),
        (this.result = this.parent ? this.parent.result : new Set()),
        (this.entries = null),
        (this.sawError = !1),
        (this.exact = e.exact));
    }
    sort(e, t) {
      return e.localeCompare(t, "en");
    }
    emit(e, t) {
      let r = !1;
      if (!(this.sawError && e === "error")) {
        if (e === "error") this.sawError = !0;
        else if (e === "done" && !this.parent)
          ((t = Array.from(t)
            .map((s) => (/^@/.test(s) ? `./${s}` : s))
            .sort(this.sort)),
            (this.result = t));
        if (e === "error" && this.parent) r = this.parent.emit("error", t);
        else r = super.emit(e, t);
      }
      return r;
    }
    start() {
      return (nP.readdir(this.path, (e, t) => (e ? this.emit("error", e) : this.onReaddir(t))), this);
    }
    isIgnoreFile(e) {
      return e !== "." && e !== ".." && this.ignoreFiles.indexOf(e) !== -1;
    }
    onReaddir(e) {
      if (((this.entries = e), e.length === 0)) {
        if (this.includeEmpty) this.result.add(this.path.slice(this.root.length + 1));
        this.emit("done", this.result);
      } else if (this.entries.some((r) => this.isIgnoreFile(r))) this.addIgnoreFiles();
      else this.filterEntries();
    }
    addIgnoreFiles() {
      let e = this.entries.filter((s) => this.isIgnoreFile(s)),
        t = e.length,
        r = () => {
          if (--t === 0) this.filterEntries();
        };
      e.forEach((s) => this.addIgnoreFile(s, r));
    }
    addIgnoreFile(e, t) {
      let r = QSe.resolve(this.path, e);
      nP.readFile(r, "utf8", (s, a) => (s ? this.emit("error", s) : this.onReadIgnoreFile(e, a, t)));
    }
    onReadIgnoreFile(e, t, r) {
      let s = { matchBase: !0, dot: !0, flipNegate: !0, nocase: !0 },
        a = t
          .split(/\r?\n/)
          .filter((H) => !/^#|^$/.test(H.trim()))
          .map((H) => new y2o(H.trim(), s));
      ((this.ignoreRules[e] = a), r());
    }
    filterEntries() {
      let e = this.entries
          .map((r) => {
            let s = this.filterEntry(r),
              a = this.filterEntry(r, !0);
            return s || a ? [r, s, a] : !1;
          })
          .filter((r) => r),
        t = e.length;
      if (t === 0) this.emit("done", this.result);
      else {
        let r = () => {
          if (--t === 0) this.emit("done", this.result);
        };
        e.forEach((s) => {
          let a = s[0],
            H = s[1],
            u = s[2];
          this.stat({ entry: a, file: H, dir: u }, r);
        });
      }
    }
    onstat({ st: e, entry: t, file: r, dir: s, isSymbolicLink: a }, H) {
      let u = this.path + "/" + t;
      if (!e.isDirectory()) {
        if (r) this.result.add(u.slice(this.root.length + 1));
        H();
      } else if (s) this.walker(t, { isSymbolicLink: a, exact: r || this.filterEntry(t + "/") }, H);
      else H();
    }
    stat({ entry: e, file: t, dir: r }, s) {
      let a = this.path + "/" + e;
      nP.lstat(a, (H, u) => {
        if (H) this.emit("error", H);
        else {
          let f = u.isSymbolicLink();
          if (this.follow && f)
            nP.stat(a, (d, _) => {
              if (d) this.emit("error", d);
              else this.onstat({ st: _, entry: e, file: t, dir: r, isSymbolicLink: f }, s);
            });
          else this.onstat({ st: u, entry: e, file: t, dir: r, isSymbolicLink: f }, s);
        }
      });
    }
    walkerOpt(e, t) {
      return {
        path: this.path + "/" + e,
        parent: this,
        ignoreFiles: this.ignoreFiles,
        follow: this.follow,
        includeEmpty: this.includeEmpty,
        ...t,
      };
    }
    walker(e, t, r) {
      new c4e(this.walkerOpt(e, t)).on("done", r).start();
    }
    filterEntry(e, t, r) {
      let s = !0;
      if (this.parent && this.parent.filterEntry) {
        let a = this.basename + "/" + e,
          H = r || e;
        if (((s = this.parent.filterEntry(a, t, H)), !s && !this.exact)) return !1;
      }
      return (
        this.ignoreFiles.forEach((a) => {
          if (this.ignoreRules[a])
            this.ignoreRules[a].forEach((H) => {
              if (H.negate !== s) {
                let u = r && H.globParts.some((d) => d.length <= (d.slice(-1)[0] ? 1 : 2));
                if (
                  H.match("/" + e) ||
                  H.match(e) ||
                  (!!t &&
                    (H.match("/" + e + "/") ||
                      H.match(e + "/") ||
                      (H.negate && (H.match("/" + e, !0) || H.match(e, !0))) ||
                      (u &&
                        (H.match("/" + r + "/") ||
                          H.match(r + "/") ||
                          (H.negate && (H.match("/" + r, !0) || H.match(r, !0)))))))
                )
                  s = H.negate;
              }
            });
        }),
        s
      );
    }
  }
  class KEt extends c4e {
    start() {
      return (this.onReaddir(nP.readdirSync(this.path)), this);
    }
    addIgnoreFile(e, t) {
      let r = QSe.resolve(this.path, e);
      this.onReadIgnoreFile(e, nP.readFileSync(r, "utf8"), t);
    }
    stat({ entry: e, file: t, dir: r }, s) {
      let a = this.path + "/" + e,
        H = nP.lstatSync(a),
        u = H.isSymbolicLink();
      if (this.follow && u) H = nP.statSync(a);
      this.onstat({ st: H, entry: e, file: t, dir: r, isSymbolicLink: u }, s);
    }
    walker(e, t, r) {
      (new KEt(this.walkerOpt(e, t)).start(), r());
    }
  }
  var zEt = (e, t) => {
      let r = new Promise((s, a) => {
        new c4e(e).on("done", s).on("error", a).start();
      });
      return t ? r.then((s) => t(null, s), t) : r;
    },
    M2o = (e) => new KEt(e).start().result;
  Tti.exports = zEt;
  zEt.sync = M2o;
  zEt.Walker = c4e;
  zEt.WalkerSync = KEt;
});