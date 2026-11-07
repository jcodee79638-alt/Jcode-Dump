
var sAi = Ie(function ($N) {
  var eJo =
      ($N && $N.__createBinding) ||
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
    tJo =
      ($N && $N.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    nAi =
      ($N && $N.__importStar) ||
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
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") eJo(r, t, s[a]);
          }
          return (tJo(r, t), r);
        };
      })();
  Object.defineProperty($N, "__esModule", { value: !0 });
  $N.X509Certificate = $N.EXTENSION_OID_SCT = void 0;
  var iAi = jDt(),
    rAi = nAi(jTe()),
    PTe = PDt(),
    rJo = nAi(cdr()),
    h8 = ddr(),
    nJo = "2.5.29.14",
    iJo = "2.5.29.15",
    sJo = "2.5.29.17",
    oJo = "2.5.29.19",
    aJo = "2.5.29.35";
  $N.EXTENSION_OID_SCT = "1.3.6.1.4.1.11129.2.4.2";
  class kDt {
    root;
    constructor(e) {
      this.root = e;
    }
    static parse(e) {
      let t = typeof e === "string" ? rJo.toDER(e) : e,
        r = iAi.ASN1Obj.parseBuffer(t);
      return new kDt(r);
    }
    get tbsCertificate() {
      return this.tbsCertificateObj;
    }
    get version() {
      return `v${(this.versionObj.subs[0].toInteger() + BigInt(1)).toString()}`;
    }
    get serialNumber() {
      return this.serialNumberObj.value;
    }
    get notBefore() {
      return this.validityObj.subs[0].toDate();
    }
    get notAfter() {
      return this.validityObj.subs[1].toDate();
    }
    get issuer() {
      return this.issuerObj.value;
    }
    get subject() {
      return this.subjectObj.value;
    }
    get publicKey() {
      return this.subjectPublicKeyInfoObj.toDER();
    }
    get signatureAlgorithm() {
      let e = this.signatureAlgorithmObj.subs[0].toOID();
      if (PTe.RSA_SIGNATURE_ALGOS[e]) return PTe.RSA_SIGNATURE_ALGOS[e];
      return PTe.ECDSA_SIGNATURE_ALGOS[e];
    }
    get signatureValue() {
      return this.signatureValueObj.value.subarray(1);
    }
    get subjectAltName() {
      let e = this.extSubjectAltName;
      return e?.uri || e?.rfc822Name;
    }
    get extensions() {
      return this.extensionsObj?.subs[0]?.subs || [];
    }
    get extKeyUsage() {
      let e = this.findExtension(iJo);
      return e ? new h8.X509KeyUsageExtension(e) : void 0;
    }
    get extBasicConstraints() {
      let e = this.findExtension(oJo);
      return e ? new h8.X509BasicConstraintsExtension(e) : void 0;
    }
    get extSubjectAltName() {
      let e = this.findExtension(sJo);
      return e ? new h8.X509SubjectAlternativeNameExtension(e) : void 0;
    }
    get extAuthorityKeyID() {
      let e = this.findExtension(aJo);
      return e ? new h8.X509AuthorityKeyIDExtension(e) : void 0;
    }
    get extSubjectKeyID() {
      let e = this.findExtension(nJo);
      return e ? new h8.X509SubjectKeyIDExtension(e) : void 0;
    }
    get extSCT() {
      let e = this.findExtension($N.EXTENSION_OID_SCT);
      return e ? new h8.X509SCTExtension(e) : void 0;
    }
    get isCA() {
      let e = this.extBasicConstraints?.isCA || !1;
      if (this.extKeyUsage) return e && this.extKeyUsage.keyCertSign;
      return e;
    }
    extension(e) {
      let t = this.findExtension(e);
      return t ? new h8.X509Extension(t) : void 0;
    }
    verify(e) {
      let t = e?.publicKey || this.publicKey,
        r = rAi.createPublicKey(t);
      return rAi.verify(this.tbsCertificate.toDER(), r, this.signatureValue, this.signatureAlgorithm);
    }
    validForDate(e) {
      return this.notBefore <= e && e <= this.notAfter;
    }
    equals(e) {
      return this.root.toDER().equals(e.root.toDER());
    }
    clone() {
      let e = this.root.toDER(),
        t = Buffer.alloc(e.length);
      return (e.copy(t), kDt.parse(t));
    }
    findExtension(e) {
      return this.extensions.find((t) => t.subs[0].toOID() === e);
    }
    get tbsCertificateObj() {
      return this.root.subs[0];
    }
    get signatureAlgorithmObj() {
      return this.root.subs[1];
    }
    get signatureValueObj() {
      return this.root.subs[2];
    }
    get versionObj() {
      return this.tbsCertificateObj.subs[0];
    }
    get serialNumberObj() {
      return this.tbsCertificateObj.subs[1];
    }
    get issuerObj() {
      return this.tbsCertificateObj.subs[3];
    }
    get validityObj() {
      return this.tbsCertificateObj.subs[4];
    }
    get subjectObj() {
      return this.tbsCertificateObj.subs[5];
    }
    get subjectPublicKeyInfoObj() {
      return this.tbsCertificateObj.subs[6];
    }
    get extensionsObj() {
      return this.tbsCertificateObj.subs.find((e) => e.tag.isContextSpecific(3));
    }
  }
  $N.X509Certificate = kDt;
});