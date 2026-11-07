
var Sur = Ie(function (kuc, xur) {
  var { Minipass: zYn } = Ny(),
    TSe = Symbol("_data"),
    vSe = Symbol("_length");
  class QYn extends zYn {
    constructor(e) {
      super(e);
      ((this[TSe] = []), (this[vSe] = 0));
    }
    write(e, t, r) {
      if (typeof t === "function") ((r = t), (t = "utf8"));
      if (!t) t = "utf8";
      let s = Buffer.isBuffer(e) ? e : Buffer.from(e, t);
      if ((this[TSe].push(s), (this[vSe] += s.length), r)) r();
      return !0;
    }
    end(e, t, r) {
      if (typeof e === "function") ((r = e), (e = null));
      if (typeof t === "function") ((r = t), (t = "utf8"));
      if (e) this.write(e, t);
      let s = Buffer.concat(this[TSe], this[vSe]);
      return (super.write(s), super.end(r));
    }
  }
  xur.exports = QYn;
  class YYn extends zYn {
    constructor(e) {
      super(e);
      ((this[TSe] = []), (this[vSe] = 0));
    }
    write(e, t, r) {
      if (typeof t === "function") ((r = t), (t = "utf8"));
      if (!t) t = "utf8";
      let s = Buffer.isBuffer(e) ? e : Buffer.from(e, t);
      return (this[TSe].push(s), (this[vSe] += s.length), super.write(e, t, r));
    }
    end(e, t, r) {
      if (typeof e === "function") ((r = e), (e = null));
      if (typeof t === "function") ((r = t), (t = "utf8"));
      if (e) this.write(e, t);
      let s = Buffer.concat(this[TSe], this[vSe]);
      return (this.emit("collect", s), super.end(r));
    }
  }
  xur.exports.PassThrough = YYn;
});