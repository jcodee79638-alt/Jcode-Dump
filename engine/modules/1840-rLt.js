
var rLt = Ie(function (q5H, Wxn) {
  var tLt = eLt();
  Wxn.exports = (e, t = {}) => {
    let r = (s, a = {}) => {
      let H = t.escapeInvalid && tLt.isInvalidBrace(a),
        u = s.invalid === !0 && t.escapeInvalid === !0,
        f = "";
      if (s.value) {
        if ((H || u) && tLt.isOpenOrClose(s)) return "\\" + s.value;
        return s.value;
      }
      if (s.value) return s.value;
      if (s.nodes) for (let d of s.nodes) f += r(d);
      return f;
    };
    return r(e);
  };
});