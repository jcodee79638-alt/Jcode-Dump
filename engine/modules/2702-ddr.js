
var ddr = Ie(function (eAi) {
  Object.defineProperty(eAi, "__esModule", { value: !0 });
  eAi.X509SCTExtension =
    eAi.X509SubjectKeyIDExtension =
    eAi.X509AuthorityKeyIDExtension =
    eAi.X509SubjectAlternativeNameExtension =
    eAi.X509KeyUsageExtension =
    eAi.X509BasicConstraintsExtension =
    eAi.X509Extension =
      void 0;
  var Gci = R4e(),
    Xci = qci();
  class aae {
    root;
    constructor(e) {
      this.root = e;
    }
    get oid() {
      return this.root.subs[0].toOID();
    }
    get critical() {
      return this.root.subs.length === 3 ? this.root.subs[1].toBoolean() : !1;
    }
    get value() {
      return this.extnValueObj.value;
    }
    get valueObj() {
      return this.extnValueObj;
    }
    get extnValueObj() {
      return this.root.subs[this.root.subs.length - 1];
    }
  }
  eAi.X509Extension = aae;
  class Jci extends aae {
    get isCA() {
      return this.sequence.subs[0]?.toBoolean() ?? !1;
    }
    get pathLenConstraint() {
      return this.sequence.subs.length > 1 ? this.sequence.subs[1].toInteger() : void 0;
    }
    get sequence() {
      return this.extnValueObj.subs[0];
    }
  }
  eAi.X509BasicConstraintsExtension = Jci;
  class Kci extends aae {
    get digitalSignature() {
      return this.bitString[0] === 1;
    }
    get keyCertSign() {
      return this.bitString[5] === 1;
    }
    get crlSign() {
      return this.bitString[6] === 1;
    }
    get bitString() {
      return this.extnValueObj.subs[0].toBitString();
    }
  }
  eAi.X509KeyUsageExtension = Kci;
  class zci extends aae {
    get rfc822Name() {
      return this.findGeneralName(1)?.value.toString("ascii");
    }
    get uri() {
      return this.findGeneralName(6)?.value.toString("ascii");
    }
    otherName(e) {
      let t = this.findGeneralName(0);
      if (t === void 0) return;
      if (t.subs[0].toOID() !== e) return;
      return t.subs[1].subs[0].value.toString("ascii");
    }
    findGeneralName(e) {
      return this.generalNames.find((t) => t.tag.isContextSpecific(e));
    }
    get generalNames() {
      return this.extnValueObj.subs[0].subs;
    }
  }
  eAi.X509SubjectAlternativeNameExtension = zci;
  class Qci extends aae {
    get keyIdentifier() {
      return this.findSequenceMember(0)?.value;
    }
    findSequenceMember(e) {
      return this.sequence.subs.find((t) => t.tag.isContextSpecific(e));
    }
    get sequence() {
      return this.extnValueObj.subs[0];
    }
  }
  eAi.X509AuthorityKeyIDExtension = Qci;
  class Yci extends aae {
    get keyIdentifier() {
      return this.extnValueObj.subs[0].value;
    }
  }
  eAi.X509SubjectKeyIDExtension = Yci;
  class Zci extends aae {
    constructor(e) {
      super(e);
    }
    get signedCertificateTimestamps() {
      let e = this.extnValueObj.subs[0].value,
        t = new Gci.ByteStream(e),
        r = t.getUint16() + 2,
        s = [];
      while (t.position < r) {
        let a = t.getUint16(),
          H = t.getBlock(a);
        s.push(Xci.SignedCertificateTimestamp.parse(H));
      }
      if (t.position !== r) throw Error("SCT list length does not match actual length");
      return s;
    }
  }
  eAi.X509SCTExtension = Zci;
});