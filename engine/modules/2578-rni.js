
var rni = Ie(function (ZBo) {
  var T5 = HZ().Buffer;
  ZBo.utf7 = cIt;
  ZBo.unicode11utf7 = "utf7";
  function cIt(e, t) {
    this.iconv = t;
  }
  cIt.prototype.encoder = pfr;
  cIt.prototype.decoder = dfr;
  cIt.prototype.bomAware = !0;
  var zBo = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
  function pfr(e, t) {
    this.iconv = t.iconv;
  }
  pfr.prototype.write = function (e) {
    return T5.from(
      e.replace(
        zBo,
        function (t) {
          return (
            "+" +
            (t === "+" ? "" : this.iconv.encode(t, "utf16-be").toString("base64").replace(/=+$/, "")) +
            "-"
          );
        }.bind(this),
      ),
    );
  };
  pfr.prototype.end = function () {};
  function dfr(e, t) {
    ((this.iconv = t.iconv), (this.inBase64 = !1), (this.base64Accum = ""));
  }
  var QBo = /[A-Za-z0-9\/+]/,
    mfr = [];
  for (HTe = 0; HTe < 256; HTe++) mfr[HTe] = QBo.test(String.fromCharCode(HTe));
  var HTe,
    YBo = 43,
    i_e = 45,
    ffr = 38;
  dfr.prototype.write = function (e) {
    var t = "",
      r = 0,
      s = this.inBase64,
      a = this.base64Accum;
    for (var H = 0; H < e.length; H++)
      if (!s) {
        if (e[H] == YBo) ((t += this.iconv.decode(e.slice(r, H), "ascii")), (r = H + 1), (s = !0));
      } else if (!mfr[e[H]]) {
        if (H == r && e[H] == i_e) t += "+";
        else {
          var u = a + this.iconv.decode(e.slice(r, H), "ascii");
          t += this.iconv.decode(T5.from(u, "base64"), "utf16-be");
        }
        if (e[H] != i_e) H--;
        ((r = H + 1), (s = !1), (a = ""));
      }
    if (!s) t += this.iconv.decode(e.slice(r), "ascii");
    else {
      var u = a + this.iconv.decode(e.slice(r), "ascii"),
        f = u.length - (u.length % 8);
      ((a = u.slice(f)), (u = u.slice(0, f)), (t += this.iconv.decode(T5.from(u, "base64"), "utf16-be")));
    }
    return ((this.inBase64 = s), (this.base64Accum = a), t);
  };
  dfr.prototype.end = function () {
    var e = "";
    if (this.inBase64 && this.base64Accum.length > 0)
      e = this.iconv.decode(T5.from(this.base64Accum, "base64"), "utf16-be");
    return ((this.inBase64 = !1), (this.base64Accum = ""), e);
  };
  ZBo.utf7imap = AIt;
  function AIt(e, t) {
    this.iconv = t;
  }
  AIt.prototype.encoder = _fr;
  AIt.prototype.decoder = hfr;
  AIt.prototype.bomAware = !0;
  function _fr(e, t) {
    ((this.iconv = t.iconv),
      (this.inBase64 = !1),
      (this.base64Accum = T5.alloc(6)),
      (this.base64AccumIdx = 0));
  }
  _fr.prototype.write = function (e) {
    var t = this.inBase64,
      r = this.base64Accum,
      s = this.base64AccumIdx,
      a = T5.alloc(e.length * 5 + 10),
      H = 0;
    for (var u = 0; u < e.length; u++) {
      var f = e.charCodeAt(u);
      if (f >= 32 && f <= 126) {
        if (t) {
          if (s > 0)
            ((H += a.write(r.slice(0, s).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), H)),
              (s = 0));
          ((a[H++] = i_e), (t = !1));
        }
        if (!t) {
          if (((a[H++] = f), f === ffr)) a[H++] = i_e;
        }
      } else {
        if (!t) ((a[H++] = ffr), (t = !0));
        if (t) {
          if (((r[s++] = f >> 8), (r[s++] = f & 255), s == r.length))
            ((H += a.write(r.toString("base64").replace(/\//g, ","), H)), (s = 0));
        }
      }
    }
    return ((this.inBase64 = t), (this.base64AccumIdx = s), a.slice(0, H));
  };
  _fr.prototype.end = function () {
    var e = T5.alloc(10),
      t = 0;
    if (this.inBase64) {
      if (this.base64AccumIdx > 0)
        ((t += e.write(
          this.base64Accum
            .slice(0, this.base64AccumIdx)
            .toString("base64")
            .replace(/\//g, ",")
            .replace(/=+$/, ""),
          t,
        )),
          (this.base64AccumIdx = 0));
      ((e[t++] = i_e), (this.inBase64 = !1));
    }
    return e.slice(0, t);
  };
  function hfr(e, t) {
    ((this.iconv = t.iconv), (this.inBase64 = !1), (this.base64Accum = ""));
  }
  var tni = mfr.slice();
  tni[44] = !0;
  hfr.prototype.write = function (e) {
    var t = "",
      r = 0,
      s = this.inBase64,
      a = this.base64Accum;
    for (var H = 0; H < e.length; H++)
      if (!s) {
        if (e[H] == ffr) ((t += this.iconv.decode(e.slice(r, H), "ascii")), (r = H + 1), (s = !0));
      } else if (!tni[e[H]]) {
        if (H == r && e[H] == i_e) t += "&";
        else {
          var u = a + this.iconv.decode(e.slice(r, H), "ascii").replace(/,/g, "/");
          t += this.iconv.decode(T5.from(u, "base64"), "utf16-be");
        }
        if (e[H] != i_e) H--;
        ((r = H + 1), (s = !1), (a = ""));
      }
    if (!s) t += this.iconv.decode(e.slice(r), "ascii");
    else {
      var u = a + this.iconv.decode(e.slice(r), "ascii").replace(/,/g, "/"),
        f = u.length - (u.length % 8);
      ((a = u.slice(f)), (u = u.slice(0, f)), (t += this.iconv.decode(T5.from(u, "base64"), "utf16-be")));
    }
    return ((this.inBase64 = s), (this.base64Accum = a), t);
  };
  hfr.prototype.end = function () {
    var e = "";
    if (this.inBase64 && this.base64Accum.length > 0)
      e = this.iconv.decode(T5.from(this.base64Accum, "base64"), "utf16-be");
    return ((this.inBase64 = !1), (this.base64Accum = ""), e);
  };
});