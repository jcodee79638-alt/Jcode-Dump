
var VQi = Ie(function (NvA, WQi) {
  var RQi = Mb(),
    dZa = (e, t, r, s, a) => {
      if (typeof r === "string") ((a = s), (s = r), (r = void 0));
      try {
        return new RQi(e instanceof RQi ? e.version : e, r).inc(t, s, a).version;
      } catch (H) {
        return null;
      }
    };
  WQi.exports = dZa;
});