
var lgi = Ie(function (N$c, ugi) {
  var { dirname: igi, join: mca, normalize: sgi, relative: _ca, resolve: ogi } = cr("path"),
    Agi = fN(),
    { readdirScoped: agi } = Qme(),
    { walkUp: Hgi } = f7e(),
    { commonAncestorPath: hca } = ngi(),
    Lca = Tve(),
    V1t = Bve(),
    $ca = xqe(),
    phr = kve(),
    gca = Ove(),
    dhr = ymr(),
    Eca = Symbol.for("_changePath"),
    cgi = Symbol.for("setWorkspaces"),
    mhr = Symbol.for("realpathCache"),
    _hr = Symbol.for("statCache");
  ugi.exports = (e) =>
    class extends e {
      #e;
      #r = new Set();
      #t;
      #n = new Map();
      #i;
      #s = new Set();
      #a;
      async loadActual(r = {}) {
        if (this.actualTree) return this.actualTree;
        if (!this.#t)
          ((r = { ...this.options, ...r }),
            (this.#t = this.#c(r).then((s) => {
              if (!r.root) for (let a of s.inventory.values()) a.extraneous = !0;
              return ($ca(s, !r.root), (this.actualTree = Lca(s)), this.actualTree);
            })));
        return this.#t;
      }
      async #c(r) {
        let {
          global: s,
          filter: a = () => !0,
          root: H = null,
          transplantFilter: u = () => !0,
          ignoreMissing: f = !1,
          forceActual: d = !1,
        } = r;
        if (((this.#i = a), (this.#a = u), s)) {
          let _ = await dhr(this.path, this[mhr], this[_hr]),
            L = { path: this.path, realpath: _, pkg: {}, global: s, loadOverrides: !0 };
          if (this.path === _) this.#e = this.#l(L);
          else this.#e = await this.#A(L);
        } else {
          if (
            ((this.#e = await this.#f({
              path: this.path,
              real: await dhr(this.path, this[mhr], this[_hr]),
              loadOverrides: !0,
            })),
            this.#e.assertRootOverrides(),
            !d)
          ) {
            let L = await V1t.load({ path: this.#e.path, hiddenLockfile: !0, resolveOptions: this.options });
            if (L.loadedFromDisk)
              return (
                (this.#e.meta = L),
                await new this.constructor({ ...this.options }).loadVirtual({ root: this.#e }),
                await this[cgi](this.#e),
                this.#H(H),
                this.#e
              );
          }
          let _ = await V1t.load({
            path: this.#e.path,
            lockfileVersion: this.options.lockfileVersion,
            resolveOptions: this.options,
          });
          this.#e.meta = _;
        }
        if (
          (await this.#o(this.#e), await this[cgi](this.#e), this.#e.workspaces && this.#e.workspaces.size)
        ) {
          let _ = [];
          for (let L of this.#e.workspaces.values())
            if (!this.#n.has(L)) {
              let I = this.#f({ path: L, root: this.#e, useRootOverrides: !0 }).then((D) => this.#o(D));
              _.push(I);
            }
          await Promise.all(_);
        }
        if (!f) await this.#L();
        for (let _ of this.#s) {
          let L = this.#n.get(_);
          if (L && !L.parent && !L.fsParent) {
            for (let I of Hgi(igi(_)))
              if (this.#n.has(I)) {
                L.fsParent = this.#n.get(I);
                break;
              }
          }
        }
        if ((this.#H(H), s)) {
          let _ = this.#e,
            L = _.isLink ? _.target : _,
            { dependencies: I = {} } = L.package;
          for (let [D, S] of L.children.entries()) {
            let T = S.isLink ? `file:${S.realpath}` : "*";
            I[D] = I[D] || T;
          }
          L.package = { ...L.package, dependencies: I };
        }
        return this.#e;
      }
      #H(r) {
        if (!r || r === this.#e) return;
        this.#e[Eca](r.path);
        for (let s of this.#e.children.values()) if (!this.#a(s)) s.root = null;
        r.replace(this.#e);
        for (let s of this.#e.fsChildren) s.root = this.#a(s) ? r : null;
        this.#e = r;
      }
      async #f({ path: r, parent: s, real: a, root: H, loadOverrides: u, useRootOverrides: f }) {
        if (!a)
          try {
            a = await dhr(r, this[mhr], this[_hr]);
          } catch (L) {
            return new phr({ error: L, path: r, realpath: r, parent: s, root: H, loadOverrides: u });
          }
        let d = this.#n.get(r),
          _;
        if (d && !d.dummy) return ((d.parent = s), d);
        else {
          let L = {
            installLinks: this.installLinks,
            legacyPeerDeps: this.legacyPeerDeps,
            path: r,
            realpath: a,
            parent: s,
            root: H,
            loadOverrides: u,
          };
          try {
            let { content: I } = await Agi.normalize(a);
            if (((L.pkg = I), f && H.overrides))
              L.overrides = H.overrides.getNodeRule({ name: I.name, version: I.version });
          } catch (I) {
            if (I.code === "EJSONPARSE") I.path = mca(a, "package.json");
            L.error = I;
          }
          if (sgi(r) === a) _ = this.#l(L);
          else _ = await this.#A(L);
        }
        return (this.#n.set(r, _), _);
      }
      #l(r) {
        let { parent: s, realpath: a } = r;
        if (!s) this.#s.add(a);
        return new phr(r);
      }
      async #A(r) {
        let { realpath: s } = r;
        this.#s.add(s);
        let a = this.#n.get(s),
          H = new gca({ ...r, target: a });
        if (!a) (this.#n.set(s, H.target), await this.#o(H.target));
        return H;
      }
      async #o(r) {
        let s = this.#r;
        if (!r.isLink && !s.has(r.target.realpath))
          return (
            s.add(r.target.realpath),
            await this.#m(r.target),
            Promise.all(
              [...r.target.children.entries()]
                .filter(([, a]) => !s.has(a.realpath))
                .map(([, a]) => this.#o(a)),
            )
          );
      }
      async #m(r) {
        let s = ogi(r.realpath, "node_modules");
        try {
          let a = await agi(s).then((H) => H.map((u) => u.replace(/\\/g, "/")));
          return Promise.all(
            a
              .filter((H) => !/^(@[^/]+\/)?\./.test(H))
              .filter((H) => this.#i(r, H))
              .map((H) => this.#f({ parent: r, path: ogi(s, H) })),
          );
        } catch {}
      }
      async #L() {
        let r = new Map(),
          s = this.#e;
        for (let a of s.inventory.values()) {
          let H = hca(a.realpath, this.path),
            u = [];
          for (let [f, d] of a.edgesOut.entries()) {
            if (!d.missing && !(d.to && (d.to.dummy || d.to.parent !== a))) continue;
            for (let L of Hgi(igi(a.realpath))) {
              if (H && /^\.\.(?:[\\/]|$)/.test(_ca(H, L))) break;
              let I;
              if (!r.has(L))
                ((I = await agi(L + "/node_modules")
                  .catch(() => [])
                  .then((S) => S.map((T) => T.replace(/\\/g, "/")))),
                  r.set(L, I));
              else I = r.get(L);
              if (!I.includes(f)) continue;
              let D;
              if (!this.#n.has(L)) ((D = new phr({ path: L, root: a.root, dummy: !0 })), this.#n.set(L, D));
              else D = this.#n.get(L);
              if (D.dummy) {
                let S = sgi(`${L}/node_modules/${f}`),
                  T = this.#n.get(S);
                if (!T || T.dummy)
                  u.push(this.#f({ path: S, root: a.root, parent: D }).then((C) => this.#o(C)));
              }
              break;
            }
          }
          await Promise.all(u);
        }
      }
    };
});