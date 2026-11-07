
var kVe = Ie(function (ttc, BCn) {
  var OVe = Symbol("SemVer ANY");
  class B$t {
    static get ANY() {
      return OVe;
    }
    constructor(e, t) {
      if (((t = kCn(t)), e instanceof B$t))
        if (e.loose === !!t.loose) return e;
        else e = e.value;
      if (
        ((e = e.trim().split(/\s+/).join(" ")),
        Kar("comparator", e, t),
        (this.options = t),
        (this.loose = !!t.loose),
        this.parse(e),
        this.semver === OVe)
      )
        this.value = "";
      else this.value = this.operator + this.semver.version;
      Kar("comp", this);
    }
    parse(e) {
      let t = this.options.loose ? OCn[UCn.COMPARATORLOOSE] : OCn[UCn.COMPARATOR],
        r = e.match(t);
      if (!r) throw TypeError(`Invalid comparator: ${e}`);
      if (((this.operator = r[1] !== void 0 ? r[1] : ""), this.operator === "=")) this.operator = "";
      if (!r[2]) this.semver = OVe;
      else this.semver = new NCn(r[2], this.options.loose);
    }
    toString() {
      return this.value;
    }
    test(e) {
      if ((Kar("Comparator.test", e, this.options.loose), this.semver === OVe || e === OVe)) return !0;
      if (typeof e === "string")
        try {
          e = new NCn(e, this.options);
        } catch (t) {
          return !1;
        }
      return Jar(e, this.operator, this.semver, this.options);
    }
    intersects(e, t) {
      if (!(e instanceof B$t)) throw TypeError("a Comparator is required");
      if (this.operator === "") {
        if (this.value === "") return !0;
        return new FCn(e.value, t).test(this.value);
      } else if (e.operator === "") {
        if (e.value === "") return !0;
        return new FCn(this.value, t).test(e.semver);
      }
      if (((t = kCn(t)), t.includePrerelease && (this.value === "<0.0.0-0" || e.value === "<0.0.0-0")))
        return !1;
      if (!t.includePrerelease && (this.value.startsWith("<0.0.0") || e.value.startsWith("<0.0.0")))
        return !1;
      if (this.operator.startsWith(">") && e.operator.startsWith(">")) return !0;
      if (this.operator.startsWith("<") && e.operator.startsWith("<")) return !0;
      if (this.semver.version === e.semver.version && this.operator.includes("=") && e.operator.includes("="))
        return !0;
      if (Jar(this.semver, "<", e.semver, t) && this.operator.startsWith(">") && e.operator.startsWith("<"))
        return !0;
      if (Jar(this.semver, ">", e.semver, t) && this.operator.startsWith("<") && e.operator.startsWith(">"))
        return !0;
      return !1;
    }
  }
  BCn.exports = B$t;
  var kCn = S$t(),
    { safeRe: OCn, t: UCn } = Wxe(),
    Jar = Xar(),
    Kar = PVe(),
    NCn = Zv(),
    FCn = V2();
});