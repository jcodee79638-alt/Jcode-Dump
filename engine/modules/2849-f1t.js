
var f1t = Ie(function (FLc, Ehi) {
  var yna = (e, t) => {
    let r = new Set(e);
    for (let a of r) for (let H of a.edgesOut.values()) if (H.to && t(H)) r.add(H.to);
    let s = !0;
    while (s === !0 && r.size > 0) {
      s = !1;
      for (let a of r)
        for (let H of a.edgesIn)
          if (!r.has(H.from) && t(H)) {
            ((s = !0), r.delete(a));
            break;
          }
    }
    return r;
  };
  Ehi.exports = yna;
});