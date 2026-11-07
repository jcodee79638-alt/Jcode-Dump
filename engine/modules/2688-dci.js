
var dci = Ie(function (fci) {
  Object.defineProperty(fci, "__esModule", { value: !0 });
  fci.ASN1Tag = void 0;
  var vDt = SDt(),
    L_e = {
      BOOLEAN: 1,
      INTEGER: 2,
      BIT_STRING: 3,
      OCTET_STRING: 4,
      OBJECT_IDENTIFIER: 6,
      SEQUENCE: 16,
      SET: 17,
      PRINTABLE_STRING: 19,
      UTC_TIME: 23,
      GENERALIZED_TIME: 24,
    },
    sdr = { UNIVERSAL: 0, APPLICATION: 1, CONTEXT_SPECIFIC: 2, PRIVATE: 3 };
  class lci {
    number;
    constructed;
    class;
    constructor(e) {
      if (
        ((this.number = e & 31),
        (this.constructed = (e & 32) === 32),
        (this.class = e >> 6),
        this.number === 31)
      )
        throw new vDt.ASN1ParseError("long form tags not supported");
      if (this.class === sdr.UNIVERSAL && this.number === 0)
        throw new vDt.ASN1ParseError("unsupported tag 0x00");
    }
    isUniversal() {
      return this.class === sdr.UNIVERSAL;
    }
    isContextSpecific(e) {
      let t = this.class === sdr.CONTEXT_SPECIFIC;
      return e !== void 0 ? t && this.number === e : t;
    }
    isBoolean() {
      return this.isUniversal() && this.number === L_e.BOOLEAN;
    }
    isInteger() {
      return this.isUniversal() && this.number === L_e.INTEGER;
    }
    isBitString() {
      return this.isUniversal() && this.number === L_e.BIT_STRING;
    }
    isOctetString() {
      return this.isUniversal() && this.number === L_e.OCTET_STRING;
    }
    isOID() {
      return this.isUniversal() && this.number === L_e.OBJECT_IDENTIFIER;
    }
    isUTCTime() {
      return this.isUniversal() && this.number === L_e.UTC_TIME;
    }
    isGeneralizedTime() {
      return this.isUniversal() && this.number === L_e.GENERALIZED_TIME;
    }
    toDER() {
      return this.number | (this.constructed ? 32 : 0) | (this.class << 6);
    }
  }
  fci.ASN1Tag = lci;
});