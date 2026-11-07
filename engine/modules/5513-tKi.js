
var tKi = Ie(function (VyA, eKi) {
  var hza = Object.prototype.toString,
    LPr =
      typeof Buffer < "u" &&
      typeof Buffer.alloc === "function" &&
      typeof Buffer.allocUnsafe === "function" &&
      typeof Buffer.from === "function";
  function Lza(e) {
    return hza.call(e).slice(8, -1) === "ArrayBuffer";
  }
  function $za(e, t, r) {
    t >>>= 0;
    var s = e.byteLength - t;
    if (s < 0) throw RangeError("'offset' is out of bounds");
    if (r === void 0) r = s;
    else if (((r >>>= 0), r > s)) throw RangeError("'length' is out of bounds");
    return LPr ? Buffer.from(e.slice(t, t + r)) : new Buffer(new Uint8Array(e.slice(t, t + r)));
  }
  function gza(e, t) {
    if (typeof t !== "string" || t === "") t = "utf8";
    if (!Buffer.isEncoding(t)) throw TypeError('"encoding" must be a valid string encoding');
    return LPr ? Buffer.from(e, t) : new Buffer(e, t);
  }
  function Eza(e, t, r) {
    if (typeof e === "number") throw TypeError('"value" argument must not be a number');
    if (Lza(e)) return $za(e, t, r);
    if (typeof e === "string") return gza(e, t);
    return LPr ? Buffer.from(e) : new Buffer(e);
  }
  eKi.exports = Eza;
});