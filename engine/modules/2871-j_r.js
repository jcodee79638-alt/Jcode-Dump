
var j_r = Ie(function (jae) {
  var asa =
      (jae && jae.__extends) ||
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
    v_r =
      (jae && jae.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      },
    S_r;
  Object.defineProperty(jae, "__esModule", { value: !0 });
  jae.unescapeValue = b_r;
  var _qe = v_r(L1t()),
    Hsa = v_r(d_r()),
    csa = v_r($1t()),
    Asa = ib(),
    hqe = zhi(),
    usa = /^('|")([^]*)\1$/,
    lsa = hqe(
      function () {},
      "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead.",
    ),
    fsa = hqe(
      function () {},
      "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.",
    ),
    psa = hqe(
      function () {},
      "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.",
    );
  function b_r(e) {
    var t = !1,
      r = null,
      s = e,
      a = s.match(usa);
    if (a) ((r = a[1]), (s = a[2]));
    if (((s = (0, Hsa.default)(s)), s !== e)) t = !0;
    return { deprecatedUsage: t, unescaped: s, quoteMark: r };
  }
  function dsa(e) {
    if (e.quoteMark !== void 0) return e;
    if (e.value === void 0) return e;
    psa();
    var t = b_r(e.value),
      { quoteMark: r, unescaped: s } = t;
    if (!e.raws) e.raws = {};
    if (e.raws.value === void 0) e.raws.value = e.value;
    return ((e.value = s), (e.quoteMark = r), e);
  }
  var msa = (function (e) {
    asa(t, e);
    function t(r) {
      if (r === void 0) r = {};
      var s = e.call(this, dsa(r)) || this;
      return (
        (s.type = Asa.ATTRIBUTE),
        (s.raws = s.raws || {}),
        Object.defineProperty(s.raws, "unquoted", {
          get: hqe(function () {
            return s.value;
          }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
          set: hqe(function () {
            return s.value;
          }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now."),
        }),
        (s._constructed = !0),
        s
      );
    }
    return (
      (t.prototype.getQuotedValue = function (r) {
        if (r === void 0) r = {};
        var s = this._determineQuoteMark(r),
          a = T_r[s],
          H = (0, _qe.default)(this._value, a);
        return H;
      }),
      (t.prototype._determineQuoteMark = function (r) {
        return r.smart ? this.smartQuoteMark(r) : this.preferredQuoteMark(r);
      }),
      (t.prototype.setValue = function (r, s) {
        if (s === void 0) s = {};
        ((this._value = r), (this._quoteMark = this._determineQuoteMark(s)), this._syncRawValue());
      }),
      (t.prototype.smartQuoteMark = function (r) {
        var s = this.value,
          a = s.replace(/[^']/g, "").length,
          H = s.replace(/[^"]/g, "").length;
        if (a + H === 0) {
          var u = (0, _qe.default)(s, { isIdentifier: !0 });
          if (u === s) return t.NO_QUOTE;
          else {
            var f = this.preferredQuoteMark(r);
            if (f === t.NO_QUOTE) {
              var d = this.quoteMark || r.quoteMark || t.DOUBLE_QUOTE,
                _ = T_r[d],
                L = (0, _qe.default)(s, _);
              if (L.length < u.length) return d;
            }
            return f;
          }
        } else if (H === a) return this.preferredQuoteMark(r);
        else if (H < a) return t.DOUBLE_QUOTE;
        else return t.SINGLE_QUOTE;
      }),
      (t.prototype.preferredQuoteMark = function (r) {
        var s = r.preferCurrentQuoteMark ? this.quoteMark : r.quoteMark;
        if (s === void 0) s = r.preferCurrentQuoteMark ? r.quoteMark : this.quoteMark;
        if (s === void 0) s = t.DOUBLE_QUOTE;
        return s;
      }),
      Object.defineProperty(t.prototype, "quoted", {
        get: function () {
          var r = this.quoteMark;
          return r === "'" || r === '"';
        },
        set: function (r) {
          fsa();
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "quoteMark", {
        get: function () {
          return this._quoteMark;
        },
        set: function (r) {
          if (!this._constructed) {
            this._quoteMark = r;
            return;
          }
          if (this._quoteMark !== r) ((this._quoteMark = r), this._syncRawValue());
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._syncRawValue = function () {
        var r = (0, _qe.default)(this._value, T_r[this.quoteMark]);
        if (r === this._value) {
          if (this.raws) delete this.raws.value;
        } else this.raws.value = r;
      }),
      Object.defineProperty(t.prototype, "qualifiedAttribute", {
        get: function () {
          return this.qualifiedName(this.raws.attribute || this.attribute);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "insensitiveFlag", {
        get: function () {
          return this.insensitive ? "i" : "";
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "value", {
        get: function () {
          return this._value;
        },
        set: function (r) {
          if (this._constructed) {
            var s = b_r(r),
              { deprecatedUsage: a, unescaped: H, quoteMark: u } = s;
            if (a) lsa();
            if (H === this._value && u === this._quoteMark) return;
            ((this._value = H), (this._quoteMark = u), this._syncRawValue());
          } else this._value = r;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "insensitive", {
        get: function () {
          return this._insensitive;
        },
        set: function (r) {
          if (!r) {
            if (
              ((this._insensitive = !1),
              this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i"))
            )
              this.raws.insensitiveFlag = void 0;
          }
          this._insensitive = r;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "attribute", {
        get: function () {
          return this._attribute;
        },
        set: function (r) {
          (this._handleEscapes("attribute", r), (this._attribute = r));
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._handleEscapes = function (r, s) {
        if (this._constructed) {
          var a = (0, _qe.default)(s, { isIdentifier: !0 });
          if (a !== s) this.raws[r] = a;
          else delete this.raws[r];
        }
      }),
      (t.prototype._spacesFor = function (r) {
        var s = { before: "", after: "" },
          a = this.spaces[r] || {},
          H = (this.raws.spaces && this.raws.spaces[r]) || {};
        return Object.assign(s, a, H);
      }),
      (t.prototype._stringFor = function (r, s, a) {
        if (s === void 0) s = r;
        if (a === void 0) a = Qhi;
        var H = this._spacesFor(s);
        return a(this.stringifyProperty(r), H);
      }),
      (t.prototype.offsetOf = function (r) {
        var s = 1,
          a = this._spacesFor("attribute");
        if (((s += a.before.length), r === "namespace" || r === "ns")) return this.namespace ? s : -1;
        if (r === "attributeNS") return s;
        if (((s += this.namespaceString.length), this.namespace)) s += 1;
        if (r === "attribute") return s;
        ((s += this.stringifyProperty("attribute").length), (s += a.after.length));
        var H = this._spacesFor("operator");
        s += H.before.length;
        var u = this.stringifyProperty("operator");
        if (r === "operator") return u ? s : -1;
        ((s += u.length), (s += H.after.length));
        var f = this._spacesFor("value");
        s += f.before.length;
        var d = this.stringifyProperty("value");
        if (r === "value") return d ? s : -1;
        ((s += d.length), (s += f.after.length));
        var _ = this._spacesFor("insensitive");
        if (((s += _.before.length), r === "insensitive")) return this.insensitive ? s : -1;
        return -1;
      }),
      (t.prototype.toString = function () {
        var r = this,
          s = [this.rawSpaceBefore, "["];
        if (
          (s.push(this._stringFor("qualifiedAttribute", "attribute")),
          this.operator && (this.value || this.value === ""))
        )
          (s.push(this._stringFor("operator")),
            s.push(this._stringFor("value")),
            s.push(
              this._stringFor("insensitiveFlag", "insensitive", function (a, H) {
                if (
                  a.length > 0 &&
                  !r.quoted &&
                  H.before.length === 0 &&
                  !(r.spaces.value && r.spaces.value.after)
                )
                  H.before = " ";
                return Qhi(a, H);
              }),
            ));
        return (s.push("]"), s.push(this.rawSpaceAfter), s.join(""));
      }),
      (t.NO_QUOTE = null),
      (t.SINGLE_QUOTE = "'"),
      (t.DOUBLE_QUOTE = '"'),
      t
    );
  })(csa.default);
  jae.default = msa;
  var T_r =
    ((S_r = { "'": { quotes: "single", wrap: !0 }, '"': { quotes: "double", wrap: !0 } }),
    (S_r[null] = { isIdentifier: !0 }),
    S_r);
  function Qhi(e, t) {
    return "".concat(t.before).concat(e).concat(t.after);
  }
});