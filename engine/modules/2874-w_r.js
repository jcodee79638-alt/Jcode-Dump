
var w_r = Ie(function (O_e) {
  var xsa =
      (O_e && O_e.__extends) ||
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
            throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
          e(t, r);
          function s() {
            this.constructor = t;
          }
          t.prototype = r === null ? Object.create(r) : ((s.prototype = r.prototype), new s());
        };
      })(),
    Ssa =
      (O_e && O_e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(O_e, "__esModule", { value: !0 });
  var Tsa = Ssa($Z()),
    vsa = ib(),
    bsa = (function (e) {
      xsa(t, e);
      function t(r) {
        var s = e.call(this, r) || this;
        return ((s.type = vsa.NESTING), (s.value = "&"), s);
      }
      return t;
    })(Tsa.default);
  O_e.default = bsa;
});