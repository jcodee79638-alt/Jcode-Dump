
var ASn = Ie(function (K5H, cSn) {
  var mno = Zsr(),
    sLt = eLt(),
    _no = (e, t = {}) => {
      let r = (s, a = {}) => {
        let H = sLt.isInvalidBrace(a),
          u = s.invalid === !0 && t.escapeInvalid === !0,
          f = H === !0 || u === !0,
          d = t.escapeInvalid === !0 ? "\\" : "",
          _ = "";
        if (s.isOpen === !0) return d + s.value;
        if (s.isClose === !0) return (console.log("node.isClose", d, s.value), d + s.value);
        if (s.type === "open") return f ? d + s.value : "(";
        if (s.type === "close") return f ? d + s.value : ")";
        if (s.type === "comma") return s.prev.type === "comma" ? "" : f ? s.value : "|";
        if (s.value) return s.value;
        if (s.nodes && s.ranges > 0) {
          let L = sLt.reduce(s.nodes),
            I = mno(...L, { ...t, wrap: !1, toRegex: !0, strictZeros: !0 });
          if (I.length !== 0) return L.length > 1 && I.length > 1 ? `(${I})` : I;
        }
        if (s.nodes) for (let L of s.nodes) _ += r(L, s);
        return _;
      };
      return r(e);
    };
  cSn.exports = _no;
});