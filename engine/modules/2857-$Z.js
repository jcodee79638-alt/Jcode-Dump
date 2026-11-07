
var $Z = Ie(function (Fhi) {
  Object.defineProperty(Fhi, "__esModule", { value: !0 });
  var _1t = bve(),
    __r = function (e, t, r) {
      if (r === void 0) r = 0;
      if (r > _1t.MAX_NESTING_DEPTH)
        throw Error(
          "Cannot clone selector: nesting depth exceeds the maximum of ".concat(_1t.MAX_NESTING_DEPTH, "."),
        );
      if (typeof e !== "object" || e === null) return e;
      var s = new e.constructor();
      for (var a in e) {
        if (!e.hasOwnProperty(a)) continue;
        var H = e[a],
          u = typeof H;
        if (a === "parent" && u === "object") {
          if (t) s[a] = t;
        } else if (H instanceof Array)
          s[a] = H.map(function (f) {
            return __r(f, s, r + 1);
          });
        else s[a] = __r(H, s, r + 1);
      }
      return s;
    },
    Wna = (function () {
      function e(t) {
        if (t === void 0) t = {};
        (Object.assign(this, t),
          (this.spaces = this.spaces || {}),
          (this.spaces.before = this.spaces.before || ""),
          (this.spaces.after = this.spaces.after || ""));
      }
      return (
        (e.prototype.remove = function () {
          if (this.parent) this.parent.removeChild(this);
          return ((this.parent = void 0), this);
        }),
        (e.prototype.replaceWith = function () {
          if (this.parent) {
            for (var t in arguments) this.parent.insertBefore(this, arguments[t]);
            this.remove();
          }
          return this;
        }),
        (e.prototype.next = function () {
          return this.parent.at(this.parent.index(this) + 1);
        }),
        (e.prototype.prev = function () {
          return this.parent.at(this.parent.index(this) - 1);
        }),
        (e.prototype.clone = function (t) {
          if (t === void 0) t = {};
          var r = __r(this);
          for (var s in t) r[s] = t[s];
          return r;
        }),
        (e.prototype.appendToPropertyAndEscape = function (t, r, s) {
          if (!this.raws) this.raws = {};
          var a = this[t],
            H = this.raws[t];
          if (((this[t] = a + r), H || s !== r)) this.raws[t] = (H || a) + s;
          else delete this.raws[t];
        }),
        (e.prototype.setPropertyAndEscape = function (t, r, s) {
          if (!this.raws) this.raws = {};
          ((this[t] = r), (this.raws[t] = s));
        }),
        (e.prototype.setPropertyWithoutEscape = function (t, r) {
          if (((this[t] = r), this.raws)) delete this.raws[t];
        }),
        (e.prototype.isAtPosition = function (t, r) {
          if (this.source && this.source.start && this.source.end) {
            if (this.source.start.line > t) return !1;
            if (this.source.end.line < t) return !1;
            if (this.source.start.line === t && this.source.start.column > r) return !1;
            if (this.source.end.line === t && this.source.end.column < r) return !1;
            return !0;
          }
          return;
        }),
        (e.prototype.stringifyProperty = function (t) {
          return (this.raws && this.raws[t]) || this[t];
        }),
        Object.defineProperty(e.prototype, "rawSpaceBefore", {
          get: function () {
            var t = this.raws && this.raws.spaces && this.raws.spaces.before;
            if (t === void 0) t = this.spaces && this.spaces.before;
            return t || "";
          },
          set: function (t) {
            ((0, _1t.ensureObject)(this, "raws", "spaces"), (this.raws.spaces.before = t));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "rawSpaceAfter", {
          get: function () {
            var t = this.raws && this.raws.spaces && this.raws.spaces.after;
            if (t === void 0) t = this.spaces.after;
            return t || "";
          },
          set: function (t) {
            ((0, _1t.ensureObject)(this, "raws", "spaces"), (this.raws.spaces.after = t));
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.valueToString = function () {
          return String(this.stringifyProperty("value"));
        }),
        (e.prototype.toString = function () {
          return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
        }),
        (e.prototype._stringify = function () {
          return this.toString();
        }),
        e
      );
    })();
  Fhi.default = Wna;
});