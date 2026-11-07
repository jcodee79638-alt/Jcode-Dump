
var g_e = Ie(function (hZ) {
  var uzo =
    (hZ && hZ.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(hZ, "__esModule", { value: !0 });
  hZ.Signed = hZ.MetadataKind = void 0;
  hZ.isMetadataKind = fzo;
  var lzo = uzo(cr("util")),
    G5 = q5(),
    RTe = qV(),
    Vli = ["1", "0", "31"],
    Ndr;
  (function (e) {
    ((e.Root = "root"), (e.Timestamp = "timestamp"), (e.Snapshot = "snapshot"), (e.Targets = "targets"));
  })(Ndr || (hZ.MetadataKind = Ndr = {}));
  function fzo(e) {
    return typeof e === "string" && Object.values(Ndr).includes(e);
  }
  class Fdr {
    specVersion;
    expires;
    version;
    unrecognizedFields;
    constructor(e) {
      this.specVersion = e.specVersion || Vli.join(".");
      let t = this.specVersion.split(".");
      if (!(t.length === 2 || t.length === 3) || !t.every((r) => pzo(r)))
        throw new G5.ValueError("Failed to parse specVersion");
      if (t[0] != Vli[0]) throw new G5.ValueError("Unsupported specVersion");
      ((this.expires = e.expires),
        (this.version = e.version),
        (this.unrecognizedFields = e.unrecognizedFields || {}));
    }
    equals(e) {
      if (!(e instanceof Fdr)) return !1;
      return (
        this.specVersion === e.specVersion &&
        this.expires === e.expires &&
        this.version === e.version &&
        lzo.default.isDeepStrictEqual(this.unrecognizedFields, e.unrecognizedFields)
      );
    }
    isExpired(e) {
      if (!e) e = new Date();
      return e >= new Date(this.expires);
    }
    static commonFieldsFromJSON(e) {
      let { spec_version: t, expires: r, version: s, ...a } = e;
      if (!RTe.guard.isDefined(t)) throw new G5.ValueError("spec_version is not defined");
      else if (typeof t !== "string") throw TypeError("spec_version must be a string");
      if (!RTe.guard.isDefined(r)) throw new G5.ValueError("expires is not defined");
      else if (typeof r !== "string") throw TypeError("expires must be a string");
      if (!RTe.guard.isDefined(s)) throw new G5.ValueError("version is not defined");
      else if (typeof s !== "number") throw TypeError("version must be a number");
      return { specVersion: t, expires: r, version: s, unrecognizedFields: a };
    }
  }
  hZ.Signed = Fdr;
  function pzo(e) {
    return !isNaN(Number(e));
  }
});