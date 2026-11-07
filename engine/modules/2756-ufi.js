
var ufi = Ie(function (YTe) {
  var Rzo =
    (YTe && YTe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(YTe, "__esModule", { value: !0 });
  YTe.Delegations = void 0;
  var myt = Rzo(cr("util")),
    cfi = q5(),
    Afi = ayt(),
    QTe = Rdr(),
    $ae = qV();
  class _yt {
    keys;
    roles;
    unrecognizedFields;
    succinctRoles;
    constructor(e) {
      if (((this.keys = e.keys), (this.unrecognizedFields = e.unrecognizedFields || {}), e.roles)) {
        if (Object.keys(e.roles).some((t) => QTe.TOP_LEVEL_ROLE_NAMES.includes(t)))
          throw new cfi.ValueError("Delegated role name conflicts with top-level role name");
      }
      ((this.succinctRoles = e.succinctRoles), (this.roles = e.roles));
    }
    equals(e) {
      if (!(e instanceof _yt)) return !1;
      return (
        myt.default.isDeepStrictEqual(this.keys, e.keys) &&
        myt.default.isDeepStrictEqual(this.roles, e.roles) &&
        myt.default.isDeepStrictEqual(this.unrecognizedFields, e.unrecognizedFields) &&
        myt.default.isDeepStrictEqual(this.succinctRoles, e.succinctRoles)
      );
    }
    *rolesForTarget(e) {
      if (this.roles) {
        for (let t of Object.values(this.roles))
          if (t.isDelegatedPath(e)) yield { role: t.name, terminating: t.terminating };
      } else if (this.succinctRoles) yield { role: this.succinctRoles.getRoleForTarget(e), terminating: !0 };
    }
    toJSON() {
      let e = { keys: Wzo(this.keys), ...this.unrecognizedFields };
      if (this.roles) e.roles = Vzo(this.roles);
      else if (this.succinctRoles) e.succinct_roles = this.succinctRoles.toJSON();
      return e;
    }
    static fromJSON(e) {
      let { keys: t, roles: r, succinct_roles: s, ...a } = e,
        H;
      if ($ae.guard.isObject(s)) H = QTe.SuccinctRoles.fromJSON(s);
      return new _yt({ keys: qzo(t), roles: Gzo(r), unrecognizedFields: a, succinctRoles: H });
    }
  }
  YTe.Delegations = _yt;
  function Wzo(e) {
    return Object.entries(e).reduce((t, [r, s]) => ({ ...t, [r]: s.toJSON() }), {});
  }
  function Vzo(e) {
    return Object.values(e).map((t) => t.toJSON());
  }
  function qzo(e) {
    if (!$ae.guard.isObjectRecord(e)) throw TypeError("keys is malformed");
    return Object.entries(e).reduce((t, [r, s]) => ({ ...t, [r]: Afi.Key.fromJSON(r, s) }), {});
  }
  function Gzo(e) {
    let t;
    if ($ae.guard.isDefined(e)) {
      if (!$ae.guard.isObjectArray(e)) throw TypeError("roles is malformed");
      t = e.reduce((r, s) => {
        let a = QTe.DelegatedRole.fromJSON(s);
        return { ...r, [a.name]: a };
      }, {});
    }
    return t;
  }
});