
var Mgi = Ie(function (R$c, ygi) {
  var Dgi = fN(),
    $hr = H_r(),
    bca = eB()("en"),
    Lgi = hhr(),
    jca = tIt(),
    { callLimit: Pca } = Qyt(),
    { depth: Cca } = Poe(),
    { isNodeGypPackage: wca, defaultGypInstallScript: kca } = blr(),
    { log: Lhr, time: W_e } = mg(),
    { resolve: Oca } = cr("path"),
    J1t = (e) => (e ? "1" : ""),
    $gi = (e, t) => e.depth - t.depth || bca(e.path, t.path),
    ggi = Symbol.for("checkBins"),
    Egi = Symbol.for("handleOptionalFailure"),
    Igi = Symbol.for("trashList");
  ygi.exports = (e) =>
    class extends e {
      #e;
      #r = null;
      #t = { preinstall: [], install: [], postinstall: [], prepare: [], bin: [] };
      async rebuild({ nodes: r, handleOptionalFailure: s = !1 } = {}) {
        if (this.options.ignoreScripts && !this.options.binLinks) return;
        if (((this.#e = s), !r)) r = await this.#n();
        let a = W_e.start("build"),
          { depNodes: H, linkNodes: u } = this.#i(r);
        if ((await this.#s(H, {}), u.size))
          ((this.#t = { preinstall: [], install: [], postinstall: [], prepare: [], bin: [] }),
            await this.#s(u, { type: "links" }));
        a();
      }
      async #n() {
        let r,
          s = await this.loadActual(),
          a;
        if (!this.options.workspacesEnabled)
          ((a = this.excludeWorkspacesDependencySet(s)),
            (r = s.inventory.filter((H) => a.has(H) || H.isProjectRoot)));
        else if (this.options.workspaces.length)
          ((a = this.workspaceDependencySet(s, this.options.workspaces, this.options.includeWorkspaceRoot)),
            (r = s.inventory.filter((H) => a.has(H))));
        else r = s.inventory.values();
        return r;
      }
      #i(r) {
        let s = new Set(),
          a = new Set(),
          H = new Set();
        for (let u of r)
          if (u.isStoreLink) H.add(u);
          else if (u.isLink) a.add(u);
          else s.add(u);
        for (let u of H) s.add(u);
        if (!this.options.global) for (let u of a) s.delete(u.target);
        return { depNodes: s, linkNodes: a };
      }
      async #s(r, { type: s = "deps" }) {
        let a = W_e.start(`build:${s}`);
        if ((await this.#a(r), !this.options.ignoreScripts)) await this.#H("preinstall");
        if (s === "links") {
          if (!this.options.ignoreScripts) await this.#H("prepare");
        }
        if (this.options.binLinks) await this.#f();
        if (!this.options.ignoreScripts) (await this.#H("install"), await this.#H("postinstall"));
        a();
      }
      async #a(r) {
        let s = W_e.start("build:queue"),
          a = new Set(),
          H = [];
        for (let f of r)
          if ((H.push(this.#c(f, a)), this.options.rebuildBundle !== !1)) {
            let d = f.package.bundleDependencies;
            if (d && d.length)
              Cca({
                tree: f,
                leave: (_) => H.push(this.#c(_, a)),
                getChildren: (_) => [..._.children.values()],
                filter: (_) => _.inBundle,
              });
          }
        await Lgi(H);
        let u = [...a].sort($gi);
        for (let f of u) {
          let {
              package: { bin: d, scripts: _ = {} },
            } = f.target,
            { preinstall: L, install: I, postinstall: D, prepare: S } = _,
            T = { bin: d, preinstall: L, install: I, postinstall: D, prepare: S };
          for (let [C, O] of Object.entries(T)) if (O) this.#t[C].push(f);
        }
        s();
      }
      async [ggi](r) {
        if (!r.globalTop || this.options.force) return;
        let { path: s, package: a } = r;
        await $hr.checkBins({ pkg: a, path: s, top: !0, global: !0 });
      }
      async #c(r, s, a = !1) {
        if (s.has(r)) return;
        if (this.#r === null) {
          let {
            root: { meta: O },
          } = r;
          this.#r = O && O.loadedFromDisk && !(O.originalLockfileVersion >= 2);
        }
        let { package: H, hasInstallScript: u } = r.target,
          { gypfile: f, bin: d, scripts: _ = {} } = H,
          { preinstall: L, install: I, postinstall: D, prepare: S } = _;
        if (!a && !(L || I || D || S) && (u || this.#r)) {
          s.add(r);
          let { content: O } = await Dgi.normalize(r.path).catch(() => ({ content: {} }));
          s.delete(r);
          let { scripts: B = {} } = O;
          return ((r.package.scripts = B), this.#c(r, s, !0));
        }
        let C = f !== !1 && !I && !L && (await wca(r.path));
        if (d || L || I || D || S || C) {
          if (d) await this[ggi](r);
          if (C) ((_.install = kca), (r.package.scripts = _));
          s.add(r);
        }
      }
      async #H(r) {
        let s = this.#t[r];
        if (!s.length) return;
        let a = W_e.start(`build:run:${r}`),
          H = this.options.foregroundScripts ? "inherit" : "pipe",
          u = this.options.foregroundScripts ? 1 : void 0;
        (await Pca(
          s.map((f) => async () => {
            let {
              path: d,
              integrity: _,
              resolved: L,
              optional: I,
              peer: D,
              dev: S,
              devOptional: T,
              package: C,
              location: O,
            } = f.target;
            if (this[Igi].has(d) || (f.isLink && f.target?.isInStore)) return;
            let B = W_e.start(`build:run:${r}:${O}`);
            Lhr.info("run", C._id, r, O, C.scripts[r]);
            let V = {
                npm_package_resolved: L,
                npm_package_integrity: _,
                npm_package_json: Oca(d, "package.json"),
                npm_package_optional: J1t(I),
                npm_package_dev: J1t(S),
                npm_package_peer: J1t(D),
                npm_package_dev_optional: J1t(T && !S && !I),
              },
              q = { event: r, path: d, pkg: C, stdio: H, env: V, scriptShell: this.options.scriptShell },
              Z = jca(q)
                .catch((se) => {
                  let { code: ae, signal: z } = se;
                  throw (Lhr.info("run", C._id, r, { code: ae, signal: z }), se);
                })
                .then(({ args: se, code: ae, signal: z, stdout: Ae, stderr: le }) => {
                  (this.scriptsRun.add({
                    pkg: C,
                    path: d,
                    event: r,
                    cmd: se && se[se.length - 1],
                    env: V,
                    code: ae,
                    signal: z,
                    stdout: Ae,
                    stderr: le,
                  }),
                    Lhr.info("run", C._id, r, { code: ae, signal: z }));
                });
            (await (this.#e ? this[Egi](f, Z) : Z), B());
          }),
          { limit: u },
        ),
          a());
      }
      async #f() {
        let r = this.#t.bin;
        if (!r.length) return;
        let s = W_e.start("build:link"),
          a = [];
        for (let H of r.sort($gi)) a.push(this.#l(H));
        (await Lgi(a), s());
      }
      async #l(r) {
        if (this[Igi].has(r.path)) return;
        let s = W_e.start(`build:link:${r.location}`),
          a = $hr({
            pkg: r.package,
            path: r.path,
            top: !!(r.isTop || r.globalTop),
            force: this.options.force,
            global: !!r.globalTop,
          });
        (await (this.#e ? this[Egi](r, a) : a), s());
      }
    };
});