
var Eni = Ie(function (Xfc, gni) {
  var $ni = HZ().Buffer;
  gni.exports = function (e) {
    var t = e.Transform;
    function r(a, H) {
      ((this.conv = a), (H = H || {}), (H.decodeStrings = !1), t.call(this, H));
    }
    ((r.prototype = Object.create(t.prototype, { constructor: { value: r } })),
      (r.prototype._transform = function (a, H, u) {
        if (typeof a !== "string") return u(Error("Iconv encoding stream needs strings as its input."));
        try {
          var f = this.conv.write(a);
          if (f && f.length) this.push(f);
          u();
        } catch (d) {
          u(d);
        }
      }),
      (r.prototype._flush = function (a) {
        try {
          var H = this.conv.end();
          if (H && H.length) this.push(H);
          a();
        } catch (u) {
          a(u);
        }
      }),
      (r.prototype.collect = function (a) {
        var H = [];
        return (
          this.on("error", a),
          this.on("data", function (u) {
            H.push(u);
          }),
          this.on("end", function () {
            a(null, $ni.concat(H));
          }),
          this
        );
      }));
    function s(a, H) {
      ((this.conv = a), (H = H || {}), (H.encoding = this.encoding = "utf8"), t.call(this, H));
    }
    return (
      (s.prototype = Object.create(t.prototype, { constructor: { value: s } })),
      (s.prototype._transform = function (a, H, u) {
        if (!$ni.isBuffer(a) && !(a instanceof Uint8Array))
          return u(Error("Iconv decoding stream needs buffers as its input."));
        try {
          var f = this.conv.write(a);
          if (f && f.length) this.push(f, this.encoding);
          u();
        } catch (d) {
          u(d);
        }
      }),
      (s.prototype._flush = function (a) {
        try {
          var H = this.conv.end();
          if (H && H.length) this.push(H, this.encoding);
          a();
        } catch (u) {
          a(u);
        }
      }),
      (s.prototype.collect = function (a) {
        var H = "";
        return (
          this.on("error", a),
          this.on("data", function (u) {
            H += u;
          }),
          this.on("end", function () {
            a(null, H);
          }),
          this
        );
      }),
      { IconvLiteEncoderStream: r, IconvLiteDecoderStream: s }
    );
  };
});