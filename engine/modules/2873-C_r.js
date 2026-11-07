
var C_r = Ie(function (k_e) {
  var Esa =
      (k_e && k_e.__extends) ||
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
    Isa =
      (k_e && k_e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(k_e, "__esModule", { value: !0 });
  var Dsa = Isa($Z()),
    ysa = ib(),
    Msa = (function (e) {
      Esa(t, e);
      function t(r) {
        var s = e.call(this, r) || this;
        return ((s.type = ysa.COMBINATOR), (s._constructed = !0), s);
      }
      return (
        Object.defineProperty(t.prototype, "value", {
          get: function () {
            return this._value;
          },
          set: function (r) {
            if (this._constructed && this.raws) delete this.raws.value;
            this._value = r;
          },
          enumerable: !1,
          configurable: !0,
        }),
        t
      );
    })(Dsa.default);
  k_e.default = Msa;
});