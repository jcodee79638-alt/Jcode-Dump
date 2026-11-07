
var l_r = Ie(function (kLc, lhi) {
  var u1t = ky(),
    I8 = Qj(),
    { log: uhi } = mg();
  class u_r {
    constructor({ overrides: e, key: t, parent: r }) {
      if (((this.parent = r), (this.children = new Map()), typeof e === "string")) e = { ".": e };
      if (e["."] === "") e["."] = "*";
      if (r) {
        let s = u1t(t);
        if (!s.name) throw Error(`Override without name: ${t}`);
        ((this.name = s.name),
          (s.name = ""),
          (this.key = t),
          (this.keySpec = s.toString()),
          (this.value = e["."] || this.keySpec));
      }
      for (let [s, a] of Object.entries(e)) {
        if (s === ".") continue;
        let H = new u_r({ parent: this, key: s, overrides: a });
        this.children.set(H.key, H);
      }
    }
    childrenAreEqual(e) {
      if (this.children.size !== e.children.size) return !1;
      for (let [t] of this.children) {
        if (!e.children.has(t)) return !1;
        if (this.children.get(t).value !== e.children.get(t).value) return !1;
        if (!this.children.get(t).childrenAreEqual(e.children.get(t))) return !1;
      }
      return !0;
    }
    isEqual(e) {
      if (this === e) return !0;
      if (!e) return !1;
      if (this.key !== e.key || this.value !== e.value) return !1;
      if (!this.childrenAreEqual(e)) return !1;
      if (!this.parent) return !e.parent;
      return this.parent.isEqual(e.parent);
    }
    getEdgeRule(e) {
      for (let t of this.ruleset.values()) {
        if (t.name !== e.name) continue;
        if (t.keySpec === "*") return t;
        let r = u1t(`${e.name}@${e.rawSpec || e.spec}`);
        if (r.type === "alias") r = r.subSpec;
        if (r.type === "git") {
          if (r.gitRange && I8.intersects(r.gitRange, t.keySpec)) return t;
          continue;
        }
        if (r.type === "range" || r.type === "version") {
          if (I8.intersects(r.fetchSpec, t.keySpec)) return t;
          continue;
        }
        return t;
      }
      return this;
    }
    getNodeRule(e) {
      for (let t of this.ruleset.values()) {
        if (t.name !== e.name) continue;
        if (I8.satisfies(e.version, t.keySpec) || I8.satisfies(e.version, t.value)) return t;
      }
      return this;
    }
    getMatchingRule(e) {
      for (let t of this.ruleset.values()) {
        if (t.name !== e.name) continue;
        if (I8.satisfies(e.version, t.keySpec) || I8.satisfies(e.version, t.value)) return t;
      }
      return null;
    }
    *ancestry() {
      for (let e = this; e; e = e.parent) yield e;
    }
    get isRoot() {
      return !this.parent;
    }
    get ruleset() {
      let e = new Map();
      for (let t of this.ancestry()) {
        for (let r of t.children.values()) if (!e.has(r.key)) e.set(r.key, r);
        if (!t.isRoot && !e.has(t.key)) e.set(t.key, t);
      }
      return e;
    }
    static findSpecificOverrideSet(e, t) {
      for (let r = t; r; r = r.parent) if (r.isEqual(e)) return t;
      for (let r = e; r; r = r.parent) if (r.isEqual(t)) return e;
      uhi.silly("Conflicting override sets", e, t);
    }
    static doOverrideSetsConflict(e, t) {
      if (this.findSpecificOverrideSet(e, t) !== void 0) return !1;
      return this.haveConflictingRules(e, t);
    }
    static haveConflictingRules(e, t) {
      let r = e.ruleset,
        s = t.ruleset;
      for (let [a, H] of r) {
        let u = s.get(a);
        if (!u) continue;
        if (H === u || H.isEqual(u)) continue;
        let f = H.value,
          d = u.value;
        if (f.startsWith("$") || d.startsWith("$")) continue;
        try {
          let _ = u1t(`${H.name}@${f}`),
            L = u1t(`${u.name}@${d}`);
          if ((_.type === "range" || _.type === "version") && (L.type === "range" || L.type === "version")) {
            let I = _.fetchSpec,
              D = L.fetchSpec;
            if (!I8.intersects(I, D))
              return (
                uhi.silly("Found conflicting override rules", { package: H.name, first: f, second: d }),
                !0
              );
          }
        } catch {}
      }
      return !1;
    }
  }
  lhi.exports = u_r;
});