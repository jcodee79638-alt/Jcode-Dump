
var E_r = Ie(function (S_e) {
  var Mia =
      (S_e && S_e.__extends) ||
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
    Ghi =
      (S_e && S_e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(S_e, "__esModule", { value: !0 });
  var xia = Ghi(L1t()),
    Sia = bve(),
    Tia = Ghi($Z()),
    via = ib(),
    bia = (function (e) {
      Mia(t, e);
      function t(r) {
        var s = e.call(this, r) || this;
        return ((s.type = via.CLASS), (s._constructed = !0), s);
      }
      return (
        Object.defineProperty(t.prototype, "value", {
          get: function () {
            return this._value;
          },
          set: function (r) {
            if (this._constructed) {
              var s = (0, xia.default)(r, { isIdentifier: !0 });
              if (s !== r) ((0, Sia.ensureObject)(this, "raws"), (this.raws.value = s));
              else if (this.raws) delete this.raws.value;
            }
            this._value = r;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.valueToString = function () {
          return "." + e.prototype.valueToString.call(this);
        }),
        t
      );
    })(Tia.default);
  S_e.default = bia;
});