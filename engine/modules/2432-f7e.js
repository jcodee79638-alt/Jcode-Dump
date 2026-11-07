
var f7e = Ie(function (eJn) {
  Object.defineProperty(eJn, "__esModule", { value: !0 });
  eJn.walkUp = void 0;
  var D0t = cr("path"),
    DCo = function* (e) {
      for (e = D0t.resolve(e); e;) {
        yield e;
        let t = D0t.dirname(e);
        if (t === e) break;
        else e = t;
      }
    };
  eJn.walkUp = DCo;
});