
var qai = Ie(function (adc, Vai) {
  var Jd = {},
    Oai = (Jd.LEFT_BRACE = 1),
    tDt = (Jd.RIGHT_BRACE = 2),
    Uai = (Jd.LEFT_BRACKET = 3),
    Spr = (Jd.RIGHT_BRACKET = 4),
    rDt = (Jd.COLON = 5),
    nDt = (Jd.COMMA = 6),
    Nai = (Jd.TRUE = 7),
    Fai = (Jd.FALSE = 8),
    Bai = (Jd.NULL = 9),
    iDt = (Jd.STRING = 10),
    Rai = (Jd.NUMBER = 11),
    m_e = (Jd.START = 17),
    Wai = (Jd.STOP = 18),
    Iai = (Jd.TRUE1 = 33),
    Dai = (Jd.TRUE2 = 34),
    yai = (Jd.TRUE3 = 35),
    Mai = (Jd.FALSE1 = 49),
    xai = (Jd.FALSE2 = 50),
    Sai = (Jd.FALSE3 = 51),
    Tai = (Jd.FALSE4 = 52),
    vai = (Jd.NULL1 = 65),
    bai = (Jd.NULL2 = 66),
    jai = (Jd.NULL3 = 67),
    Pai = (Jd.NUMBER1 = 81),
    Mpr = (Jd.NUMBER3 = 83),
    VV = (Jd.STRING1 = 97),
    Cai = (Jd.STRING2 = 98),
    wai = (Jd.STRING3 = 99),
    Zqo = (Jd.STRING4 = 100),
    eGo = (Jd.STRING5 = 101),
    kai = (Jd.STRING6 = 102),
    yTe = (Jd.VALUE = 113),
    xpr = (Jd.KEY = 114),
    ZIt = (Jd.OBJECT = 129),
    eDt = (Jd.ARRAY = 130),
    tGo = 92,
    rGo = 47,
    nGo = 8,
    iGo = 12,
    sGo = 10,
    oGo = 13,
    aGo = 9,
    sDt = 65536;
  function Qoe() {
    ((this.tState = m_e),
      (this.value = void 0),
      (this.string = void 0),
      (this.stringBuffer = Buffer.alloc ? Buffer.alloc(sDt) : new Buffer(sDt)),
      (this.stringBufferOffset = 0),
      (this.unicode = void 0),
      (this.highSurrogate = void 0),
      (this.key = void 0),
      (this.mode = void 0),
      (this.stack = []),
      (this.state = yTe),
      (this.bytes_remaining = 0),
      (this.bytes_in_sequence = 0),
      (this.temp_buffs = { 2: new Buffer(2), 3: new Buffer(3), 4: new Buffer(4) }),
      (this.offset = -1));
  }
  Qoe.toknam = function (e) {
    var t = Object.keys(Jd);
    for (var r = 0, s = t.length; r < s; r++) {
      var a = t[r];
      if (Jd[a] === e) return a;
    }
    return e && "0x" + e.toString(16);
  };
  var pB = Qoe.prototype;
  pB.onError = function (e) {
    throw e;
  };
  pB.charError = function (e, t) {
    ((this.tState = Wai),
      this.onError(
        Error(
          "Unexpected " +
            JSON.stringify(String.fromCharCode(e[t])) +
            " at position " +
            t +
            " in state " +
            Qoe.toknam(this.tState),
        ),
      ));
  };
  pB.appendStringChar = function (e) {
    if (this.stringBufferOffset >= sDt)
      ((this.string += this.stringBuffer.toString("utf8")), (this.stringBufferOffset = 0));
    this.stringBuffer[this.stringBufferOffset++] = e;
  };
  pB.appendStringBuf = function (e, t, r) {
    var s = e.length;
    if (typeof t === "number")
      if (typeof r === "number")
        if (r < 0) s = e.length - t + r;
        else s = r - t;
      else s = e.length - t;
    if (s < 0) s = 0;
    if (this.stringBufferOffset + s > sDt)
      ((this.string += this.stringBuffer.toString("utf8", 0, this.stringBufferOffset)),
        (this.stringBufferOffset = 0));
    (e.copy(this.stringBuffer, this.stringBufferOffset, t, r), (this.stringBufferOffset += s));
  };
  pB.write = function (e) {
    if (typeof e === "string") e = new Buffer(e);
    var t;
    for (var r = 0, s = e.length; r < s; r++)
      if (this.tState === m_e)
        if (((t = e[r]), this.offset++, t === 123)) this.onToken(Oai, "{");
        else if (t === 125) this.onToken(tDt, "}");
        else if (t === 91) this.onToken(Uai, "[");
        else if (t === 93) this.onToken(Spr, "]");
        else if (t === 58) this.onToken(rDt, ":");
        else if (t === 44) this.onToken(nDt, ",");
        else if (t === 116) this.tState = Iai;
        else if (t === 102) this.tState = Mai;
        else if (t === 110) this.tState = vai;
        else if (t === 34) ((this.string = ""), (this.stringBufferOffset = 0), (this.tState = VV));
        else if (t === 45) ((this.string = "-"), (this.tState = Pai));
        else if (t >= 48 && t < 64) ((this.string = String.fromCharCode(t)), (this.tState = Mpr));
        else if (t === 32 || t === 9 || t === 10 || t === 13);
        else return this.charError(e, r);
      else if (this.tState === VV)
        if (((t = e[r]), this.bytes_remaining > 0)) {
          for (var a = 0; a < this.bytes_remaining; a++)
            this.temp_buffs[this.bytes_in_sequence][this.bytes_in_sequence - this.bytes_remaining + a] = e[a];
          (this.appendStringBuf(this.temp_buffs[this.bytes_in_sequence]),
            (this.bytes_in_sequence = this.bytes_remaining = 0),
            (r = r + a - 1));
        } else if (this.bytes_remaining === 0 && t >= 128) {
          if (t <= 193 || t > 244)
            return this.onError(
              Error("Invalid UTF-8 character at position " + r + " in state " + Qoe.toknam(this.tState)),
            );
          if (t >= 194 && t <= 223) this.bytes_in_sequence = 2;
          if (t >= 224 && t <= 239) this.bytes_in_sequence = 3;
          if (t >= 240 && t <= 244) this.bytes_in_sequence = 4;
          if (this.bytes_in_sequence + r > e.length) {
            for (var H = 0; H <= e.length - 1 - r; H++) this.temp_buffs[this.bytes_in_sequence][H] = e[r + H];
            ((this.bytes_remaining = r + this.bytes_in_sequence - e.length), (r = e.length - 1));
          } else
            (this.appendStringBuf(e, r, r + this.bytes_in_sequence), (r = r + this.bytes_in_sequence - 1));
        } else if (t === 34)
          ((this.tState = m_e),
            (this.string += this.stringBuffer.toString("utf8", 0, this.stringBufferOffset)),
            (this.stringBufferOffset = 0),
            this.onToken(iDt, this.string),
            (this.offset += Buffer.byteLength(this.string, "utf8") + 1),
            (this.string = void 0));
        else if (t === 92) this.tState = Cai;
        else if (t >= 32) this.appendStringChar(t);
        else return this.charError(e, r);
      else if (this.tState === Cai)
        if (((t = e[r]), t === 34)) (this.appendStringChar(t), (this.tState = VV));
        else if (t === 92) (this.appendStringChar(tGo), (this.tState = VV));
        else if (t === 47) (this.appendStringChar(rGo), (this.tState = VV));
        else if (t === 98) (this.appendStringChar(nGo), (this.tState = VV));
        else if (t === 102) (this.appendStringChar(iGo), (this.tState = VV));
        else if (t === 110) (this.appendStringChar(sGo), (this.tState = VV));
        else if (t === 114) (this.appendStringChar(oGo), (this.tState = VV));
        else if (t === 116) (this.appendStringChar(aGo), (this.tState = VV));
        else if (t === 117) ((this.unicode = ""), (this.tState = wai));
        else return this.charError(e, r);
      else if (this.tState === wai || this.tState === Zqo || this.tState === eGo || this.tState === kai)
        if (((t = e[r]), (t >= 48 && t < 64) || (t > 64 && t <= 70) || (t > 96 && t <= 102))) {
          if (((this.unicode += String.fromCharCode(t)), this.tState++ === kai)) {
            var u = parseInt(this.unicode, 16);
            if (((this.unicode = void 0), this.highSurrogate !== void 0 && u >= 56320 && u < 57344))
              (this.appendStringBuf(new Buffer(String.fromCharCode(this.highSurrogate, u))),
                (this.highSurrogate = void 0));
            else if (this.highSurrogate === void 0 && u >= 55296 && u < 56320) this.highSurrogate = u;
            else {
              if (this.highSurrogate !== void 0)
                (this.appendStringBuf(new Buffer(String.fromCharCode(this.highSurrogate))),
                  (this.highSurrogate = void 0));
              this.appendStringBuf(new Buffer(String.fromCharCode(u)));
            }
            this.tState = VV;
          }
        } else return this.charError(e, r);
      else if (this.tState === Pai || this.tState === Mpr)
        switch (((t = e[r]), t)) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          case 46:
          case 101:
          case 69:
          case 43:
          case 45:
            ((this.string += String.fromCharCode(t)), (this.tState = Mpr));
            break;
          default:
            this.tState = m_e;
            var f = Number(this.string);
            if (isNaN(f)) return this.charError(e, r);
            if (this.string.match(/[0-9]+/) == this.string && f.toString() != this.string)
              this.onToken(iDt, this.string);
            else this.onToken(Rai, f);
            ((this.offset += this.string.length - 1), (this.string = void 0), r--);
            break;
        }
      else if (this.tState === Iai)
        if (e[r] === 114) this.tState = Dai;
        else return this.charError(e, r);
      else if (this.tState === Dai)
        if (e[r] === 117) this.tState = yai;
        else return this.charError(e, r);
      else if (this.tState === yai)
        if (e[r] === 101) ((this.tState = m_e), this.onToken(Nai, !0), (this.offset += 3));
        else return this.charError(e, r);
      else if (this.tState === Mai)
        if (e[r] === 97) this.tState = xai;
        else return this.charError(e, r);
      else if (this.tState === xai)
        if (e[r] === 108) this.tState = Sai;
        else return this.charError(e, r);
      else if (this.tState === Sai)
        if (e[r] === 115) this.tState = Tai;
        else return this.charError(e, r);
      else if (this.tState === Tai)
        if (e[r] === 101) ((this.tState = m_e), this.onToken(Fai, !1), (this.offset += 4));
        else return this.charError(e, r);
      else if (this.tState === vai)
        if (e[r] === 117) this.tState = bai;
        else return this.charError(e, r);
      else if (this.tState === bai)
        if (e[r] === 108) this.tState = jai;
        else return this.charError(e, r);
      else if (this.tState === jai)
        if (e[r] === 108) ((this.tState = m_e), this.onToken(Bai, null), (this.offset += 3));
        else return this.charError(e, r);
  };
  pB.onToken = function (e, t) {};
  pB.parseError = function (e, t) {
    ((this.tState = Wai),
      this.onError(
        Error(
          "Unexpected " +
            Qoe.toknam(e) +
            (t ? "(" + JSON.stringify(t) + ")" : "") +
            " in state " +
            Qoe.toknam(this.state),
        ),
      ));
  };
  pB.push = function () {
    this.stack.push({ value: this.value, key: this.key, mode: this.mode });
  };
  pB.pop = function () {
    var e = this.value,
      t = this.stack.pop();
    if (((this.value = t.value), (this.key = t.key), (this.mode = t.mode), this.emit(e), !this.mode))
      this.state = yTe;
  };
  pB.emit = function (e) {
    if (this.mode) this.state = nDt;
    this.onValue(e);
  };
  pB.onValue = function (e) {};
  pB.onToken = function (e, t) {
    if (this.state === yTe)
      if (e === iDt || e === Rai || e === Nai || e === Fai || e === Bai) {
        if (this.value) this.value[this.key] = t;
        this.emit(t);
      } else if (e === Oai) {
        if ((this.push(), this.value)) this.value = this.value[this.key] = {};
        else this.value = {};
        ((this.key = void 0), (this.state = xpr), (this.mode = ZIt));
      } else if (e === Uai) {
        if ((this.push(), this.value)) this.value = this.value[this.key] = [];
        else this.value = [];
        ((this.key = 0), (this.mode = eDt), (this.state = yTe));
      } else if (e === tDt)
        if (this.mode === ZIt) this.pop();
        else return this.parseError(e, t);
      else if (e === Spr)
        if (this.mode === eDt) this.pop();
        else return this.parseError(e, t);
      else return this.parseError(e, t);
    else if (this.state === xpr)
      if (e === iDt) ((this.key = t), (this.state = rDt));
      else if (e === tDt) this.pop();
      else return this.parseError(e, t);
    else if (this.state === rDt)
      if (e === rDt) this.state = yTe;
      else return this.parseError(e, t);
    else if (this.state === nDt)
      if (e === nDt) {
        if (this.mode === eDt) (this.key++, (this.state = yTe));
        else if (this.mode === ZIt) this.state = xpr;
      } else if ((e === Spr && this.mode === eDt) || (e === tDt && this.mode === ZIt)) this.pop();
      else return this.parseError(e, t);
    else return this.parseError(e, t);
  };
  Qoe.C = Jd;
  Vai.exports = Qoe;
});