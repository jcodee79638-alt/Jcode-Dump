
var Gdr = Ie(function (zTe) {
  var Uzo =
    (zTe && zTe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(zTe, "__esModule", { value: !0 });
  zTe.Snapshot = void 0;
  var Nzo = Uzo(cr("util")),
    KTe = g_e(),
    dyt = Q4e(),
    fyt = qV();
  class pyt extends KTe.Signed {
    type = KTe.MetadataKind.Snapshot;
    meta;
    constructor(e) {
      super(e);
      this.meta = e.meta || { "targets.json": new dyt.MetaFile({ version: 1 }) };
    }
    equals(e) {
      if (!(e instanceof pyt)) return !1;
      return super.equals(e) && Nzo.default.isDeepStrictEqual(this.meta, e.meta);
    }
    toJSON() {
      return {
        _type: this.type,
        meta: Fzo(this.meta),
        spec_version: this.specVersion,
        version: this.version,
        expires: this.expires,
        ...this.unrecognizedFields,
      };
    }
    static fromJSON(e) {
      let { unrecognizedFields: t, ...r } = KTe.Signed.commonFieldsFromJSON(e),
        { meta: s, ...a } = t;
      return new pyt({ ...r, meta: Bzo(s), unrecognizedFields: a });
    }
  }
  zTe.Snapshot = pyt;
  function Fzo(e) {
    return Object.entries(e).reduce((t, [r, s]) => ({ ...t, [r]: s.toJSON() }), {});
  }
  function Bzo(e) {
    let t;
    if (fyt.guard.isDefined(e))
      if (!fyt.guard.isObjectRecord(e)) throw TypeError("meta field is malformed");
      else t = Object.entries(e).reduce((r, [s, a]) => ({ ...r, [s]: dyt.MetaFile.fromJSON(a) }), {});
    return t;
  }
});