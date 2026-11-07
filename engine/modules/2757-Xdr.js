
var Xdr = Ie(function (eve) {
  var Xzo =
    (eve && eve.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(eve, "__esModule", { value: !0 });
  eve.Targets = void 0;
  var lfi = Xzo(cr("util")),
    ZTe = g_e(),
    ffi = ufi(),
    pfi = Q4e(),
    gae = qV();
  class hyt extends ZTe.Signed {
    type = ZTe.MetadataKind.Targets;
    targets;
    delegations;
    constructor(e) {
      super(e);
      ((this.targets = e.targets || {}), (this.delegations = e.delegations));
    }
    addTarget(e) {
      this.targets[e.path] = e;
    }
    equals(e) {
      if (!(e instanceof hyt)) return !1;
      return (
        super.equals(e) &&
        lfi.default.isDeepStrictEqual(this.targets, e.targets) &&
        lfi.default.isDeepStrictEqual(this.delegations, e.delegations)
      );
    }
    toJSON() {
      let e = {
        _type: this.type,
        spec_version: this.specVersion,
        version: this.version,
        expires: this.expires,
        targets: Jzo(this.targets),
        ...this.unrecognizedFields,
      };
      if (this.delegations) e.delegations = this.delegations.toJSON();
      return e;
    }
    static fromJSON(e) {
      let { unrecognizedFields: t, ...r } = ZTe.Signed.commonFieldsFromJSON(e),
        { targets: s, delegations: a, ...H } = t;
      return new hyt({ ...r, targets: Kzo(s), delegations: zzo(a), unrecognizedFields: H });
    }
  }
  eve.Targets = hyt;
  function Jzo(e) {
    return Object.entries(e).reduce((t, [r, s]) => ({ ...t, [r]: s.toJSON() }), {});
  }
  function Kzo(e) {
    let t;
    if (gae.guard.isDefined(e))
      if (!gae.guard.isObjectRecord(e)) throw TypeError("targets must be an object");
      else t = Object.entries(e).reduce((r, [s, a]) => ({ ...r, [s]: pfi.TargetFile.fromJSON(s, a) }), {});
    return t;
  }
  function zzo(e) {
    let t;
    if (gae.guard.isDefined(e))
      if (!gae.guard.isObject(e)) throw TypeError("delegations must be an object");
      else t = ffi.Delegations.fromJSON(e);
    return t;
  }
});