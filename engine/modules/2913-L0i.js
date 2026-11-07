
var L0i = Ie(function (K$c, h0i) {
  var { resolve: p0i } = cr("path"),
    { homedir: AAa } = cr("os"),
    { depth: uAa } = Poe(),
    lAa = eEt(),
    { log: Chr, time: d0i } = mg(),
    { saveTypeMap: fAa } = HEt(),
    m0i = Emr(),
    pAa = eX(),
    dAa = Pmi(),
    mAa = [Xmi(), egi(), lgi(), _gi(), Mgi(), H0i(), f0i()],
    _Aa = Symbol.for("setWorkspaces"),
    hAa = mAa.reduce((e, t) => t(e), cr("events")),
    LAa = (e) => {
      if (e === 1 || e === 2 || e === 3) return e;
      if (e === void 0 || e === null) return null;
      throw TypeError("Invalid lockfileVersion config: " + e);
    };
  class _0i extends hAa {
    constructor(e = {}) {
      let t = d0i.start("arborist:ctor");
      super(e);
      let r = e.registry || "https://registry.npmjs.org";
      e.registry = this.registry = r.replace(/(?<!\/)\/+$/, "") + "/";
      let {
        actualTree: s,
        global: a,
        idealTree: H = null,
        installLinks: u = !1,
        legacyPeerDeps: f = !1,
        virtualTree: d,
        workspaces: _,
      } = e;
      if (_?.length && a) throw Error("Cannot operate on workspaces in global mode");
      if (
        ((this.actualTree = s),
        (this.idealTree = H),
        (this.installLinks = u),
        (this.legacyPeerDeps = f),
        (this.virtualTree = d),
        (this.options = {
          nodeVersion: process.version,
          ...e,
          Arborist: this.constructor,
          binLinks: "binLinks" in e ? !!e.binLinks : !0,
          cache: e.cache || `${AAa()}/.npm/_cacache`,
          dryRun: !!e.dryRun,
          formatPackageLock: "formatPackageLock" in e ? !!e.formatPackageLock : !0,
          force: !!e.force,
          global: !!e.global,
          ignoreScripts: !!e.ignoreScripts,
          installStrategy: e.global ? "shallow" : e.installStrategy ? e.installStrategy : "hoisted",
          lockfileVersion: LAa(e.lockfileVersion),
          packageLockOnly: !!e.packageLockOnly,
          packumentCache: e.packumentCache || new dAa(),
          path: e.path || ".",
          rebuildBundle: "rebuildBundle" in e ? !!e.rebuildBundle : !0,
          replaceRegistryHost: e.replaceRegistryHost,
          savePrefix: "savePrefix" in e ? e.savePrefix : "^",
          scriptShell: e.scriptShell,
          usePackageLock: "packageLock" in e ? e.packageLock : !0,
          workspaces: e.workspaces || [],
          workspacesEnabled: e.workspacesEnabled !== !1,
        }),
        (this.replaceRegistryHost = this.options.replaceRegistryHost =
          !this.options.replaceRegistryHost || this.options.replaceRegistryHost === "npmjs"
            ? "registry.npmjs.org"
            : this.options.replaceRegistryHost),
        e.saveType && !fAa.get(e.saveType))
      )
        throw Error(`Invalid saveType ${e.saveType}`);
      ((this.cache = p0i(this.options.cache)),
        (this.diff = null),
        (this.path = p0i(this.options.path)),
        (this.scriptsRun = new Set()),
        t());
    }
    workspaceNodes(e, t) {
      let r = e.workspaces;
      if (!r) return (Chr.warn("workspaces", "filter set, but no workspaces present"), []);
      let s = [];
      for (let a of t) {
        let H = r.get(a);
        if (!H) {
          Chr.warn("workspaces", `${a} in filter set, but not in workspaces`);
          continue;
        }
        let u = pAa(e.realpath, H),
          f = e.inventory.get(u);
        if (!f) {
          Chr.warn("workspaces", `${a} in filter set, but no workspace folder present`);
          continue;
        }
        s.push(f);
      }
      return s;
    }
    workspaceDependencySet(e, t, r) {
      let s = this.workspaceNodes(e, t);
      if (r) {
        for (let u of e.edgesOut.values()) if (u.type !== "workspace" && u.to) s.push(u.to);
      }
      let a = new Set(s),
        H = new Set();
      for (let u of a) {
        for (let f of u.edgesOut.values()) {
          let d = f.to;
          if (d) {
            if ((a.add(d), d.isLink)) a.add(d.target);
          }
        }
        for (let f of u.children.values()) if (f.extraneous) H.add(f);
      }
      for (let u of H) a.add(u);
      return a;
    }
    excludeWorkspacesDependencySet(e) {
      let t = new Set();
      return (
        uAa({
          tree: e,
          visit: (r) => {
            for (let { to: s } of r.edgesOut.values()) {
              if (!s || s.isWorkspace) continue;
              for (let a of s.edgesIn.values()) if (a.from.isRoot || t.has(a.from)) t.add(s);
            }
            return r;
          },
          filter: (r) => r,
          getChildren: (r, s) => [...s.edgesOut.values()].map((a) => a.to),
        }),
        t
      );
    }
    async [_Aa](e) {
      let t = await lAa({ cwd: e.path, pkg: e.package });
      if (e && t.size) e.workspaces = t;
      return e;
    }
    async audit(e = {}) {
      if ((this.addTracker("audit"), this.options.global))
        throw Object.assign(Error("`npm audit` does not support testing globals"), { code: "EAUDITGLOBAL" });
      e = { ...this.options, ...e };
      let t = d0i.start("audit"),
        r;
      if (e.packageLock === !1) (await this.loadActual(e), await this.buildIdealTree(), (r = this.idealTree));
      else r = await this.loadVirtual();
      if (this.options.workspaces.length)
        e.filterSet = this.workspaceDependencySet(
          r,
          this.options.workspaces,
          this.options.includeWorkspaceRoot,
        );
      if (!e.workspacesEnabled) e.filterSet = this.excludeWorkspacesDependencySet(r);
      this.auditReport = await m0i.load(r, e);
      let s = e.fix ? this.reify(e) : this.auditReport;
      return (t(), this.finishTracker("audit"), s);
    }
    async dedupe(e = {}) {
      e = { ...this.options, ...e };
      let t = await this.loadVirtual().catch(() => this.loadActual()),
        r = [];
      for (let s of t.inventory.query("name")) if (t.inventory.query("name", s).size > 1) r.push(s);
      return this.reify({ ...e, preferDedupe: !0, update: { names: r } });
    }
  }
  h0i.exports = _0i;
});