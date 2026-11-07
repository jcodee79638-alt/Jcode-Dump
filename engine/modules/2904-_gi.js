
var _gi = Ie(function (F$c, mgi) {
  var { resolve: q1t } = cr("path"),
    pgi = eEt(),
    X1t = fN(),
    Ica = y7e(),
    Dca = pqe(),
    dgi = Bve(),
    yca = kve(),
    Mca = Ove(),
    xca = eX(),
    Sca = xqe(),
    fgi = Tve(),
    G1t = Symbol.for("flagsSuspect"),
    Tca = Symbol.for("setWorkspaces");
  mgi.exports = (e) =>
    class extends e {
      #e;
      async loadVirtual(r = {}) {
        if (this.virtualTree) return this.virtualTree;
        if (((r = { ...this.options, ...r }), r.root && r.root.meta))
          return (await this.#r(r.root.meta, r.root), fgi(this.virtualTree));
        let s = await dgi.load({
          path: this.path,
          lockfileVersion: this.options.lockfileVersion,
          resolveOptions: this.options,
        });
        if (!s.loadedFromDisk && !r.root) {
          let u = Error("loadVirtual requires existing shrinkwrap file");
          throw Object.assign(u, { code: "ENOLOCK" });
        }
        let a = await X1t.normalize(this.path)
            .then((u) => u.content)
            .catch(() => s.data.packages[""] || {}),
          { root: H = await this[Tca](this.#s("", a, !0)) } = r;
        return ((this.#e = r.root), await this.#r(s, H), H.assertRootOverrides(), fgi(this.virtualTree));
      }
      async #r(r, s) {
        if (!this.#e) s.unsetDepFlags();
        else this[G1t] = !0;
        (this.#t(r, s), (s.meta = r), (this.virtualTree = s));
        let a = new Map(),
          H = new Map([["", s]]);
        for (let [u, f] of Object.entries(r.data.packages)) {
          if (!u) continue;
          if (f.link) a.set(u, f);
          else H.set(u, this.#s(u, f));
        }
        if ((await this.#n(a, H), !(r.originalLockfileVersion >= 2))) this.#i(H);
        if (this[G1t]) {
          for (let u of H.values()) {
            if (u.isRoot || u === this.#e) continue;
            u.resetDepFlags();
          }
          Sca(this.virtualTree, !this.#e);
        }
        return s;
      }
      #t(r, s) {
        if (!r.loadedFromDisk || r.ancientLockfile) return;
        let a = r.get(""),
          H = a.dependencies || {},
          u = a.devDependencies || {},
          f = a.optionalDependencies || {},
          d = a.peerDependencies || {},
          _ = {};
        if (a.peerDependenciesMeta) {
          for (let [T, C] of Object.entries(a.peerDependenciesMeta))
            if (C.optional && d[T] !== void 0) ((_[T] = d[T]), delete d[T]);
        }
        for (let T of Object.keys(f)) delete H[T];
        let L = {},
          I = pgi.virtual({ cwd: this.path, lockfile: r.data });
        for (let [T, C] of I.entries()) L[T] = `file:${C}`;
        let D = new Set(s.edgesOut.keys()),
          S = { dev: u, optional: f, peer: d, peerOptional: _, prod: H, workspace: L };
        for (let T in S) {
          let C = S[T];
          for (let O in C) {
            let B = s.edgesOut.get(O);
            if (!B || B.type !== T || B.spec !== C[O]) return (this[G1t] = !0);
            D.delete(O);
          }
        }
        if (D.size) return (this[G1t] = !0);
      }
      async #n(r, s) {
        for (let [a, H] of r.entries()) {
          let u = q1t(this.path, H.resolved),
            f = xca(this.path, u),
            d = s.get(f);
          if (!d) {
            let L = Error(`Missing target in lock file: "${f}" is referenced by "${a}" but does not exist.
To fix:
1. rm package-lock.json
2. npm install`);
            throw ((L.code = "EMISSINGTARGET"), L);
          }
          let _ = this.#a(a, f, d, H);
          if ((s.set(a, _), s.set(f, _.target), !_.target.parent))
            await X1t.normalize(_.realpath)
              .then((L) => (_.target.package = L.content))
              .catch(() => null);
        }
      }
      #i(r) {
        for (let [s, a] of r) {
          if (!s || (a.isLink && !a.target.location)) continue;
          let {
            name: H,
            parent: u,
            package: { inBundle: f },
          } = a;
          if (!u) continue;
          let { package: d } = u,
            { inBundle: _ } = d;
          if (f && !_ && u.edgesOut.has(a.name))
            if (!d.bundleDependencies) d.bundleDependencies = [H];
            else d.bundleDependencies.push(H);
        }
      }
      #s(r, s, a) {
        let H = this.virtualTree ? this.virtualTree.realpath : this.path,
          u = q1t(H, r);
        if (!s.name) s.name = Ica(u);
        return new yca({
          installLinks: this.installLinks,
          legacyPeerDeps: this.legacyPeerDeps,
          root: this.virtualTree,
          path: u,
          realpath: u,
          integrity: s.integrity,
          resolved: Dca(s.resolved, this.path, u),
          pkg: s,
          hasShrinkwrap: s.hasShrinkwrap,
          loadOverrides: a,
          extraneous: !!s.extraneous,
          devOptional: !!(s.devOptional || s.dev || s.optional),
          peer: !!s.peer,
          optional: !!s.optional,
          dev: !!s.dev,
        });
      }
      #a(r, s, a) {
        let H = q1t(this.path, r),
          u = new Mca({
            installLinks: this.installLinks,
            legacyPeerDeps: this.legacyPeerDeps,
            path: H,
            realpath: q1t(this.path, s),
            target: a,
            pkg: a && a.package,
          });
        return (
          (u.extraneous = a.extraneous),
          (u.devOptional = a.devOptional),
          (u.peer = a.peer),
          (u.optional = a.optional),
          (u.dev = a.dev),
          u
        );
      }
    };
});