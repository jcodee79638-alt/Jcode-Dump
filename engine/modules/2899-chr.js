
var chr = Ie(function (w$c, C$i) {
  var YHa = f1t(),
    ZHa = (e) => {
      let t = new Set([e]);
      for (let r of t) for (let s of r.edgesIn) if (!s.optional) t.add(s.from);
      return YHa(t, (r) => !t.has(r.to));
    };
  C$i.exports = ZHa;
});