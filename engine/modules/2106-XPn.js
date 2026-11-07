
var XPn = Ie(function (jec, GPn) {
  var qPn = Zv(),
    Dpo = (e, t, r, s, a) => {
      if (typeof r === "string") ((a = s), (s = r), (r = void 0));
      try {
        return new qPn(e instanceof qPn ? e.version : e, r).inc(t, s, a).version;
      } catch (H) {
        return null;
      }
    };
  GPn.exports = Dpo;
});