
var Zv = Ie(function (Sec, FPn) {
  var T$t = PVe(),
    { MAX_LENGTH: NPn, MAX_SAFE_INTEGER: v$t } = Rxe(),
    { safeRe: b$t, t: j$t } = Wxe(),
    hpo = S$t(),
    { compareIdentifiers: War } = Rar();
  class wV {
    constructor(e, t) {
      if (((t = hpo(t)), e instanceof wV))
        if (e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease) return e;
        else e = e.version;
      else if (typeof e !== "string")
        throw TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);
      if (e.length > NPn) throw TypeError(`version is longer than ${NPn} characters`);
      (T$t("SemVer", e, t),
        (this.options = t),
        (this.loose = !!t.loose),
        (this.includePrerelease = !!t.includePrerelease));
      let r = e.trim().match(t.loose ? b$t[j$t.LOOSE] : b$t[j$t.FULL]);
      if (!r) throw TypeError(`Invalid Version: ${e}`);
      if (
        ((this.raw = e),
        (this.major = +r[1]),
        (this.minor = +r[2]),
        (this.patch = +r[3]),
        this.major > v$t || this.major < 0)
      )
        throw TypeError("Invalid major version");
      if (this.minor > v$t || this.minor < 0) throw TypeError("Invalid minor version");
      if (this.patch > v$t || this.patch < 0) throw TypeError("Invalid patch version");
      if (!r[4]) this.prerelease = [];
      else
        this.prerelease = r[4].split(".").map((s) => {
          if (/^[0-9]+$/.test(s)) {
            let a = +s;
            if (a >= 0 && a < v$t) return a;
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
      if ((T$t("SemVer.compare", this.version, this.options, e), !(e instanceof wV))) {
        if (typeof e === "string" && e === this.version) return 0;
        e = new wV(e, this.options);
      }
      if (e.version === this.version) return 0;
      return this.compareMain(e) || this.comparePre(e);
    }
    compareMain(e) {
      if (!(e instanceof wV)) e = new wV(e, this.options);
      if (this.major < e.major) return -1;
      if (this.major > e.major) return 1;
      if (this.minor < e.minor) return -1;
      if (this.minor > e.minor) return 1;
      if (this.patch < e.patch) return -1;
      if (this.patch > e.patch) return 1;
      return 0;
    }
    comparePre(e) {
      if (!(e instanceof wV)) e = new wV(e, this.options);
      if (this.prerelease.length && !e.prerelease.length) return -1;
      else if (!this.prerelease.length && e.prerelease.length) return 1;
      else if (!this.prerelease.length && !e.prerelease.length) return 0;
      let t = 0;
      do {
        let r = this.prerelease[t],
          s = e.prerelease[t];
        if ((T$t("prerelease compare", t, r, s), r === void 0 && s === void 0)) return 0;
        else if (s === void 0) return 1;
        else if (r === void 0) return -1;
        else if (r === s) continue;
        else return War(r, s);
      } while (++t);
    }
    compareBuild(e) {
      if (!(e instanceof wV)) e = new wV(e, this.options);
      let t = 0;
      do {
        let r = this.build[t],
          s = e.build[t];
        if ((T$t("build compare", t, r, s), r === void 0 && s === void 0)) return 0;
        else if (s === void 0) return 1;
        else if (r === void 0) return -1;
        else if (r === s) continue;
        else return War(r, s);
      } while (++t);
    }
    inc(e, t, r) {
      if (e.startsWith("pre")) {
        if (!t && r === !1) throw Error("invalid increment argument: identifier is empty");
        if (t) {
          let s = `-${t}`.match(this.options.loose ? b$t[j$t.PRERELEASELOOSE] : b$t[j$t.PRERELEASE]);
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
            if (War(this.prerelease[0], t) === 0) {
              if (isNaN(this.prerelease[1])) this.prerelease = a;
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
  FPn.exports = wV;
});