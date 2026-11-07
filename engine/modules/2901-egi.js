
var egi = Ie(function (O$c, Z$i) {
  var fhr = eB()("en"),
    B1t = fN(),
    Cw = ky(),
    Uae = Mve(),
    z$i = e_e(),
    { callLimit: O$i } = Qyt(),
    U$i = ymr(),
    { resolve: Rve, dirname: N$i, sep: eca } = cr("path"),
    tca = Tve(),
    { readdirScoped: rca } = Qme(),
    { lstat: nca, readlink: ica } = cr("fs/promises"),
    { depth: F$i } = Poe(),
    { log: nX, time: Oae } = mg(),
    { redact: sca } = y4e(),
    Q$i = Qj(),
    { OK: oca, REPLACE: aca, CONFLICT: Hca } = Cmr(),
    cca = QLi(),
    B$i = Tae(),
    Aca = c_r(),
    R$i = xqe(),
    R1t = Bve(),
    { defaultLockfileVersion: Ahr } = R1t,
    Wve = kve(),
    W$i = Ove(),
    W1t = HEt(),
    V$i = chr(),
    { checkEngine: q$i, checkPlatform: G$i } = bAr(),
    X$i = eX(),
    J$i = k$i(),
    Vve = Symbol.for("updateAll"),
    K$i = Symbol.for("flagsSuspect"),
    uca = Symbol.for("setWorkspaces"),
    DZ = Symbol.for("updateNames"),
    F1t = Symbol.for("resolvedAdd"),
    uhr = Symbol.for("realpathCache"),
    lhr = Symbol.for("statCache"),
    lca = Symbol.for("addNodeToTrashList");
  class Y$i {
    #e = [];
    #r = !0;
    get length() {
      return this.#e.length;
    }
    push(e) {
      if (!this.#e.includes(e)) ((this.#r = !1), this.#e.push(e));
    }
    pop() {
      if (!this.#r) (this.#e.sort((e, t) => e.depth - t.depth || fhr(e.path, t.path)), (this.#r = !0));
      return this.#e.shift();
    }
  }
  Z$i.exports = (e) =>
    class extends e {
      #e;
      #r = null;
      #t = new Y$i();
      #n = new Set();
      #i = new Set();
      #s;
      #a;
      #c = new Set();
      #H = new Set();
      #f = new Map();
      #l = !1;
      #A = new WeakMap();
      #o = !1;
      #m;
      #L;
      #$ = new Map();
      constructor(r) {
        super(r);
        let { follow: s = !1, installStrategy: a = "hoisted", strictPeerDeps: H = !1, global: u } = r;
        ((this.#L = !!H),
          (this.#a = u ? "shallow" : a),
          (this.#s = !!s),
          (this[Vve] = !1),
          (this[DZ] = []),
          (this[F1t] = []));
        let f = process.cwd();
        ((this[uhr] = new Map([[f, f]])), (this[lhr] = new Map()), (this[K$i] = !1));
      }
      get explicitRequests() {
        return new Set(this.#i);
      }
      async buildIdealTree(r = {}) {
        if (this.idealTree) return this.idealTree;
        if (((r = { ...this.options, ...r }), !r.add || r.add.length === 0)) r.add = null;
        if (!r.rm || r.rm.length === 0) r.rm = null;
        let s = Oae.start("idealTree");
        if (!r.add && !r.rm && !r.update && this.options.global)
          throw Error("global requires add, rm, or update option");
        (this.#h(r), this.addTracker("idealTree"));
        try {
          (await this.#_(),
            await this.#P(),
            await this.#g(r),
            await this.#x(),
            await this.#k(),
            await this.#X(),
            await this.#p());
        } finally {
          (s(), this.finishTracker("idealTree"));
        }
        return tca(this.idealTree);
      }
      async #p() {
        let {
            engineStrict: r,
            npmVersion: s,
            nodeVersion: a,
            omit: H = [],
            cpu: u,
            os: f,
            libc: d,
          } = this.options,
          _ = new Set(H);
        for (let L of this.idealTree.inventory.values()) {
          if (!L.optional && !L.shouldOmit(_)) {
            try {
              if (!(L.isRoot && L.package.devEngines)) q$i(L.package, s, a, this.options.force);
            } catch (I) {
              if (r) throw I;
              nX.warn(I.code, I.message, { package: I.pkgid, required: I.required, current: I.current });
            }
            G$i(L.package, this.options.force);
          }
          if (L.optional && !L.inert)
            try {
              (q$i(L.package, s, a, !1), G$i(L.package, !1, { cpu: u, os: f, libc: d }));
            } catch (I) {
              let D = V$i(L);
              for (let S of D) S.inert = !0;
            }
        }
      }
      #h(r) {
        let s =
          r.update === !0 ? { all: !0 } : Array.isArray(r.update) ? { names: r.update } : r.update || {};
        if (s.all || !Array.isArray(s.names)) s.names = [];
        ((this.#e = !!r.complete), (this.#o = !!r.preferDedupe));
        for (let a of s.names) {
          let H = Cw(a),
            u = TypeError(`Update arguments must only contain package names, eg:
    npm update ${H.name}`);
          if (((u.code = "EUPDATEARGS"), H.raw !== H.name)) throw u;
        }
        ((this[DZ] = s.names),
          (this[Vve] = s.all),
          (this.#m = r.prune !== !1),
          (this.#l = !!(r.add || r.rm || s.all || s.names.length)));
      }
      async #_() {
        let r = Oae.start("idealTree:init"),
          s;
        if (this.options.global) s = await this.#y();
        else
          try {
            let { content: a } = await B1t.normalize(this.path);
            s = await this.#I(a);
          } catch (a) {
            if (a.code === "EJSONPARSE") throw a;
            s = await this.#I({});
          }
        return this[uca](s)
          .then((a) => {
            if (this.options.global) return a;
            else if (!this.options.usePackageLock || this[Vve])
              return R1t.reset({
                path: this.path,
                lockfileVersion: this.options.lockfileVersion,
                resolveOptions: this.options,
              }).then((H) => Object.assign(a, { meta: H }));
            else return this.loadVirtual({ root: a }).then((H) => (this.#R(H), H));
          })
          .then(async (a) => {
            if (
              (!this[Vve] && !this.options.global && !a.meta.loadedFromDisk) ||
              (this.options.global && this[DZ].length)
            ) {
              if ((await new this.constructor(this.options).loadActual({ root: a }), a.target.children.size))
                ((a.meta.loadedFromDisk = !0),
                  (a.meta.originalLockfileVersion = a.meta.lockfileVersion =
                    this.options.lockfileVersion || Ahr));
            }
            return (a.meta.inferFormattingOptions(a.package), a);
          })
          .then(
            (a) => (
              F$i({
                tree: a,
                getChildren: (H) => {
                  let u = [];
                  for (let f of H.edgesOut.values()) u.push(f.to);
                  return u;
                },
                filter: (H) => H,
                visit: (H) => {
                  for (let u of H.edgesOut.values())
                    if (!(u.type === "peerOptional" && this.options.save === !1) && (!u.to || !u.valid)) {
                      this.#t.push(H);
                      break;
                    }
                },
              }),
              (this.idealTree = a),
              (this.virtualTree = null),
              r(),
              a
            ),
          );
      }
      async #y() {
        let r = await this.#I({ dependencies: {} }),
          s = new R1t({
            path: this.path,
            lockfileVersion: this.options.lockfileVersion,
            resolveOptions: this.options,
          });
        return (s.reset(), (r.meta = s), r);
      }
      async #I(r) {
        let s = await U$i(this.path, this[uhr], this[lhr]),
          H = new (s === this.path ? Wve : W$i)({
            path: this.path,
            realpath: s,
            pkg: r,
            extraneous: !1,
            dev: !1,
            devOptional: !1,
            peer: !1,
            optional: !1,
            global: this.options.global,
            installLinks: this.installLinks,
            legacyPeerDeps: this.legacyPeerDeps,
            loadOverrides: !0,
          });
        if (H.isLink)
          H.target = new Wve({
            path: s,
            realpath: s,
            pkg: r,
            extraneous: !1,
            dev: !1,
            devOptional: !1,
            peer: !1,
            optional: !1,
            global: this.options.global,
            installLinks: this.installLinks,
            legacyPeerDeps: this.legacyPeerDeps,
            root: H,
          });
        return H;
      }
      async #g(r) {
        let s = Oae.start("idealTree:userRequests"),
          a = this.idealTree.target;
        if (!this.options.workspaces.length) await this.#E(a, r);
        else {
          let H = this.workspaceNodes(a, this.options.workspaces);
          if (this.options.includeWorkspaceRoot) H.push(a);
          let u = H.map((f) => this.#E(f, r));
          await Promise.all(u);
        }
        s();
      }
      async #E(r, s) {
        if (!this.options.global && this[DZ].length) this.#j();
        let a = [];
        if (this.options.global && (this[Vve] || this[DZ].length)) {
          let f = Rve(this.path, "node_modules"),
            d = await rca(f).catch(() => []);
          for (let _ of d) {
            let L = _.replace(/\\/g, "/"),
              I = this[DZ].includes(L);
            if (this[Vve] || I) {
              if (I) a.push(L);
              let D = Rve(f, L),
                S = await nca(D).catch(() => null);
              if (S && S.isSymbolicLink()) {
                let T = await ica(D),
                  C = Rve(N$i(D), T);
                r.package.dependencies[L] = `file:${C}`;
              } else r.package.dependencies[L] = "*";
            }
          }
        }
        if (this.auditReport && this.auditReport.size > 0) await this.#b(s);
        let { add: H, rm: u } = s;
        if (u && u.length) {
          W1t.rm(r.package, u);
          for (let f of u) this.#i.add({ from: r, name: f, action: "DELETE" });
        }
        if (H && H.length) await this.#D(r, s);
        if ((H && H.length) || (u && u.length) || this.options.global) r.package = r.package;
        for (let f of this[F1t]) if (f.tree === r) this.#i.add(r.edgesOut.get(f.name));
        for (let f of a) this.#i.add(r.edgesOut.get(f));
        this.#t.push(r);
      }
      async #D(r, { add: s, saveType: a = null, saveBundle: H = !1 }) {
        let u = r.target.path;
        (await Promise.all(
          s.map(async (f) => {
            let d = Cw(f),
              _ = d.rawSpec && d.type === "tag";
            if (!d.name || _) {
              let I = r.isProjectRoot || r.isWorkspace,
                D = await Uae.manifest(d, { ...this.options, _isRoot: I });
              if (_) d = Cw(`${D.name}@${D.version}`);
              d.name = D.name;
            }
            let { name: L } = d;
            if (d.type === "file") ((d = Cw(`file:${X$i(u, d.fetchSpec)}`, u)), (d.name = L));
            else if (d.type === "directory")
              try {
                let I = await U$i(d.fetchSpec, this[uhr], this[lhr]);
                ((d = Cw(`file:${X$i(u, I)}`, u)), (d.name = L));
              } catch {}
            ((d.tree = r), this[F1t].push(d));
          }),
        ),
          W1t.add({ pkg: r.package, add: this[F1t], saveBundle: H, saveType: a }));
      }
      async #b(r) {
        for (let s of this.auditReport.values())
          for (let a of s.nodes) {
            let H = a.getBundler();
            if (H) {
              nX.warn(
                `audit fix ${a.name}@${a.version}`,
                `${a.location}
is a bundled dependency of
${H.name}@${H.version} at ${H.location}
It cannot be fixed automatically.
Check for updates to the ${H.name} package.`,
              );
              continue;
            }
            for (let u of a.edgesIn)
              (this.addTracker("idealTree", u.from.name, u.from.location), this.#t.push(u.from));
          }
        if (this.options.force && this.auditReport && this.auditReport.topVulns.size) {
          ((r.add = r.add || []), (r.rm = r.rm || []));
          let s = new Set();
          for (let [a, H] of this.auditReport.topVulns.entries()) {
            let { simpleRange: u, topNodes: f, fixAvailable: d } = H;
            for (let _ of f) {
              if (!_.isProjectRoot && !_.isWorkspace) {
                nX.warn(
                  "audit",
                  `Manual fix required in linked project at ./${_.location} for ${a}@${u}.
'cd ./${_.location}' and run 'npm audit' for details.`,
                );
                continue;
              }
              if (!d) {
                nX.warn("audit", `No fix available for ${a}@${u}`);
                continue;
              }
              let { isSemVerMajor: L, version: I, name: D } = d,
                S = L ? "a SemVer major change" : "outside your stated dependency range";
              (nX.warn("audit", `Updating ${D} to ${I}, which is ${S}.`),
                await this.#D(_, { add: [`${D}@${I}`] }),
                s.add(_));
            }
          }
          for (let a of s) a.package = a.package;
        }
      }
      #u(r) {
        if (!this.auditReport) return null;
        let s = this.auditReport.get(r);
        if (!s) return null;
        return s.range;
      }
      #j() {
        for (let r of this.idealTree.inventory.values())
          if (this[DZ].includes(r.name) && !r.isTop && !r.inDepBundle && !r.inShrinkwrap)
            for (let s of r.edgesIn)
              (this.addTracker("idealTree", s.from.name, s.from.location), this.#t.push(s.from));
      }
      async #P() {
        let { meta: r, inventory: s } = this.idealTree,
          a = r.ancientLockfile,
          H = r.loadedFromDisk && !(r.originalLockfileVersion >= 2);
        if (s.size === 0 || (!a && !H)) return;
        let u = Oae.start("idealTree:inflate"),
          f = a ? "ancient lockfile" : "old lockfile";
        if (a || !this.options.lockfileVersion || this.options.lockfileVersion >= Ahr)
          nX.warn(
            f,
            `
The ${r.type} file was created with an old version of npm,
so supplemental metadata must be fetched from the registry.

This is a one-time fix-up, please be patient...
`,
          );
        this.addTracker("idealTree:inflate");
        let d = [];
        for (let _ of s.values()) {
          if (_.isProjectRoot) continue;
          if (!_.location.startsWith("node_modules")) continue;
          d.push(async () => {
            nX.silly("inflate", _.location);
            let { resolved: L, version: I, path: D, name: S, location: T, integrity: C } = _,
              B = L && (!I || L.startsWith("file:")) ? L : I,
              V = Cw.resolve(S, B, N$i(D)),
              q = `idealTree:inflate:${T}`;
            this.addTracker(q);
            try {
              let Z = await Uae.manifest(V, { ...this.options, resolved: L, integrity: C, fullMetadata: !1 });
              _.package = { ...Z, _id: `${Z.name}@${Z.version}` };
            } catch (Z) {
              let se = `Could not fetch metadata for ${S}@${B}`;
              nX.warn(f, se, Z);
            }
            this.finishTracker(q);
          });
        }
        if (
          (await O$i(d),
          J$i(this.idealTree),
          R$i(this.idealTree),
          !this.options.lockfileVersion && !r.hiddenLockfile)
        )
          r.originalLockfileVersion = Ahr;
        (this.finishTracker("idealTree:inflate"), u());
      }
      #x() {
        let r = Oae.start("idealTree:buildDeps"),
          s = this.idealTree.target;
        return (
          s.assertRootOverrides(),
          this.#t.push(s),
          nX.silly("idealTree", "buildDeps"),
          this.addTracker("idealTree", s.name, ""),
          this.#T().then(r)
        );
      }
      async #T() {
        if (this.#r) {
          let { location: I, name: D } = this.#r;
          (Oae.end(`idealTree:${I || "#root"}`), this.finishTracker("idealTree", D, I), (this.#r = null));
        }
        if (!this.#t.length) return this.#B();
        let r = this.#t.pop(),
          s = r.package.bundleDependencies,
          a = s && Array.isArray(s) && s.length,
          { hasShrinkwrap: H } = r;
        if (this.#n.has(r) || r.root !== this.idealTree || (H && !this.#e)) return this.#T();
        if (
          (this.#n.add(r),
          (this.#r = r),
          Oae.start(`idealTree:${r.location || "#root"}`),
          this.#e && r !== this.idealTree && r.resolved && (a || H) && !r.inert)
        ) {
          let I = this.constructor,
            D = { ...this.options };
          await z$i.tmp.withTmp(this.cache, D, async (S) => {
            if (
              (await Uae.extract(r.resolved, S, {
                ...D,
                Arborist: I,
                resolved: r.resolved,
                integrity: r.integrity,
              }),
              H)
            )
              await new I({ ...this.options, path: S }).loadVirtual({ root: r });
            if (a) await new I({ ...this.options, path: S }).loadActual({ root: r, ignoreMissing: !0 });
          });
        }
        let f = [],
          d = this.#A.get(r) || r;
        for (let I of this.#V(r)) {
          if (I.peerConflicted) continue;
          let D = I.peer ? d : r,
            S = this.#M(D, !0),
            T = S && S.edgesOut.get(I.name),
            C = T && T.valid && T.to,
            O = new Set([I.from]),
            B = I.peer ? S : null,
            V = C && C.satisfies(I) ? C : await this.#U(I, B, null, O);
          (B$i(() => {
            if (!V) throw Error("no dep??");
          }),
            f.push({ edge: I, dep: V }));
        }
        let _ = f.sort((I, D) => fhr(I.edge.name, D.edge.name)),
          L = [];
        for (let { edge: I, dep: D } of _) {
          let S = new cca({
            edge: I,
            dep: D,
            auditReport: this.auditReport,
            explicitRequest: this.#i.has(I),
            force: this.options.force,
            installLinks: this.installLinks,
            installStrategy: this.#a,
            legacyPeerDeps: this.legacyPeerDeps,
            preferDedupe: this.#o,
            strictPeerDeps: this.#L,
            updateNames: this[DZ],
          });
          F$i({
            tree: S,
            getChildren: (T) => T.children,
            visit: (T) => {
              let { placed: C, edge: O, canPlace: B } = T;
              if (!C) return;
              if (C.errors.length) this.#H.add(C);
              if (((this.#l = !0), B.canPlaceSelf === oca))
                for (let V of C.edgesIn) {
                  if (V === O) continue;
                  let { from: q, valid: Z, peerConflicted: se } = V;
                  if (!se && !Z) {
                    if (this.#n.has(q) && this.options.save) (this.#n.delete(q), this.#t.push(q));
                    else if (!this.#n.has(q))
                      (this.addTracker("idealTree", q.name, q.location), this.#t.push(q));
                  }
                }
              else if (B.canPlaceSelf === aca)
                for (let V of C.edgesIn) {
                  if (V === O) continue;
                  let { valid: q, peerConflicted: Z } = V;
                  if (!q && !Z) (this.#n.delete(V.from), this.#t.push(V.from));
                }
              if (B.canPlaceSelf === Hca) {
                B$i(() => {
                  let V = Error("placed with canPlaceSelf=CONFLICT");
                  throw Object.assign(V, { placeDep: T });
                });
                return;
              }
              this.#t.push(C);
              for (let V of T.needEvaluation) (this.#n.delete(V), this.#t.push(V));
              for (let V of this.#V(C))
                L.push(() => this.#w(Cw.resolve(V.name, V.spec, Aca(C, V))).catch(() => null));
            },
          });
        }
        for (let { to: I } of r.edgesOut.values()) if (I && I.isLink && I.target) this.#c.add(I);
        return (await O$i(L), this.#T());
      }
      async #U(r, s, a, H) {
        let u = s || this.#M(r.from),
          f = Cw.resolve(r.name, r.spec, r.from.path),
          d = await this.#C(r.name, f, u, r),
          _ = a && Cw.resolve(r.name, a.spec, a.from.path),
          L = a && !a.valid ? await this.#C(r.name, _, u, a) : null,
          I = L && r.valid ? L : d;
        if (
          ((I.parent = u),
          (H.has(r.from) && r.type !== "peerOptional") || (a && H.has(a.from) && a.type !== "peerOptional"))
        )
          H.add(I);
        let D = u.sourceReference;
        if ((this.#A.set(I, D), this.options.global && r.from.isProjectRoot)) return I;
        return this.#F(I, H);
      }
      #M(r, s = !1) {
        if (s && this.#$.has(r)) return this.#$.get(r);
        let a = new Wve({
          path: r.realpath,
          sourceReference: r,
          installLinks: this.installLinks,
          legacyPeerDeps: this.legacyPeerDeps,
          overrides: r.overrides,
        });
        for (let H of r.children.values())
          if (H.isLink) new Wve({ path: H.realpath, sourceReference: H.target, root: a });
        return (this.#$.set(r, a), a);
      }
      #V(r) {
        let s = r.isProjectRoot || r.isWorkspace ? null : r.package.bundleDependencies,
          a = new Set(s || []),
          H = [];
        for (let u of r.edgesOut.values()) {
          if (a.has(u.name)) continue;
          if (u.to && this.#H.has(u.to)) continue;
          if (u.to && u.to.inShrinkwrap) continue;
          if (!u.to) {
            if (u.type !== "peerOptional" || this.#i.has(u)) H.push(u);
            continue;
          }
          if (!u.valid) {
            if (u.type !== "peerOptional" || this.options.save !== !1) H.push(u);
            continue;
          }
          if (u.to.isWorkspace) continue;
          if (this[DZ].includes(u.name)) {
            H.push(u);
            continue;
          }
          if (this.auditReport && this.auditReport.isVulnerable(u.to)) {
            H.push(u);
            continue;
          }
          if (this.#i.has(u)) {
            H.push(u);
            continue;
          }
        }
        return H;
      }
      async #w(r) {
        let s = { ...this.options, avoid: this.#u(r.name), fullMetadata: !0 };
        if (((r = this.idealTree.meta.checkYarnLock(r, s)), this.#f.has(r.raw))) return this.#f.get(r.raw);
        else {
          nX.silly("fetch manifest", r.raw.replace(r.rawSpec, sca(r.rawSpec)));
          let a = await Uae.manifest(r, s);
          return (this.#f.set(r.raw, a), a);
        }
      }
      async #C(r, s, a, H) {
        let { installLinks: u, legacyPeerDeps: f } = this,
          d = this.idealTree.workspaces && this.idealTree.workspaces.has(s.name),
          _ = !1;
        if (H?.rawSpec.startsWith("file:../") || H?.rawSpec.startsWith("file:./")) {
          let S = Rve(a.realpath, H.rawSpec.slice(5)),
            T = Rve(this.idealTree.realpath);
          _ = S.startsWith(T + eca) || S === T;
        }
        let L = a && !a.isLink && a.resolved?.startsWith("file:"),
          I = s.type === "directory" && L && u,
          D = (d || _ || !u) && !I;
        if (s.type === "directory" && D) {
          let S = s.fetchSpec,
            { content: T } = await B1t.normalize(S).catch(() => ({ content: {} })),
            C = new W$i({ name: r, parent: a, realpath: S, pkg: T, installLinks: u, legacyPeerDeps: f });
          return (this.#c.add(C), C);
        }
        if (d) {
          let S = this.idealTree.edgesOut.get(s.name).to;
          if (S && S.isWorkspace && S.satisfies(H)) return S;
        }
        if (I && H) {
          let S = a.resolved.slice(5),
            T = H.rawSpec.slice(5),
            C = Rve(S, T);
          s = Cw.resolve(r, `file:${C}`);
        }
        return this.#w(s).then(
          (S) => new Wve({ name: r, pkg: S, parent: a, installLinks: u, legacyPeerDeps: f }),
          (S) => {
            S.requiredBy = H.from.location || ".";
            let T = new Wve({ name: r, parent: a, error: S, installLinks: u, legacyPeerDeps: f });
            return (this.#H.add(T), T);
          },
        );
      }
      async #F(r, s) {
        let a = [...r.edgesOut.values()]
          .filter((H) => H.peer && !(H.valid && H.to))
          .sort(({ name: H }, { name: u }) => fhr(H, u));
        for (let H of a) {
          if (!r.parent) break;
          if (H.valid && H.to) continue;
          let u = r.parent.edgesOut.get(H.name),
            { isProjectRoot: f, isWorkspace: d } = r.parent.sourceReference,
            _ = f || d,
            L = this.options.force || (!_ && !this.#L);
          if (!H.to)
            if (!u) {
              await this.#U(H, r.parent, null, s);
              continue;
            } else {
              let S = await this.#U(u, r.parent, H, s);
              if (H.valid) continue;
              if (L || !s.has(S)) {
                H.peerConflicted = !0;
                continue;
              }
              this.#S(H, u);
            }
          let I = H.to;
          if ((await this.#U(H, null, null, s)).canReplace(I)) {
            await this.#U(H, r.parent, null, s);
            continue;
          }
          if (L || !s.has(H.from)) continue;
          this.#S(H, u);
        }
        return r;
      }
      #S(r, s) {
        let a = this.#v(r, s);
        throw Object.assign(Error("unable to resolve dependency tree"), a);
      }
      #v(r, s) {
        return {
          code: "ERESOLVE",
          current: r.from.resolve(r.name).explain(),
          currentEdge: s ? s.explain() : null,
          edge: r.explain(),
          strictPeerDeps: this.#L,
          force: this.options.force,
        };
      }
      #B() {
        for (let r of this.#c) {
          if ((this.#c.delete(r), r.root !== this.idealTree)) continue;
          let s = this.idealTree.target;
          if (!r.target.isDescendantOf(s) && !this.#s) continue;
          let H = (r.target.parent || r.target.fsParent) && !this.#n.has(r.target);
          if ((this.#s && !r.target.parent && !r.target.fsParent) || H)
            (this.addTracker("idealTree", r.target.name, r.target.location), this.#t.push(r.target));
        }
        if (this.#t.length) return this.#T();
      }
      #k() {
        let r = Oae.start("idealTree:fixDepFlags"),
          s = this.idealTree.meta.loadedFromDisk,
          a = this[K$i],
          H = this.#l;
        if (s && H) J$i(this.idealTree);
        if (!s || H) R$i(this.idealTree);
        else this.idealTree.unsetDepFlags();
        let u = s && (H || a);
        if (this.#m && u) this.#J();
        r();
      }
      #R(r) {
        let s = r.root.package.overrides || {};
        for (let a of r.root.inventory.values()) {
          if (!a.isWorkspace) continue;
          for (let H of Object.keys(s)) {
            let u = a.edgesOut.get(H),
              f = r.root.children.get(H);
            if (!u || !f) continue;
            let d = f.package.version;
            if (!Q$i.satisfies(d, u.spec)) (u.detach(), a.children.delete(H));
          }
        }
      }
      #J() {
        for (let r of this.idealTree.inventory.values()) if (r.extraneous) r.parent = null;
      }
      #X() {
        for (let r of this.#H) {
          if (!r.optional) throw r.errors[0];
          let s = V$i(r);
          for (let a of s) a.inert = !0;
        }
      }
      async prune(r = {}) {
        if (
          ((r = { ...this.options, ...r }),
          await this.buildIdealTree(r),
          this.#J(),
          !this.options.workspacesEnabled)
        ) {
          let s = this.excludeWorkspacesDependencySet(this.idealTree);
          for (let a of this.idealTree.inventory.values())
            if (a.parent !== null && !a.isProjectRoot && !s.has(a) && !a.inert) this[lca](a);
        }
        return this.reify(r);
      }
    };
});