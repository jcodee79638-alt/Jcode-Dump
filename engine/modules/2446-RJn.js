
var RJn = Ie(function (Xcc, BJn) {
  var ZCo = $Se(),
    FJn = (e) => {
      if (!e || (typeof e !== "function" && typeof e !== "object")) return e;
      if (Array.isArray(e)) return e.map((t) => FJn(t));
      for (let { type: t, description: r } of Object.values(ZCo)) if (t === e) return r || t;
      return e;
    };
  BJn.exports = (e) => [].concat(FJn(e)).filter((t) => t !== void 0);
});