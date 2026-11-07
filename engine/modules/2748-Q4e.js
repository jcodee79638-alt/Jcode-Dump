
var Q4e = Ie(function (mae) {
  var qli =
    (mae && mae.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(mae, "__esModule", { value: !0 });
  mae.TargetFile = mae.MetaFile = void 0;
  var Gli = qli(cr("crypto")),
    tyt = qli(cr("util")),
    oP = q5(),
    dae = qV();
  class ryt {
    version;
    length;
    hashes;
    unrecognizedFields;
    constructor(e) {
      if (e.version <= 0) throw new oP.ValueError("Metafile version must be at least 1");
      if (e.length !== void 0) Xli(e.length);
      ((this.version = e.version),
        (this.length = e.length),
        (this.hashes = e.hashes),
        (this.unrecognizedFields = e.unrecognizedFields || {}));
    }
    equals(e) {
      if (!(e instanceof ryt)) return !1;
      return (
        this.version === e.version &&
        this.length === e.length &&
        tyt.default.isDeepStrictEqual(this.hashes, e.hashes) &&
        tyt.default.isDeepStrictEqual(this.unrecognizedFields, e.unrecognizedFields)
      );
    }
    verify(e) {
      if (this.length !== void 0) {
        if (e.length !== this.length)
          throw new oP.LengthOrHashMismatchError(`Expected length ${this.length} but got ${e.length}`);
      }
      if (this.hashes)
        Object.entries(this.hashes).forEach(([t, r]) => {
          let s;
          try {
            s = Gli.default.createHash(t);
          } catch (H) {
            throw new oP.LengthOrHashMismatchError(`Hash algorithm ${t} not supported`);
          }
          let a = s.update(e).digest("hex");
          if (a !== r) throw new oP.LengthOrHashMismatchError(`Expected hash ${r} but got ${a}`);
        });
    }
    toJSON() {
      let e = { version: this.version, ...this.unrecognizedFields };
      if (this.length !== void 0) e.length = this.length;
      if (this.hashes) e.hashes = this.hashes;
      return e;
    }
    static fromJSON(e) {
      let { version: t, length: r, hashes: s, ...a } = e;
      if (typeof t !== "number") throw TypeError("version must be a number");
      if (dae.guard.isDefined(r) && typeof r !== "number") throw TypeError("length must be a number");
      if (dae.guard.isDefined(s) && !dae.guard.isStringRecord(s))
        throw TypeError("hashes must be string keys and values");
      return new ryt({ version: t, length: r, hashes: s, unrecognizedFields: a });
    }
  }
  mae.MetaFile = ryt;
  class nyt {
    length;
    path;
    hashes;
    unrecognizedFields;
    constructor(e) {
      (Xli(e.length),
        (this.length = e.length),
        (this.path = e.path),
        (this.hashes = e.hashes),
        (this.unrecognizedFields = e.unrecognizedFields || {}));
    }
    get custom() {
      let e = this.unrecognizedFields.custom;
      if (!e || Array.isArray(e) || typeof e !== "object") return {};
      return e;
    }
    equals(e) {
      if (!(e instanceof nyt)) return !1;
      return (
        this.length === e.length &&
        this.path === e.path &&
        tyt.default.isDeepStrictEqual(this.hashes, e.hashes) &&
        tyt.default.isDeepStrictEqual(this.unrecognizedFields, e.unrecognizedFields)
      );
    }
    async verify(e) {
      let t = 0,
        r = Object.keys(this.hashes).reduce((s, a) => {
          try {
            s[a] = Gli.default.createHash(a);
          } catch (H) {
            throw new oP.LengthOrHashMismatchError(`Hash algorithm ${a} not supported`);
          }
          return s;
        }, {});
      for await (let s of e)
        ((t += s.length),
          Object.values(r).forEach((a) => {
            a.update(s);
          }));
      if (t !== this.length)
        throw new oP.LengthOrHashMismatchError(`Expected length ${this.length} but got ${t}`);
      Object.entries(r).forEach(([s, a]) => {
        let H = this.hashes[s],
          u = a.digest("hex");
        if (u !== H) throw new oP.LengthOrHashMismatchError(`Expected hash ${H} but got ${u}`);
      });
    }
    toJSON() {
      return { length: this.length, hashes: this.hashes, ...this.unrecognizedFields };
    }
    static fromJSON(e, t) {
      let { length: r, hashes: s, ...a } = t;
      if (typeof r !== "number") throw TypeError("length must be a number");
      if (!dae.guard.isStringRecord(s)) throw TypeError("hashes must have string keys and values");
      return new nyt({ length: r, path: e, hashes: s, unrecognizedFields: a });
    }
  }
  mae.TargetFile = nyt;
  function Xli(e) {
    if (e < 0) throw new oP.ValueError("Length must be at least 0");
  }
});