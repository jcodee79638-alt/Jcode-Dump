
var kve = Ie(function (E$c, FLi) {
  var Xaa = fN(),
    Jaa = y7e(),
    kLi = ky(),
    v1t = Qj(),
    NLi = cr("util"),
    { getPaths: Kaa } = H_r(),
    { log: zaa } = mg(),
    { resolve: Pae, relative: OLi, dirname: B_e, basename: M1t } = cr("path"),
    { walkUp: Qaa } = f7e(),
    ULi = ahi(),
    x1t = f_r(),
    Yaa = $hi(),
    Iqe = l_r(),
    Zaa = pqe(),
    Cae = Tae(),
    eHa = f1t(),
    tHa = Thi(),
    rHa = wLi(),
    Z_r = eX(),
    ehr = Tve(),
    Cve = Symbol("_package"),
    JV = Symbol("_parent"),
    gqe = Symbol.for("_target"),
    IN = Symbol("_fsParent"),
    wae = Symbol("_reloadNamedEdges"),
    S1t = Symbol.for("Arborist.Node._loadDeps"),
    wve = Symbol.for("_refreshLocation"),
    Eqe = Symbol.for("_changePath"),
    R_e = Symbol.for("_delistFromMeta"),
    thr = Symbol("_explain"),
    T1t = Symbol("_explanation");
  class Dqe {
    #e;
    #r;
    #t;
    #n;
    constructor(e) {
      let {
        root: t,
        path: r,
        realpath: s,
        parent: a,
        error: H,
        meta: u,
        fsParent: f,
        resolved: d,
        integrity: _,
        name: L,
        children: I,
        fsChildren: D,
        installLinks: S = !1,
        legacyPeerDeps: T = !1,
        linksIn: C,
        isInStore: O = !1,
        hasShrinkwrap: B,
        overrides: V,
        loadOverrides: q = !1,
        extraneous: Z = !0,
        dev: se = !0,
        optional: ae = !0,
        devOptional: z = !0,
        peer: Ae = !0,
        global: le = !1,
        dummy: Be = !1,
        sourceReference: Te = null,
        inert: Lt = !1,
      } = e;
      if (
        ((this.queryContext = {}),
        (this.#e = le),
        (this.#n = null),
        (this.errors = H ? [H] : []),
        (this.isInStore = O),
        (this.sourceReference = Te),
        Te)
      )
        this[Cve] = Te.package;
      else {
        let Ht = new Xaa(),
          Se = {};
        if (e.pkg && typeof e.pkg === "object") Se = e.pkg;
        (Ht.fromContent(Se), Ht.syncNormalize(), (this[Cve] = Ht.content));
      }
      if (
        ((this.name = L || Jaa(r || this.package.name || s) || this.package.name || null),
        (this.path = r ? Pae(r) : null),
        !this.name && (!this.path || this.path !== B_e(this.path)))
      )
        throw TypeError("could not detect node name from path or package");
      if (
        ((this.realpath = !this.isLink ? this.path : Pae(s)), (this.resolved = d || null), !this.resolved)
      ) {
        let Ht = Zaa(this.package._resolved);
        if (Ht && !(/^file:/.test(Ht) && this.package._where)) this.resolved = Ht;
      }
      if (
        ((this.integrity = _ || this.package._integrity || null),
        (this.hasShrinkwrap = B || this.package._hasShrinkwrap || !1),
        (this.installLinks = S),
        (this.legacyPeerDeps = T),
        (this.children = new ULi()),
        (this.fsChildren = new Set()),
        (this.inventory = new Yaa()),
        (this.tops = new Set()),
        (this.linksIn = new Set(C || [])),
        !Be)
      )
        ((this.dev = se),
          (this.optional = ae),
          (this.devOptional = z),
          (this.peer = Ae),
          (this.extraneous = Z),
          (this.dummy = !1));
      else
        ((this.dummy = !0),
          (this.dev = !1),
          (this.optional = !1),
          (this.devOptional = !1),
          (this.peer = !1),
          (this.extraneous = !1));
      if (((this.inert = Lt), (this.edgesIn = new Set()), (this.edgesOut = new ULi()), V)) this.overrides = V;
      else if (q) {
        let Ht = this.package.overrides || {};
        if (Object.keys(Ht).length > 0) this.overrides = new Iqe({ overrides: this.package.overrides });
      }
      if (
        ((this.meta = u),
        (this[JV] = null),
        (this.parent = a || null),
        (this[IN] = null),
        (this.fsParent = f || null),
        !a && !f)
      )
        this.root = t || null;
      if (I) for (let Ht of I) new Dqe({ ...Ht, parent: this });
      if (D) for (let Ht of D) new Dqe({ ...Ht, fsParent: this });
      this[S1t]();
    }
    get meta() {
      return this.#r;
    }
    set meta(e) {
      if (((this.#r = e), e)) e.add(this);
    }
    get global() {
      if (this.#t === this) return this.#e;
      return this.#t.global;
    }
    get globalTop() {
      return this.global && this.parent && this.parent.isProjectRoot;
    }
    get workspaces() {
      return this.#n;
    }
    set workspaces(e) {
      if (this.#n) {
        for (let t of this.#n.keys()) if (!e.has(t)) this.edgesOut.get(t).detach();
      }
      ((this.#n = e), this.#i(), this[S1t]());
    }
    get binPaths() {
      if (!this.parent) return [];
      return Kaa({ pkg: this.package, path: this.path, global: this.global, top: this.globalTop });
    }
    get hasInstallScript() {
      let { hasInstallScript: e, scripts: t } = this.package,
        { install: r, preinstall: s, postinstall: a } = t || {};
      return !!(e || r || s || a);
    }
    get version() {
      return this.package.version || "";
    }
    get packageName() {
      return this.package.name || null;
    }
    get pkgid() {
      let { name: e = "", version: t = "" } = this.package,
        { isProjectRoot: r } = this,
        s = r ? e || this.name : this.name,
        a = !r && e && s !== e ? `npm:${e}@` : "";
      return `${s}@${a}${t}`;
    }
    get overridden() {
      if (!this.overrides) return !1;
      if (!this.overrides.value) return !1;
      if (this.overrides.name !== this.name) return !1;
      for (let e of this.edgesIn)
        if (e.overrides && e.overrides.name === this.name && e.overrides.value === this.version) {
          if (!e.overrides.isEqual(e.from.overrides)) return !0;
        }
      return !1;
    }
    get package() {
      return this[Cve];
    }
    set package(e) {
      for (let t of this.edgesOut.values()) t.detach();
      if (((this[T1t] = null), !e || typeof e !== "object"))
        (Cae(() => {
          throw Error("setting Node.package to non-object");
        }),
          (e = {}));
      ((this[Cve] = e), this.#i(), this[S1t](), this.edgesIn.forEach((t) => t.reload(!0)));
    }
    explain(e = null, t = []) {
      if (this[T1t]) return this[T1t];
      return (this[T1t] = this[thr](e, t));
    }
    [thr](e, t) {
      if (this.isProjectRoot && !this.sourceReference) return { location: this.path };
      let r = {
        name: this.isProjectRoot || this.isTop ? this.packageName : this.name,
        version: this.package.version,
      };
      if (this.errors.length || !this.packageName || !this.package.version)
        ((r.errors = this.errors.length
          ? this.errors
          : [Error("invalid package: lacks name and/or version")]),
          (r.package = this.package));
      if (this.root.sourceReference) {
        let { name: s, version: a } = this.root.package;
        r.whileInstalling = { name: s, version: a, path: this.root.sourceReference.path };
      }
      if (this.sourceReference) return this.sourceReference.explain(e, t);
      if (t.includes(this)) return r;
      if (
        ((r.location = this.location),
        (r.isWorkspace = this.isWorkspace),
        (t = t.concat(this)),
        (r.dependents = []),
        e)
      )
        r.dependents.push(e.explain(t));
      else {
        let s = [];
        for (let a of this.edgesIn) {
          if (!a.valid && !a.from.isProjectRoot) continue;
          s.push(a);
        }
        for (let a of s) r.dependents.push(a.explain(t));
      }
      if (this.linksIn.size) r.linksIn = [...this.linksIn].map((s) => s[thr](e, t));
      return r;
    }
    isDescendantOf(e) {
      for (let t = this; t; t = t.resolveParent) if (t === e) return !0;
      return !1;
    }
    shouldOmit(e) {
      if (!e.size) return !1;
      let { top: t } = this;
      if (!t.isProjectRoot && !t.isWorkspace) return !1;
      return (
        (this.peer && e.has("peer")) ||
        (this.dev && e.has("dev")) ||
        (this.optional && e.has("optional")) ||
        (this.devOptional && e.has("optional") && e.has("dev"))
      );
    }
    getBundler(e = []) {
      if (e.includes(this)) return null;
      e.push(this);
      let t = this[JV];
      if (!t) return null;
      let r = t.getBundler(e);
      if (r) return r;
      let s = t.package,
        a = s && s.bundleDependencies;
      if (Array.isArray(a) && a.includes(this.name)) return t;
      for (let H of this.edgesIn) {
        let u = H.from.getBundler(e);
        if (!u) continue;
        if (u === t) return u;
      }
      return null;
    }
    get inBundle() {
      return !!this.getBundler();
    }
    get inDepBundle() {
      let e = this.getBundler();
      return !!e && e !== this.root;
    }
    get isWorkspace() {
      if (this.isProjectRoot) return !1;
      let { root: e } = this,
        { type: t, to: r } = e.edgesOut.get(this.packageName) || {};
      return t === "workspace" && r && (r.target === this || r === this);
    }
    get isRoot() {
      return this === this.root;
    }
    get isProjectRoot() {
      return this === this.root || this === this.root.target;
    }
    get isRegistryDependency() {
      if (this.edgesIn.size === 0) return !1;
      for (let e of this.edgesIn) if (!kLi(e.spec).registry) return !1;
      return !0;
    }
    *ancestry() {
      for (let e = this; e; e = e.resolveParent) yield e;
    }
    set root(e) {
      while (e && e.root !== e) e = e.root;
      if (((e = e || this), this[R_e](), !this.path || !e.realpath || !e.path)) {
        this.#t = e;
        return;
      }
      this.#t = this;
      for (let s of this.linksIn) ((s[gqe] = null), this.linksIn.delete(s));
      let { target: t } = this;
      if (this.isLink) {
        if (t) {
          if ((t.linksIn.delete(this), t.root === this)) t[R_e]();
        }
        this[gqe] = null;
      }
      if (this.parent && this.parent.root !== e) (this.parent.children.delete(this.name), (this[JV] = null));
      if (this.fsParent && this.fsParent.root !== e)
        (this.fsParent.fsChildren.delete(this), (this[IN] = null));
      if (e === this) this[wve]();
      else {
        let s = Z_r(e.realpath, this.path),
          a = e.inventory.get(s);
        if (a) a.root = null;
        ((this.#t = e), this[wve]());
        for (let u of Qaa(B_e(this.path))) {
          if (u === this.path) continue;
          let f = Z_r(e.realpath, u),
            d = e.inventory.get(f);
          if (d) {
            if (d.isLink) {
              Cae(() => {
                throw Object.assign(Error("assigning parentage to link"), {
                  path: this.path,
                  parent: d.path,
                  parentReal: d.realpath,
                });
              });
              continue;
            }
            let _ = `${f}${f ? "/" : ""}node_modules/${this.name}`;
            if (this.location === _) {
              let I = d.children.get(this.name);
              if (I && I !== this) I.root = null;
              if (this.parent) (this.parent.children.delete(this.name), this.parent[wae](this.name));
              if ((d.children.set(this.name, this), (this[JV] = d), !this.isLink)) d[wae](this.name);
            } else {
              if (this.fsParent) this.fsParent.fsChildren.delete(this);
              (d.fsChildren.add(this), (this[IN] = d));
            }
            break;
          }
        }
        if (!this.parent) e.tops.add(this);
        else e.tops.delete(this);
        let H = `${this.location}${this.location ? "/" : ""}node_modules/`;
        for (let u of e.tops) {
          let f = u.location === H + u.name,
            d =
              B_e(u.path).startsWith(this.path) &&
              u !== this &&
              !u.parent &&
              (!u.fsParent || u.fsParent === this || B_e(this.path).startsWith(u.fsParent.path));
          if (!f && !d) continue;
          if (this.isLink) u.root = null;
          else {
            if (u.fsParent) u.fsParent.fsChildren.delete(u);
            if (((u[IN] = null), f)) (this.children.set(u.name, u), (u[JV] = this), e.tops.delete(u));
            else (this.fsChildren.add(u), (u[IN] = this));
          }
        }
        for (let u of e.inventory.query("realpath", this.realpath)) {
          if (u === this) continue;
          if (
            (Cae(() => {
              if (u.root !== e) throw Error("inventory contains node from other root");
            }),
            this.isLink)
          ) {
            let f = u.target;
            if (((this[gqe] = f), (this[Cve] = f.package), f.linksIn.add(this), this.parent))
              this.parent[wae](this.name);
            break;
          } else if (u.isLink) {
            if (((u[gqe] = this), (u[Cve] = this.package), this.linksIn.add(u), u.parent))
              u.parent[wae](u.name);
          } else
            Cae(() => {
              throw Object.assign(Error("duplicate node in root setter"), {
                path: this.path,
                realpath: this.realpath,
                root: e.realpath,
              });
            });
        }
      }
      for (let s of this.edgesIn) if (s.from.root !== e) s.reload();
      for (let s of this.edgesOut.values()) if (!s.to || s.to.root !== e) s.reload();
      let r = new Set(
        [...this.fsChildren, ...this.children.values(), ...this.inventory.values()].filter((s) => s !== this),
      );
      for (let s of r)
        if (s.root !== e) {
          (s[R_e](), (s[JV] = null), this.children.delete(s.name), (s[IN] = null), this.fsChildren.delete(s));
          for (let a of s.linksIn) ((a[gqe] = null), s.linksIn.delete(a));
        }
      for (let s of r) if (s.root !== e) s.root = e;
      if (this.isLink && t && !this.target && e !== this) t.root = e;
      if ((ehr(this), this !== e)) ehr(e);
    }
    get root() {
      return this.#t || this;
    }
    #i() {
      if (!this.#n) return;
      for (let [e, t] of this.#n.entries())
        new x1t({ from: this, name: e, spec: `file:${t}`, type: "workspace" });
    }
    [S1t]() {
      let e = this.package.peerDependencies,
        t = this.package.acceptDependencies || {};
      if (e && typeof e === "object" && !this.legacyPeerDeps) {
        let I = this.package.peerDependenciesMeta || {},
          D = {},
          S = {};
        for (let [T, C] of Object.entries(e))
          if (I[T]?.optional) S[T] = C;
          else D[T] = C;
        (this.#s(D, "peer", t), this.#s(S, "peerOptional", t));
      }
      (this.#s(this.package.dependencies, "prod", t),
        this.#s(this.package.optionalDependencies, "optional", t));
      let { globalTop: r, isTop: s, path: a, sourceReference: H } = this,
        { globalTop: u, isTop: f, path: d } = H || {};
      if (s && !r && a && (!H || (f && !u && d))) this.#s(this.package.devDependencies, "dev", t);
    }
    #s(e, t, r) {
      for (let [s, a] of Object.entries(e || {})) {
        let H = this.edgesOut.get(s);
        if (!H || H.type !== "workspace") new x1t({ from: this, name: s, spec: a, accept: r[s], type: t });
      }
    }
    get fsParent() {
      return this[IN];
    }
    set fsParent(e) {
      if (!e) {
        if (this[IN]) this.root = null;
        return;
      }
      if (
        (Cae(() => {
          if (e === this) throw Error("setting node to its own fsParent");
          if (e.realpath === this.realpath) throw Error("setting fsParent to same path");
          if (!this[IN] && this.realpath.indexOf(e.realpath) !== 0)
            throw Object.assign(Error("setting fsParent improperly"), {
              path: this.path,
              realpath: this.realpath,
              fsParent: { path: e.path, realpath: e.realpath },
            });
        }),
        e.isLink)
      )
        e = e.target;
      if (this === e || e.realpath === this.realpath) return;
      if (this[IN] === e) return;
      let t = this[IN],
        r = !t ? this.path : Pae(e.path, OLi(t.path, this.path)),
        s = Pae(e.path, "node_modules", this.name);
      if (r === s) {
        this.parent = e;
        return;
      }
      let a = r !== this.path,
        H = this.parent,
        u = this.name;
      if (this.parent) (this.parent.children.delete(this.name), (this[JV] = null));
      if (this.fsParent) (this.fsParent.fsChildren.delete(this), (this[IN] = null));
      if (a) this[Eqe](r);
      if (H) H[wae](u);
      this.root = e.root;
    }
    canReplaceWith(e, t) {
      if (e.name !== this.name) return !1;
      if (e.packageName !== this.packageName) return !1;
      if (this.edgesOut.size) {
        if (e.overrides) {
          if (!e.overrides.isEqual(this.overrides)) return !1;
        } else if (this.overrides) return !1;
      }
      t = new Set(t);
      let r = eHa([this], (s) => s.to !== this && s.valid);
      for (let s of this.edgesIn) {
        if (!this.isTop && s.from.parent === this.parent && s.peer && t.has(s.from.name)) continue;
        if (!r.has(s.from) && !s.satisfiedBy(e)) return !1;
      }
      return !0;
    }
    canReplace(e, t) {
      return e.canReplaceWith(this, t);
    }
    canDedupe(e = !1, t = !1) {
      if (this.inDepBundle || this.inShrinkwrap) return !1;
      if (!this.resolveParent || !this.resolveParent.resolveParent) return !1;
      if (this.edgesIn.size === 0) return !0;
      let r = this.resolveParent.resolveParent.resolve(this.name);
      if (!r) return !1;
      if (r.matches(this)) return !0;
      if (!r.canReplace(this)) return !1;
      if (e || v1t.eq(r.version, this.version)) return !0;
      if (!this.overridden && v1t.gt(r.version, this.version)) return !0;
      if (t) return !0;
      return !1;
    }
    satisfies(e) {
      if (e instanceof x1t) return this.name === e.name && e.satisfiedBy(this);
      let t = kLi(e),
        { name: r = this.name, rawSpec: s } = t;
      return (
        this.name === r &&
        this.satisfies(
          new x1t({ from: new Dqe({ path: this.root.realpath }), type: "prod", name: r, spec: s }),
        )
      );
    }
    matches(e) {
      if (e === this) return !0;
      if (e.name !== this.name) return !1;
      if (this.isLink) return e.isLink && this.target.matches(e.target);
      if (this.isProjectRoot && e.isProjectRoot) return this.path === e.path;
      if (this.integrity && e.integrity) return this.integrity === e.integrity;
      if (this.resolved && e.resolved) return this.resolved === e.resolved;
      return (
        this.packageName &&
        e.packageName &&
        this.packageName === e.packageName &&
        this.version &&
        e.version &&
        this.version === e.version
      );
    }
    replaceWith(e) {
      e.replace(this);
    }
    replace(e) {
      if ((this[R_e](), e.parent?.children.get(this.name) === e))
        this.path = Pae(e.parent.path, "node_modules", this.name);
      else ((this.path = e.path), (this.name = e.name));
      if (!this.isLink) this.realpath = this.path;
      if ((this[wve](), !this.isLink)) {
        for (let t of e.children.values()) t.parent = this;
        if (e.isLink && e.target) e.target.root = null;
      }
      if (!e.isRoot) this.root = e.root;
      ehr(this);
    }
    get inShrinkwrap() {
      return this.parent && (this.parent.hasShrinkwrap || this.parent.inShrinkwrap);
    }
    get parent() {
      return this[JV];
    }
    set parent(e) {
      if (!e) {
        if (this[JV]) this.root = null;
        return;
      }
      if (e.isLink) e = e.target;
      if (this === e) return;
      let t = this[JV];
      if (t === e) return;
      let r = Pae(e.path, "node_modules", this.name),
        s = r !== this.path;
      if (t) (t.children.delete(this.name), (this[JV] = null));
      if (this.fsParent) (this.fsParent.fsChildren.delete(this), (this[IN] = null));
      if (s) this[Eqe](r);
      this.root = e.root;
    }
    [R_e]() {
      let e = this.root;
      if (!e.realpath || !this.path) return;
      if ((e.inventory.delete(this), e.tops.delete(this), e.meta)) e.meta.delete(this.path);
      Cae(() => {
        if ([...e.inventory.values()].includes(this)) throw Error("failed to delist");
      });
    }
    [Eqe](e) {
      this[R_e]();
      let t = this.path;
      this.path = e;
      let r = /(?:^|\/|\\)node_modules[\\/](@[^/\\]+[\\/][^\\/]+|[^\\/]+)$/,
        s = e.match(r);
      if (s && this.name !== s[1]) this.name = s[1].replace(/\\/g, "/");
      if (!this.isLink) {
        this.realpath = e;
        for (let a of this.linksIn) (a[R_e](), (a.realpath = e), a[wve]());
      }
      for (let a of this.fsChildren) a[Eqe](Pae(e, OLi(t, a.path)));
      for (let [a, H] of this.children.entries()) H[Eqe](Pae(e, "node_modules", a));
      this[wve]();
    }
    [wve]() {
      let e = this.root,
        t = Z_r(e.realpath, this.path);
      if (((this.location = t), e.inventory.add(this), e.meta)) e.meta.add(this);
    }
    assertRootOverrides() {
      if (!this.isProjectRoot || !this.overrides) return;
      for (let e of this.edgesOut.values())
        if (e.spec !== e.rawSpec && !e.spec.startsWith("$"))
          throw Object.assign(Error(`Override for ${e.name}@${e.rawSpec} conflicts with direct dependency`), {
            code: "EOVERRIDE",
          });
    }
    addEdgeOut(e) {
      if (this.overrides) e.overrides = this.overrides.getEdgeRule(e);
      this.edgesOut.set(e.name, e);
    }
    recalculateOutEdgesOverrides() {
      for (let e of this.edgesOut.values())
        if ((e.reload(!0), e.to)) e.to.updateOverridesEdgeInAdded(e.overrides);
    }
    updateOverridesEdgeInRemoved(e) {
      if (!this.overrides || !this.overrides.isEqual(e)) return !1;
      let t;
      for (let r of this.edgesIn)
        if (t && r.overrides) t = Iqe.findSpecificOverrideSet(r.overrides, t);
        else t = r.overrides;
      if (this.overrides.isEqual(t)) return !1;
      if (((this.overrides = t), this.overrides)) this.recalculateOutEdgesOverrides();
      return !0;
    }
    updateOverridesEdgeInAdded(e) {
      if (!e) return !1;
      if (!this.overrides) return ((this.overrides = e), this.recalculateOutEdgesOverrides(), !0);
      if (this.overrides.isEqual(e)) return !1;
      let t = Iqe.findSpecificOverrideSet(this.overrides, e);
      if (t) {
        if (!this.overrides.isEqual(t))
          return ((this.overrides = t), this.recalculateOutEdgesOverrides(), !0);
        return !1;
      }
      zaa.silly("Conflicting override sets", this.name);
    }
    deleteEdgeIn(e) {
      if ((this.edgesIn.delete(e), e.overrides)) this.updateOverridesEdgeInRemoved(e.overrides);
    }
    addEdgeIn(e) {
      if (!this.overrides || !this.overrides.isEqual(e.overrides))
        this.updateOverridesEdgeInAdded(e.overrides);
      if ((this.edgesIn.add(e), this.root.meta)) this.root.meta.addEdge(e);
    }
    [wae](e, t = this.location) {
      let r = this.edgesOut.get(e),
        s = r && r.to && r.to.location === `${t}/node_modules/${r.name}`,
        a = r && this.resolve(e) === r.to;
      if (r && (s || !a)) r.reload(!0);
      for (let u of this.children.values()) u[wae](e, t);
      for (let u of this.fsChildren) u[wae](e, t);
    }
    get isLink() {
      return !1;
    }
    get target() {
      return this;
    }
    set target(e) {
      Cae(() => {
        throw Object.assign(Error("cannot set target on non-Link Nodes"), { path: this.path });
      });
    }
    get depth() {
      if (this.isTop) return 0;
      return this.parent.depth + 1;
    }
    get isTop() {
      return !this.parent || this.globalTop;
    }
    get top() {
      if (this.isTop) return this;
      return this.parent.top;
    }
    get isFsTop() {
      return !this.fsParent;
    }
    get fsTop() {
      if (this.isFsTop) return this;
      return this.fsParent.fsTop;
    }
    get resolveParent() {
      return this.parent || this.fsParent;
    }
    resolve(e) {
      Cae(() => {
        if (typeof e !== "string" || !e) throw Error("non-string passed to Node.resolve");
      });
      let t = this.children.get(e);
      if (t) return t;
      let r = this.resolveParent;
      if (r) return r.resolve(e);
      return null;
    }
    inNodeModules() {
      let e = this.realpath,
        t = this.name,
        r = t.charAt(0) === "@",
        s = B_e(e),
        a = r ? B_e(s) : s,
        H = B_e(a);
      return (r ? `${M1t(s)}/${M1t(e)}` : M1t(e)) === t && M1t(a) === "node_modules" ? H : !1;
    }
    querySelectorAll(e, t) {
      return rHa(this, e, t);
    }
    toJSON() {
      return tHa(this);
    }
    [NLi.inspect.custom]() {
      return this.toJSON();
    }
    resetDepFlags() {
      ((this.extraneous = !0),
        (this.dev = !0),
        (this.optional = !0),
        (this.devOptional = !0),
        (this.peer = !0));
    }
    unsetDepFlags() {
      ((this.extraneous = !1),
        (this.dev = !1),
        (this.optional = !1),
        (this.devOptional = !1),
        (this.peer = !1));
    }
  }
  FLi.exports = Dqe;
});