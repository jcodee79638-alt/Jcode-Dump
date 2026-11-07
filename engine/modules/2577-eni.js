
var eni = Ie(function (XBo) {
  var Yri = HZ().Buffer;
  XBo.utf16be = HIt;
  function HIt() {}
  HIt.prototype.encoder = Hfr;
  HIt.prototype.decoder = cfr;
  HIt.prototype.bomAware = !0;
  function Hfr() {}
  Hfr.prototype.write = function (e) {
    var t = Yri.from(e, "ucs2");
    for (var r = 0; r < t.length; r += 2) {
      var s = t[r];
      ((t[r] = t[r + 1]), (t[r + 1] = s));
    }
    return t;
  };
  Hfr.prototype.end = function () {};
  function cfr() {
    this.overflowByte = -1;
  }
  cfr.prototype.write = function (e) {
    if (e.length == 0) return "";
    var t = Yri.alloc(e.length + 1),
      r = 0,
      s = 0;
    if (this.overflowByte !== -1) ((t[0] = e[0]), (t[1] = this.overflowByte), (r = 1), (s = 2));
    for (; r < e.length - 1; r += 2, s += 2) ((t[s] = e[r + 1]), (t[s + 1] = e[r]));
    return ((this.overflowByte = r == e.length - 1 ? e[e.length - 1] : -1), t.slice(0, s).toString("ucs2"));
  };
  cfr.prototype.end = function () {
    this.overflowByte = -1;
  };
  XBo.utf16 = Afr;
  function Afr(e, t) {
    this.iconv = t;
  }
  Afr.prototype.encoder = ufr;
  Afr.prototype.decoder = lfr;
  function ufr(e, t) {
    if (((e = e || {}), e.addBOM === void 0)) e.addBOM = !0;
    this.encoder = t.iconv.getEncoder("utf-16le", e);
  }
  ufr.prototype.write = function (e) {
    return this.encoder.write(e);
  };
  ufr.prototype.end = function () {
    return this.encoder.end();
  };
  function lfr(e, t) {
    ((this.decoder = null),
      (this.initialBufs = []),
      (this.initialBufsLen = 0),
      (this.options = e || {}),
      (this.iconv = t.iconv));
  }
  lfr.prototype.write = function (e) {
    if (!this.decoder) {
      if ((this.initialBufs.push(e), (this.initialBufsLen += e.length), this.initialBufsLen < 16)) return "";
      var t = Zri(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(t, this.options);
      var r = "";
      for (var s = 0; s < this.initialBufs.length; s++) r += this.decoder.write(this.initialBufs[s]);
      return ((this.initialBufs.length = this.initialBufsLen = 0), r);
    }
    return this.decoder.write(e);
  };
  lfr.prototype.end = function () {
    if (!this.decoder) {
      var e = Zri(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(e, this.options);
      var t = "";
      for (var r = 0; r < this.initialBufs.length; r++) t += this.decoder.write(this.initialBufs[r]);
      var s = this.decoder.end();
      if (s) t += s;
      return ((this.initialBufs.length = this.initialBufsLen = 0), t);
    }
    return this.decoder.end();
  };
  function Zri(e, t) {
    var r = [],
      s = 0,
      a = 0,
      H = 0;
    e: for (var u = 0; u < e.length; u++) {
      var f = e[u];
      for (var d = 0; d < f.length; d++)
        if ((r.push(f[d]), r.length === 2)) {
          if (s === 0) {
            if (r[0] === 255 && r[1] === 254) return "utf-16le";
            if (r[0] === 254 && r[1] === 255) return "utf-16be";
          }
          if (r[0] === 0 && r[1] !== 0) H++;
          if (r[0] !== 0 && r[1] === 0) a++;
          if (((r.length = 0), s++, s >= 100)) break e;
        }
    }
    if (H > a) return "utf-16be";
    if (H < a) return "utf-16le";
    return t || "utf-16le";
  }
});