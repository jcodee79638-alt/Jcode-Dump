
var Jri = Ie(function (vfc, Xri) {
  var cZ = HZ().Buffer;
  Xri.exports = {
    utf8: { type: "_internal", bomAware: !0 },
    cesu8: { type: "_internal", bomAware: !0 },
    unicode11utf8: "utf8",
    ucs2: { type: "_internal", bomAware: !0 },
    utf16le: "ucs2",
    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex: { type: "_internal" },
    _internal: Klr,
  };
  function Klr(e, t) {
    if (((this.enc = e.encodingName), (this.bomAware = e.bomAware), this.enc === "base64"))
      this.encoder = Ylr;
    else if (this.enc === "utf8") this.encoder = tfr;
    else if (this.enc === "cesu8") {
      if (
        ((this.enc = "utf8"),
        (this.encoder = Zlr),
        cZ.from("eda0bdedb2a9", "hex").toString() !== "\uD83D\uDCA9")
      )
        ((this.decoder = efr), (this.defaultCharUnicode = t.defaultCharUnicode));
    }
  }
  Klr.prototype.encoder = Qlr;
  Klr.prototype.decoder = zlr;
  var UBo = cr("string_decoder").StringDecoder;
  function zlr(e, t) {
    this.decoder = new UBo(t.enc);
  }
  zlr.prototype.write = function (e) {
    if (!cZ.isBuffer(e)) e = cZ.from(e);
    return this.decoder.write(e);
  };
  zlr.prototype.end = function () {
    return this.decoder.end();
  };
  function Qlr(e, t) {
    this.enc = t.enc;
  }
  Qlr.prototype.write = function (e) {
    return cZ.from(e, this.enc);
  };
  Qlr.prototype.end = function () {};
  function Ylr(e, t) {
    this.prevStr = "";
  }
  Ylr.prototype.write = function (e) {
    e = this.prevStr + e;
    var t = e.length - (e.length % 4);
    return ((this.prevStr = e.slice(t)), (e = e.slice(0, t)), cZ.from(e, "base64"));
  };
  Ylr.prototype.end = function () {
    return cZ.from(this.prevStr, "base64");
  };
  function Zlr(e, t) {}
  Zlr.prototype.write = function (e) {
    var t = cZ.alloc(e.length * 3),
      r = 0;
    for (var s = 0; s < e.length; s++) {
      var a = e.charCodeAt(s);
      if (a < 128) t[r++] = a;
      else if (a < 2048) ((t[r++] = 192 + (a >>> 6)), (t[r++] = 128 + (a & 63)));
      else ((t[r++] = 224 + (a >>> 12)), (t[r++] = 128 + ((a >>> 6) & 63)), (t[r++] = 128 + (a & 63)));
    }
    return t.slice(0, r);
  };
  Zlr.prototype.end = function () {};
  function efr(e, t) {
    ((this.acc = 0),
      (this.contBytes = 0),
      (this.accBytes = 0),
      (this.defaultCharUnicode = t.defaultCharUnicode));
  }
  efr.prototype.write = function (e) {
    var t = this.acc,
      r = this.contBytes,
      s = this.accBytes,
      a = "";
    for (var H = 0; H < e.length; H++) {
      var u = e[H];
      if ((u & 192) !== 128) {
        if (r > 0) ((a += this.defaultCharUnicode), (r = 0));
        if (u < 128) a += String.fromCharCode(u);
        else if (u < 224) ((t = u & 31), (r = 1), (s = 1));
        else if (u < 240) ((t = u & 15), (r = 2), (s = 1));
        else a += this.defaultCharUnicode;
      } else if (r > 0) {
        if (((t = (t << 6) | (u & 63)), r--, s++, r === 0))
          if (s === 2 && t < 128 && t > 0) a += this.defaultCharUnicode;
          else if (s === 3 && t < 2048) a += this.defaultCharUnicode;
          else a += String.fromCharCode(t);
      } else a += this.defaultCharUnicode;
    }
    return ((this.acc = t), (this.contBytes = r), (this.accBytes = s), a);
  };
  efr.prototype.end = function () {
    var e = 0;
    if (this.contBytes > 0) e += this.defaultCharUnicode;
    return e;
  };
  function tfr(e, t) {
    this.highSurrogate = "";
  }
  tfr.prototype.write = function (e) {
    if (this.highSurrogate) ((e = this.highSurrogate + e), (this.highSurrogate = ""));
    if (e.length > 0) {
      var t = e.charCodeAt(e.length - 1);
      if (t >= 55296 && t < 56320) ((this.highSurrogate = e[e.length - 1]), (e = e.slice(0, e.length - 1)));
    }
    return cZ.from(e, this.enc);
  };
  tfr.prototype.end = function () {
    if (this.highSurrogate) {
      var e = this.highSurrogate;
      return ((this.highSurrogate = ""), cZ.from(e, this.enc));
    }
  };
});