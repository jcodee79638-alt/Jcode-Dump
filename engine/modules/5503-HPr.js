
var HPr = Ie(function (hKa) {
  var wJi = CJi(),
    aPr = 5,
    kJi = 1 << aPr,
    OJi = kJi - 1,
    UJi = kJi;
  function mKa(e) {
    return e < 0 ? (-e << 1) + 1 : (e << 1) + 0;
  }
  function _Ka(e) {
    var t = (e & 1) === 1,
      r = e >> 1;
    return t ? -r : r;
  }
  hKa.encode = function (t) {
    var r = "",
      s,
      a = mKa(t);
    do {
      if (((s = a & OJi), (a >>>= aPr), a > 0)) s |= UJi;
      r += wJi.encode(s);
    } while (a > 0);
    return r;
  };
  hKa.decode = function (t, r, s) {
    var a = t.length,
      H = 0,
      u = 0,
      f,
      d;
    do {
      if (r >= a) throw Error("Expected more digits in base 64 VLQ value.");
      if (((d = wJi.decode(t.charCodeAt(r++))), d === -1))
        throw Error("Invalid base64 digit: " + t.charAt(r - 1));
      ((f = !!(d & UJi)), (d &= OJi), (H = H + (d << u)), (u += aPr));
    } while (f);
    ((s.value = _Ka(H)), (s.rest = r));
  };
});