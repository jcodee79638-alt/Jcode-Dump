
var Rdr = Ie(function (LB) {
  var rfi =
    (LB && LB.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(LB, "__esModule", { value: !0 });
  LB.SuccinctRoles = LB.DelegatedRole = LB.Role = LB.TOP_LEVEL_ROLE_NAMES = void 0;
  var nfi = rfi(cr("crypto")),
    ifi = v7e(),
    Hyt = rfi(cr("util")),
    _ae = q5(),
    $8 = qV();
  LB.TOP_LEVEL_ROLE_NAMES = ["root", "targets", "snapshot", "timestamp"];
  class GTe {
    keyIDs;
    threshold;
    unrecognizedFields;
    constructor(e) {
      let { keyIDs: t, threshold: r, unrecognizedFields: s } = e;
      if (vzo(t)) throw new _ae.ValueError("duplicate key IDs found");
      if (r < 1) throw new _ae.ValueError("threshold must be at least 1");
      ((this.keyIDs = t), (this.threshold = r), (this.unrecognizedFields = s || {}));
    }
    equals(e) {
      if (!(e instanceof GTe)) return !1;
      return (
        this.threshold === e.threshold &&
        Hyt.default.isDeepStrictEqual(this.keyIDs, e.keyIDs) &&
        Hyt.default.isDeepStrictEqual(this.unrecognizedFields, e.unrecognizedFields)
      );
    }
    toJSON() {
      return { keyids: this.keyIDs, threshold: this.threshold, ...this.unrecognizedFields };
    }
    static fromJSON(e) {
      let { keyids: t, threshold: r, ...s } = e;
      if (!$8.guard.isStringArray(t)) throw TypeError("keyids must be an array");
      if (typeof r !== "number") throw TypeError("threshold must be a number");
      return new GTe({ keyIDs: t, threshold: r, unrecognizedFields: s });
    }
  }
  LB.Role = GTe;
  function vzo(e) {
    return new Set(e).size !== e.length;
  }
  class cyt extends GTe {
    name;
    terminating;
    paths;
    pathHashPrefixes;
    constructor(e) {
      super(e);
      let { name: t, terminating: r, paths: s, pathHashPrefixes: a } = e;
      if (((this.name = t), (this.terminating = r), e.paths && e.pathHashPrefixes))
        throw new _ae.ValueError("paths and pathHashPrefixes are mutually exclusive");
      ((this.paths = s), (this.pathHashPrefixes = a));
    }
    equals(e) {
      if (!(e instanceof cyt)) return !1;
      return (
        super.equals(e) &&
        this.name === e.name &&
        this.terminating === e.terminating &&
        Hyt.default.isDeepStrictEqual(this.paths, e.paths) &&
        Hyt.default.isDeepStrictEqual(this.pathHashPrefixes, e.pathHashPrefixes)
      );
    }
    isDelegatedPath(e) {
      if (this.paths) return this.paths.some((t) => jzo(e, t));
      if (this.pathHashPrefixes) {
        let r = nfi.default.createHash("sha256").update(e).digest("hex");
        return this.pathHashPrefixes.some((s) => r.startsWith(s));
      }
      return !1;
    }
    toJSON() {
      let e = { ...super.toJSON(), name: this.name, terminating: this.terminating };
      if (this.paths) e.paths = this.paths;
      if (this.pathHashPrefixes) e.path_hash_prefixes = this.pathHashPrefixes;
      return e;
    }
    static fromJSON(e) {
      let { keyids: t, threshold: r, name: s, terminating: a, paths: H, path_hash_prefixes: u, ...f } = e;
      if (!$8.guard.isStringArray(t)) throw TypeError("keyids must be an array of strings");
      if (typeof r !== "number") throw TypeError("threshold must be a number");
      if (typeof s !== "string") throw TypeError("name must be a string");
      if (typeof a !== "boolean") throw TypeError("terminating must be a boolean");
      if ($8.guard.isDefined(H) && !$8.guard.isStringArray(H))
        throw TypeError("paths must be an array of strings");
      if ($8.guard.isDefined(u) && !$8.guard.isStringArray(u))
        throw TypeError("path_hash_prefixes must be an array of strings");
      return new cyt({
        keyIDs: t,
        threshold: r,
        name: s,
        terminating: a,
        paths: H,
        pathHashPrefixes: u,
        unrecognizedFields: f,
      });
    }
  }
  LB.DelegatedRole = cyt;
  var bzo = (e, t) => e.map((r, s) => [r, t[s]]);
  function jzo(e, t) {
    let r = e.split("/"),
      s = t.split("/");
    if (s.length != r.length) return !1;
    return bzo(r, s).every(([a, H]) => ifi.minimatch(a, H));
  }
  class Ayt extends GTe {
    bitLength;
    namePrefix;
    numberOfBins;
    suffixLen;
    constructor(e) {
      super(e);
      let { bitLength: t, namePrefix: r } = e;
      if (t <= 0 || t > 32) throw new _ae.ValueError("bitLength must be between 1 and 32");
      ((this.bitLength = t),
        (this.namePrefix = r),
        (this.numberOfBins = Math.pow(2, t)),
        (this.suffixLen = (this.numberOfBins - 1).toString(16).length));
    }
    equals(e) {
      if (!(e instanceof Ayt)) return !1;
      return super.equals(e) && this.bitLength === e.bitLength && this.namePrefix === e.namePrefix;
    }
    getRoleForTarget(e) {
      let s = nfi.default.createHash("sha256").update(e).digest().subarray(0, 4),
        a = 32 - this.bitLength,
        u = (s.readUInt32BE() >>> a).toString(16).padStart(this.suffixLen, "0");
      return `${this.namePrefix}-${u}`;
    }
    *getRoles() {
      for (let e = 0; e < this.numberOfBins; e++) {
        let t = e.toString(16).padStart(this.suffixLen, "0");
        yield `${this.namePrefix}-${t}`;
      }
    }
    isDelegatedRole(e) {
      let t = this.namePrefix + "-";
      if (!e.startsWith(t)) return !1;
      let r = e.slice(t.length, e.length);
      if (r.length != this.suffixLen) return !1;
      if (!r.match(/^[0-9a-fA-F]+$/)) return !1;
      let s = parseInt(r, 16);
      return 0 <= s && s < this.numberOfBins;
    }
    toJSON() {
      return { ...super.toJSON(), bit_length: this.bitLength, name_prefix: this.namePrefix };
    }
    static fromJSON(e) {
      let { keyids: t, threshold: r, bit_length: s, name_prefix: a, ...H } = e;
      if (!$8.guard.isStringArray(t)) throw TypeError("keyids must be an array of strings");
      if (typeof r !== "number") throw TypeError("threshold must be a number");
      if (typeof s !== "number") throw TypeError("bit_length must be a number");
      if (typeof a !== "string") throw TypeError("name_prefix must be a string");
      return new Ayt({ keyIDs: t, threshold: r, bitLength: s, namePrefix: a, unrecognizedFields: H });
    }
  }
  LB.SuccinctRoles = Ayt;
});