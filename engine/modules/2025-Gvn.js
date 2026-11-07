
var Gvn = Ie(function (gYH, qvn) {
  var gco = $Ve(),
    Eco = Wvn();
  qvn.exports = function (e, t) {
    if (typeof t === "function") t = { parse: t };
    var r = Dco(e),
      s = { section_delimiter: "---", parse: Mco },
      a = Eco({}, s, t),
      H = a.section_delimiter,
      u = r.content.split(/\r?\n/),
      f = null,
      d = Vvn(),
      _ = [],
      L = [];
    function I(B) {
      ((r.content = B), (f = []), (_ = []));
    }
    function D(B) {
      if (L.length)
        ((d.key = yco(L[0], H)), (d.content = B), a.parse(d, f), f.push(d), (d = Vvn()), (_ = []), (L = []));
    }
    for (var S = 0; S < u.length; S++) {
      var T = u[S],
        C = L.length,
        O = T.trim();
      if (Ico(O, H)) {
        if (O.length === 3 && S !== 0) {
          if (C === 0 || C === 2) {
            _.push(T);
            continue;
          }
          (L.push(O),
            (d.data = _.join(`
`)),
            (_ = []));
          continue;
        }
        if (f === null)
          I(
            _.join(`
`),
          );
        if (C === 2)
          D(
            _.join(`
`),
          );
        L.push(O);
        continue;
      }
      _.push(T);
    }
    if (f === null)
      I(
        _.join(`
`),
      );
    else
      D(
        _.join(`
`),
      );
    return ((r.sections = f), r);
  };
  function Ico(e, t) {
    if (e.slice(0, t.length) !== t) return !1;
    if (e.charAt(t.length + 1) === t.slice(-1)) return !1;
    return !0;
  }
  function Dco(e) {
    if (gco(e) !== "object") e = { content: e };
    if (typeof e.content !== "string" && !xco(e.content)) throw TypeError("expected a buffer or string");
    return ((e.content = e.content.toString()), (e.sections = []), e);
  }
  function yco(e, t) {
    return e ? e.slice(t.length).trim() : "";
  }
  function Vvn() {
    return { key: "", data: "", content: "" };
  }
  function Mco(e) {
    return e;
  }
  function xco(e) {
    if (e && e.constructor && typeof e.constructor.isBuffer === "function") return e.constructor.isBuffer(e);
    return !1;
  }
});