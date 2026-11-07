
function xga(e) {
  var { element: t, isBlock: r, isVoid: s } = e,
    a =
      e.isPre ||
      function (I) {
        return I.nodeName === "PRE";
      };
  if (!t.firstChild || a(t)) return;
  var H = null,
    u = !1,
    f = null,
    d = Kxi(f, t, a);
  while (d !== t) {
    if (d.nodeType === 3 || d.nodeType === 4) {
      var _ = d.data.replace(/[ \r\n\t]+/g, " ");
      if ((!H || / $/.test(H.data)) && !u && _[0] === " ") _ = _.substr(1);
      if (!_) {
        d = Ggr(d);
        continue;
      }
      ((d.data = _), (H = d));
    } else if (d.nodeType === 1) {
      if (r(d) || d.nodeName === "BR") {
        if (H) H.data = H.data.replace(/ $/, "");
        ((H = null), (u = !1));
      } else if (s(d) || a(d)) ((H = null), (u = !0));
      else if (H) u = !1;
    } else {
      d = Ggr(d);
      continue;
    }
    var L = Kxi(f, d, a);
    ((f = d), (d = L));
  }
  if (H) {
    if (((H.data = H.data.replace(/ $/, "")), !H.data)) Ggr(H);
  }
}