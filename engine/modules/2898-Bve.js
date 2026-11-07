
var Bve = Ie(function (C$c, P$i) {
  var UHa = eB()("en"),
    ihr = (e, t) => e && t && e !== t,
    { log: shr } = mg(),
    NHa = e$i(),
    { readFile: FHa, readdir: BHa, readlink: RHa, rm: WHa, stat: N1t, writeFile: x$i } = cr("fs/promises"),
    { resolve: DN, basename: ahr, relative: VHa } = cr("path"),
    qHa = r$i(),
    ohr = o$i(),
    Fve = ky(),
    j$i = fN(),
    GHa = E$i(),
    XHa = y7e(),
    JHa = D$i(),
    S$i = [
      "name",
      "version",
      "lockfileVersion",
      "resolved",
      "integrity",
      "requires",
      "packages",
      "dependencies",
    ],
    U1t = /^https?:\/\/registry\.yarnpkg\.com\//,
    KHa = /^https?:\/\/registry\.npmjs\.org\//,
    zHa = (e) => {
      try {
        return Fve(e);
      } catch (t) {
        return {};
      }
    },
    bB = eX(),
    Nve = pqe(),
    { overrideResolves: T$i } = M$i(),
    v$i = [
      "version",
      "dependencies",
      "peerDependencies",
      "peerDependenciesMeta",
      "optionalDependencies",
      "bundleDependencies",
      "acceptDependencies",
      "funding",
      "engines",
      "os",
      "cpu",
      "libc",
      "_integrity",
      "license",
      "_hasShrinkwrap",
      "hasInstallScript",
      "bin",
      "deprecated",
      "workspaces",
    ],
    QHa = ["integrity", "inBundle", "hasShrinkwrap", "hasInstallScript"],
    b$i = (e, t) => {
      let r = e[t];
      if (r) {
        if (t === "license" && typeof r === "object" && r.type) return r.type;
        if (typeof r !== "object" || Object.keys(r).length) return r;
      }
      return null;
    },
    Hhr = async (e, t, r, s, a) => {
      let H = ahr(s),
        u = s !== e && H === "node_modules",
        f = s !== e && H.startsWith("@"),
        _ = s === e || u || f ? s : DN(s, "node_modules"),
        L = bB(e, s);
      a.add(L);
      let I;
      if (s === e) I = [{ name: "node_modules", isDirectory: () => !0 }];
      else {
        let { mtime: D } = await N1t(s);
        if (D > r) throw Error(`out of date, updated: ${L}`);
        if (!f && !u && !t.packages[L]) throw Error(`missing from lockfile: ${L}`);
        I = await BHa(_, { withFileTypes: !0 }).catch(() => []);
      }
      if (
        (await Promise.all(
          I.map(async (D) => {
            let S = DN(_, D.name);
            if (D.isDirectory() && !D.name.startsWith(".")) await Hhr(e, t, r, S, a);
            else if (D.isSymbolicLink()) {
              let T = DN(_, await RHa(S)),
                C = await N1t(T).catch(() => null);
              if ((a.add(bB(e, S)), C?.isDirectory() && !a.has(bB(e, T)))) await Hhr(e, t, r, T, a);
            }
          }),
        ),
        s !== e)
      )
        return;
      for (let D in t.packages) if (!a.has(D)) throw Error(`missing from node_modules: ${D}`);
    };
  class kae {
    static get defaultLockfileVersion() {
      return 3;
    }
    static load(e) {
      return new kae(e).load();
    }
    static get keyOrder() {
      return S$i;
    }
    static async reset(e) {
      let t = new kae(e);
      t.reset();
      let [r, s] = await t.resetFiles;
      if (t.hiddenLockfile) t.filename = DN(t.path, "node_modules/.package-lock.json");
      else if (t.shrinkwrapOnly || r) t.filename = DN(t.path, "npm-shrinkwrap.json");
      else t.filename = DN(t.path, "package-lock.json");
      return ((t.loadedFromDisk = !!(r || s)), (t.type = ahr(t.filename)), t);
    }
    static metaFromNode(e, t, r = {}) {
      if (e.isLink) return { resolved: bB(t, e.realpath), link: !0 };
      let s = {};
      for (let u of v$i) {
        let f = b$i(e.package, u);
        if (f) s[u.replace(/^_/, "")] = f;
      }
      let a = e.packageName;
      if (a && (e === e.root || a !== e.name || XHa(e.realpath) !== a)) s.name = a;
      if (e.isTop && e.package.devDependencies) s.devDependencies = e.package.devDependencies;
      for (let u of QHa) if (e[u]) s[u] = e[u];
      let H = Nve(e.resolved, e.path, t, !0);
      if (!H);
      else if (e.isRegistryDependency) s.resolved = T$i(H, r);
      else s.resolved = H;
      if (e.extraneous) s.extraneous = !0;
      else {
        if (e.peer) s.peer = !0;
        if (e.dev) s.dev = !0;
        if (e.optional) s.optional = !0;
        if (e.devOptional && !e.dev && !e.optional) s.devOptional = !0;
      }
      return s;
    }
    #e = new Map();
    constructor(e = {}) {
      let {
        path: t,
        indent: r = 2,
        newline: s = `
`,
        shrinkwrapOnly: a = !1,
        hiddenLockfile: H = !1,
        lockfileVersion: u,
        resolveOptions: f = {},
      } = e;
      if (H) this.lockfileVersion = 3;
      else if (u) this.lockfileVersion = parseInt(u, 10);
      else this.lockfileVersion = null;
      ((this.tree = null),
        (this.path = DN(t || ".")),
        (this.filename = null),
        (this.data = null),
        (this.indent = r),
        (this.newline = s),
        (this.loadedFromDisk = !1),
        (this.type = null),
        (this.yarnLock = null),
        (this.hiddenLockfile = H),
        (this.loadingError = null),
        (this.resolveOptions = f),
        (this.shrinkwrapOnly = a));
    }
    checkYarnLock(e, t = {}) {
      e = Fve(e);
      let { yarnLock: r, loadedFromDisk: s } = this,
        H = r && !s && r.entries.get(e.raw);
      if (H && H.version) {
        let { resolved: u, version: f, integrity: d } = H,
          _ = e.registry && U1t.test(u),
          I = (e.registry && !_ && KHa.test(u)) || _,
          D = (I && ohr(e.name, u)) || {},
          S = u;
        if (D.name === e.name && D.version === f) S = f;
        else if (I && D.name && D.version) S = `npm:${D.name}@${D.version}`;
        if (S)
          return (
            (t.resolved = u.replace(U1t, "https://registry.npmjs.org/")),
            (t.integrity = d),
            Fve(`${e.name}@${S}`)
          );
      }
      return e;
    }
    reset() {
      ((this.tree = null), (this.#e = new Map()));
      let e = this.lockfileVersion || 3;
      ((this.originalLockfileVersion = e),
        (this.data = { lockfileVersion: e, requires: !0, packages: {}, dependencies: {} }));
    }
    get #r() {
      if (this.shrinkwrapOnly) return [`${this.path}/npm-shrinkwrap.json`];
      if (this.hiddenLockfile) return [`${this.path}/node_modules/.package-lock.json`];
      return [`${this.path}/npm-shrinkwrap.json`, `${this.path}/package-lock.json`, `${this.path}/yarn.lock`];
    }
    get loadFiles() {
      return Promise.all(
        this.#r.map(
          (e) =>
            e &&
            FHa(e, "utf8").then(
              (t) => t,
              (t) => {
                if (t.code === "ENOENT") return "";
                else throw t;
              },
            ),
        ),
      );
    }
    get resetFiles() {
      return Promise.all(
        this.#r.slice(0, 2).map(
          (e) =>
            e &&
            N1t(e).then(
              (t) => t.isFile(),
              (t) => {
                if (t.code === "ENOENT") return null;
                else throw t;
              },
            ),
        ),
      );
    }
    inferFormattingOptions(e) {
      let { [Symbol.for("indent")]: t, [Symbol.for("newline")]: r } = e;
      if (t !== void 0) this.indent = t;
      if (r !== void 0) this.newline = r;
    }
    async load() {
      let e;
      try {
        let [r, s, a] = await this.loadFiles;
        if (((e = r || s || "{}"), this.hiddenLockfile))
          this.filename = DN(this.path, "node_modules/.package-lock.json");
        else if (this.shrinkwrapOnly || r) this.filename = DN(this.path, "npm-shrinkwrap.json");
        else this.filename = DN(this.path, "package-lock.json");
        if (((this.type = ahr(this.filename)), (this.loadedFromDisk = Boolean(r || s)), a)) {
          this.yarnLock = new NHa();
          try {
            this.yarnLock.parse(a);
          } catch {}
        }
        if (((e = GHa(e)), this.inferFormattingOptions(e), this.hiddenLockfile && e.packages)) {
          let H = +(await N1t(this.filename)).mtime + 10;
          await Hhr(this.path, e, H, this.path, new Set());
        }
      } catch (r) {
        if (typeof this.filename === "string") {
          let s = bB(this.path, this.filename);
          shr.verbose("shrinkwrap", `failed to load ${s}`, r.message);
        } else shr.verbose("shrinkwrap", `failed to load ${this.path}`, r.message);
        ((this.loadingError = r), (this.loadedFromDisk = !1), (this.ancientLockfile = !1), (e = {}));
      }
      let t = 3;
      if (this.lockfileVersion) t = this.lockfileVersion;
      else if (e.lockfileVersion && e.lockfileVersion !== 1) t = e.lockfileVersion;
      if (
        ((this.data = {
          ...e,
          lockfileVersion: t,
          requires: !0,
          packages: e.packages || {},
          dependencies: e.dependencies || {},
        }),
        (this.originalLockfileVersion = e.lockfileVersion),
        !this.lockfileVersion)
      )
        this.lockfileVersion = this.data.lockfileVersion = t;
      if (
        ((this.ancientLockfile = this.loadedFromDisk && !(e.lockfileVersion >= 2) && !e.requires),
        e.dependencies && !e.packages)
      ) {
        let r;
        try {
          ((r = await j$i.normalize(this.path)), (r = r.content));
        } catch {
          r = {};
        }
        (this.#t("", null, this.data), this.#n(r));
      }
      return this;
    }
    #t(e, t, r) {
      let s = this.#c(e, t, r);
      if (s.link) e = s.resolved;
      if (r.dependencies)
        for (let a in r.dependencies) {
          let H = e + (e ? "/" : "") + "node_modules/" + a;
          this.#t(H, a, r.dependencies[a]);
        }
    }
    #n(e) {
      let t = this.data.packages[""];
      for (let r of v$i) {
        let s = b$i(e, r);
        if (s) t[r.replace(/^_/, "")] = s;
      }
      for (let r in this.data.packages) {
        let s = this.data.packages[r];
        if (!s.requires || !r) continue;
        for (let a in s.requires) {
          let H = this.#i(r, a),
            u = "dependencies";
          if (H?.optional && !s.optional) u = "optionalDependencies";
          else if (H?.dev && !s.dev) u = "devDependencies";
          if (!s[u]) s[u] = {};
          s[u][a] = s.requires[a];
        }
        delete s.requires;
      }
    }
    #i(e, t) {
      for (let r = e; ; r = r.replace(/(^|\/)[^/]*$/, "")) {
        let s = `${r}${r ? "/" : ""}node_modules/${t}`;
        if (this.data.packages[s]) return this.data.packages[s];
        if (!r) break;
      }
      return null;
    }
    #s(e, t, r = 0) {
      if (!e) return null;
      if (t[r] === "") r++;
      if (r >= t.length) return e;
      if (!e.dependencies) return null;
      return this.#s(e.dependencies[t[r]], t, r + 1);
    }
    #a(e) {
      return bB(this.path, DN(this.path, e));
    }
    delete(e) {
      if (!this.data) throw Error("run load() before getting or setting data");
      let t = this.#a(e);
      (this.#e.delete(t), delete this.data.packages[t]);
      let r = t.split(/(?:^|\/)node_modules\//),
        s = r.pop(),
        a = this.#s(this.data, r);
      if (a && a.dependencies) delete a.dependencies[s];
    }
    get(e) {
      if (!this.data) throw Error("run load() before getting or setting data");
      let t = this.#a(e);
      if (this.#e.has(t)) this.#H(t);
      if (this.data.packages[t]) return this.data.packages[t];
      let r = t.split(/(?:^|\/)node_modules\//),
        s = r[r.length - 1],
        a = this.#s(this.data, r);
      return this.#c(t, s, a);
    }
    #c(e, t, r) {
      if (!r) return {};
      let s = qHa(t, r, this.path);
      if (s.type === "directory") {
        let H = bB(this.path, s.fetchSpec);
        if (((this.data.packages[e] = { link: !0, resolved: H }), !this.data.packages[H]))
          this.#c(H, t, { ...r, version: null });
        return this.data.packages[e];
      }
      let a = {};
      if (r.requires && typeof r.requires === "object") a.requires = r.requires;
      if (r.optional) a.optional = !0;
      if (r.dev) a.dev = !0;
      if (e === "") a.name = r.name;
      if (r.integrity) a.integrity = r.integrity;
      if (r.version && !r.integrity) {
        if (s.type === "git")
          return ((a.resolved = Nve(s, this.path, this.path)), (this.data.packages[e] = a));
        else if (s.registry) a.version = r.version;
      }
      if (r.resolved || (s.type && !s.registry)) {
        if (s.registry) a.resolved = r.resolved;
        else if (s.type === "file") a.resolved = Nve(s, this.path, this.path, !0);
        else if (s.fetchSpec) a.resolved = s.fetchSpec;
      }
      if (!a.version) {
        if (s.type === "file" || s.type === "remote") {
          let H = ohr(s.name, s.fetchSpec) || ohr(s.name, a.resolved);
          if (H) {
            if (((a.version = H.version), H.name !== t)) a.name = H.name;
          }
        } else if (s.type === "alias") ((a.name = s.subSpec.name), (a.version = s.subSpec.fetchSpec));
        else if (s.type === "version") a.version = s.fetchSpec;
      }
      if (r.bundled) a.inBundle = !0;
      return (this.data.packages[e] = a);
    }
    add(e) {
      if (!this.data) throw Error("run load() before getting or setting data");
      let t = bB(this.path, e.path);
      if (e.path === this.path) this.tree = e;
      if (e.resolved === null || e.integrity === null) {
        let { resolved: r, integrity: s, hasShrinkwrap: a, version: H } = this.get(e.path),
          u = null;
        if (r)
          if (!/^file:/.test(r)) u = r;
          else u = `file:${DN(this.path, r.slice(5))}`;
        let f = !r || !e.resolved || e.resolved === u,
          d = !s || !e.integrity || e.integrity === s,
          _ = !H || !e.version || H === e.version;
        if ((r || s || H) && f && d && _)
          ((e.resolved = e.resolved || u || null),
            (e.integrity = e.integrity || s || null),
            (e.hasShrinkwrap = e.hasShrinkwrap || a || !1));
        else {
          let {
            resolved: I,
            integrity: D,
            hasShrinkwrap: S,
          } = kae.metaFromNode(e, this.path, this.resolveOptions);
          ((e.resolved = e.resolved || I || null),
            (e.integrity = e.integrity || D || null),
            (e.hasShrinkwrap = e.hasShrinkwrap || S || !1));
        }
      }
      this.#e.set(t, e);
    }
    addEdge(e) {
      if (!this.yarnLock || !e.valid) return;
      let { to: t } = e;
      if (t.resolved !== null && t.integrity !== null) return;
      if (!this.yarnLock.entries || !this.yarnLock.entries.size) return;
      let r = null;
      if (t.resolved)
        if (!/file:/.test(t.resolved)) r = t.resolved;
        else r = Nve(t.resolved, t.path, this.path, !0);
      let s = Fve(`${t.name}@${e.spec}`),
        a = this.yarnLock.entries.get(`${t.name}@${e.spec}`);
      if (!a || ihr(t.version, a.version) || ihr(t.integrity, a.integrity) || ihr(r, a.resolved)) return;
      if (a.resolved && U1t.test(a.resolved) && s.registry)
        a.resolved = a.resolved.replace(U1t, "https://registry.npmjs.org/");
      ((t.integrity = t.integrity || a.integrity || null),
        (t.resolved = t.resolved || Nve(a.resolved, this.path, t.path) || null),
        this.#e.set(bB(this.path, t.path), t));
    }
    #H(e) {
      let t = this.#e.get(e);
      (this.#e.delete(e), (this.data.packages[e] = kae.metaFromNode(t, this.path, this.resolveOptions)));
    }
    commit() {
      if (this.tree) {
        if (this.yarnLock) this.yarnLock.fromTree(this.tree);
        let e = kae.metaFromNode(this.tree.target, this.path, this.resolveOptions);
        if (((this.data.packages = {}), Object.keys(e).length)) this.data.packages[""] = e;
        for (let t of this.tree.root.inventory.values()) {
          if (t === this.tree || t.isRoot || t.location === "") continue;
          let r = bB(this.path, t.path);
          this.data.packages[r] = kae.metaFromNode(t, this.path, this.resolveOptions);
        }
      } else if (this.#e.size > 0) for (let e of this.#e.keys()) this.#H(e);
      if (!this.lockfileVersion) this.lockfileVersion = 3;
      if (((this.data.lockfileVersion = this.lockfileVersion), this.hiddenLockfile))
        (delete this.data.packages[""], delete this.data.dependencies);
      else if (this.tree && this.lockfileVersion <= 3) this.#f(this.tree, this.data);
      if (this.lockfileVersion >= 3) {
        let { dependencies: e, ...t } = this.data;
        return t;
      } else if (this.lockfileVersion < 2) {
        let { packages: e, ...t } = this.data;
        return t;
      } else return { ...this.data };
    }
    #f(e, t, r = []) {
      if (e === this.tree) {
        if (((t.name = e.packageName || e.name), e.version)) t.version = e.version;
      }
      let s = [...e.edgesIn]
          .filter((_) => _.valid)
          .sort((_, L) => {
            let I = _.from.location.split("node_modules"),
              D = L.from.location.split("node_modules");
            if (I.length > D.length) return 1;
            if (D.length > I.length) return -1;
            return UHa(I[I.length - 1], D[D.length - 1]);
          })[0],
        a = Nve(e.resolved, this.path, this.path, !0),
        H = zHa(a),
        u = H;
      if (s) u = Fve.resolve(e.name, s.spec, s.from.realpath);
      if (e.isLink) t.version = `file:${bB(this.path, e.realpath)}`;
      else if (u && (u.type === "file" || u.type === "remote")) t.version = u.saveSpec;
      else if ((u && u.type === "git") || H.type === "git") {
        if (((t.version = e.resolved), u.raw)) t.from = u.raw;
      } else if (!e.isRoot && e.package && e.packageName && e.packageName !== e.name)
        t.version = `npm:${e.packageName}@${e.version}`;
      else if (e.package && e.version) t.version = e.version;
      if (e.inDepBundle) t.bundled = !0;
      if (
        e.resolved &&
        !e.isLink &&
        H.type !== "git" &&
        H.type !== "file" &&
        H.type !== "directory" &&
        u.type !== "directory" &&
        u.type !== "git" &&
        u.type !== "file" &&
        u.type !== "remote"
      )
        t.resolved = T$i(e.resolved, this.resolveOptions);
      if (e.integrity) t.integrity = e.integrity;
      if (e.extraneous) t.extraneous = !0;
      else if (!e.isLink) {
        if (e.peer) t.peer = !0;
        if (e.devOptional && !e.dev && !e.optional) t.devOptional = !0;
        if (e.dev) t.dev = !0;
        if (e.optional) t.optional = !0;
      }
      let f = e.target;
      if (f.edgesOut.size > 0)
        if (e !== this.tree) {
          let _ = [...f.edgesOut.entries()];
          t.requires = _.reduce((L, [I, D]) => {
            let { spec: S, peer: T } = D;
            if (T) return L;
            if (S.startsWith("file:")) {
              let C = DN(e.realpath, S.slice(5));
              L[I] = `file:${bB(e.realpath, C)}`;
            } else L[I] = S;
            return L;
          }, {});
        } else t.requires = !0;
      let { children: d } = e.target;
      if (!d.size) delete t.dependencies;
      else {
        let _ = [...r, e.realpath],
          L = {},
          I = !1;
        for (let [D, S] of d.entries()) {
          if (r.includes(S.realpath)) continue;
          ((L[D] = this.#f(S, {}, _)), (I = !0));
        }
        if (I) t.dependencies = L;
      }
      return t;
    }
    toJSON() {
      if (!this.data) throw Error("run load() before getting or setting data");
      return this.commit();
    }
    toString(e = {}) {
      let t = this.toJSON(),
        { format: r = !0 } = e,
        s = this.indent || 2,
        a = r === !0 ? s : r || 0,
        H = r
          ? this.newline ||
            `
`
          : "";
      return JHa(t, S$i, a).replace(/\n/g, H);
    }
    save(e = {}) {
      if (!this.data) throw Error("run load() before saving data");
      let t = this.toString(e);
      if (
        !this.hiddenLockfile &&
        this.originalLockfileVersion !== void 0 &&
        this.originalLockfileVersion !== this.lockfileVersion
      )
        shr.warn(
          "shrinkwrap",
          `Converting lock file (${VHa(process.cwd(), this.filename)}) from v${this.originalLockfileVersion} -> v${this.lockfileVersion}`,
        );
      return Promise.all([
        x$i(this.filename, t).catch((r) => {
          if (this.hiddenLockfile) return WHa(this.filename, { recursive: !0, force: !0 });
          throw r;
        }),
        this.yarnLock &&
          this.yarnLock.entries.size &&
          x$i(this.path + "/yarn.lock", this.yarnLock.toString()),
      ]);
    }
  }
  P$i.exports = kae;
});