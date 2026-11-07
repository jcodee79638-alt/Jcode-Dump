
var gci = Ie(function (Lci) {
  Object.defineProperty(Lci, "__esModule", { value: !0 });
  Lci.ASN1Obj = void 0;
  var vTe = R4e(),
    _8 = SDt(),
    bDt = Hci(),
    mB = uci(),
    _ci = dci();
  class odr {
    tag;
    subs;
    value;
    constructor(e, t, r) {
      ((this.tag = e), (this.value = t), (this.subs = r));
    }
    static parseBuffer(e) {
      return hci(new vTe.ByteStream(e));
    }
    toDER() {
      let e = new vTe.ByteStream();
      if (this.subs.length > 0) for (let s of this.subs) e.appendView(s.toDER());
      else e.appendView(this.value);
      let t = e.buffer,
        r = new vTe.ByteStream();
      return (
        r.appendChar(this.tag.toDER()),
        r.appendView(bDt.encodeLength(t.length)),
        r.appendView(t),
        r.buffer
      );
    }
    toBoolean() {
      if (!this.tag.isBoolean()) throw new _8.ASN1TypeError("not a boolean");
      return mB.parseBoolean(this.value);
    }
    toInteger() {
      if (!this.tag.isInteger()) throw new _8.ASN1TypeError("not an integer");
      return mB.parseInteger(this.value);
    }
    toOID() {
      if (!this.tag.isOID()) throw new _8.ASN1TypeError("not an OID");
      return mB.parseOID(this.value);
    }
    toDate() {
      switch (!0) {
        case this.tag.isUTCTime():
          return mB.parseTime(this.value, !0);
        case this.tag.isGeneralizedTime():
          return mB.parseTime(this.value, !1);
        default:
          throw new _8.ASN1TypeError("not a date");
      }
    }
    toBitString() {
      if (!this.tag.isBitString()) throw new _8.ASN1TypeError("not a bit string");
      return mB.parseBitString(this.value);
    }
  }
  Lci.ASN1Obj = odr;
  function hci(e) {
    let t = new _ci.ASN1Tag(e.getUint8()),
      r = bDt.decodeLength(e),
      s = e.slice(e.position, r),
      a = e.position,
      H = [];
    if (t.constructed) H = mci(e, r);
    else if (t.isOctetString())
      try {
        H = mci(e, r);
      } catch (u) {}
    if (H.length === 0) e.seek(a + r);
    return new odr(t, s, H);
  }
  function mci(e, t) {
    let r = e.position + t;
    if (r > e.length) throw new _8.ASN1ParseError("invalid length");
    let s = [];
    while (e.position < r) s.push(hci(e));
    if (e.position !== r) throw new _8.ASN1ParseError("invalid length");
    return s;
  }
});