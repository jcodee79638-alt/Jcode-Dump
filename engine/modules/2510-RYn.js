
var RYn = Ie(function (Cuc, BYn) {
  var { satisfies: OYn, simplifyRange: UOo } = Qj(),
    UYn = { loose: !0, includePrerelease: !0 },
    Lur = eB()("en"),
    NOo = ky(),
    NYn = new Map([
      ["info", 0],
      [0, "info"],
      ["low", 1],
      [1, "low"],
      ["moderate", 2],
      [2, "moderate"],
      ["high", 3],
      [3, "high"],
      ["critical", 4],
      [4, "critical"],
      [null, -1],
      [-1, null],
    ]);
  class FYn {
    #e = null;
    #r = null;
    #t = !0;
    constructor({ name: e, advisory: t }) {
      ((this.name = e),
        (this.via = new Set()),
        (this.advisories = new Set()),
        (this.severity = null),
        (this.effects = new Set()),
        (this.topNodes = new Set()),
        (this.nodes = new Set()),
        this.addAdvisory(t),
        (this.packument = t.packument),
        (this.versions = t.versions));
    }
    get fixAvailable() {
      return this.#t;
    }
    set fixAvailable(e) {
      this.#t = e;
      for (let t of this.via) {
        if (t.fixAvailable === e) continue;
        if (e === !1) t.fixAvailable = e;
        else if (t.fixAvailable === !0) t.fixAvailable = e;
        else if (
          typeof e === "object" &&
          (typeof t.fixAvailable !== "object" || !t.fixAvailable.isSemVerMajor)
        )
          t.fixAvailable = e;
      }
    }
    get isDirect() {
      for (let e of this.nodes.values())
        for (let t of e.edgesIn) if (t.from.isProjectRoot || t.from.isWorkspace) return !0;
      return !1;
    }
    testSpec(e) {
      let t = NOo(e);
      if (!t.registry) return !0;
      if (t.subSpec) e = t.subSpec.rawSpec;
      for (let r of this.versions) if (OYn(r, e) && !OYn(r, this.range, UYn)) return !1;
      return !0;
    }
    toJSON() {
      return {
        name: this.name,
        severity: this.severity,
        isDirect: this.isDirect,
        via: [...this.advisories]
          .map((e) =>
            e.type === "metavuln"
              ? e.dependency
              : { ...e, versions: void 0, vulnerableVersions: void 0, id: void 0 },
          )
          .sort((e, t) => Lur(String(e.source || e), String(t.source || t))),
        effects: [...this.effects].map((e) => e.name).sort(Lur),
        range: this.simpleRange,
        nodes: [...this.nodes].map((e) => e.location).sort(Lur),
        fixAvailable: this.#t,
      };
    }
    addVia(e) {
      (this.via.add(e), e.effects.add(this), (this.fixAvailable = this.fixAvailable));
    }
    deleteVia(e) {
      (this.via.delete(e), e.effects.delete(this));
    }
    deleteAdvisory(e) {
      (this.advisories.delete(e), (this.severity = null), (this.#e = null), (this.#r = null));
      for (let r of this.advisories) this.addAdvisory(r);
      let t = new Set([...this.advisories].map((r) => r.dependency));
      for (let r of this.via) if (!t.has(r.name)) this.deleteVia(r);
    }
    addAdvisory(e) {
      this.advisories.add(e);
      let t = NYn.get(e.severity);
      if (((this.#e = null), (this.#r = null), t > NYn.get(this.severity))) this.severity = e.severity;
    }
    get range() {
      if (!this.#e) this.#e = [...this.advisories].map((e) => e.range).join(" || ");
      return this.#e;
    }
    get simpleRange() {
      if (this.#r && this.#r === this.#e) return this.#r;
      let e = [...this.advisories][0].versions,
        t = this.range;
      return ((this.#r = UOo(e, t, UYn)), (this.#e = this.#r), this.#r);
    }
    isVulnerable(e) {
      if (this.nodes.has(e)) return !0;
      let { version: t } = e.package;
      if (!t) return !1;
      for (let r of this.advisories) if (r.testVersion(t)) return (this.nodes.add(e), !0);
      return !1;
    }
  }
  BYn.exports = FYn;
});