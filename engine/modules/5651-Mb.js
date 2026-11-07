
var Mb = Ie(function (wvA, wQi) {
  var pwt = jQe(),
    { MAX_LENGTH: CQi, MAX_SAFE_INTEGER: dwt } = xwe(),
    { safeRe: mwt, t: _wt } = Swe(),
    HZa = fwt(),
    { compareIdentifiers: iCr } = nCr(),
    cZa = (e, t) => {
      let r = t.split(".");
      if (r.length > e.length) return !1;
      for (let s = 0; s < r.length; s++) if (iCr(e[s], r[s]) !== 0) return !1;
      return !0;
    };
  class U7 {
    constructor(e, t) {
      if (((t = HZa(t)), e instanceof U7))
        if (e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease) return e;
        else e = e.version;
      else if (typeof e !== "string")
        throw TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);
      if (e.length > CQi) throw TypeError(`version is longer than ${CQi} characters`);
      (pwt("SemVer", e, t),
        (this.options = t),
        (this.loose = !!t.loose),
        (this.includePrerelease = !!t.includePrerelease));
      let r = e.trim().match(t.loose ? mwt[_wt.LOOSE] : mwt[_wt.FULL]);
      if (!r) throw TypeError(`Invalid Version: ${e}`);
      if (
        ((this.raw = e),
        (this.major = +r[1]),
        (this.minor = +r[2]),
        (this.patch = +r[3]),
        this.major > dwt || this.major < 0)
      )
        throw TypeError("Invalid major version");
      if (this.minor > dwt || this.minor < 0) throw TypeError("Invalid minor version");
      if (this.patch > dwt || this.patch < 0) throw TypeError("Invalid patch version");
      if (!r[4]) this.prerelease = [];
      else
        this.prerelease = r[4].split(".").map((s) => {
          if (/^[0-9]+$/.test(s)) {
            let a = +s;
            if (a >= 0 && a < dwt) return a;
          }
          return s;
        });
      ((this.build = r[5] ? r[5].split(".") : []), this.format());
    }
    format() {
      if (((this.version = `${this.major}.${this.minor}.${this.patch}`), this.prerelease.length))
        this.version += `-${this.prerelease.join(".")}`;
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(e) {
      if ((pwt("SemVer.compare", this.version, this.options, e), !(e instanceof U7))) {
        if (typeof e === "string" && e === this.version) return 0;
        e = new U7(e, this.options);
      }
      if (e.version === this.version) return 0;
      return this.compareMain(e) || this.comparePre(e);
    }
    compareMain(e) {
      if (!(e instanceof U7)) e = new U7(e, this.options);
      if (this.major < e.major) return -1;
      if (this.major > e.major) return 1;
      if (this.minor < e.minor) return -1;
      if (this.minor > e.minor) return 1;
      if (this.patch < e.patch) return -1;
      if (this.patch > e.patch) return 1;
      return 0;
    }
    comparePre(e) {
      if (!(e instanceof U7)) e = new U7(e, this.options);
      if (this.prerelease.length && !e.prerelease.length) return -1;
      else if (!this.prerelease.length && e.prerelease.length) return 1;
      else if (!this.prerelease.length && !e.prerelease.length) return 0;
      let t = 0;
      do {
        let r = this.prerelease[t],
          s = e.prerelease[t];
        if ((pwt("prerelease compare", t, r, s), r === void 0 && s === void 0)) return 0;
        else if (s === void 0) return 1;
        else if (r === void 0) return -1;
        else if (r === s) continue;
        else return iCr(r, s);
      } while (++t);
    }
    compareBuild(e) {
      if (!(e instanceof U7)) e = new U7(e, this.options);
      let t = 0;
      do {
        let r = this.build[t],
          s = e.build[t];
        if ((pwt("build compare", t, r, s), r === void 0 && s === void 0)) return 0;
        else if (s === void 0) return 1;
        else if (r === void 0) return -1;
        else if (r === s) continue;
        else return iCr(r, s);
      } while (++t);
    }
    inc(e, t, r) {
      if (e.startsWith("pre")) {
        if (!t && r === !1) throw Error("invalid increment argument: identifier is empty");
        if (t) {
          let s = `-${t}`.match(this.options.loose ? mwt[_wt.PRERELEASELOOSE] : mwt[_wt.PRERELEASE]);
          if (!s || s[1] !== t) throw Error(`invalid identifier: ${t}`);
        }
      }
      switch (e) {
        case "premajor":
          ((this.prerelease.length = 0),
            (this.patch = 0),
            (this.minor = 0),
            this.major++,
            this.inc("pre", t, r));
          break;
        case "preminor":
          ((this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc("pre", t, r));
          break;
        case "prepatch":
          ((this.prerelease.length = 0), this.inc("patch", t, r), this.inc("pre", t, r));
          break;
        case "prerelease":
          if (this.prerelease.length === 0) this.inc("patch", t, r);
          this.inc("pre", t, r);
          break;
        case "release":
          if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
          ((this.minor = 0), (this.patch = 0), (this.prerelease = []));
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
          ((this.patch = 0), (this.prerelease = []));
          break;
        case "patch":
          if (this.prerelease.length === 0) this.patch++;
          this.prerelease = [];
          break;
        case "pre": {
          let s = Number(r) ? 1 : 0;
          if (this.prerelease.length === 0) this.prerelease = [s];
          else {
            let a = this.prerelease.length;
            while (--a >= 0) if (typeof this.prerelease[a] === "number") (this.prerelease[a]++, (a = -2));
            if (a === -1) {
              if (t === this.prerelease.join(".") && r === !1)
                throw Error("invalid increment argument: identifier already exists");
              this.prerelease.push(s);
            }
          }
          if (t) {
            let a = [t, s];
            if (r === !1) a = [t];
            if (cZa(this.prerelease, t)) {
              let H = this.prerelease[t.split(".").length];
              if (isNaN(H)) this.prerelease = a;
            } else this.prerelease = a;
          }
          break;
        }
        default:
          throw Error(`invalid increment argument: ${e}`);
      }
      if (((this.raw = this.format()), this.build.length)) this.raw += `+${this.build.join(".")}`;
      return this;
    }
  }
  wQi.exports = U7;
});