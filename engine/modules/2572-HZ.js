
var HZ = Ie(function (xfc, Wri) {
  var oIt = cr("buffer"),
    oTe = oIt.Buffer,
    sB = {},
    oB;
  for (oB in oIt) {
    if (!oIt.hasOwnProperty(oB)) continue;
    if (oB === "SlowBuffer" || oB === "Buffer") continue;
    sB[oB] = oIt[oB];
  }
  var aTe = (sB.Buffer = {});
  for (oB in oTe) {
    if (!oTe.hasOwnProperty(oB)) continue;
    if (oB === "allocUnsafe" || oB === "allocUnsafeSlow") continue;
    aTe[oB] = oTe[oB];
  }
  sB.Buffer.prototype = oTe.prototype;
  if (!aTe.from || aTe.from === Uint8Array.from)
    aTe.from = function (e, t, r) {
      if (typeof e === "number")
        throw TypeError('The "value" argument must not be of type number. Received type ' + typeof e);
      if (e && typeof e.length > "u")
        throw TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof e,
        );
      return oTe(e, t, r);
    };
  if (!aTe.alloc)
    aTe.alloc = function (e, t, r) {
      if (typeof e !== "number")
        throw TypeError('The "size" argument must be of type number. Received type ' + typeof e);
      if (e < 0 || e >= 2147483648) throw RangeError('The value "' + e + '" is invalid for option "size"');
      var s = oTe(e);
      if (!t || t.length === 0) s.fill(0);
      else if (typeof r === "string") s.fill(t, r);
      else s.fill(t);
      return s;
    };
  if (!sB.kStringMaxLength)
    try {
      sB.kStringMaxLength = process.binding("buffer").kStringMaxLength;
    } catch (e) {}
  if (!sB.constants) {
    if (((sB.constants = { MAX_LENGTH: sB.kMaxLength }), sB.kStringMaxLength))
      sB.constants.MAX_STRING_LENGTH = sB.kStringMaxLength;
  }
  Wri.exports = sB;
});