
var Qri = Ie(function (NBo) {
  var aIt = HZ().Buffer;
  NBo._utf32 = rfr;
  function rfr(e, t) {
    ((this.iconv = t), (this.bomAware = !0), (this.isLE = e.isLE));
  }
  NBo.utf32le = { type: "_utf32", isLE: !0 };
  NBo.utf32be = { type: "_utf32", isLE: !1 };
  NBo.ucs4le = "utf32le";
  NBo.ucs4be = "utf32be";
  rfr.prototype.encoder = nfr;
  rfr.prototype.decoder = ifr;
  function nfr(e, t) {
    ((this.isLE = t.isLE), (this.highSurrogate = 0));
  }
  nfr.prototype.write = function (e) {
    var t = aIt.from(e, "ucs2"),
      r = aIt.alloc(t.length * 2),
      s = this.isLE ? r.writeUInt32LE : r.writeUInt32BE,
      a = 0;
    for (var H = 0; H < t.length; H += 2) {
      var u = t.readUInt16LE(H),
        f = u >= 55296 && u < 56320,
        d = u >= 56320 && u < 57344;
      if (this.highSurrogate)
        if (f || !d) (s.call(r, this.highSurrogate, a), (a += 4));
        else {
          var _ = (((this.highSurrogate - 55296) << 10) | (u - 56320)) + 65536;
          (s.call(r, _, a), (a += 4), (this.highSurrogate = 0));
          continue;
        }
      if (f) this.highSurrogate = u;
      else (s.call(r, u, a), (a += 4), (this.highSurrogate = 0));
    }
    if (a < r.length) r = r.slice(0, a);
    return r;
  };
  nfr.prototype.end = function () {
    if (!this.highSurrogate) return;
    var e = aIt.alloc(4);
    if (this.isLE) e.writeUInt32LE(this.highSurrogate, 0);
    else e.writeUInt32BE(this.highSurrogate, 0);
    return ((this.highSurrogate = 0), e);
  };
  function ifr(e, t) {
    ((this.isLE = t.isLE), (this.badChar = t.iconv.defaultCharUnicode.charCodeAt(0)), (this.overflow = []));
  }
  ifr.prototype.write = function (e) {
    if (e.length === 0) return "";
    var t = 0,
      r = 0,
      s = aIt.alloc(e.length + 4),
      a = 0,
      H = this.isLE,
      u = this.overflow,
      f = this.badChar;
    if (u.length > 0) {
      for (; t < e.length && u.length < 4; t++) u.push(e[t]);
      if (u.length === 4) {
        if (H) r = u[t] | (u[t + 1] << 8) | (u[t + 2] << 16) | (u[t + 3] << 24);
        else r = u[t + 3] | (u[t + 2] << 8) | (u[t + 1] << 16) | (u[t] << 24);
        ((u.length = 0), (a = Kri(s, a, r, f)));
      }
    }
    for (; t < e.length - 3; t += 4) {
      if (H) r = e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24);
      else r = e[t + 3] | (e[t + 2] << 8) | (e[t + 1] << 16) | (e[t] << 24);
      a = Kri(s, a, r, f);
    }
    for (; t < e.length; t++) u.push(e[t]);
    return s.slice(0, a).toString("ucs2");
  };
  function Kri(e, t, r, s) {
    if (r < 0 || r > 1114111) r = s;
    if (r >= 65536) {
      r -= 65536;
      var a = 55296 | (r >> 10);
      ((e[t++] = a & 255), (e[t++] = a >> 8));
      var r = 56320 | (r & 1023);
    }
    return ((e[t++] = r & 255), (e[t++] = r >> 8), t);
  }
  ifr.prototype.end = function () {
    this.overflow.length = 0;
  };
  NBo.utf32 = sfr;
  NBo.ucs4 = "utf32";
  function sfr(e, t) {
    this.iconv = t;
  }
  sfr.prototype.encoder = ofr;
  sfr.prototype.decoder = afr;
  function ofr(e, t) {
    if (((e = e || {}), e.addBOM === void 0)) e.addBOM = !0;
    this.encoder = t.iconv.getEncoder(e.defaultEncoding || "utf-32le", e);
  }
  ofr.prototype.write = function (e) {
    return this.encoder.write(e);
  };
  ofr.prototype.end = function () {
    return this.encoder.end();
  };
  function afr(e, t) {
    ((this.decoder = null),
      (this.initialBufs = []),
      (this.initialBufsLen = 0),
      (this.options = e || {}),
      (this.iconv = t.iconv));
  }
  afr.prototype.write = function (e) {
    if (!this.decoder) {
      if ((this.initialBufs.push(e), (this.initialBufsLen += e.length), this.initialBufsLen < 32)) return "";
      var t = zri(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(t, this.options);
      var r = "";
      for (var s = 0; s < this.initialBufs.length; s++) r += this.decoder.write(this.initialBufs[s]);
      return ((this.initialBufs.length = this.initialBufsLen = 0), r);
    }
    return this.decoder.write(e);
  };
  afr.prototype.end = function () {
    if (!this.decoder) {
      var e = zri(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(e, this.options);
      var t = "";
      for (var r = 0; r < this.initialBufs.length; r++) t += this.decoder.write(this.initialBufs[r]);
      var s = this.decoder.end();
      if (s) t += s;
      return ((this.initialBufs.length = this.initialBufsLen = 0), t);
    }
    return this.decoder.end();
  };
  function zri(e, t) {
    var r = [],
      s = 0,
      a = 0,
      H = 0,
      u = 0,
      f = 0;
    e: for (var d = 0; d < e.length; d++) {
      var _ = e[d];
      for (var L = 0; L < _.length; L++)
        if ((r.push(_[L]), r.length === 4)) {
          if (s === 0) {
            if (r[0] === 255 && r[1] === 254 && r[2] === 0 && r[3] === 0) return "utf-32le";
            if (r[0] === 0 && r[1] === 0 && r[2] === 254 && r[3] === 255) return "utf-32be";
          }
          if (r[0] !== 0 || r[1] > 16) H++;
          if (r[3] !== 0 || r[2] > 16) a++;
          if (r[0] === 0 && r[1] === 0 && (r[2] !== 0 || r[3] !== 0)) f++;
          if ((r[0] !== 0 || r[1] !== 0) && r[2] === 0 && r[3] === 0) u++;
          if (((r.length = 0), s++, s >= 100)) break e;
        }
    }
    if (f - H > u - a) return "utf-32be";
    if (f - H < u - a) return "utf-32le";
    return t || "utf-32le";
  }
});