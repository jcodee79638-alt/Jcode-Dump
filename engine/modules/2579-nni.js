
var nni = Ie(function (nRo) {
  var uIt = HZ().Buffer;
  nRo._sbcs = Lfr;
  function Lfr(e, t) {
    if (!e) throw Error("SBCS codec is called without the data.");
    if (!e.chars || (e.chars.length !== 128 && e.chars.length !== 256))
      throw Error("Encoding '" + e.type + "' has incorrect 'chars' (must be of len 128 or 256)");
    if (e.chars.length === 128) {
      var r = "";
      for (var s = 0; s < 128; s++) r += String.fromCharCode(s);
      e.chars = r + e.chars;
    }
    this.decodeBuf = uIt.from(e.chars, "ucs2");
    var a = uIt.alloc(65536, t.defaultCharSingleByte.charCodeAt(0));
    for (var s = 0; s < e.chars.length; s++) a[e.chars.charCodeAt(s)] = s;
    this.encodeBuf = a;
  }
  Lfr.prototype.encoder = $fr;
  Lfr.prototype.decoder = gfr;
  function $fr(e, t) {
    this.encodeBuf = t.encodeBuf;
  }
  $fr.prototype.write = function (e) {
    var t = uIt.alloc(e.length);
    for (var r = 0; r < e.length; r++) t[r] = this.encodeBuf[e.charCodeAt(r)];
    return t;
  };
  $fr.prototype.end = function () {};
  function gfr(e, t) {
    this.decodeBuf = t.decodeBuf;
  }
  gfr.prototype.write = function (e) {
    var t = this.decodeBuf,
      r = uIt.alloc(e.length * 2),
      s = 0,
      a = 0;
    for (var H = 0; H < e.length; H++) ((s = e[H] * 2), (a = H * 2), (r[a] = t[s]), (r[a + 1] = t[s + 1]));
    return r.toString("ucs2");
  };
  gfr.prototype.end = function () {};
});