
var cni = Ie(function (sRo) {
  var Efr = HZ().Buffer;
  sRo._dbcs = AZ;
  var nb = -1,
    Hni = -2,
    aB = -10,
    jw = -1000,
    cTe = Array(256),
    d4e = -1;
  for (p4e = 0; p4e < 256; p4e++) cTe[p4e] = nb;
  var p4e;
  function AZ(e, t) {
    if (((this.encodingName = e.encodingName), !e)) throw Error("DBCS codec is called without the data.");
    if (!e.table) throw Error("Encoding '" + this.encodingName + "' has no data.");
    var r = e.table();
    ((this.decodeTables = []), (this.decodeTables[0] = cTe.slice(0)), (this.decodeTableSeq = []));
    for (var s = 0; s < r.length; s++) this._addDecodeChunk(r[s]);
    if (typeof e.gb18030 === "function") {
      this.gb18030 = e.gb18030();
      var a = this.decodeTables.length;
      this.decodeTables.push(cTe.slice(0));
      var H = this.decodeTables.length;
      this.decodeTables.push(cTe.slice(0));
      var u = this.decodeTables[0];
      for (var s = 129; s <= 254; s++) {
        var f = this.decodeTables[jw - u[s]];
        for (var d = 48; d <= 57; d++) {
          if (f[d] === nb) f[d] = jw - a;
          else if (f[d] > jw) throw Error("gb18030 decode tables conflict at byte 2");
          var _ = this.decodeTables[jw - f[d]];
          for (var L = 129; L <= 254; L++) {
            if (_[L] === nb) _[L] = jw - H;
            else if (_[L] === jw - H) continue;
            else if (_[L] > jw) throw Error("gb18030 decode tables conflict at byte 3");
            var I = this.decodeTables[jw - _[L]];
            for (var D = 48; D <= 57; D++) if (I[D] === nb) I[D] = Hni;
          }
        }
      }
    }
    ((this.defaultCharUnicode = t.defaultCharUnicode), (this.encodeTable = []), (this.encodeTableSeq = []));
    var S = {};
    if (e.encodeSkipVals)
      for (var s = 0; s < e.encodeSkipVals.length; s++) {
        var T = e.encodeSkipVals[s];
        if (typeof T === "number") S[T] = !0;
        else for (var d = T.from; d <= T.to; d++) S[d] = !0;
      }
    if ((this._fillEncodeTable(0, 0, S), e.encodeAdd)) {
      for (var C in e.encodeAdd)
        if (Object.prototype.hasOwnProperty.call(e.encodeAdd, C))
          this._setEncodeChar(C.charCodeAt(0), e.encodeAdd[C]);
    }
    if (
      ((this.defCharSB = this.encodeTable[0][t.defaultCharSingleByte.charCodeAt(0)]), this.defCharSB === nb)
    )
      this.defCharSB = this.encodeTable[0]["?"];
    if (this.defCharSB === nb) this.defCharSB = 63;
  }
  AZ.prototype.encoder = lIt;
  AZ.prototype.decoder = Ifr;
  AZ.prototype._getDecodeTrieNode = function (e) {
    var t = [];
    for (; e > 0; e >>>= 8) t.push(e & 255);
    if (t.length == 0) t.push(0);
    var r = this.decodeTables[0];
    for (var s = t.length - 1; s > 0; s--) {
      var a = r[t[s]];
      if (a == nb) ((r[t[s]] = jw - this.decodeTables.length), this.decodeTables.push((r = cTe.slice(0))));
      else if (a <= jw) r = this.decodeTables[jw - a];
      else throw Error("Overwrite byte in " + this.encodingName + ", addr: " + e.toString(16));
    }
    return r;
  };
  AZ.prototype._addDecodeChunk = function (e) {
    var t = parseInt(e[0], 16),
      r = this._getDecodeTrieNode(t);
    t = t & 255;
    for (var s = 1; s < e.length; s++) {
      var a = e[s];
      if (typeof a === "string")
        for (var H = 0; H < a.length;) {
          var u = a.charCodeAt(H++);
          if (u >= 55296 && u < 56320) {
            var f = a.charCodeAt(H++);
            if (f >= 56320 && f < 57344) r[t++] = 65536 + (u - 55296) * 1024 + (f - 56320);
            else throw Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + e[0]);
          } else if (u > 4080 && u <= 4095) {
            var d = 4095 - u + 2,
              _ = [];
            for (var L = 0; L < d; L++) _.push(a.charCodeAt(H++));
            ((r[t++] = aB - this.decodeTableSeq.length), this.decodeTableSeq.push(_));
          } else r[t++] = u;
        }
      else if (typeof a === "number") {
        var I = r[t - 1] + 1;
        for (var H = 0; H < a; H++) r[t++] = I++;
      } else
        throw Error("Incorrect type '" + typeof a + "' given in " + this.encodingName + " at chunk " + e[0]);
    }
    if (t > 255)
      throw Error("Incorrect chunk in " + this.encodingName + " at addr " + e[0] + ": too long" + t);
  };
  AZ.prototype._getEncodeBucket = function (e) {
    var t = e >> 8;
    if (this.encodeTable[t] === void 0) this.encodeTable[t] = cTe.slice(0);
    return this.encodeTable[t];
  };
  AZ.prototype._setEncodeChar = function (e, t) {
    var r = this._getEncodeBucket(e),
      s = e & 255;
    if (r[s] <= aB) this.encodeTableSeq[aB - r[s]][d4e] = t;
    else if (r[s] == nb) r[s] = t;
  };
  AZ.prototype._setEncodeSequence = function (e, t) {
    var r = e[0],
      s = this._getEncodeBucket(r),
      a = r & 255,
      H;
    if (s[a] <= aB) H = this.encodeTableSeq[aB - s[a]];
    else {
      if (((H = {}), s[a] !== nb)) H[d4e] = s[a];
      ((s[a] = aB - this.encodeTableSeq.length), this.encodeTableSeq.push(H));
    }
    for (var u = 1; u < e.length - 1; u++) {
      var f = H[r];
      if (typeof f === "object") H = f;
      else if (((H = H[r] = {}), f !== void 0)) H[d4e] = f;
    }
    ((r = e[e.length - 1]), (H[r] = t));
  };
  AZ.prototype._fillEncodeTable = function (e, t, r) {
    var s = this.decodeTables[e],
      a = !1,
      H = {};
    for (var u = 0; u < 256; u++) {
      var f = s[u],
        d = t + u;
      if (r[d]) continue;
      if (f >= 0) (this._setEncodeChar(f, d), (a = !0));
      else if (f <= jw) {
        var _ = jw - f;
        if (!H[_]) {
          var L = (d << 8) >>> 0;
          if (this._fillEncodeTable(_, L, r)) a = !0;
          else H[_] = !0;
        }
      } else if (f <= aB) (this._setEncodeSequence(this.decodeTableSeq[aB - f], d), (a = !0));
    }
    return a;
  };
  function lIt(e, t) {
    ((this.leadSurrogate = -1),
      (this.seqObj = void 0),
      (this.encodeTable = t.encodeTable),
      (this.encodeTableSeq = t.encodeTableSeq),
      (this.defaultCharSingleByte = t.defCharSB),
      (this.gb18030 = t.gb18030));
  }
  lIt.prototype.write = function (e) {
    var t = Efr.alloc(e.length * (this.gb18030 ? 4 : 3)),
      r = this.leadSurrogate,
      s = this.seqObj,
      a = -1,
      H = 0,
      u = 0;
    while (!0) {
      if (a === -1) {
        if (H == e.length) break;
        var f = e.charCodeAt(H++);
      } else {
        var f = a;
        a = -1;
      }
      if (f >= 55296 && f < 57344)
        if (f < 56320)
          if (r === -1) {
            r = f;
            continue;
          } else ((r = f), (f = nb));
        else if (r !== -1) ((f = 65536 + (r - 55296) * 1024 + (f - 56320)), (r = -1));
        else f = nb;
      else if (r !== -1) ((a = f), (f = nb), (r = -1));
      var d = nb;
      if (s !== void 0 && f != nb) {
        var _ = s[f];
        if (typeof _ === "object") {
          s = _;
          continue;
        } else if (typeof _ === "number") d = _;
        else if (_ == null) {
          if (((_ = s[d4e]), _ !== void 0)) ((d = _), (a = f));
        }
        s = void 0;
      } else if (f >= 0) {
        var L = this.encodeTable[f >> 8];
        if (L !== void 0) d = L[f & 255];
        if (d <= aB) {
          s = this.encodeTableSeq[aB - d];
          continue;
        }
        if (d == nb && this.gb18030) {
          var I = Dfr(this.gb18030.uChars, f);
          if (I != -1) {
            var d = this.gb18030.gbChars[I] + (f - this.gb18030.uChars[I]);
            ((t[u++] = 129 + Math.floor(d / 12600)),
              (d = d % 12600),
              (t[u++] = 48 + Math.floor(d / 1260)),
              (d = d % 1260),
              (t[u++] = 129 + Math.floor(d / 10)),
              (d = d % 10),
              (t[u++] = 48 + d));
            continue;
          }
        }
      }
      if (d === nb) d = this.defaultCharSingleByte;
      if (d < 256) t[u++] = d;
      else if (d < 65536) ((t[u++] = d >> 8), (t[u++] = d & 255));
      else if (d < 16777216) ((t[u++] = d >> 16), (t[u++] = (d >> 8) & 255), (t[u++] = d & 255));
      else ((t[u++] = d >>> 24), (t[u++] = (d >>> 16) & 255), (t[u++] = (d >>> 8) & 255), (t[u++] = d & 255));
    }
    return ((this.seqObj = s), (this.leadSurrogate = r), t.slice(0, u));
  };
  lIt.prototype.end = function () {
    if (this.leadSurrogate === -1 && this.seqObj === void 0) return;
    var e = Efr.alloc(10),
      t = 0;
    if (this.seqObj) {
      var r = this.seqObj[d4e];
      if (r !== void 0)
        if (r < 256) e[t++] = r;
        else ((e[t++] = r >> 8), (e[t++] = r & 255));
      this.seqObj = void 0;
    }
    if (this.leadSurrogate !== -1) ((e[t++] = this.defaultCharSingleByte), (this.leadSurrogate = -1));
    return e.slice(0, t);
  };
  lIt.prototype.findIdx = Dfr;
  function Ifr(e, t) {
    ((this.nodeIdx = 0),
      (this.prevBytes = []),
      (this.decodeTables = t.decodeTables),
      (this.decodeTableSeq = t.decodeTableSeq),
      (this.defaultCharUnicode = t.defaultCharUnicode),
      (this.gb18030 = t.gb18030));
  }
  Ifr.prototype.write = function (e) {
    var t = Efr.alloc(e.length * 2),
      r = this.nodeIdx,
      s = this.prevBytes,
      a = this.prevBytes.length,
      H = -this.prevBytes.length,
      u;
    for (var f = 0, d = 0; f < e.length; f++) {
      var _ = f >= 0 ? e[f] : s[f + a],
        u = this.decodeTables[r][_];
      if (u >= 0);
      else if (u === nb) ((u = this.defaultCharUnicode.charCodeAt(0)), (f = H));
      else if (u === Hni) {
        if (f >= 3)
          var L = (e[f - 3] - 129) * 12600 + (e[f - 2] - 48) * 1260 + (e[f - 1] - 129) * 10 + (_ - 48);
        else
          var L =
            (s[f - 3 + a] - 129) * 12600 +
            ((f - 2 >= 0 ? e[f - 2] : s[f - 2 + a]) - 48) * 1260 +
            ((f - 1 >= 0 ? e[f - 1] : s[f - 1 + a]) - 129) * 10 +
            (_ - 48);
        var I = Dfr(this.gb18030.gbChars, L);
        u = this.gb18030.uChars[I] + L - this.gb18030.gbChars[I];
      } else if (u <= jw) {
        r = jw - u;
        continue;
      } else if (u <= aB) {
        var D = this.decodeTableSeq[aB - u];
        for (var S = 0; S < D.length - 1; S++) ((u = D[S]), (t[d++] = u & 255), (t[d++] = u >> 8));
        u = D[D.length - 1];
      } else
        throw Error("iconv-lite internal error: invalid decoding table value " + u + " at " + r + "/" + _);
      if (u >= 65536) {
        u -= 65536;
        var T = 55296 | (u >> 10);
        ((t[d++] = T & 255), (t[d++] = T >> 8), (u = 56320 | (u & 1023)));
      }
      ((t[d++] = u & 255), (t[d++] = u >> 8), (r = 0), (H = f + 1));
    }
    return (
      (this.nodeIdx = r),
      (this.prevBytes =
        H >= 0 ? Array.prototype.slice.call(e, H) : s.slice(H + a).concat(Array.prototype.slice.call(e))),
      t.slice(0, d).toString("ucs2")
    );
  };
  Ifr.prototype.end = function () {
    var e = "";
    while (this.prevBytes.length > 0) {
      e += this.defaultCharUnicode;
      var t = this.prevBytes.slice(1);
      if (((this.prevBytes = []), (this.nodeIdx = 0), t.length > 0)) e += this.write(t);
    }
    return ((this.prevBytes = []), (this.nodeIdx = 0), e);
  };
  function Dfr(e, t) {
    if (e[0] > t) return -1;
    var r = 0,
      s = e.length;
    while (r < s - 1) {
      var a = r + ((s - r + 1) >> 1);
      if (e[a] <= t) r = a;
      else s = a;
    }
    return r;
  }
});