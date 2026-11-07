
var Wci = Ie(function (B5) {
  var kXo =
      (B5 && B5.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            if (s === void 0) s = r;
            var a = Object.getOwnPropertyDescriptor(t, r);
            if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable))
              a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              };
            Object.defineProperty(e, s, a);
          }
        : function (e, t, r, s) {
            if (s === void 0) s = r;
            e[s] = t[r];
          }),
    OXo =
      (B5 && B5.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    UXo =
      (B5 && B5.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (r) {
                var s = [];
                for (var a in r) if (Object.prototype.hasOwnProperty.call(r, a)) s[s.length] = a;
                return s;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var r = {};
          if (t != null) {
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") kXo(r, t, s[a]);
          }
          return (OXo(r, t), r);
        };
      })();
  Object.defineProperty(B5, "__esModule", { value: !0 });
  B5.RFC3161Timestamp = void 0;
  var Bci = jDt(),
    udr = UXo(jTe()),
    CDt = PDt(),
    F5 = Adr(),
    Rci = Fci(),
    NXo = "1.2.840.113549.1.7.2",
    FXo = "1.2.840.113549.1.9.16.1.4",
    BXo = "1.2.840.113549.1.9.4";
  class ldr {
    root;
    constructor(e) {
      this.root = e;
    }
    static parse(e) {
      let t = Bci.ASN1Obj.parseBuffer(e);
      return new ldr(t);
    }
    get status() {
      return this.pkiStatusInfoObj.subs[0].toInteger();
    }
    get contentType() {
      return this.contentTypeObj.toOID();
    }
    get eContentType() {
      return this.eContentTypeObj.toOID();
    }
    get signingTime() {
      return this.tstInfo.genTime;
    }
    get signerIssuer() {
      return this.signerSidObj.subs[0].value;
    }
    get signerSerialNumber() {
      return this.signerSidObj.subs[1].value;
    }
    get signerDigestAlgorithm() {
      let e = this.signerDigestAlgorithmObj.subs[0].toOID();
      return CDt.SHA2_HASH_ALGOS[e];
    }
    get signatureAlgorithm() {
      let e = this.signatureAlgorithmObj.subs[0].toOID();
      return CDt.ECDSA_SIGNATURE_ALGOS[e];
    }
    get signatureValue() {
      return this.signatureValueObj.value;
    }
    get tstInfo() {
      return new Rci.TSTInfo(this.eContentObj.subs[0].subs[0]);
    }
    verify(e, t) {
      if (!this.timeStampTokenObj)
        throw new F5.RFC3161TimestampVerificationError("timeStampToken is missing");
      if (this.contentType !== NXo)
        throw new F5.RFC3161TimestampVerificationError(`incorrect content type: ${this.contentType}`);
      if (this.eContentType !== FXo)
        throw new F5.RFC3161TimestampVerificationError(
          `incorrect encapsulated content type: ${this.eContentType}`,
        );
      (this.tstInfo.verify(e), this.verifyMessageDigest(), this.verifySignature(t));
    }
    verifyMessageDigest() {
      let e = udr.digest(this.signerDigestAlgorithm, this.tstInfo.raw),
        t = this.messageDigestAttributeObj.subs[1].subs[0].value;
      if (!udr.bufferEqual(e, t))
        throw new F5.RFC3161TimestampVerificationError("signed data does not match tstInfo");
    }
    verifySignature(e) {
      let t = this.signedAttrsObj.toDER();
      if (((t[0] = 49), !udr.verify(t, e, this.signatureValue, this.signatureAlgorithm)))
        throw new F5.RFC3161TimestampVerificationError("signature verification failed");
    }
    get pkiStatusInfoObj() {
      return this.root.subs[0];
    }
    get timeStampTokenObj() {
      return this.root.subs[1];
    }
    get contentTypeObj() {
      return this.timeStampTokenObj.subs[0];
    }
    get signedDataObj() {
      return this.timeStampTokenObj.subs.find((t) => t.tag.isContextSpecific(0)).subs[0];
    }
    get encapContentInfoObj() {
      return this.signedDataObj.subs[2];
    }
    get signerInfosObj() {
      let e = this.signedDataObj;
      return e.subs[e.subs.length - 1];
    }
    get signerInfoObj() {
      return this.signerInfosObj.subs[0];
    }
    get eContentTypeObj() {
      return this.encapContentInfoObj.subs[0];
    }
    get eContentObj() {
      return this.encapContentInfoObj.subs[1];
    }
    get signedAttrsObj() {
      return this.signerInfoObj.subs.find((t) => t.tag.isContextSpecific(0));
    }
    get messageDigestAttributeObj() {
      return this.signedAttrsObj.subs.find((t) => t.subs[0].tag.isOID() && t.subs[0].toOID() === BXo);
    }
    get signerSidObj() {
      return this.signerInfoObj.subs[1];
    }
    get signerDigestAlgorithmObj() {
      return this.signerInfoObj.subs[2];
    }
    get signatureAlgorithmObj() {
      return this.signerInfoObj.subs[4];
    }
    get signatureValueObj() {
      return this.signerInfoObj.subs[5];
    }
  }
  B5.RFC3161Timestamp = ldr;
});