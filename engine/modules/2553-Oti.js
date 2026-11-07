
var Oti = Ie(function (afc, kti) {
  var { Walker: x2o } = vti(),
    { lstatSync: S2o, readFileSync: T2o } = cr("fs"),
    {
      basename: bti,
      dirname: v2o,
      extname: jti,
      join: eTe,
      relative: ZSe,
      resolve: b2o,
      sep: j2o,
    } = cr("path"),
    { log: P2o } = mg(),
    A4e = Symbol("npm-packlist.rules.default"),
    YSe = Symbol("npm-packlist.rules.strict"),
    C2o = (e) => /\*/.test(e),
    w2o = [
      ".npmignore",
      ".gitignore",
      "**/.git",
      "**/.svn",
      "**/.hg",
      "**/CVS",
      "**/.git/**",
      "**/.svn/**",
      "**/.hg/**",
      "**/CVS/**",
      "/.lock-wscript",
      "/.wafpickle-*",
      "/build/config.gypi",
      "npm-debug.log",
      "**/.npmrc",
      ".*.swp",
      ".DS_Store",
      "**/.DS_Store/**",
      "._*",
      "**/._*/**",
      "*.orig",
      "/archived-packages/**",
    ],
    Pti = ["/.git"],
    QEt = (e) => e.split("\\").join("/"),
    Cti = (e, t, r = []) => {
      for (let u of [".npmignore", ".gitignore"])
        try {
          let f = T2o(eTe(e, u), { encoding: "utf8" });
          r.push(f);
          break;
        } catch (f) {
          if (f.code !== "ENOENT") throw f;
        }
      if (!t) return r;
      let s = t.split(j2o, 1)[0],
        a = eTe(e, s),
        H = ZSe(a, eTe(e, t));
      return Cti(a, H, r);
    };
  class u4e extends x2o {
    constructor(e, t) {
      let r = {
        ...t,
        includeEmpty: !1,
        follow: !1,
        path: b2o(t?.path || e.path).replace(/\\/g, "/"),
        ignoreFiles: t?.ignoreFiles || [A4e, "package.json", ".npmignore", ".gitignore", YSe],
      };
      super(r);
      ((this.isPackage = r.isPackage),
        (this.seen = r.seen || new Set()),
        (this.tree = e),
        (this.requiredFiles = r.requiredFiles || []));
      let s = [];
      if (r.prefix && r.workspaces) {
        let a = QEt(r.path),
          H = QEt(r.prefix),
          u = r.workspaces.map((f) => QEt(f));
        if (a !== H && u.includes(a)) {
          let f = ZSe(r.prefix, v2o(r.path));
          s.push(...Cti(r.prefix, f));
        } else if (a === H) s.push(...u.map((f) => QEt(ZSe(r.path, f))));
      }
      if ((this.injectRules(A4e, [...w2o, ...s]), !this.isPackage))
        this.injectRules(YSe, [...Pti, ...this.requiredFiles.map((a) => `!${a}`)]);
    }
    addIgnoreFile(e, t) {
      if (e !== "package.json" || !this.isPackage) return super.addIgnoreFile(e, t);
      return this.processPackage(t);
    }
    emit(e, t) {
      if (e !== "done" || !this.isPackage) return super.emit(e, t);
      return (
        this.gatherBundles().then(() => {
          super.emit("done", this.result);
        }),
        !0
      );
    }
    filterEntries() {
      if (this.ignoreRules["package.json"])
        ((this.ignoreRules[".npmignore"] = null), (this.ignoreRules[".gitignore"] = null));
      else if (this.ignoreRules[".npmignore"]) this.ignoreRules[".gitignore"] = null;
      else if (this.ignoreRules[".gitignore"] && !this.ignoreRules[".npmignore"] && !this.parent)
        P2o.warn(
          "gitignore-fallback",
          "No .npmignore file found, using .gitignore for file exclusion. Consider creating a .npmignore file to explicitly control published files.",
        );
      return super.filterEntries();
    }
    onstat(e, t) {
      if (!e.st.isFile() && !e.st.isDirectory()) return t();
      return super.onstat(e, t);
    }
    stat(e, t) {
      if (C2o(e.entry)) return t();
      return super.stat(e, t);
    }
    walkerOpt(e, t) {
      let r = null;
      if (this.tree.workspaces) {
        let s = [...this.tree.workspaces.values()].map((H) => H.replace(/\\/g, "/")),
          a = eTe(this.path, e).replace(/\\/g, "/");
        if (s.includes(a)) r = [A4e, "package.json", ".npmignore", ".gitignore", YSe];
      } else r = [A4e, ".npmignore", ".gitignore", YSe];
      return {
        ...super.walkerOpt(e, t),
        ignoreFiles: r,
        requiredFiles: this.requiredFiles
          .map((s) => {
            if (ZSe(s, e) === "..") return ZSe(e, s).replace(/\\/g, "/");
            return !1;
          })
          .filter(Boolean),
      };
    }
    walker(e, t, r) {
      new u4e(this.tree, this.walkerOpt(e, t)).on("done", r).start();
    }
    sort(e, t) {
      let r = jti(e).toLowerCase(),
        s = jti(t).toLowerCase(),
        a = bti(e).toLowerCase(),
        H = bti(t).toLowerCase();
      return r.localeCompare(s, "en") || a.localeCompare(H, "en") || e.localeCompare(t, "en");
    }
    injectRules(e, t, r = () => {}) {
      this.onReadIgnoreFile(
        e,
        `${t.join(`
`)}
`,
        r,
      );
    }
    processPackage(e) {
      let { bin: t, browser: r, files: s, main: a } = this.tree.package,
        H = [],
        u = [
          ...Pti,
          "!/package.json",
          "!/readme{,.*[^~$]}",
          "!/copying{,.*[^~$]}",
          "!/license{,.*[^~$]}",
          "!/licence{,.*[^~$]}",
          "/.git",
          "/node_modules",
          ".npmrc",
          "/package-lock.json",
          "/yarn.lock",
          "/pnpm-lock.yaml",
          "/bun.lockb",
        ];
      if (s) {
        for (let f of s) {
          if (f.startsWith("./")) f = f.slice(1);
          if (f.endsWith("/*")) f += "*";
          let d = `!${f}`;
          try {
            let _ = S2o(eTe(this.path, f.replace(/^!+/, "")).replace(/\\/g, "/"));
            if (_.isFile()) (u.unshift(d), this.requiredFiles.push(f.startsWith("/") ? f.slice(1) : f));
            else if (_.isDirectory()) (H.push(d), H.push(`${d}/**`));
          } catch (_) {
            H.push(d);
          }
        }
        this.injectRules("package.json", ["*", ...H]);
      }
      if (r) u.push(`!/${r}`);
      if (a) u.push(`!/${a}`);
      if (t) for (let f in t) u.push(`!/${t[f]}`);
      this.injectRules(YSe, u, e);
    }
    async gatherBundles() {
      if (this.seen.has(this.tree)) return;
      this.seen.add(this.tree);
      let e;
      if (this.tree.isProjectRoot) {
        let { bundleDependencies: t } = this.tree.package;
        e = t || [];
      } else {
        let { dependencies: t, optionalDependencies: r } = this.tree.package;
        e = Object.keys(t || {}).concat(Object.keys(r || {}));
      }
      for (let t of e) {
        let r = this.tree.edgesOut.get(t);
        if (!r || r.peer || r.dev) continue;
        let s = this.tree.edgesOut.get(t).to;
        if (!s) continue;
        let { path: a, target: H } = s,
          u = { path: a, isPackage: !0, ignoreFiles: [], seen: this.seen };
        if (s.isLink) u.ignoreFiles.push(A4e);
        if ((u.ignoreFiles.push("package.json"), s.isLink))
          (u.ignoreFiles.push(".npmignore"), u.ignoreFiles.push(".gitignore"));
        u.ignoreFiles.push(YSe);
        let f = new u4e(H, u),
          d = await new Promise((L, I) => {
            (f.on("error", I), f.on("done", L), f.start());
          }),
          _ = ZSe(this.root, f.path);
        for (let L of d) this.result.add(eTe(_, L).replace(/\\/g, "/"));
      }
    }
  }
  var wti = (e, t, r) => {
    if (typeof t === "function") ((r = t), (t = {}));
    let s = new Promise((a, H) => {
      new u4e(e, { ...t, isPackage: !0 }).on("done", a).on("error", H).start();
    });
    return r ? s.then((a) => r(null, a), r) : s;
  };
  kti.exports = wti;
  wti.Walker = u4e;
});