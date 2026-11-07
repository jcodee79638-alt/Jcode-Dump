
var ayt = Ie(function (qTe) {
  var Tzo =
    (qTe && qTe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(qTe, "__esModule", { value: !0 });
  qTe.Key = void 0;
  var efi = Tzo(cr("util")),
    J5 = q5(),
    syt = qV(),
    tfi = Zli();
  class oyt {
    keyID;
    keyType;
    scheme;
    keyVal;
    unrecognizedFields;
    constructor(e) {
      let { keyID: t, keyType: r, scheme: s, keyVal: a, unrecognizedFields: H } = e;
      ((this.keyID = t),
        (this.keyType = r),
        (this.scheme = s),
        (this.keyVal = a),
        (this.unrecognizedFields = H || {}));
    }
    verifySignature(e) {
      let t = e.signatures[this.keyID];
      if (!t) throw new J5.UnsignedMetadataError("no signature for key found in metadata");
      if (!this.keyVal.public) throw new J5.UnsignedMetadataError("no public key found");
      let r = tfi.getPublicKey({ keyType: this.keyType, scheme: this.scheme, keyVal: this.keyVal.public }),
        s = e.signed.toJSON();
      try {
        if (!syt.crypto.verifySignature(s, r, t.sig))
          throw new J5.UnsignedMetadataError(`failed to verify ${this.keyID} signature`);
      } catch (a) {
        if (a instanceof J5.UnsignedMetadataError) throw a;
        throw new J5.UnsignedMetadataError(`failed to verify ${this.keyID} signature`);
      }
    }
    equals(e) {
      if (!(e instanceof oyt)) return !1;
      return (
        this.keyID === e.keyID &&
        this.keyType === e.keyType &&
        this.scheme === e.scheme &&
        efi.default.isDeepStrictEqual(this.keyVal, e.keyVal) &&
        efi.default.isDeepStrictEqual(this.unrecognizedFields, e.unrecognizedFields)
      );
    }
    toJSON() {
      return { keytype: this.keyType, scheme: this.scheme, keyval: this.keyVal, ...this.unrecognizedFields };
    }
    static fromJSON(e, t) {
      let { keytype: r, scheme: s, keyval: a, ...H } = t;
      if (typeof r !== "string") throw TypeError("keytype must be a string");
      if (typeof s !== "string") throw TypeError("scheme must be a string");
      if (!syt.guard.isStringRecord(a)) throw TypeError("keyval must be a string record");
      return new oyt({ keyID: e, keyType: r, scheme: s, keyVal: a, unrecognizedFields: H });
    }
  }
  qTe.Key = oyt;
});