
var ISn = Ie(function (Z5H, ESn) {
  var gSn = rLt(),
    Pno = ASn(),
    Cno = fSn(),
    wno = $Sn(),
    tN = (e, t = {}) => {
      let r = [];
      if (Array.isArray(e))
        for (let s of e) {
          let a = tN.create(s, t);
          if (Array.isArray(a)) r.push(...a);
          else r.push(a);
        }
      else r = [].concat(tN.create(e, t));
      if (t && t.expand === !0 && t.nodupes === !0) r = [...new Set(r)];
      return r;
    };
  tN.parse = (e, t = {}) => wno(e, t);
  tN.stringify = (e, t = {}) => {
    if (typeof e === "string") return gSn(tN.parse(e, t), t);
    return gSn(e, t);
  };
  tN.compile = (e, t = {}) => {
    if (typeof e === "string") e = tN.parse(e, t);
    return Pno(e, t);
  };
  tN.expand = (e, t = {}) => {
    if (typeof e === "string") e = tN.parse(e, t);
    let r = Cno(e, t);
    if (t.noempty === !0) r = r.filter(Boolean);
    if (t.nodupes === !0) r = [...new Set(r)];
    return r;
  };
  tN.create = (e, t = {}) => {
    if (e === "" || e.length < 3) return [e];
    return t.expand !== !0 ? tN.compile(e, t) : tN.expand(e, t);
  };
  ESn.exports = tN;
});