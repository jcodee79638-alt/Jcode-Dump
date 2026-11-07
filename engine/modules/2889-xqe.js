
var xqe = Ie(function (y$c, YLi) {
  var uHa = (e, t = !0) => {
    if (t) e.unsetDepFlags();
    let r = new Set(),
      s = [e],
      a;
    while ((a = s.pop())) {
      if ((r.add(a), !a.extraneous))
        for (let H = a.resolveParent; H?.extraneous; H = H.resolveParent) H.extraneous = !1;
      if (a.isLink) {
        if (a.target == null) continue;
        ((a.target.dev = a.dev),
          (a.target.optional = a.optional),
          (a.target.devOptional = a.devOptional),
          (a.target.peer = a.peer),
          (a.target.extraneous = a.extraneous),
          s.push(a.target));
        continue;
      }
      for (let { peer: H, optional: u, dev: f, to: d } of a.edgesOut.values()) {
        if (!d) continue;
        let _ = !1;
        if (d.extraneous && !a.extraneous && !(H && u)) ((d.extraneous = !1), (_ = !0));
        if (d.dev && !a.dev && !f) ((d.dev = !1), (_ = !0));
        if (d.optional && !a.optional && !u) ((d.optional = !1), (_ = !0));
        if (d.devOptional && !a.devOptional && !a.dev && !a.optional && !f && !u)
          ((d.devOptional = !1), (_ = !0));
        if (d.peer && !a.peer && !H) ((d.peer = !1), (_ = !0));
        if (_) s.push(d);
      }
    }
    r.delete(e);
    for (let H of r.values()) if (H.devOptional && (H.dev || H.optional)) H.devOptional = !1;
  };
  YLi.exports = uHa;
});