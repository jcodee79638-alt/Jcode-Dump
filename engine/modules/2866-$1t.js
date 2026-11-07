
var $1t = Ie(function (b_e) {
  var Ria =
      (b_e && b_e.__extends) ||
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
    Xhi =
      (b_e && b_e.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(b_e, "__esModule", { value: !0 });
  var Wia = Xhi(L1t()),
    Via = bve(),
    qia = Xhi($Z()),
    Gia = (function (e) {
      Ria(t, e);
      function t() {
        return (e !== null && e.apply(this, arguments)) || this;
      }
      return (
        Object.defineProperty(t.prototype, "namespace", {
          get: function () {
            return this._namespace;
          },
          set: function (r) {
            if (r === !0 || r === "*" || r === "&") {
              if (((this._namespace = r), this.raws)) delete this.raws.namespace;
              return;
            }
            var s = (0, Wia.default)(r, { isIdentifier: !0 });
            if (((this._namespace = r), s !== r))
              ((0, Via.ensureObject)(this, "raws"), (this.raws.namespace = s));
            else if (this.raws) delete this.raws.namespace;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "ns", {
          get: function () {
            return this._namespace;
          },
          set: function (r) {
            this.namespace = r;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "namespaceString", {
          get: function () {
            if (this.namespace) {
              var r = this.stringifyProperty("namespace");
              if (r === !0) return "";
              else return r;
            } else return "";
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.qualifiedName = function (r) {
          if (this.namespace) return "".concat(this.namespaceString, "|").concat(r);
          else return r;
        }),
        (t.prototype.valueToString = function () {
          return this.qualifiedName(e.prototype.valueToString.call(this));
        }),
        t
      );
    })(qia.default);
  b_e.default = Gia;
});