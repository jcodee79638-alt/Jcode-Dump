
var M_r = Ie(function (P_e) {
  var Yia =
      (P_e && P_e.__extends) ||
      (function () {
        var e = function (t, r) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (s, a) {
                  s.__proto__ = a;
                }) ||
              function (s, a) {
                for (var H in a) if (Object.prototype.hasOwnProperty.call(a, H)) s[H] = a[H];
              }),
            e(t, r)
          );
        };
        return function (t, r) {
          if (typeof r !== "function" && r !== null)
            throw TypeError("Class extends value " + Jhi(r) + " is not a constructor or null");
          e(t, r);
          function s() {
            this.constructor = t;
          }
          t.prototype = r === null ? Object.create(r) : ((s.prototype = r.prototype), new s());
        };
      })(),
    Zia =
      (P_e && P_e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(P_e, "__esModule", { value: !0 });
  var esa = Zia($Z()),
    tsa = ib(),
    Jhi = (function (e) {
      Yia(t, e);
      function t(r) {
        var s = e.call(this, r) || this;
        return ((s.type = tsa.STRING), s);
      }
      return t;
    })(esa.default);
  P_e.default = Jhi;
});