
var L_r = Ie(function (M_e) {
  var Aia =
      (M_e && M_e.__extends) ||
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
    uia =
      (M_e && M_e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(M_e, "__esModule", { value: !0 });
  var lia = uia(h1t()),
    fia = ib(),
    pia = (function (e) {
      Aia(t, e);
      function t(r) {
        var s = e.call(this, r) || this;
        return ((s.type = fia.ROOT), s);
      }
      return (
        (t.prototype._stringify = function (r, s, a) {
          var H = this,
            u = this.reduce(function (f, d) {
              return (f.push(H._stringifyChild(d, r, s, a)), f);
            }, []).join(",");
          return this.trailingComma ? u + "," : u;
        }),
        (t.prototype.error = function (r, s) {
          if (this._error) return this._error(r, s);
          else return Error(r);
        }),
        Object.defineProperty(t.prototype, "errorGenerator", {
          set: function (r) {
            this._error = r;
          },
          enumerable: !1,
          configurable: !0,
        }),
        t
      );
    })(lia.default);
  M_e.default = pia;
});