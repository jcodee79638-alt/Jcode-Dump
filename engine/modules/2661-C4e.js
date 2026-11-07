
var C4e = Ie(function (odc, DTe) {
  var { FetchError: Jqo, Headers: Kqo, Request: Eai, Response: zqo } = uTe(),
    Qqo = Lii(),
    Yqo = gai(),
    YIt = (e, t) => {
      let r = Qqo(t),
        s = new Eai(e, r);
      return Yqo(s, r);
    };
  YIt.defaults = (e, t = {}, r = YIt) => {
    if (typeof e === "object") ((t = e), (e = null));
    let s = (a, H = {}) => {
      let u = a || e,
        f = { ...t, ...H, headers: { ...t.headers, ...H.headers } };
      return r(u, f);
    };
    return ((s.defaults = (a, H = {}) => YIt.defaults(a, H, s)), s);
  };
  DTe.exports = YIt;
  DTe.exports.FetchError = Jqo;
  DTe.exports.Headers = Kqo;
  DTe.exports.Request = Eai;
  DTe.exports.Response = zqo;
});