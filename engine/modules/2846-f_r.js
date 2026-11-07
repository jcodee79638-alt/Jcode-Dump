
var f_r = Ie(function (OLc, mhi) {
  var fhi = cr("util"),
    Lna = ky(),
    fqe = Ahi(),
    phi = l_r();
  class dhi {
    constructor(e) {
      ((this.name = e.name), (this.spec = e.spec), (this.type = e.type));
      let t = e.from?.location,
        r = e.to?.location,
        s = e.overrides?.value;
      if (t != null) this.from = t;
      if (r) this.to = r;
      if (e.error) this.error = e.error;
      if (e.peerConflicted) this.peerConflicted = !0;
      if (s) this.overridden = s;
    }
  }
  class l1t {
    #e;
    #r;
    #t;
    #n;
    #i;
    #s;
    #a;
    #c;
    static types = Object.freeze(["prod", "dev", "optional", "peer", "peerOptional", "workspace"]);
    static errors = Object.freeze(["DETACHED", "MISSING", "PEER LOCAL", "INVALID"]);
    constructor(e) {
      let { type: t, name: r, spec: s, accept: a, from: H, overrides: u } = e;
      if (typeof s !== "string") throw TypeError("must provide string spec");
      if (!l1t.types.includes(t))
        throw TypeError(`invalid type: ${t}
(valid types are: ${l1t.types.join(", ")})`);
      if (t === "workspace" && Lna(s).type !== "directory")
        throw TypeError("workspace edges must be a symlink");
      if (typeof r !== "string") throw TypeError("must provide dependency name");
      if (!H) throw TypeError('must provide "from" node');
      if (a !== void 0) {
        if (typeof a !== "string") throw TypeError("accept field must be a string if provided");
        this.#e = a || "*";
      }
      if (u !== void 0) this.overrides = u;
      ((this.#i = r),
        (this.#c = t),
        (this.#s = s),
        (this.#t = null),
        (this.#n = H),
        H.edgesOut.get(this.#i)?.detach(),
        H.addEdgeOut(this),
        this.reload(!0),
        (this.peerConflicted = !1));
    }
    satisfiedBy(e) {
      if (e.name !== this.#i || !this.#n) return !1;
      if (e.hasShrinkwrap || e.inShrinkwrap || e.inBundle) return fqe(e, this.rawSpec, this.#e, this.#n);
      if (!this.overrides?.keySpec) return fqe(e, this.spec, this.#e, this.#n);
      if (fqe(e, this.spec, this.#e, this.#n)) return !0;
      if (!fqe(e, this.rawSpec, this.#e, this.#n)) return !1;
      return !fqe(e, this.overrides.keySpec, this.#e, this.#n);
    }
    explain(e = []) {
      if (!this.#t) {
        let t = { type: this.#c, name: this.#i, spec: this.spec };
        if (this.rawSpec !== this.spec) ((t.rawSpec = this.rawSpec), (t.overridden = !0));
        if (this.bundled) t.bundled = this.bundled;
        if (this.error) t.error = this.error;
        if (this.#n) t.from = this.#n.explain(null, e);
        this.#t = t;
      }
      return this.#t;
    }
    get bundled() {
      return !!this.#n?.package?.bundleDependencies?.includes(this.#i);
    }
    get workspace() {
      return this.#c === "workspace";
    }
    get prod() {
      return this.#c === "prod";
    }
    get dev() {
      return this.#c === "dev";
    }
    get optional() {
      return this.#c === "optional" || this.#c === "peerOptional";
    }
    get peer() {
      return this.#c === "peer" || this.#c === "peerOptional";
    }
    get type() {
      return this.#c;
    }
    get name() {
      return this.#i;
    }
    get rawSpec() {
      return this.#s;
    }
    get spec() {
      if (this.overrides?.value && this.overrides.value !== "*" && this.overrides.name === this.#i) {
        if (this.overrides.value.startsWith("$")) {
          let e = this.overrides.value.slice(1),
            t = this.#n?.sourceReference ? this.#n?.sourceReference.root.package : this.#n?.root?.package,
            r = this.#H(e, t);
          if (!r) ((t = this.#n?.package), (r = this.#H(e, t)));
          if (r) return r;
          throw Error(`Unable to resolve reference ${this.overrides.value}`);
        }
        return this.overrides.value;
      }
      return this.#s;
    }
    #H(e, t) {
      if (t.devDependencies?.[e]) return t.devDependencies[e];
      if (t.optionalDependencies?.[e]) return t.optionalDependencies[e];
      if (t.dependencies?.[e]) return t.dependencies[e];
      if (t.peerDependencies?.[e]) return t.peerDependencies[e];
    }
    get accept() {
      return this.#e;
    }
    get valid() {
      return !this.error;
    }
    get missing() {
      return this.error === "MISSING";
    }
    get invalid() {
      return this.error === "INVALID";
    }
    get peerLocal() {
      return this.error === "PEER LOCAL";
    }
    get error() {
      if (!this.#r)
        if (!this.#a)
          if (this.optional) this.#r = null;
          else this.#r = "MISSING";
        else if (this.peer && this.#n === this.#a.parent && !this.#n?.isTop) this.#r = "PEER LOCAL";
        else if (!this.satisfiedBy(this.#a)) this.#r = "INVALID";
        else if (
          this.overrides &&
          this.#a.overrides &&
          this.#a.edgesOut.size &&
          phi.doOverrideSetsConflict(this.overrides, this.#a.overrides)
        )
          this.#r = "INVALID";
        else this.#r = "OK";
      if (this.#r === "OK") return null;
      return this.#r;
    }
    reload(e = !1) {
      this.#t = null;
      let t = !1,
        r,
        s;
      if (this.#n?.overrides) {
        if (((r = this.#n.overrides.getEdgeRule(this)), r && !r.isEqual(this.overrides)))
          ((t = !0), (s = this.overrides), (this.overrides = r));
      } else delete this.overrides;
      let a = this.#n?.resolve(this.#i);
      if (a !== this.#a) {
        if (this.#a) this.#a.deleteEdgeIn(this);
        if (((this.#a = a), (this.#r = null), this.#a)) this.#a.addEdgeIn(this);
      } else if (e) this.#r = null;
      else if (t && this.#a) (this.#a.updateOverridesEdgeInRemoved(s), this.#a.updateOverridesEdgeInAdded(r));
    }
    detach() {
      if (((this.#t = null), this.#a)) this.#a.deleteEdgeIn(this);
      (this.#n?.edgesOut.delete(this.#i), (this.#a = null), (this.#r = "DETACHED"), (this.#n = null));
    }
    get from() {
      return this.#n;
    }
    get to() {
      return this.#a;
    }
    toJSON() {
      return new dhi(this);
    }
    [fhi.inspect.custom]() {
      return this.toJSON();
    }
  }
  mhi.exports = l1t;
});