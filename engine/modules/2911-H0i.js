
var H0i = Ie(function (X$c, a0i) {
  var eMt = fN(),
    r0i = jVe(),
    n0i = ky(),
    Xca = hlr(),
    i0i = Mve(),
    M8 = hhr(),
    Jca = tIt(),
    { callLimit: Kca } = Qyt(),
    { depth: Ihr } = Poe(),
    { dirname: Dhr, resolve: V_e, relative: qve, join: zca } = cr("path"),
    { log: KV, time: AT } = mg(),
    { lstat: yhr, mkdir: Gve, rm: Tqe, symlink: Qca } = cr("fs/promises"),
    { moveFile: Fgi } = Qme(),
    { subset: Bgi, intersects: Rgi } = Qj(),
    { walkUp: Yca } = f7e(),
    s0i = Emr(),
    o0i = jgi(),
    Zca = xqe(),
    Z1t = Tae(),
    eAa = kgi(),
    tAa = chr(),
    Wgi = eX(),
    Vgi = Ngi(),
    rAa = Tve(),
    { defaultLockfileVersion: nAa } = Bve(),
    { saveTypeMap: iAa, hasSubKey: Xve } = HEt(),
    qgi = Symbol.for("retireShallowNodes"),
    Q1t = Symbol.for("loadBundlesAndUpdateTrees"),
    Mhr = Symbol("submitQuickAudit"),
    Ggi = Symbol.for("unpackNewModules"),
    Xgi = Symbol.for("build"),
    Nae = Symbol.for("trashList"),
    Jgi = Symbol.for("handleOptionalFailure"),
    Kgi = Symbol.for("loadTrees"),
    sAa = Symbol.for("checkBins"),
    Y1t = Symbol.for("diffTrees"),
    xhr = Symbol.for("createSparseTree"),
    Shr = Symbol.for("loadShrinkwrapsAndUpdateTrees"),
    vqe = Symbol.for("reifyNode"),
    zgi = Symbol.for("updateAll"),
    Thr = Symbol.for("updateNames"),
    vhr = Symbol.for("moveContents"),
    Qgi = Symbol.for("moveBackRetiredUnchanged"),
    Ygi = Symbol.for("removeTrash"),
    Jve = Symbol.for("renamePath"),
    bhr = Symbol.for("rollbackRetireShallowNodes"),
    jhr = Symbol.for("rollbackCreateSparseTree"),
    Zgi = Symbol.for("rollbackMoveBackRetiredUnchanged"),
    e0i = Symbol.for("saveIdealTree"),
    t0i = Symbol.for("resolvedAdd"),
    bqe = Symbol.for("addNodeToTrashList"),
    oAa = Symbol.for("createIsolatedTree");
  a0i.exports = (e) =>
    class extends e {
      #e = new Set();
      #r = new Set();
      #t = new Set();
      #n;
      #i = {};
      #s = {};
      #a = new Set();
      #c = new Set();
      #H = new Set();
      constructor(r) {
        super(r);
        this[Nae] = new Set();
      }
      async reify(r = {}) {
        let s = (r.installStrategy || this.options.installStrategy) === "linked";
        if (this.options.packageLockOnly && this.options.global) {
          let u = Error("cannot generate lockfile for global packages");
          throw ((u.code = "ESHRINKWRAPGLOBAL"), u);
        }
        ((this.#n = new Set(r.omit)), this.addTracker("reify"));
        let a = AT.start("reify");
        if (!this.options.packageLockOnly && !this.options.dryRun)
          (await Gve(V_e(this.path), { recursive: !0 }), await this.#l(V_e(this.path, "node_modules")));
        await this[Kgi](r);
        let H = this.idealTree;
        if (s)
          (KV.warn("reify", 'The "linked" install strategy is EXPERIMENTAL and may contain bugs.'),
            (this.idealTree = await this[oAa]()));
        if ((await this[Y1t](), await this.#f(), s)) this.idealTree = H;
        await this[e0i](r);
        for (let u of this.idealTree.inventory.values()) if (u.inert) u.parent = null;
        for (let u of this[Nae]) {
          let f = Wgi(this.idealTree.realpath, u),
            d = this.idealTree.inventory.get(f);
          if (d && d.root === this.idealTree) d.parent = null;
        }
        if (this.diff && this.diff.filterSet.size) {
          let u = new Set(),
            { filterSet: f } = this.diff,
            d = new Set();
          for (let [_, L] of this.idealTree.inventory.entries()) {
            if ((d.add(_), f.has(L))) continue;
            let I = this.actualTree.inventory.get(_);
            if (!I) L.root = null;
            else {
              if ([...I.linksIn].some((T) => f.has(T))) {
                d.add(I.location);
                continue;
              }
              let { realpath: D, isLink: S } = I;
              if (S && L.isLink && L.realpath === D) continue;
              else u.add(I);
            }
          }
          for (let [_, L] of this.actualTree.inventory.entries()) {
            if (d.has(_)) continue;
            if ((d.add(_), f.has(L))) continue;
            u.add(L);
          }
          for (let _ of u) _.root = this.idealTree;
          for (let _ of this.idealTree.tops) if (_.linksIn.size === 0) _.root = null;
          Zca(this.idealTree);
        }
        if (
          ((this.idealTree.meta.filename = this.idealTree.realpath + "/node_modules/.package-lock.json"),
          (this.idealTree.meta.hiddenLockfile = !0),
          (this.idealTree.meta.lockfileVersion = nAa),
          (this.actualTree = this.idealTree),
          (this.idealTree = null),
          !this.options.global)
        ) {
          await this.actualTree.meta.save();
          let u = !!this.options.ignoreScripts;
          if (!this.options.dryRun && !u && this.diff && this.diff.children.length) {
            let { path: f, package: d } = this.actualTree.target,
              _ = this.options.foregroundScripts ? "inherit" : "pipe",
              { scripts: L = {} } = d;
            for (let I of ["predependencies", "dependencies", "postdependencies"])
              if (Object.prototype.hasOwnProperty.call(L, I))
                (KV.info("run", d._id, I, L[I]),
                  await AT.start(`reify:run:${I}`, () =>
                    Jca({ event: I, path: f, pkg: d, stdio: _, scriptShell: this.options.scriptShell }),
                  ));
          }
        }
        return (
          (this.auditReport = await this.auditReport),
          this.finishTracker("reify"),
          a(),
          rAa(this.actualTree)
        );
      }
      async #f() {
        if (this.options.dryRun) return;
        if (this.options.packageLockOnly) return this[Mhr]();
        let r = null,
          s = eAa(
            ({ signal: H }) => (s(), (r = Object.assign(Error("process terminated"), { signal: H })), !1),
          ),
          a = [
            [bhr, [qgi]],
            [jhr, [xhr, Shr, Q1t, Mhr, Ggi]],
            [Zgi, [Qgi, Xgi]],
          ];
        for (let [H, u] of a)
          for (let f of u)
            try {
              if ((await this[f](), r)) throw r;
            } catch (d) {
              throw (await this[H](d), d);
            }
        if ((await this[Ygi](), r)) throw r;
        s();
      }
      [Kgi](r) {
        let s = AT.start("reify:loadTrees"),
          a = { ...r, complete: this.options.packageLockOnly || this.options.dryRun };
        if (this.options.packageLockOnly) return this.buildIdealTree(a).then(s);
        let H = this.options.global
          ? {
              ignoreMissing: !0,
              global: !0,
              filter: (u, f) => {
                if (this.explicitRequests.size === 0 || !u.isProjectRoot) return !0;
                if (this.idealTree.edgesOut.has(f)) return !0;
                if ([...this.explicitRequests].some((_) => _.name === f)) return !0;
                return !1;
              },
            }
          : { ignoreMissing: !0 };
        if (!this.options.global) return Promise.all([this.loadActual(H), this.buildIdealTree(a)]).then(s);
        return this.buildIdealTree(a)
          .then(() => this.loadActual(H))
          .then(s);
      }
      [Y1t]() {
        if (this.options.packageLockOnly) return;
        let r = AT.start("reify:diffTrees"),
          s = this.options.workspacesEnabled,
          a = !s || (this.options.includeWorkspaceRoot && this.options.workspaces.length > 0),
          H = [];
        if (this.options.global && this.explicitRequests.size) {
          let u = this.idealTree.target,
            f = this.actualTree.target;
          for (let { name: d } of this.explicitRequests) {
            let _ = u.children.get(d);
            if (_) H.push(_);
            let L = f.children.get(d);
            if (L) H.push(L);
          }
        } else {
          if (s)
            for (let u of this.options.workspaces) {
              let f = this.idealTree.children.get && this.idealTree.children.get(u);
              if (f) H.push(f);
              let d = this.actualTree.children.get(u);
              if (d) H.push(d);
            }
          if (a) {
            for (let u of [this.idealTree, this.actualTree])
              for (let { type: f, to: d } of u.edgesOut.values()) if (f !== "workspace" && d) H.push(d);
          }
        }
        ((this.diff = o0i.calculate({
          omit: this.#n,
          shrinkwrapInflated: this.#a,
          filterNodes: H,
          actual: this.actualTree,
          ideal: this.idealTree,
        })),
          r());
      }
      [bqe](r, s = !1) {
        let a = [r.path, ...r.binPaths],
          H = this.#i;
        KV.silly("reify", "mark", s ? "retired" : "deleted", a);
        for (let u of a)
          if (s) {
            let f = Vgi(u);
            ((H[u] = f), this[Nae].add(f));
          } else this[Nae].add(u);
      }
      [qgi]() {
        let r = AT.start("reify:retireShallow"),
          s = (this.#i = {});
        for (let H of this.diff.children)
          if (H.action === "CHANGE" || H.action === "REMOVE") this[bqe](H.actual, !0);
        KV.silly("reify", "moves", s);
        let a = Object.entries(s).map(([H, u]) => this[Jve](H, u));
        return M8(a).then(r);
      }
      [Jve](r, s, a = !1) {
        return Fgi(r, s).catch((H) => {
          if (H.code === "ENOENT")
            return a ? null : Gve(Dhr(s), { recursive: !0 }).then(() => this[Jve](r, s, !0));
          else if (H.code === "EEXIST" || H.code === "ENOTEMPTY")
            return Tqe(s, { recursive: !0, force: !0 }).then(() => Fgi(r, s));
          else throw H;
        });
      }
      [bhr](r) {
        let s = AT.start("reify:rollback:retireShallow"),
          a = this.#i,
          H = Object.entries(a).map(([u, f]) => this[Jve](f, u));
        return M8(H)
          .catch(() => {})
          .then(s)
          .then(() => {
            throw r;
          });
      }
      [xhr]() {
        let r = AT.start("reify:createSparse"),
          s = this.diff.leaves
            .filter(
              (H) =>
                (H.action === "ADD" || H.action === "CHANGE") &&
                !this.#c.has(H.ideal.path) &&
                !H.ideal.isLink,
            )
            .map((H) => H.ideal),
          a = new Set();
        return M8(
          s.map(async (H) => {
            for (let f of Yca(H.path)) {
              if (f === H.top.path) break;
              if (a.has(f)) continue;
              a.add(f);
              let d = await yhr(f).catch(() => null);
              if (d && !d.isDirectory()) {
                let _ = Vgi(f);
                ((this.#i[f] = _), this[Nae].add(_), await this[Jve](f, _));
              }
            }
            this.#c.add(H.path);
            let u = await Gve(H.path, { recursive: !0 });
            if (u) this.#H.add(u);
          }),
        ).then(r);
      }
      [jhr](r) {
        let s = AT.start("reify:rollback:createSparse"),
          a = this.#H,
          H = [],
          f = [...a, ...Object.keys(this.#i)].map((d) =>
            Tqe(d, { recursive: !0, force: !0 }).catch((_) => H.push([d, _])),
          );
        return M8(f)
          .then(() => {
            if (H.length) KV.warn("cleanup", "Failed to remove some directories", H);
          })
          .then(s)
          .then(() => this[bhr](r));
      }
      [Shr]() {
        let r = this.#a,
          s = this.diff.leaves.filter(
            (u) =>
              (u.action === "CHANGE" || u.action === "ADD" || !u.action) &&
              u.ideal.hasShrinkwrap &&
              !r.has(u.ideal) &&
              !this[Nae].has(u.ideal.path),
          );
        if (!s.length) return;
        let a = AT.start("reify:loadShrinkwraps"),
          H = this.constructor;
        return M8(
          s.map((u) => {
            let f = u.ideal;
            return (r.add(f), u.action ? this[vqe](f) : f);
          }),
        )
          .then((u) => M8(u.map((f) => new H({ ...this.options, path: f.path }).loadVirtual({ root: f }))))
          .then(() => this[Y1t]())
          .then(() => this[xhr]())
          .then(() => this[Shr]())
          .then(a);
      }
      [vqe](r) {
        let s = AT.start(`reifyNode:${r.location}`);
        this.addTracker("reify", r.name, r.location);
        let a = Promise.resolve().then(async () => {
          (await this[sAa](r), await this.#A(r));
          let { _id: H, deprecated: u } = r.package;
          if (u) KV.warn("deprecated", `${H}: ${u}`);
        });
        return this[Jgi](r, a).then(() => (this.finishTracker("reify", r.name, r.location), s(), r));
      }
      async #l(r) {
        if (this.options.force || this.#t.has(r)) return;
        let s = await yhr(r).catch(() => null);
        if (!s || s.isDirectory()) {
          this.#t.add(r);
          return;
        }
        (KV.warn("reify", "Removing non-directory", r), await Tqe(r, { recursive: !0, force: !0 }));
      }
      async #A(r) {
        let s = V_e(r.parent.path, "node_modules");
        if ((await this.#l(s), !r.isLink)) {
          let f = null;
          if (r.resolved) {
            let d = this.#m(r.resolved);
            if (d) f = `${r.name}@${d}`;
          } else if (r.package.name && r.version) f = `${r.package.name}@${r.version}`;
          if (!f) {
            let d = `invalid or damaged lockfile detected
please re-try this operation once it completes
so that the damage can be corrected, or perform
a fresh install with no lockfile if the problem persists.`;
            (KV.warn("reify", d),
              KV.verbose("reify", "unrecognized node in tree", r.path),
              (r.parent = null),
              (r.fsParent = null),
              this[bqe](r));
            return;
          }
          if (
            (await Z1t(async () => {
              let d = await yhr(r.path).catch(() => null);
              if (d && !d.isDirectory())
                throw (
                  Z1t.log("unpacking into a non-directory", r),
                  Object.assign(Error("ENOTDIR: not a directory"), { code: "ENOTDIR", path: r.path })
                );
            }),
            await i0i.extract(f, r.path, { ...this.options, resolved: r.resolved, integrity: r.integrity }),
            r.isInStore)
          ) {
            let { content: d } = await eMt.normalize(r.path);
            r.package.scripts = d.scripts;
          }
          return;
        }
        await Tqe(r.path, { recursive: !0, force: !0 });
        let a = Dhr(r.path),
          H = r.realpath,
          u;
        if (r.resolved?.startsWith("file:")) u = this.#o(r, a, H, s);
        else u = qve(a, H);
        return (await Gve(a, { recursive: !0 }), Qca(u, r.path, "junction"));
      }
      [Jgi](r, s) {
        return (
          r.optional
            ? s.catch(() => {
                let a = tAa(r);
                for (let H of a)
                  (KV.verbose("reify", "failed optional dependency", H.path), (H.inert = !0), this[bqe](H));
              })
            : s
        ).then(() => r);
      }
      #o(r, s, a) {
        let H = [...r.edgesIn].some((d) => d.from.isRoot && d.overrides);
        if (!H && r.root) {
          let d = r.root.target;
          H = !!(d && d.package.overrides && d.package.overrides[r.name]);
        }
        if (!H) return qve(s, a);
        let u = r.root?.target?.package?.overrides?.[r.name];
        if (typeof u === "string" && u.startsWith("file:")) {
          let d = u.replace(/^file:/, ""),
            _ = r.root.target.path;
          return qve(s, V_e(_, d));
        }
        let f = r.resolved.replace(/^file:/, "");
        return zca(f);
      }
      #m(r) {
        try {
          let s = r0i.parseUrl(r);
          if (
            this.options.replaceRegistryHost === s.hostname ||
            this.options.replaceRegistryHost === "always"
          ) {
            let a = new URL(this.registry);
            ((s.hostname = a.hostname), (s.port = a.port), (s.protocol = a.protocol));
            let H = a.pathname.replace(/\/$/, "");
            if (H && H !== "/") {
              if (!(s.pathname === H || s.pathname.startsWith(H + "/"))) s.pathname = H + s.pathname;
            }
            return s.toString();
          }
          return r;
        } catch (s) {
          return;
        }
      }
      [Q1t](r = 0, s) {
        let a;
        if (!s)
          ((s = new Map()),
            (a = -1),
            Ihr({
              tree: this.diff,
              visit: (u) => {
                let f = u.ideal;
                if (!f) return;
                if (f.isProjectRoot) return;
                let { bundleDependencies: d } = f.package;
                if (d && d.length)
                  if (((a = Math.max(a, f.depth)), !s.has(f.depth))) s.set(f.depth, [f]);
                  else s.get(f.depth).push(f);
              },
              getChildren: (u) => u.children,
            }),
            s.set("maxBundleDepth", a));
        else a = s.get("maxBundleDepth");
        if (r === 0) AT.start("reify:loadBundles");
        if (r > a) {
          if (a !== -1) (this.#L(s), this[Y1t]());
          AT.end("reify:loadBundles");
          return;
        }
        let H = (s.get(r) || []).filter(
          (u) => u.root === this.idealTree && u.target !== u.root && !this[Nae].has(u.path),
        );
        if (!H.length) return this[Q1t](r + 1, s);
        return Kca(
          H.map((u) => () => (this.#r.add(u), this[vqe](u))),
          { rejectLate: !0 },
        )
          .then((u) =>
            M8(
              u.map(async (f) => {
                let d = new this.constructor({ ...this.options, path: f.path }),
                  _ = new Set(f.children.keys());
                await d.loadActual({
                  root: f,
                  transplantFilter: (L) => {
                    if (L.package._id) return (_.delete(L.name), !0);
                    else return !1;
                  },
                });
                for (let L of _) this.#e.add(f.children.get(L));
              }),
            ),
          )
          .then(() => this[Q1t](r + 1, s));
      }
      #L(r) {
        let s = new Set();
        for (let H of r.values()) {
          if (!Array.isArray(H)) continue;
          for (let u of H)
            for (let f of u.children.keys()) {
              let d = u.parent.resolve(f);
              if (!d) continue;
              (s.add(d), (d.extraneous = !0));
            }
        }
        for (let H of s) for (let u of H.edgesOut.values()) if (u.to) (s.add(u.to), (u.to.extraneous = !0));
        let a;
        do {
          a = !1;
          for (let H of s)
            for (let u of H.edgesIn)
              if (!s.has(u.from)) {
                ((H.extraneous = !1), s.delete(H), (a = !0));
                break;
              }
        } while (a);
        for (let H of s) (this[bqe](H), (H.root = null));
      }
      async [Mhr]() {
        if (this.options.audit === !1) {
          this.auditReport = null;
          return;
        }
        let r = AT.start("reify:audit"),
          s = { ...this.options },
          a = this.idealTree;
        if (this.options.workspaces.length)
          s.filterSet = this.workspaceDependencySet(
            a,
            this.options.workspaces,
            this.options.includeWorkspaceRoot,
          );
        this.auditReport = s0i.load(a, s).then((H) => (r(), H));
      }
      [Ggi]() {
        let r = AT.start("reify:unpack"),
          s = [];
        return (
          Ihr({
            tree: this.diff,
            visit: (a) => {
              if (a.action !== "CHANGE" && a.action !== "ADD") return;
              let H = a.ideal,
                u = this.#r.has(H),
                f = this.#a.has(H),
                d = this.#e.has(H);
              if (H && !H.isRoot && !u && !f && (d || !H.inDepBundle)) s.push(this[vqe](H));
            },
            getChildren: (a) => a.children,
          }),
          M8(s).then(r)
        );
      }
      [Qgi]() {
        let r = AT.start("reify:unretire"),
          s = this.#i;
        return (
          (this.#s = {}),
          M8(
            this.diff.children.map((a) => {
              if (a.action !== "CHANGE" && a.action !== "REMOVE") return;
              let { path: H } = a.actual,
                u = s[H];
              return (
                Z1t(() => {
                  if (!u) {
                    let f = Error("trying to un-retire but not retired");
                    throw Object.assign(f, {
                      realFolder: H,
                      retireFolder: u,
                      actual: a.actual,
                      ideal: a.ideal,
                      action: a.action,
                    });
                  }
                }),
                (this.#s[u] = []),
                M8(
                  a.unchanged.map((f) => {
                    if (f.isLink)
                      return Gve(Dhr(f.path), { recursive: !0, force: !0 }).then(() => this[vqe](f));
                    if (f.inDepBundle && !this.#e.has(f)) return;
                    this.#s[u].push(f);
                    let d = qve(H, f.path),
                      _ = V_e(u, d),
                      L = f.package.bundleDependencies,
                      I = L && L.length ? f.path + "/node_modules" : f.path;
                    return Gve(I, { recursive: !0 }).then(() => this[vhr](f, _));
                  }),
                )
              );
            }),
          ).then(r)
        );
      }
      [vhr](r, s) {
        return Xca({ path: s, depth: 1, packageJsonCache: new Map([[s + "/package.json", r.package]]) }).then(
          (a) =>
            M8(
              a.map((H) => {
                let u = qve(s, H),
                  f = V_e(r.path, u);
                return this[Jve](H, f);
              }),
            ),
        );
      }
      [Zgi](r) {
        let s = this.#i,
          a = new Map(Object.entries(s).map(([u, f]) => [f, u])),
          H = Object.entries(this.#s).map(([u, f]) =>
            M8(
              f.map((d) => {
                let _ = a.get(u),
                  L = qve(_, d.path),
                  I = V_e(u, L);
                return this[vhr]({ ...d, path: I }, d.path);
              }),
            ),
          );
        return M8(H).then(() => this[jhr](r));
      }
      [Xgi]() {
        let r = AT.start("reify:build"),
          s = [];
        Ihr({
          tree: this.diff,
          leave: (a) => {
            if (!a.ideal.isProjectRoot) s.push(a.ideal);
          },
          getChildren: (a) => a && a.children,
          filter: (a) => a.action === "ADD" || a.action === "CHANGE",
        });
        for (let a of this.diff.unchanged) {
          let H = a.root.target,
            u = (a.parent === H && !a.inert) || a.target.fsTop === H;
          if (a.isLink && u) s.push(a);
        }
        return this.rebuild({ nodes: s, handleOptionalFailure: !0 }).then(r);
      }
      async [Ygi]() {
        let r = AT.start("reify:trash"),
          s = [],
          a = [],
          H = (u) => Tqe(u, { recursive: !0, force: !0 }).catch((f) => a.push([u, f]));
        for (let u of this[Nae]) s.push(H(u));
        if ((await M8(s), a.length)) KV.warn("cleanup", "Failed to remove some directories", a);
        r();
      }
      async [e0i](r) {
        let s = r.save !== !1,
          a = this[zgi] || this[Thr].length;
        if (!!((!s && !a) || this.options.global || this.options.dryRun)) return !1;
        let u = AT.start("reify:save"),
          f = new Set(),
          d = (I) => {
            for (let { name: D, tree: S } of I) {
              let T = S.edgesOut.get(D),
                C = S.package,
                O = n0i.resolve(D, T.spec, S.realpath),
                { rawSpec: B, subSpec: V } = O,
                q = V ? V.rawSpec : B,
                Z = T.to;
              if (!Z || !S.isTop) continue;
              let se,
                ae = O.type === "directory" || O.type === "file";
              if (O.registry) {
                let z = Z.version,
                  Ae = z ? this.options.savePrefix + z : "*",
                  le = (V || O).type === "range",
                  Be = q;
                if (!le || q === "*" || Bgi(Ae, q, { loose: !0 })) Be = Ae;
                let Te = Z.packageName;
                se = D !== Te ? `npm:${Te}@${Be}` : Be;
              } else if (O.hosted) {
                let z = O.hosted,
                  Ae = { noCommittish: !1 };
                if (z.https && z.auth) se = `git+${z.https(Ae)}`;
                else se = z.shortcut(Ae);
              } else if (ae)
                if (T.type === "workspace") {
                  let { version: z } = T.to.target;
                  se = z ? this.options.savePrefix + z : "*";
                } else {
                  let z = O.fetchSpec.replace(/^file:/, "");
                  se = `file:${Wgi(S.realpath, z)}`;
                }
              else se = O.saveSpec;
              if (r.saveType) {
                let z = iAa.get(r.saveType);
                if (((C[z][D] = se), r.saveType === "prod" && C.optionalDependencies))
                  delete C.optionalDependencies[D];
              } else {
                if (Xve(C, "dependencies", D)) C.dependencies[D] = se;
                if (Xve(C, "devDependencies", D)) {
                  if (
                    ((C.devDependencies[D] = se),
                    Xve(C, "peerDependencies", D) && (ae || !Rgi(se, C.peerDependencies[D])))
                  )
                    C.peerDependencies[D] = se;
                  if (Xve(C, "optionalDependencies", D) && (ae || !Rgi(se, C.optionalDependencies[D])))
                    C.optionalDependencies[D] = se;
                } else {
                  if (Xve(C, "peerDependencies", D)) C.peerDependencies[D] = se;
                  if (Xve(C, "optionalDependencies", D)) C.optionalDependencies[D] = se;
                }
              }
              f.add(S);
            }
          },
          _ = (I) => {
            for (let D of I.edgesIn)
              try {
                if (Bgi(D.spec, I.version)) return !1;
              } catch {}
            return !0;
          },
          L = (I) => {
            let D = (C) =>
                !C.isRoot && C.resolveParent && C.resolveParent.isRoot && (!I || I.includes(C.name)) && _(C),
              S = this.idealTree.inventory.filter(D),
              T = [];
            for (let C of S) for (let O of C.edgesIn) T.push({ name: C.name, tree: O.from.target });
            return T;
          };
        if (s)
          if (this[zgi]) {
            let I = L();
            d(I);
          } else {
            if (this[t0i].length) d(this[t0i]);
            if (this[Thr].length) {
              let I = L(this[Thr]);
              d(I);
            }
            for (let { from: I } of this.explicitRequests) f.add(I);
          }
        if (s)
          for (let I of f) {
            I.package = I.package;
            let D = await eMt.load(I.path, { create: !0 }),
              {
                dependencies: S = {},
                devDependencies: T = {},
                optionalDependencies: C = {},
                peerDependencies: O = {},
                bundleDependencies: B,
              } = I.package;
            (D.update({
              dependencies: S,
              devDependencies: T,
              optionalDependencies: C,
              peerDependencies: O,
              bundleDependencies: B,
            }),
              await D.save());
          }
        if (this.options.usePackageLock) {
          let I = this.idealTree.package[Symbol.for("indent")];
          if (I === void 0) I = "  ";
          await this.idealTree.meta.save({
            format: this.options.formatPackageLock && I ? I : this.options.formatPackageLock,
          });
        }
        return (u(), !0);
      }
    };
});