
var h1t = Ie(function (sx) {
  var ria =
      (sx && sx.__extends) ||
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
    nia =
      (sx && sx.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            if (s === void 0) s = r;
            var a = Object.getOwnPropertyDescriptor(t, r);
            if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable))
              a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              };
            Object.defineProperty(e, s, a);
          }
        : function (e, t, r, s) {
            if (s === void 0) s = r;
            e[s] = t[r];
          }),
    iia =
      (sx && sx.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    sia =
      (sx && sx.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (r) {
                var s = [];
                for (var a in r) if (Object.prototype.hasOwnProperty.call(r, a)) s[s.length] = a;
                return s;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var r = {};
          if (t != null) {
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") nia(r, t, s[a]);
          }
          return (iia(r, t), r);
        };
      })(),
    oia =
      (sx && sx.__values) ||
      function (e) {
        var t = typeof Symbol === "function" && Symbol.iterator,
          r = t && e[t],
          s = 0;
        if (r) return r.call(e);
        if (e && typeof e.length === "number")
          return {
            next: function () {
              if (e && s >= e.length) e = void 0;
              return { value: e && e[s++], done: !e };
            },
          };
        throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
      },
    Whi =
      (sx && sx.__read) ||
      function (e, t) {
        var r = typeof Symbol === "function" && e[Symbol.iterator];
        if (!r) return e;
        var s = r.call(e),
          a,
          H = [],
          u;
        try {
          while ((t === void 0 || t-- > 0) && !(a = s.next()).done) H.push(a.value);
        } catch (f) {
          u = { error: f };
        } finally {
          try {
            if (a && !a.done && (r = s.return)) r.call(s);
          } finally {
            if (u) throw u.error;
          }
        }
        return H;
      },
    Vhi =
      (sx && sx.__spreadArray) ||
      function (e, t, r) {
        if (r || arguments.length === 2) {
          for (var s = 0, a = t.length, H; s < a; s++)
            if (H || !(s in t)) {
              if (!H) H = Array.prototype.slice.call(t, 0, s);
              H[s] = t[s];
            }
        }
        return e.concat(H || Array.prototype.slice.call(t));
      },
    aia =
      (sx && sx.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(sx, "__esModule", { value: !0 });
  var h_r = bve(),
    Hia = aia($Z()),
    gZ = sia(ib()),
    cia = (function (e) {
      ria(t, e);
      function t(r) {
        var s = e.call(this, r) || this;
        if (!s.nodes) s.nodes = [];
        return s;
      }
      return (
        (t.prototype.append = function (r) {
          return ((r.parent = this), this.nodes.push(r), this);
        }),
        (t.prototype.prepend = function (r) {
          ((r.parent = this), this.nodes.unshift(r));
          for (var s in this.indexes) this.indexes[s]++;
          return this;
        }),
        (t.prototype.at = function (r) {
          return this.nodes[r];
        }),
        (t.prototype.index = function (r) {
          if (typeof r === "number") return r;
          return this.nodes.indexOf(r);
        }),
        Object.defineProperty(t.prototype, "first", {
          get: function () {
            return this.at(0);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "last", {
          get: function () {
            return this.at(this.length - 1);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "length", {
          get: function () {
            return this.nodes.length;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.removeChild = function (r) {
          ((r = this.index(r)), (this.at(r).parent = void 0), this.nodes.splice(r, 1));
          var s;
          for (var a in this.indexes) if (((s = this.indexes[a]), s >= r)) this.indexes[a] = s - 1;
          return this;
        }),
        (t.prototype.removeAll = function () {
          var r, s;
          try {
            for (var a = oia(this.nodes), H = a.next(); !H.done; H = a.next()) {
              var u = H.value;
              u.parent = void 0;
            }
          } catch (f) {
            r = { error: f };
          } finally {
            try {
              if (H && !H.done && (s = a.return)) s.call(a);
            } finally {
              if (r) throw r.error;
            }
          }
          return ((this.nodes = []), this);
        }),
        (t.prototype.empty = function () {
          return this.removeAll();
        }),
        (t.prototype.insertAfter = function (r, s) {
          var a;
          s.parent = this;
          var H = this.index(r),
            u = [];
          for (var f = 2; f < arguments.length; f++) ((arguments[f].parent = this), u.push(arguments[f]));
          ((a = this.nodes).splice.apply(a, Vhi([H + 1, 0, s], Whi(u), !1)), (s.parent = this));
          var d;
          for (var _ in this.indexes)
            if (((d = this.indexes[_]), H < d)) this.indexes[_] = d + arguments.length - 1;
          return this;
        }),
        (t.prototype.insertBefore = function (r, s) {
          var a;
          s.parent = this;
          var H = this.index(r),
            u = [];
          for (var f = 2; f < arguments.length; f++) ((arguments[f].parent = this), u.push(arguments[f]));
          ((a = this.nodes).splice.apply(a, Vhi([H, 0, s], Whi(u), !1)), (s.parent = this));
          var d;
          for (var _ in this.indexes)
            if (((d = this.indexes[_]), d >= H)) this.indexes[_] = d + arguments.length - 1;
          return this;
        }),
        (t.prototype._findChildAtPosition = function (r, s) {
          var a = void 0;
          return (
            this.each(function (H) {
              if (H.atPosition) {
                var u = H.atPosition(r, s);
                if (u) return ((a = u), !1);
              } else if (H.isAtPosition(r, s)) return ((a = H), !1);
            }),
            a
          );
        }),
        (t.prototype.atPosition = function (r, s) {
          if (this.isAtPosition(r, s)) return this._findChildAtPosition(r, s) || this;
          else return;
        }),
        (t.prototype._inferEndPosition = function () {
          if (this.last && this.last.source && this.last.source.end)
            ((this.source = this.source || {}),
              (this.source.end = this.source.end || {}),
              Object.assign(this.source.end, this.last.source.end));
        }),
        (t.prototype.each = function (r) {
          if (!this.lastEach) this.lastEach = 0;
          if (!this.indexes) this.indexes = {};
          this.lastEach++;
          var s = this.lastEach;
          if (((this.indexes[s] = 0), !this.length)) return;
          var a, H;
          while (this.indexes[s] < this.length) {
            if (((a = this.indexes[s]), (H = r(this.at(a), a)), H === !1)) break;
            this.indexes[s] += 1;
          }
          if ((delete this.indexes[s], H === !1)) return !1;
        }),
        (t.prototype.walk = function (r, s) {
          if (s === void 0) s = 0;
          if (s > h_r.MAX_NESTING_DEPTH)
            throw Error(
              "Cannot walk selector: nesting depth exceeds the maximum of ".concat(
                h_r.MAX_NESTING_DEPTH,
                ".",
              ),
            );
          return this.each(function (a, H) {
            var u = r(a, H);
            if (u !== !1 && a.length) u = a.walk(r, s + 1);
            if (u === !1) return !1;
          });
        }),
        (t.prototype.walkAttributes = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.ATTRIBUTE) return r.call(s, a);
          });
        }),
        (t.prototype.walkClasses = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.CLASS) return r.call(s, a);
          });
        }),
        (t.prototype.walkCombinators = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.COMBINATOR) return r.call(s, a);
          });
        }),
        (t.prototype.walkComments = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.COMMENT) return r.call(s, a);
          });
        }),
        (t.prototype.walkIds = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.ID) return r.call(s, a);
          });
        }),
        (t.prototype.walkNesting = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.NESTING) return r.call(s, a);
          });
        }),
        (t.prototype.walkPseudos = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.PSEUDO) return r.call(s, a);
          });
        }),
        (t.prototype.walkTags = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.TAG) return r.call(s, a);
          });
        }),
        (t.prototype.walkUniversals = function (r) {
          var s = this;
          return this.walk(function (a) {
            if (a.type === gZ.UNIVERSAL) return r.call(s, a);
          });
        }),
        (t.prototype.split = function (r) {
          var s = this,
            a = [];
          return this.reduce(function (H, u, f) {
            var d = r.call(s, u);
            if ((a.push(u), d)) (H.push(a), (a = []));
            else if (f === s.length - 1) H.push(a);
            return H;
          }, []);
        }),
        (t.prototype.map = function (r) {
          return this.nodes.map(r);
        }),
        (t.prototype.reduce = function (r, s) {
          return this.nodes.reduce(r, s);
        }),
        (t.prototype.every = function (r) {
          return this.nodes.every(r);
        }),
        (t.prototype.some = function (r) {
          return this.nodes.some(r);
        }),
        (t.prototype.filter = function (r) {
          return this.nodes.filter(r);
        }),
        (t.prototype.sort = function (r) {
          return this.nodes.sort(r);
        }),
        (t.prototype.toString = function (r) {
          if (r === void 0) r = {};
          return this._stringify(r, 0, (0, h_r.resolveMaxNestingDepth)(r.maxNestingDepth));
        }),
        (t.prototype._stringify = function (r, s, a) {
          var H = this;
          return this.map(function (u) {
            return H._stringifyChild(u, r, s, a);
          }).join("");
        }),
        (t.prototype._stringifyChild = function (r, s, a, H) {
          return typeof r._stringify === "function" ? r._stringify(s, a, H) : String(r);
        }),
        t
      );
    })(Hia.default);
  sx.default = cia;
});