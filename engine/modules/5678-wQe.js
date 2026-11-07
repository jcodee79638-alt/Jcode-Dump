
var wQe = Ie(function (HbA, UYi) {
  var kQe = Symbol("SemVer ANY");
  class ywt {
    static get ANY() {
      return kQe;
    }
    constructor(e, t) {
      if (((t = PYi(t)), e instanceof ywt))
        if (e.loose === !!t.loose) return e;
        else e = e.value;
      if (
        ((e = e.trim().split(/\s+/).join(" ")),
        cCr("comparator", e, t),
        (this.options = t),
        (this.loose = !!t.loose),
        this.parse(e),
        this.semver === kQe)
      )
        this.value = "";
      else this.value = this.operator + this.semver.version;
      cCr("comp", this);
    }
    parse(e) {
      let t = this.options.loose ? CYi[wYi.COMPARATORLOOSE] : CYi[wYi.COMPARATOR],
        r = e.match(t);
      if (!r) throw TypeError(`Invalid comparator: ${e}`);
      if (((this.operator = r[1] !== void 0 ? r[1] : ""), this.operator === "=")) this.operator = "";
      if (!r[2]) this.semver = kQe;
      else this.semver = new kYi(r[2], this.options.loose);
    }
    toString() {
      return this.value;
    }
    test(e) {
      if ((cCr("Comparator.test", e, this.options.loose), this.semver === kQe || e === kQe)) return !0;
      if (typeof e === "string")
        try {
          e = new kYi(e, this.options);
        } catch (t) {
          return !1;
        }
      return HCr(e, this.operator, this.semver, this.options);
    }
    intersects(e, t) {
      if (!(e instanceof ywt)) throw TypeError("a Comparator is required");
      if (this.operator === "") {
        if (this.value === "") return !0;
        return new OYi(e.value, t).test(this.value);
      } else if (e.operator === "") {
        if (e.value === "") return !0;
        return new OYi(this.value, t).test(e.semver);
      }
      if (((t = PYi(t)), t.includePrerelease && (this.value === "<0.0.0-0" || e.value === "<0.0.0-0")))
        return !1;
      if (!t.includePrerelease && (this.value.startsWith("<0.0.0") || e.value.startsWith("<0.0.0")))
        return !1;
      if (this.operator.startsWith(">") && e.operator.startsWith(">")) return !0;
      if (this.operator.startsWith("<") && e.operator.startsWith("<")) return !0;
      if (this.semver.version === e.semver.version && this.operator.includes("=") && e.operator.includes("="))
        return !0;
      if (HCr(this.semver, "<", e.semver, t) && this.operator.startsWith(">") && e.operator.startsWith("<"))
        return !0;
      if (HCr(this.semver, ">", e.semver, t) && this.operator.startsWith("<") && e.operator.startsWith(">"))
        return !0;
      return !1;
    }
  }
  UYi.exports = ywt;
  var PYi = fwt(),
    { safeRe: CYi, t: wYi } = Swe(),
    HCr = aCr(),
    cCr = jQe(),
    kYi = Mb(),
    OYi = ER();
});