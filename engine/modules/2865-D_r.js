
var D_r = Ie(function (v_e) {
  var Oia =
      (v_e && v_e.__extends) ||
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
    Uia =
      (v_e && v_e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(v_e, "__esModule", { value: !0 });
  var Nia = Uia($Z()),
    Fia = ib(),
    Bia = (function (e) {
      Oia(t, e);
      function t(r) {
        var s = e.call(this, r) || this;
        return ((s.type = Fia.ID), s);
      }
      return (
        (t.prototype.valueToString = function () {
          return "#" + e.prototype.valueToString.call(this);
        }),
        t
      );
    })(Nia.default);
  v_e.default = Bia;
});