
var Jdr = Ie(function (dfi) {
  Object.defineProperty(dfi, "__esModule", { value: !0 });
  dfi.Timestamp = void 0;
  var tve = g_e(),
    $yt = Q4e(),
    rve = qV();
  class Lyt extends tve.Signed {
    type = tve.MetadataKind.Timestamp;
    snapshotMeta;
    constructor(e) {
      super(e);
      this.snapshotMeta = e.snapshotMeta || new $yt.MetaFile({ version: 1 });
    }
    equals(e) {
      if (!(e instanceof Lyt)) return !1;
      return super.equals(e) && this.snapshotMeta.equals(e.snapshotMeta);
    }
    toJSON() {
      return {
        _type: this.type,
        spec_version: this.specVersion,
        version: this.version,
        expires: this.expires,
        meta: { "snapshot.json": this.snapshotMeta.toJSON() },
        ...this.unrecognizedFields,
      };
    }
    static fromJSON(e) {
      let { unrecognizedFields: t, ...r } = tve.Signed.commonFieldsFromJSON(e),
        { meta: s, ...a } = t;
      return new Lyt({ ...r, snapshotMeta: Qzo(s), unrecognizedFields: a });
    }
  }
  dfi.Timestamp = Lyt;
  function Qzo(e) {
    let t;
    if (rve.guard.isDefined(e)) {
      let r = e["snapshot.json"];
      if (!rve.guard.isDefined(r) || !rve.guard.isObject(r)) throw TypeError("missing snapshot.json in meta");
      else t = $yt.MetaFile.fromJSON(r);
    }
    return t;
  }
});