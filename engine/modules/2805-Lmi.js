
var Lmi = Ie(function (Khc, hmi) {
  var Mea = cmi(),
    jE = Qj(),
    GV = { includePrerelease: !0, loose: !0 },
    xea = umi(),
    sqe = Symbol("source"),
    oqe = Symbol("packument"),
    Xyt = Symbol("versionVulnMemo"),
    $mr = Symbol("updated"),
    Sea = Symbol("options"),
    lmi = Symbol("specVulnMemo"),
    fmi = Symbol("testVersion"),
    pmi = Symbol("testVersions"),
    dmi = Symbol("calculateRange"),
    D_e = Symbol("markVulnerable"),
    mmi = Symbol("testSpec");
  class _mi {
    constructor(e, t, r = {}) {
      if (((this.source = t.id), (this[sqe] = t), (this[Sea] = r), (this.name = e), !t.name)) t.name = e;
      if (((this.dependency = t.name), this.type === "advisory"))
        ((this.title = t.title), (this.url = t.url));
      else ((this.title = `Depends on vulnerable versions of ${t.name}`), (this.url = null));
      ((this.severity = t.severity || "high"),
        (this.versions = []),
        (this.vulnerableVersions = []),
        (this.cwe = t.cwe),
        (this.cvss = t.cvss),
        (this.range = this.type === "advisory" ? t.vulnerable_versions || "*" : null),
        (this.id = Mea(this)),
        (this[oqe] = null),
        (this[Xyt] = new Map()),
        (this[lmi] = new Map()),
        (this[$mr] = !1));
    }
    get updated() {
      return this[$mr];
    }
    get type() {
      return this.dependency === this.name ? "advisory" : "metavuln";
    }
    get packument() {
      return this[oqe];
    }
    load(e, t) {
      if (!e || typeof e !== "object") throw TypeError("invalid cached data, expected object");
      if (!t || typeof t !== "object") throw TypeError("invalid packument data, expected object");
      if (e.id && e.id !== this.id)
        throw Object.assign(Error("loading from incorrect cache entry"), { expected: this.id, actual: e.id });
      if (t.name !== this.name)
        throw Object.assign(Error("loading from incorrect packument"), {
          expected: this.name,
          actual: t.name,
        });
      if (this[oqe]) throw Error("advisory object already loaded");
      if (!this.range || (e.range && e.range === this.range)) Object.assign(this, e);
      this[oqe] = t;
      let r = Object.keys(t.versions || {}),
        s = new Set([...r, ...this.versions]),
        a = [],
        H = [];
      for (let f of s)
        if (!this.versions.includes(f)) (a.push(f), this.versions.push(f));
        else if (!r.includes(f)) H.push(f);
      this.versions = jE.sort(
        this.versions.filter((f) => !H.includes(f)),
        GV,
      );
      let u = this.type === "advisory" ? this.range && this.range === e.range : !this[sqe].updated;
      if (
        ((this.vulnerableVersions = !u
          ? []
          : jE.sort(
              this.vulnerableVersions.filter((f) => !H.includes(f)),
              GV,
            )),
        u && !a.length && !H.length)
      )
        return this;
      if (((this[$mr] = !0), !u || a.length)) this[pmi](u ? a : this.versions);
      if (((this.vulnerableVersions = jE.sort(this.vulnerableVersions, GV)), this.type === "metavuln"))
        this[dmi]();
      return this;
    }
    [dmi]() {
      let e = [];
      ((this.versions = jE.sort(this.versions, GV)),
        (this.vulnerableVersions = jE.sort(this.vulnerableVersions, GV)));
      for (let r = 0, s = 0; r < this.versions.length; r++) {
        let a = [this.versions[r]];
        while (r < this.versions.length) {
          if (this.versions[r] !== this.vulnerableVersions[s]) {
            if (/-/.test(this.versions[r])) {
              r++;
              continue;
            }
            break;
          }
          if (a.length > 1) a[1] = this.versions[r];
          else a.push(this.versions[r]);
          (r++, s++);
        }
        if (a.length > 1) {
          let H = this.versions[this.versions.length - 1];
          e.push(a[1] === H ? `>=${a[0]}` : a[0] === a[1] ? a[0] : a.join(" - "));
        }
      }
      let t = e.join(" || ").trim();
      this.range = !t ? "<0.0.0-0" : jE.simplifyRange(this.versions, t, GV);
    }
    testVersion(e, t = null) {
      let r = String(e);
      if (this[Xyt].has(r)) return this[Xyt].get(r);
      let s = this[fmi](e, t);
      if (s) this[D_e](e);
      return (this[Xyt].set(r, !!s), s);
    }
    [D_e](e) {
      let t = String(e);
      if (!this.vulnerableVersions.includes(t)) this.vulnerableVersions.push(t);
    }
    [fmi](e, t) {
      let r = String(e);
      if (this.vulnerableVersions.includes(r)) return !0;
      if (this.type === "advisory") return jE.satisfies(e, this.range, GV);
      let s = this[oqe]?.versions?.[e] || { dependencies: { [this.dependency]: t } };
      if (!t) t = xea(s, this.dependency);
      if (t === null) return !1;
      if (!jE.validRange(t, GV)) return !0;
      let a = s.bundleDependencies,
        H = a && a.includes(this[sqe].name),
        u = this[sqe].range;
      if (H) return jE.intersects(t, u, GV);
      return this[sqe].testSpec(t);
    }
    testSpec(e) {
      let t = this[lmi];
      if (t.has(e)) return t.get(e);
      let r = this[mmi](e);
      return (t.set(e, r), r);
    }
    [mmi](e) {
      for (let t of this.versions) {
        if (!jE.satisfies(t, e, GV)) continue;
        if (!this.testVersion(t)) return !1;
      }
      return !0;
    }
    [pmi](e) {
      if (!e.length) return;
      let t = new Set();
      e = jE.sort(e.map((a) => jE.parse(a, GV)));
      let r = e[0].major + "." + e[0].minor,
        s = [];
      t.add(s);
      for (let a of e) {
        let H = a.major + "." + a.minor;
        if (H !== r) ((r = H), (s = []), t.add(s));
        s.push(a);
      }
      for (let a of t) {
        let H = 0,
          u = this.testVersion(a[H]);
        while (H < a.length && /-/.test(String(a[H]))) H++;
        if (H === a.length) H = 0;
        else if (u) for (let T = 0; T < H; T++) this[D_e](a[T]);
        let f = a.length - 1,
          d = this.testVersion(a[f]);
        while (f > H && /-/.test(String(a[f]))) f--;
        if (f === H) f = a.length - 1;
        else if (d) for (let T = a.length - 1; T > f; T--) this[D_e](a[T]);
        let _ = H === 0 ? u : this.testVersion(a[H]),
          L = f === a.length - 1 ? d : this.testVersion(a[f]);
        if (_ && L) {
          for (let T = H; T < f; T++) this[D_e](a[T]);
          continue;
        }
        if (f < H + 2) continue;
        let I = Math.floor(a.length / 2),
          D = a.slice(0, I),
          S = a.slice(I);
        if (!/-/.test(String(D[0]))) {
          let T = this.testVersion(D[D.length - 1]);
          while (/-/.test(String(D[D.length - 1]))) {
            let C = D.pop();
            if (T) this[D_e](C);
          }
        }
        if (!/-/.test(String(S[S.length - 1]))) {
          let T = this.testVersion(S[0]);
          while (/-/.test(String(S[0]))) {
            let C = S.shift();
            if (T) this[D_e](C);
          }
        }
        (t.add(D), t.add(S));
      }
    }
  }
  hmi.exports = _mi;
});