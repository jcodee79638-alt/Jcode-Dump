
var Wdr = Ie(function (JTe) {
  var Pzo =
    (JTe && JTe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(JTe, "__esModule", { value: !0 });
  JTe.Root = void 0;
  var sfi = Pzo(cr("util")),
    XTe = g_e(),
    uyt = q5(),
    ofi = ayt(),
    hae = Rdr(),
    Lae = qV();
  class lyt extends XTe.Signed {
    type = XTe.MetadataKind.Root;
    keys;
    roles;
    consistentSnapshot;
    constructor(e) {
      super(e);
      if (((this.keys = e.keys || {}), (this.consistentSnapshot = e.consistentSnapshot ?? !0), !e.roles))
        this.roles = hae.TOP_LEVEL_ROLE_NAMES.reduce(
          (t, r) => ({ ...t, [r]: new hae.Role({ keyIDs: [], threshold: 1 }) }),
          {},
        );
      else {
        let t = new Set(Object.keys(e.roles));
        if (!hae.TOP_LEVEL_ROLE_NAMES.every((r) => t.has(r)))
          throw new uyt.ValueError("missing top-level role");
        this.roles = e.roles;
      }
    }
    addKey(e, t) {
      if (!this.roles[t]) throw new uyt.ValueError(`role ${t} does not exist`);
      if (!this.roles[t].keyIDs.includes(e.keyID)) this.roles[t].keyIDs.push(e.keyID);
      this.keys[e.keyID] = e;
    }
    equals(e) {
      if (!(e instanceof lyt)) return !1;
      return (
        super.equals(e) &&
        this.consistentSnapshot === e.consistentSnapshot &&
        sfi.default.isDeepStrictEqual(this.keys, e.keys) &&
        sfi.default.isDeepStrictEqual(this.roles, e.roles)
      );
    }
    toJSON() {
      return {
        _type: this.type,
        spec_version: this.specVersion,
        version: this.version,
        expires: this.expires,
        keys: Czo(this.keys),
        roles: wzo(this.roles),
        consistent_snapshot: this.consistentSnapshot,
        ...this.unrecognizedFields,
      };
    }
    static fromJSON(e) {
      let { unrecognizedFields: t, ...r } = XTe.Signed.commonFieldsFromJSON(e),
        { keys: s, roles: a, consistent_snapshot: H, ...u } = t;
      if (typeof H !== "boolean") throw TypeError("consistent_snapshot must be a boolean");
      return new lyt({ ...r, keys: kzo(s), roles: Ozo(a), consistentSnapshot: H, unrecognizedFields: u });
    }
  }
  JTe.Root = lyt;
  function Czo(e) {
    return Object.entries(e).reduce((t, [r, s]) => ({ ...t, [r]: s.toJSON() }), {});
  }
  function wzo(e) {
    return Object.entries(e).reduce((t, [r, s]) => ({ ...t, [r]: s.toJSON() }), {});
  }
  function kzo(e) {
    let t;
    if (Lae.guard.isDefined(e)) {
      if (!Lae.guard.isObjectRecord(e)) throw TypeError("keys must be an object");
      t = Object.entries(e).reduce((r, [s, a]) => ({ ...r, [s]: ofi.Key.fromJSON(s, a) }), {});
    }
    return t;
  }
  function Ozo(e) {
    let t;
    if (Lae.guard.isDefined(e)) {
      if (!Lae.guard.isObjectRecord(e)) throw TypeError("roles must be an object");
      t = Object.entries(e).reduce((r, [s, a]) => ({ ...r, [s]: hae.Role.fromJSON(a) }), {});
    }
    return t;
  }
});