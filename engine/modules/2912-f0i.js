
var f0i = Ie(function (J$c, l0i) {
  var Phr = Symbol("makeIdealGraph"),
    aAa = Symbol.for("createIsolatedTree"),
    { mkdirSync: HAa } = cr("fs"),
    A0i = Mve(),
    { join: zV } = cr("path"),
    { depth: cAa } = Poe(),
    u0i = cr("crypto"),
    c0i = (e) => {
      let t = new Map();
      return async function (r) {
        let s = r;
        if (t.has(s)) return t.get(s);
        let a = {};
        return (t.set(s, a), await e(a, r), a);
      };
    };
  l0i.exports = (e) =>
    class extends e {
      async [Phr](r) {
        let s = { ...r, complete: !1 };
        await this.buildIdealTree(s);
        let a = this.idealTree;
        this.rootNode = {};
        let H = this.rootNode;
        ((this.counter = 0),
          (this.externalProxyMemo = c0i(this.externalProxy.bind(this))),
          (this.workspaceProxyMemo = c0i(this.workspaceProxy.bind(this))),
          (H.external = []),
          (H.isProjectRoot = !0),
          (H.localLocation = a.location),
          (H.localPath = a.path),
          (H.workspaces = await Promise.all(Array.from(a.fsChildren.values(), this.workspaceProxyMemo))));
        let u = new Set(),
          f = [a, ...a.fsChildren];
        while (f.length !== 0) {
          let d = f.pop();
          if (u.has(d.location)) continue;
          if (
            (u.add(d.location),
            d.edgesOut.forEach((_) => {
              if (
                !_.to ||
                (d.package.bundleDependencies || d.package.bundledDependencies || []).includes(_.to.name)
              )
                return;
              f.push(_.to);
            }),
            !d.isProjectRoot && !d.isWorkspace && !d.inert)
          )
            H.external.push(await this.externalProxyMemo(d));
        }
        (await this.assignCommonProperties(a, H), (this.idealGraph = H));
      }
      async workspaceProxy(r, s) {
        ((r.localLocation = s.location),
          (r.localPath = s.path),
          (r.isWorkspace = !0),
          (r.resolved = s.resolved),
          await this.assignCommonProperties(s, r));
      }
      async externalProxy(r, s) {
        if ((await this.assignCommonProperties(s, r), s.hasShrinkwrap)) {
          let a = zV(s.root.path, "node_modules", ".store", `${s.packageName}@${s.version}`);
          (HAa(a, { recursive: !0 }),
            await A0i.extract(s.resolved, a, {
              ...this.options,
              resolved: s.resolved,
              integrity: s.integrity,
            }));
          let u = new this.constructor({ ...this.options, path: a });
          (await u[Phr]({ dev: !1 }),
            this.rootNode.external.push(...u.idealGraph.external),
            u.idealGraph.external.forEach((f) => {
              ((f.root = this.rootNode), (f.id = `${s.id}=>${f.id}`));
            }),
            (r.localDependencies = []),
            (r.externalDependencies = u.idealGraph.externalDependencies),
            (r.externalOptionalDependencies = u.idealGraph.externalOptionalDependencies),
            (r.dependencies = [
              ...r.externalDependencies,
              ...r.localDependencies,
              ...r.externalOptionalDependencies,
            ]));
        }
        ((r.optional = s.optional), (r.resolved = s.resolved), (r.version = s.version));
      }
      async assignCommonProperties(r, s) {
        function a(_) {
          return [..._.edgesOut.values()].filter(
            (L) =>
              L.to &&
              L.to.target &&
              !(_.package.bundledDependencies || _.package.bundleDependencies || []).includes(L.to.name),
          );
        }
        let H = a(r),
          u = H.filter((_) => _.optional).map((_) => _.to.target),
          f = H.filter((_) => !_.optional).map((_) => _.to.target),
          d = r.package.peerDependencies;
        if (d && r.legacyPeerDeps) {
          let _ = new Set(H.map((L) => L.name));
          for (let L of Object.keys(d))
            if (!_.has(L)) {
              let I = r.resolve(L);
              if (I && I !== r && !I.inert) f.push(I);
            }
        }
        ((s.localDependencies = await Promise.all(
          f.filter((_) => _.isWorkspace).map(this.workspaceProxyMemo),
        )),
          (s.externalDependencies = await Promise.all(
            f.filter((_) => !_.isWorkspace && !_.inert).map(this.externalProxyMemo),
          )),
          (s.externalOptionalDependencies = await Promise.all(
            u.filter((_) => !_.inert).map(this.externalProxyMemo),
          )),
          (s.dependencies = [
            ...s.externalDependencies,
            ...s.localDependencies,
            ...s.externalOptionalDependencies,
          ]),
          (s.root = this.rootNode),
          (s.id = this.counter++),
          (s.name = s.isWorkspace ? r.packageName || r.name : r.name),
          (s.packageName = r.packageName || r.name),
          (s.package = { ...r.package }),
          (s.package.bundleDependencies = void 0),
          (s.hasInstallScript = r.hasInstallScript));
      }
      async #e() {
        let r = this.idealTree,
          s = [];
        for (let [, f] of r.edgesOut)
          if (
            f.to &&
            (r.package.bundleDependencies || r.package.bundledDependencies || []).includes(f.to.name)
          )
            s.push({ from: r, to: f.to });
        for (let f of r.fsChildren)
          for (let [, d] of f.edgesOut)
            if (
              d.to &&
              (f.package.bundleDependencies || f.package.bundledDependencies || []).includes(d.to.name)
            )
              s.push({ from: f, to: d.to });
        let a = new Set(),
          H = new Map(),
          u = [];
        while (s.length !== 0) {
          let f = s.pop(),
            d = `${f.from.location}=>${f.to.location}`;
          if (a.has(d)) continue;
          a.add(d);
          let _ = f.from;
          if (!_.isRoot && !_.isWorkspace)
            H.set(_.location, {
              location: _.location,
              resolved: _.resolved,
              name: _.name,
              optional: _.optional,
              pkg: { ..._.package, bundleDependencies: void 0 },
            });
          let L = f.to;
          (H.set(L.location, {
            location: L.location,
            resolved: L.resolved,
            name: L.name,
            optional: L.optional,
            pkg: { ...L.package, bundleDependencies: void 0 },
          }),
            u.push({ from: _.isRoot ? "root" : _.location, to: L.location }),
            L.edgesOut.forEach((I) => {
              if (I.to) s.push({ from: I.from, to: I.to });
            }));
        }
        return { edges: u, nodes: H };
      }
      async [aAa]() {
        await this[Phr](this.options);
        let r = this.idealGraph,
          s = await this.#e(),
          a = (I) => {
            let D = [],
              S = [];
            return (
              cAa({
                tree: I,
                getChildren: (T) => T.dependencies,
                filter: (T) => T,
                visit: (T) => {
                  (S.push(`${T.packageName}@${T.version}`), D.push(`${S.join("->")}::${T.resolved}`));
                },
                leave: () => {
                  S.pop();
                },
              }),
              D.sort(),
              u0i
                .createHash("shake256", { outputLength: 16 })
                .update(D.join(","))
                .digest("base64")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/m, "")
            );
          },
          H = (I) => `${I.packageName}@${I.version}-${a(I)}`,
          u = {
            fsChildren: [],
            integrity: null,
            inventory: new Map(),
            isLink: !1,
            isRoot: !0,
            binPaths: [],
            edgesIn: new Set(),
            edgesOut: new Map(),
            hasShrinkwrap: !1,
            parent: null,
            resolved: this.idealTree.resolved,
            isTop: !0,
            path: r.root.localPath,
            realpath: r.root.localPath,
            package: r.root.package,
            meta: { loadedFromDisk: !1 },
            global: !1,
            isProjectRoot: !0,
            children: [],
          };
        u.inventory.query = () => [];
        let f = new Set();
        r.workspaces.forEach((I) => {
          let D = {
            edgesIn: new Set(),
            edgesOut: new Map(),
            children: [],
            hasInstallScript: I.hasInstallScript,
            binPaths: [],
            package: I.package,
            location: I.localLocation,
            path: I.localPath,
            realpath: I.localPath,
            resolved: I.resolved,
          };
          (u.fsChildren.push(D), u.inventory.set(D.location, D));
        });
        let d = (I, D, S, T) => {
          let C = {
            global: !1,
            globalTop: !1,
            isProjectRoot: !1,
            isTop: !1,
            location: D,
            name: I.packageName || I.name,
            optional: I.optional,
            top: { path: r.root.localPath },
            children: [],
            edgesIn: new Set(),
            edgesOut: new Map(),
            binPaths: [],
            fsChildren: [],
            getBundler() {
              return null;
            },
            hasShrinkwrap: !1,
            inDepBundle: !1,
            integrity: null,
            isLink: !1,
            isRoot: !1,
            isInStore: T,
            path: zV(r.root.localPath, D),
            realpath: zV(r.root.localPath, D),
            resolved: I.resolved,
            version: S.version,
            package: S,
          };
          ((C.target = C), u.children.push(C), u.inventory.set(C.location, C));
        };
        (r.external.forEach((I) => {
          let D = H(I);
          if (f.has(D)) return;
          f.add(D);
          let S = zV("node_modules", ".store", D, "node_modules", I.packageName);
          d(I, S, I.package, !0);
        }),
          s.nodes.forEach((I) => {
            d(I, I.location, I.pkg, !1);
          }),
          s.edges.forEach((I) => {
            let D = I.from === "root" ? u : u.inventory.get(I.from),
              S = u.inventory.get(I.to),
              T = { optional: !1, from: D, to: S };
            (D.edgesOut.set(S.name, T), S.edgesIn.add(T));
          }));
        let _ = new Set();
        function L(I, D) {
          D = !!D;
          let S = H(I);
          if (_.has(S)) return;
          _.add(S);
          let T, C;
          if (D) {
            let B = zV("node_modules", ".store", S, "node_modules", I.packageName);
            ((T = u.children.find((V) => V.location === B)),
              (C = zV("node_modules", ".store", S, "node_modules")));
          } else
            ((T = I.isProjectRoot ? u : u.fsChildren.find((B) => B.location === I.localLocation)),
              (C = zV(I.localLocation, "node_modules")));
          if (!T) return;
          let O = (B, V, q) => {
            ((V = !!V), (q = !!q));
            let Z = zV(C, B.name),
              se = (B.package.bin && Object.keys(B.package.bin)) || [],
              ae = H(B),
              z;
            if (q) {
              let Te = zV("node_modules", ".store", ae, "node_modules", B.packageName);
              z = u.children.find((Lt) => Lt.location === Te);
            } else z = u.fsChildren.find((Te) => Te.location === B.localLocation);
            if (!z) return;
            se.forEach((Te) => {
              z.binPaths.push(zV(T.realpath, "node_modules", ".bin", Te));
            });
            let Ae = {
                global: !1,
                globalTop: !1,
                isProjectRoot: !1,
                edgesIn: new Set(),
                edgesOut: new Map(),
                binPaths: [],
                isTop: !1,
                optional: V,
                location: Z,
                path: zV(B.root.localPath, C, B.name),
                realpath: z.path,
                name: ae,
                resolved: B.resolved,
                top: { path: B.root.localPath },
                children: [],
                fsChildren: [],
                isLink: !0,
                isStoreLink: !0,
                isRoot: !1,
                package: {
                  _id: "abc",
                  bundleDependencies: void 0,
                  deprecated: void 0,
                  bin: z.package.bin,
                  scripts: B.package.scripts,
                },
                target: z,
              },
              le = { optional: V, from: T, to: Ae };
            (T.edgesOut.set(B.name, le), Ae.edgesIn.add(le));
            let Be = { optional: !1, from: Ae, to: z };
            (Ae.edgesOut.set(B.name, Be), z.edgesIn.add(Be), u.children.push(Ae));
          };
          for (let B of I.localDependencies) (L(B, !1), O(B, !1, !1));
          for (let B of I.externalDependencies) (L(B, !0), O(B, !1, !0));
          for (let B of I.externalOptionalDependencies) (L(B, !0), O(B, !0, !0));
        }
        L(r, !1);
        for (let I of r.workspaces) L(I, !1);
        return (
          u.children.forEach((I) => (I.parent = u)),
          u.children.forEach((I) => (I.root = u)),
          (u.root = u),
          (u.target = u),
          u
        );
      }
    };
});