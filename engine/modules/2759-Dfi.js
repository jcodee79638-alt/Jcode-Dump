
var Dfi = Ie(function (ive) {
  var Yzo =
    (ive && ive.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(ive, "__esModule", { value: !0 });
  ive.Metadata = void 0;
  var hfi = Udr(),
    _fi = Yzo(cr("util")),
    $B = g_e(),
    K5 = q5(),
    Lfi = Wdr(),
    $fi = qdr(),
    gfi = Gdr(),
    Efi = Xdr(),
    Ifi = Jdr(),
    nve = qV();
  class gyt {
    signed;
    signatures;
    unrecognizedFields;
    constructor(e, t, r) {
      ((this.signed = e), (this.signatures = t || {}), (this.unrecognizedFields = r || {}));
    }
    sign(e, t = !0) {
      let r = Buffer.from(hfi.canonicalize(this.signed.toJSON())),
        s = e(r);
      if (!t) this.signatures = {};
      this.signatures[s.keyID] = s;
    }
    verifyDelegate(e, t) {
      let r,
        s = {};
      switch (this.signed.type) {
        case $B.MetadataKind.Root:
          ((s = this.signed.keys), (r = this.signed.roles[e]));
          break;
        case $B.MetadataKind.Targets:
          if (!this.signed.delegations) throw new K5.ValueError(`No delegations found for ${e}`);
          if (((s = this.signed.delegations.keys), this.signed.delegations.roles))
            r = this.signed.delegations.roles[e];
          else if (this.signed.delegations.succinctRoles) {
            if (this.signed.delegations.succinctRoles.isDelegatedRole(e))
              r = this.signed.delegations.succinctRoles;
          }
          break;
        default:
          throw TypeError("invalid metadata type");
      }
      if (!r) throw new K5.ValueError(`no delegation found for ${e}`);
      let a = new Set();
      if (
        (r.keyIDs.forEach((H) => {
          let u = s[H];
          if (!u) return;
          try {
            (u.verifySignature(t), a.add(u.keyID));
          } catch (f) {}
        }),
        a.size < r.threshold)
      )
        throw new K5.UnsignedMetadataError(`${e} was signed by ${a.size}/${r.threshold} keys`);
    }
    equals(e) {
      if (!(e instanceof gyt)) return !1;
      return (
        this.signed.equals(e.signed) &&
        _fi.default.isDeepStrictEqual(this.signatures, e.signatures) &&
        _fi.default.isDeepStrictEqual(this.unrecognizedFields, e.unrecognizedFields)
      );
    }
    toJSON() {
      return {
        signatures: Object.values(this.signatures).map((t) => t.toJSON()),
        signed: this.signed.toJSON(),
        ...this.unrecognizedFields,
      };
    }
    static fromJSON(e, t) {
      let { signed: r, signatures: s, ...a } = t;
      if (!nve.guard.isDefined(r) || !nve.guard.isObject(r)) throw TypeError("signed is not defined");
      if (e !== r._type) throw new K5.ValueError(`expected '${e}', got ${r._type}`);
      if (!nve.guard.isObjectArray(s)) throw TypeError("signatures is not an array");
      let H;
      switch (e) {
        case $B.MetadataKind.Root:
          H = Lfi.Root.fromJSON(r);
          break;
        case $B.MetadataKind.Timestamp:
          H = Ifi.Timestamp.fromJSON(r);
          break;
        case $B.MetadataKind.Snapshot:
          H = gfi.Snapshot.fromJSON(r);
          break;
        case $B.MetadataKind.Targets:
          H = Efi.Targets.fromJSON(r);
          break;
        default:
          throw TypeError("invalid metadata type");
      }
      let u = {};
      return (
        s.forEach((f) => {
          let d = $fi.Signature.fromJSON(f);
          if (u[d.keyID]) throw new K5.ValueError(`multiple signatures found for keyid: ${d.keyID}`);
          u[d.keyID] = d;
        }),
        new gyt(H, u, a)
      );
    }
  }
  ive.Metadata = gyt;
});