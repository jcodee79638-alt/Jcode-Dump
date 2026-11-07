
var Hci = Ie(function (aci) {
  Object.defineProperty(aci, "__esModule", { value: !0 });
  aci.decodeLength = X5o;
  aci.encodeLength = J5o;
  var TDt = SDt();
  function X5o(e) {
    let t = e.getUint8();
    if ((t & 128) === 0) return t;
    let r = t & 127;
    if (r > 6) throw new TDt.ASN1ParseError("length exceeds 6 byte limit");
    let s = 0;
    for (let a = 0; a < r; a++) s = s * 256 + e.getUint8();
    if (s === 0) throw new TDt.ASN1ParseError("indefinite length encoding not supported");
    return s;
  }
  function J5o(e) {
    if (e < 128) return Buffer.from([e]);
    let t = BigInt(e),
      r = [];
    while (t > 0n) (r.unshift(Number(t & 255n)), (t = t >> 8n));
    return Buffer.from([128 | r.length, ...r]);
  }
});