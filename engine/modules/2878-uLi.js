
var uLi = Ie(function (sb) {
  var E1t =
      (sb && sb.__assign) ||
      function () {
        return (
          (E1t =
            Object.assign ||
            function (e) {
              for (var t, r = 1, s = arguments.length; r < s; r++) {
                t = arguments[r];
                for (var a in t) if (Object.prototype.hasOwnProperty.call(t, a)) e[a] = t[a];
              }
              return e;
            }),
          E1t.apply(this, arguments)
        );
      },
    _oa =
      (sb && sb.__createBinding) ||
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
    hoa =
      (sb && sb.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    I1t =
      (sb && sb.__importStar) ||
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
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") _oa(r, t, s[a]);
          }
          return (hoa(r, t), r);
        };
      })(),
    sLi =
      (sb && sb.__read) ||
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
    oLi =
      (sb && sb.__spreadArray) ||
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
    SB =
      (sb && sb.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      },
    U_e,
    U_r;
  Object.defineProperty(sb, "__esModule", { value: !0 });
  var Loa = SB(L_r()),
    N_r = SB($_r()),
    $oa = SB(E_r()),
    aLi = SB(I_r()),
    goa = SB(D_r()),
    Eoa = SB(y_r()),
    g1t = SB(M_r()),
    Ioa = SB(x_r()),
    HLi = I1t(j_r()),
    Doa = SB(P_r()),
    F_r = SB(C_r()),
    yoa = SB(w_r()),
    Moa = SB(Zhi()),
    Da = I1t(iLi()),
    gc = I1t(k_r()),
    xoa = I1t(ib()),
    gg = bve(),
    W_r =
      ((U_e = {}),
      (U_e[gc.space] = !0),
      (U_e[gc.cr] = !0),
      (U_e[gc.feed] = !0),
      (U_e[gc.newline] = !0),
      (U_e[gc.tab] = !0),
      U_e),
    Soa = E1t(E1t({}, W_r), ((U_r = {}), (U_r[gc.comment] = !0), U_r));
  function cLi(e) {
    return { line: e[Da.FIELDS.START_LINE], column: e[Da.FIELDS.START_COL] };
  }
  function ALi(e) {
    return { line: e[Da.FIELDS.END_LINE], column: e[Da.FIELDS.END_COL] };
  }
  function F_e(e, t, r, s) {
    return { start: { line: e, column: t }, end: { line: r, column: s } };
  }
  function N_e(e) {
    return F_e(e[Da.FIELDS.START_LINE], e[Da.FIELDS.START_COL], e[Da.FIELDS.END_LINE], e[Da.FIELDS.END_COL]);
  }
  function B_r(e, t) {
    if (!e) return;
    return F_e(e[Da.FIELDS.START_LINE], e[Da.FIELDS.START_COL], t[Da.FIELDS.END_LINE], t[Da.FIELDS.END_COL]);
  }
  function Pve(e, t) {
    var r = e[t];
    if (typeof r !== "string") return;
    if (r.indexOf("\\") !== -1) {
      if (((0, gg.ensureObject)(e, "raws"), (e[t] = (0, gg.unesc)(r)), e.raws[t] === void 0)) e.raws[t] = r;
    }
    return e;
  }
  function R_r(e, t) {
    var r = -1,
      s = [];
    while ((r = e.indexOf(t, r + 1)) !== -1) s.push(r);
    return s;
  }
  function Toa() {
    return Array.from(new Set(Array.prototype.concat.apply([], arguments)));
  }
  var voa = (function () {
    function e(t, r) {
      if (r === void 0) r = {};
      ((this.rule = t),
        (this.options = Object.assign({ lossy: !1, safe: !1 }, r)),
        (this.position = 0),
        (this.nestingDepth = 0),
        (this.maxNestingDepth = (0, gg.resolveMaxNestingDepth)(this.options.maxNestingDepth)),
        (this.css = typeof this.rule === "string" ? this.rule : this.rule.selector),
        (this.tokens = (0, Da.default)({
          css: this.css,
          error: this._errorGenerator(),
          safe: this.options.safe,
        })));
      var s = B_r(this.tokens[0], this.tokens[this.tokens.length - 1]);
      ((this.root = new Loa.default({ source: s })), (this.root.errorGenerator = this._errorGenerator()));
      var a = new N_r.default({ source: { start: { line: 1, column: 1 } }, sourceIndex: 0 });
      (this.root.append(a), (this.current = a), this.loop());
    }
    return (
      (e.prototype._errorGenerator = function () {
        var t = this;
        return function (r, s) {
          if (typeof t.rule === "string") return Error(r);
          return t.rule.error(r, s);
        };
      }),
      (e.prototype.namespaceSeparatorFollows = function (t, r) {
        var s = r;
        while (t[s] && t[s][Da.FIELDS.TYPE] === gc.space) s++;
        if (!t[s] || this.content(t[s]) !== "|") return !1;
        if ((s++, t[s] && t[s][Da.FIELDS.TYPE] === gc.equals)) return !1;
        while (t[s] && t[s][Da.FIELDS.TYPE] === gc.space) s++;
        return Boolean(t[s]);
      }),
      (e.prototype.attribute = function () {
        var t = [],
          r = this.currToken;
        this.position++;
        while (this.position < this.tokens.length && this.currToken[Da.FIELDS.TYPE] !== gc.closeSquare)
          (t.push(this.currToken), this.position++);
        if (!this.currToken) return this.expected("closing square bracket", r[Da.FIELDS.START_POS]);
        if (this.currToken[Da.FIELDS.TYPE] !== gc.closeSquare)
          return this.expected("closing square bracket", this.currToken[Da.FIELDS.START_POS]);
        var s = t.length,
          a = {
            source: F_e(r[1], r[2], this.currToken[3], this.currToken[4]),
            sourceIndex: r[Da.FIELDS.START_POS],
          };
        if (s === 1 && !~[gc.word].indexOf(t[0][Da.FIELDS.TYPE]))
          return this.expected("attribute", t[0][Da.FIELDS.START_POS]);
        var H = 0,
          u = "",
          f = "",
          d = null,
          _ = !1,
          L = null;
        while (H < s) {
          var I = t[H],
            D = this.content(I),
            S = t[H + 1];
          switch (I[Da.FIELDS.TYPE]) {
            case gc.space:
              if (((_ = !0), this.options.lossy)) break;
              if (L !== null) {
                L += D;
                break;
              }
              if (d === "namespace") {
                ((0, gg.ensureObject)(a, "raws"), (a.raws.namespace = (a.raws.namespace || a.namespace) + D));
                break;
              }
              if (d) {
                (0, gg.ensureObject)(a, "spaces", d);
                var T = a.spaces[d].after || "";
                a.spaces[d].after = T + D;
                var C = (0, gg.getProp)(a, "raws", "spaces", d, "after") || null;
                if (C) a.raws.spaces[d].after = C + D;
              } else ((u = u + D), (f = f + D));
              break;
            case gc.asterisk:
              if (S[Da.FIELDS.TYPE] === gc.equals) ((a.operator = D), (d = "operator"));
              else if ((!a.namespace || (d === "namespace" && !_)) && S) {
                a.namespace = (a.namespace || "") + D;
                var O = (0, gg.getProp)(a, "raws", "namespace") || null;
                if (O) a.raws.namespace += D;
                if (u)
                  ((0, gg.ensureObject)(a, "spaces", "attribute"), (a.spaces.attribute.before = u), (u = ""));
                if (f)
                  ((0, gg.ensureObject)(a, "raws", "spaces", "attribute"),
                    (a.raws.spaces.attribute.before = f),
                    (f = ""));
                d = "namespace";
              }
              _ = !1;
              break;
            case gc.dollar:
              if (d === "value") {
                var B = (0, gg.getProp)(a, "raws", "value");
                if (((a.value += "$"), B)) a.raws.value = B + "$";
                break;
              }
            case gc.caret:
              if (S[Da.FIELDS.TYPE] === gc.equals) ((a.operator = D), (d = "operator"));
              _ = !1;
              break;
            case gc.combinator:
              if (D === "~" && S[Da.FIELDS.TYPE] === gc.equals) ((a.operator = D), (d = "operator"));
              if (D !== "|") {
                _ = !1;
                break;
              }
              if (S[Da.FIELDS.TYPE] === gc.equals) ((a.operator = D), (d = "operator"));
              else if (!a.operator) {
                if (!a.namespace && !a.attribute) a.namespace = !0;
                L = "";
              }
              _ = !1;
              break;
            case gc.word:
              if (this.namespaceSeparatorFollows(t, H + 1) && !a.operator && !a.namespace)
                ((a.namespace = D), (d = "namespace"));
              else if (!a.attribute || (d === "attribute" && !_)) {
                if (u)
                  ((0, gg.ensureObject)(a, "spaces", "attribute"), (a.spaces.attribute.before = u), (u = ""));
                if (f)
                  ((0, gg.ensureObject)(a, "raws", "spaces", "attribute"),
                    (a.raws.spaces.attribute.before = f),
                    (f = ""));
                if (L)
                  ((0, gg.ensureObject)(a, "raws"),
                    (a.raws.attribute = L + (a.raws.attribute || a.attribute || "")));
                ((L = null), (a.attribute = (a.attribute || "") + D));
                var O = (0, gg.getProp)(a, "raws", "attribute") || null;
                if (O) a.raws.attribute += D;
                d = "attribute";
              } else if ((!a.value && a.value !== "") || (d === "value" && !(_ || a.quoteMark))) {
                var V = (0, gg.unesc)(D),
                  B = (0, gg.getProp)(a, "raws", "value") || "",
                  q = a.value || "";
                if (((a.value = q + V), (a.quoteMark = null), V !== D || B))
                  ((0, gg.ensureObject)(a, "raws"), (a.raws.value = (B || q) + D));
                d = "value";
              } else {
                var Z = D === "i" || D === "I";
                if ((a.value || a.value === "") && (a.quoteMark || _)) {
                  if (((a.insensitive = Z), !Z || D === "I"))
                    ((0, gg.ensureObject)(a, "raws"), (a.raws.insensitiveFlag = D));
                  if (((d = "insensitive"), u))
                    ((0, gg.ensureObject)(a, "spaces", "insensitive"),
                      (a.spaces.insensitive.before = u),
                      (u = ""));
                  if (f)
                    ((0, gg.ensureObject)(a, "raws", "spaces", "insensitive"),
                      (a.raws.spaces.insensitive.before = f),
                      (f = ""));
                } else if (a.value || a.value === "") {
                  if (((d = "value"), (a.value += D), a.raws.value)) a.raws.value += D;
                }
              }
              _ = !1;
              break;
            case gc.str:
              if (!a.attribute || !a.operator)
                return this.error("Expected an attribute followed by an operator preceding the string.", {
                  index: I[Da.FIELDS.START_POS],
                });
              var se = (0, HLi.unescapeValue)(D),
                { unescaped: ae, quoteMark: z } = se;
              ((a.value = ae),
                (a.quoteMark = z),
                (d = "value"),
                (0, gg.ensureObject)(a, "raws"),
                (a.raws.value = D),
                (_ = !1));
              break;
            case gc.equals:
              if (!a.attribute) return this.expected("attribute", I[Da.FIELDS.START_POS], D);
              if (a.value)
                return this.error('Unexpected "=" found; an operator was already defined.', {
                  index: I[Da.FIELDS.START_POS],
                });
              ((a.operator = a.operator ? a.operator + D : D), (d = "operator"), (_ = !1));
              break;
            case gc.comment:
              if (d)
                if (_ || (S && S[Da.FIELDS.TYPE] === gc.space) || d === "insensitive") {
                  var Ae = (0, gg.getProp)(a, "spaces", d, "after") || "",
                    le = (0, gg.getProp)(a, "raws", "spaces", d, "after") || Ae;
                  ((0, gg.ensureObject)(a, "raws", "spaces", d), (a.raws.spaces[d].after = le + D));
                } else {
                  var Be = a[d] || "",
                    Te = (0, gg.getProp)(a, "raws", d) || Be;
                  ((0, gg.ensureObject)(a, "raws"), (a.raws[d] = Te + D));
                }
              else f = f + D;
              break;
            default:
              return this.error('Unexpected "'.concat(D, '" found.'), { index: I[Da.FIELDS.START_POS] });
          }
          H++;
        }
        (Pve(a, "attribute"), Pve(a, "namespace"), this.newNode(new HLi.default(a)), this.position++);
      }),
      (e.prototype.parseWhitespaceEquivalentTokens = function (t) {
        if (t < 0) t = this.tokens.length;
        var r = this.position,
          s = [],
          a = "",
          H = void 0;
        do
          if (W_r[this.currToken[Da.FIELDS.TYPE]]) {
            if (!this.options.lossy) a += this.content();
          } else if (this.currToken[Da.FIELDS.TYPE] === gc.comment) {
            var u = {};
            if (a) ((u.before = a), (a = ""));
            ((H = new aLi.default({
              value: this.content(),
              source: N_e(this.currToken),
              sourceIndex: this.currToken[Da.FIELDS.START_POS],
              spaces: u,
            })),
              s.push(H));
          }
        while (++this.position < t);
        if (a) {
          if (H) H.spaces.after = a;
          else if (!this.options.lossy) {
            var f = this.tokens[r],
              d = this.tokens[this.position - 1];
            s.push(
              new g1t.default({
                value: "",
                source: F_e(
                  f[Da.FIELDS.START_LINE],
                  f[Da.FIELDS.START_COL],
                  d[Da.FIELDS.END_LINE],
                  d[Da.FIELDS.END_COL],
                ),
                sourceIndex: f[Da.FIELDS.START_POS],
                spaces: { before: a, after: "" },
              }),
            );
          }
        }
        return s;
      }),
      (e.prototype.convertWhitespaceNodesToSpace = function (t, r) {
        var s = this;
        if (r === void 0) r = !1;
        var a = "",
          H = "";
        if (
          (t.forEach(function (f) {
            var d = s.lossySpace(f.spaces.before, r),
              _ = s.lossySpace(f.rawSpaceBefore, r);
            ((a += d + s.lossySpace(f.spaces.after, r && d.length === 0)),
              (H += d + f.value + s.lossySpace(f.rawSpaceAfter, r && _.length === 0)));
          }),
          H === a)
        )
          H = void 0;
        var u = { space: a, rawSpace: H };
        return u;
      }),
      (e.prototype.isNamedCombinator = function (t) {
        if (t === void 0) t = this.position;
        return (
          this.tokens[t + 0] &&
          this.tokens[t + 0][Da.FIELDS.TYPE] === gc.slash &&
          this.tokens[t + 1] &&
          this.tokens[t + 1][Da.FIELDS.TYPE] === gc.word &&
          this.tokens[t + 2] &&
          this.tokens[t + 2][Da.FIELDS.TYPE] === gc.slash
        );
      }),
      (e.prototype.namedCombinator = function () {
        if (this.isNamedCombinator()) {
          var t = this.content(this.tokens[this.position + 1]),
            r = (0, gg.unesc)(t).toLowerCase(),
            s = {};
          if (r !== t) s.value = "/".concat(t, "/");
          var a = new F_r.default({
            value: "/".concat(r, "/"),
            source: F_e(
              this.currToken[Da.FIELDS.START_LINE],
              this.currToken[Da.FIELDS.START_COL],
              this.tokens[this.position + 2][Da.FIELDS.END_LINE],
              this.tokens[this.position + 2][Da.FIELDS.END_COL],
            ),
            sourceIndex: this.currToken[Da.FIELDS.START_POS],
            raws: s,
          });
          return ((this.position = this.position + 3), a);
        } else this.unexpected();
      }),
      (e.prototype.combinator = function () {
        var t = this;
        if (this.content() === "|") return this.namespace();
        var r = this.locateNextMeaningfulToken(this.position);
        if (
          r < 0 ||
          this.tokens[r][Da.FIELDS.TYPE] === gc.comma ||
          this.tokens[r][Da.FIELDS.TYPE] === gc.closeParenthesis
        ) {
          var s = this.parseWhitespaceEquivalentTokens(r);
          if (s.length > 0) {
            var a = this.current.last;
            if (a) {
              var H = this.convertWhitespaceNodesToSpace(s),
                { space: u, rawSpace: f } = H;
              if (f !== void 0) a.rawSpaceAfter += f;
              a.spaces.after += u;
            } else
              s.forEach(function (C) {
                return t.newNode(C);
              });
          }
          return;
        }
        var d = this.currToken,
          _ = void 0;
        if (r > this.position) _ = this.parseWhitespaceEquivalentTokens(r);
        var L;
        if (this.isNamedCombinator()) L = this.namedCombinator();
        else if (this.currToken[Da.FIELDS.TYPE] === gc.combinator)
          ((L = new F_r.default({
            value: this.content(),
            source: N_e(this.currToken),
            sourceIndex: this.currToken[Da.FIELDS.START_POS],
          })),
            this.position++);
        else if (W_r[this.currToken[Da.FIELDS.TYPE]]);
        else if (!_) this.unexpected();
        if (L) {
          if (_) {
            var I = this.convertWhitespaceNodesToSpace(_),
              { space: u, rawSpace: f } = I;
            ((L.spaces.before = u), (L.rawSpaceBefore = f));
          }
        } else {
          var D = this.convertWhitespaceNodesToSpace(_, !0),
            { space: u, rawSpace: f } = D;
          if (!f) f = u;
          var S = {},
            T = { spaces: {} };
          if (u.endsWith(" ") && f.endsWith(" "))
            ((S.before = u.slice(0, u.length - 1)), (T.spaces.before = f.slice(0, f.length - 1)));
          else if (u[0] === " " && f[0] === " ") ((S.after = u.slice(1)), (T.spaces.after = f.slice(1)));
          else T.value = f;
          L = new F_r.default({
            value: " ",
            source: B_r(d, this.tokens[this.position - 1]),
            sourceIndex: d[Da.FIELDS.START_POS],
            spaces: S,
            raws: T,
          });
        }
        if (this.currToken && this.currToken[Da.FIELDS.TYPE] === gc.space)
          ((L.spaces.after = this.optionalSpace(this.content())), this.position++);
        return this.newNode(L);
      }),
      (e.prototype.flushPendingSpaces = function () {
        if (!this.spaces) return;
        var t = this.current.last;
        if (t) {
          ((t.spaces.after += this.spaces), (this.spaces = ""));
          return;
        }
        var r = this.currToken || this.prevToken;
        this.newNode(
          new g1t.default({
            value: "",
            source: r ? N_e(r) : void 0,
            sourceIndex: r ? r[Da.FIELDS.START_POS] : 0,
          }),
        );
      }),
      (e.prototype.comma = function () {
        if ((this.flushPendingSpaces(), this.position === this.tokens.length - 1)) {
          ((this.root.trailingComma = !0), this.position++);
          return;
        }
        this.current._inferEndPosition();
        var t = new N_r.default({
          source: { start: cLi(this.tokens[this.position + 1]) },
          sourceIndex: this.tokens[this.position + 1][Da.FIELDS.START_POS],
        });
        (this.current.parent.append(t), (this.current = t), this.position++);
      }),
      (e.prototype.comment = function () {
        var t = this.currToken;
        (this.newNode(
          new aLi.default({ value: this.content(), source: N_e(t), sourceIndex: t[Da.FIELDS.START_POS] }),
        ),
          this.position++);
      }),
      (e.prototype.error = function (t, r) {
        throw this.root.error(t, r);
      }),
      (e.prototype.missingBackslash = function () {
        return this.error("Expected a backslash preceding the semicolon.", {
          index: this.currToken[Da.FIELDS.START_POS],
        });
      }),
      (e.prototype.missingParenthesis = function () {
        return this.expected("opening parenthesis", this.currToken[Da.FIELDS.START_POS]);
      }),
      (e.prototype.missingSquareBracket = function () {
        return this.expected("opening square bracket", this.currToken[Da.FIELDS.START_POS]);
      }),
      (e.prototype.unexpected = function () {
        return this.error(
          "Unexpected '".concat(this.content(), "'. Escaping special characters with \\ may help."),
          this.currToken[Da.FIELDS.START_POS],
        );
      }),
      (e.prototype.unexpectedPipe = function () {
        return this.error("Unexpected '|'.", this.currToken[Da.FIELDS.START_POS]);
      }),
      (e.prototype.namespace = function () {
        var t = this.prevToken,
          r =
            t &&
            (t[Da.FIELDS.TYPE] === gc.word ||
              t[Da.FIELDS.TYPE] === gc.asterisk ||
              t[Da.FIELDS.TYPE] === gc.ampersand)
              ? this.content(t)
              : !0;
        if (!this.nextToken) return this.unexpectedPipe();
        if (this.nextToken[Da.FIELDS.TYPE] === gc.word) return (this.position++, this.word(r));
        else if (this.nextToken[Da.FIELDS.TYPE] === gc.asterisk) return (this.position++, this.universal(r));
        this.unexpectedPipe();
      }),
      (e.prototype.nesting = function () {
        if (this.nextToken) {
          var t = this.content(this.nextToken);
          if (t === "|") {
            this.position++;
            return;
          }
        }
        var r = this.currToken;
        (this.newNode(
          new yoa.default({ value: this.content(), source: N_e(r), sourceIndex: r[Da.FIELDS.START_POS] }),
        ),
          this.position++);
      }),
      (e.prototype.parentheses = function () {
        var t = this.current.last,
          r = 1,
          s = this.currToken;
        if ((this.position++, t && t.type === xoa.PSEUDO)) {
          var a = new N_r.default({
              source: { start: cLi(this.tokens[this.position]) },
              sourceIndex: this.tokens[this.position][Da.FIELDS.START_POS],
            }),
            H = this.current;
          (t.append(a), (this.current = a), this.nestingDepth++);
          try {
            if (this.nestingDepth > this.maxNestingDepth)
              this.error(
                "Cannot parse selector: nesting depth exceeds the maximum of ".concat(
                  this.maxNestingDepth,
                  ".",
                ),
                { index: this.currToken[Da.FIELDS.START_POS] },
              );
            while (this.position < this.tokens.length && r) {
              if (this.currToken[Da.FIELDS.TYPE] === gc.openParenthesis) r++;
              if (this.currToken[Da.FIELDS.TYPE] === gc.closeParenthesis) r--;
              if (r) this.parse();
              else
                (this.flushPendingSpaces(),
                  (this.current.source.end = ALi(this.currToken)),
                  (this.current.parent.source.end = ALi(this.currToken)),
                  this.position++);
            }
          } finally {
            this.nestingDepth--;
          }
          this.current = H;
        } else {
          var u = this.currToken,
            f = "(",
            d = void 0;
          while (this.position < this.tokens.length && r) {
            if (this.currToken[Da.FIELDS.TYPE] === gc.openParenthesis) r++;
            if (this.currToken[Da.FIELDS.TYPE] === gc.closeParenthesis) r--;
            ((d = this.currToken), (f += this.parseParenthesisToken(this.currToken)), this.position++);
          }
          if (t) t.appendToPropertyAndEscape("value", f, f);
          else
            this.newNode(
              new g1t.default({
                value: f,
                source: F_e(
                  u[Da.FIELDS.START_LINE],
                  u[Da.FIELDS.START_COL],
                  d[Da.FIELDS.END_LINE],
                  d[Da.FIELDS.END_COL],
                ),
                sourceIndex: u[Da.FIELDS.START_POS],
              }),
            );
        }
        if (r) return this.expected("closing parenthesis", (this.currToken || s)[Da.FIELDS.START_POS]);
      }),
      (e.prototype.pseudo = function () {
        var t = this,
          r = "",
          s = this.currToken;
        while (this.currToken && this.currToken[Da.FIELDS.TYPE] === gc.colon)
          ((r += this.content()), this.position++);
        if (!this.currToken) return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
        if (this.currToken[Da.FIELDS.TYPE] === gc.word)
          this.splitWord(!1, function (a, H) {
            if (
              ((r += a),
              t.newNode(
                new Ioa.default({
                  value: r,
                  source: B_r(s, t.currToken),
                  sourceIndex: s[Da.FIELDS.START_POS],
                }),
              ),
              H > 1 && t.nextToken && t.nextToken[Da.FIELDS.TYPE] === gc.openParenthesis)
            )
              t.error("Misplaced parenthesis.", { index: t.nextToken[Da.FIELDS.START_POS] });
          });
        else return this.expected(["pseudo-class", "pseudo-element"], this.currToken[Da.FIELDS.START_POS]);
      }),
      (e.prototype.space = function () {
        var t = this.content();
        if (
          this.position === 0 ||
          this.prevToken[Da.FIELDS.TYPE] === gc.comma ||
          this.prevToken[Da.FIELDS.TYPE] === gc.openParenthesis ||
          this.current.nodes.every(function (r) {
            return r.type === "comment";
          })
        )
          ((this.spaces = this.optionalSpace(t)), this.position++);
        else if (
          this.position === this.tokens.length - 1 ||
          this.nextToken[Da.FIELDS.TYPE] === gc.comma ||
          this.nextToken[Da.FIELDS.TYPE] === gc.closeParenthesis
        )
          ((this.current.last.spaces.after = this.optionalSpace(t)), this.position++);
        else this.combinator();
      }),
      (e.prototype.string = function () {
        var t = this.currToken;
        (this.newNode(
          new g1t.default({ value: this.content(), source: N_e(t), sourceIndex: t[Da.FIELDS.START_POS] }),
        ),
          this.position++);
      }),
      (e.prototype.universal = function (t) {
        var r = this.nextToken;
        if (r && this.content(r) === "|") return (this.position++, this.namespace());
        var s = this.currToken;
        (this.newNode(
          new Doa.default({ value: this.content(), source: N_e(s), sourceIndex: s[Da.FIELDS.START_POS] }),
          t,
        ),
          this.position++);
      }),
      (e.prototype.splitWord = function (t, r) {
        var s = this,
          a = this.nextToken,
          H = this.content();
        while (a && ~[gc.dollar, gc.caret, gc.equals, gc.word].indexOf(a[Da.FIELDS.TYPE])) {
          this.position++;
          var u = this.content();
          if (((H += u), u.lastIndexOf("\\") === u.length - 1)) {
            var f = this.nextToken;
            if (f && f[Da.FIELDS.TYPE] === gc.space)
              ((H += this.requiredSpace(this.content(f))), this.position++);
          }
          a = this.nextToken;
        }
        var d = R_r(H, ".").filter(function (C) {
            var O = H[C - 1] === "\\",
              B = /^\d+\.\d+%$/.test(H);
            return !O && !B;
          }),
          _ = R_r(H, "#").filter(function (C) {
            return H[C - 1] !== "\\";
          }),
          L = R_r(H, "#{");
        if (L.length) {
          var I = new Set(L);
          _ = _.filter(function (C) {
            return !I.has(C);
          });
        }
        var D = new Set(d),
          S = new Set(_),
          T = (0, Moa.default)(Toa(oLi(oLi([0], sLi(d), !1), sLi(_), !1)));
        (T.forEach(function (C, O) {
          var B = T[O + 1] || H.length,
            V = H.slice(C, B);
          if (O === 0 && r) return r.call(s, V, T.length);
          var q,
            Z = s.currToken,
            se = Z[Da.FIELDS.START_POS] + T[O],
            ae = F_e(Z[1], Z[2] + C, Z[3], Z[2] + (B - 1));
          if (D.has(C)) {
            var z = { value: V.slice(1), source: ae, sourceIndex: se };
            q = new $oa.default(Pve(z, "value"));
          } else if (S.has(C)) {
            var Ae = { value: V.slice(1), source: ae, sourceIndex: se };
            q = new goa.default(Pve(Ae, "value"));
          } else {
            var le = { value: V, source: ae, sourceIndex: se };
            (Pve(le, "value"), (q = new Eoa.default(le)));
          }
          (s.newNode(q, t), (t = null));
        }),
          this.position++);
      }),
      (e.prototype.word = function (t) {
        var r = this.nextToken;
        if (r && this.content(r) === "|") return (this.position++, this.namespace());
        return this.splitWord(t);
      }),
      (e.prototype.loop = function () {
        while (this.position < this.tokens.length) this.parse(!0);
        return (this.flushPendingSpaces(), this.current._inferEndPosition(), this.root);
      }),
      (e.prototype.parse = function (t) {
        switch (this.currToken[Da.FIELDS.TYPE]) {
          case gc.space:
            this.space();
            break;
          case gc.comment:
            this.comment();
            break;
          case gc.openParenthesis:
            this.parentheses();
            break;
          case gc.closeParenthesis:
            if (t) this.missingParenthesis();
            break;
          case gc.openSquare:
            this.attribute();
            break;
          case gc.dollar:
          case gc.caret:
          case gc.equals:
          case gc.word:
            this.word();
            break;
          case gc.colon:
            this.pseudo();
            break;
          case gc.comma:
            this.comma();
            break;
          case gc.asterisk:
            this.universal();
            break;
          case gc.ampersand:
            this.nesting();
            break;
          case gc.slash:
          case gc.combinator:
            this.combinator();
            break;
          case gc.str:
            this.string();
            break;
          case gc.closeSquare:
            this.missingSquareBracket();
          case gc.semicolon:
            this.missingBackslash();
          default:
            this.unexpected();
        }
      }),
      (e.prototype.expected = function (t, r, s) {
        if (Array.isArray(t)) {
          var a = t.pop();
          t = "".concat(t.join(", "), " or ").concat(a);
        }
        var H = /^[aeiou]/.test(t[0]) ? "an" : "a";
        if (!s) return this.error("Expected ".concat(H, " ").concat(t, "."), { index: r });
        return this.error("Expected ".concat(H, " ").concat(t, ', found "').concat(s, '" instead.'), {
          index: r,
        });
      }),
      (e.prototype.requiredSpace = function (t) {
        return this.options.lossy ? " " : t;
      }),
      (e.prototype.optionalSpace = function (t) {
        return this.options.lossy ? "" : t;
      }),
      (e.prototype.lossySpace = function (t, r) {
        if (this.options.lossy) return r ? " " : "";
        else return t;
      }),
      (e.prototype.parseParenthesisToken = function (t) {
        var r = this.content(t);
        if (t[Da.FIELDS.TYPE] === gc.space) return this.requiredSpace(r);
        else return r;
      }),
      (e.prototype.newNode = function (t, r) {
        if (r) {
          if (/^ +$/.test(r)) {
            if (!this.options.lossy) this.spaces = (this.spaces || "") + r;
            r = !0;
          }
          ((t.namespace = r), Pve(t, "namespace"));
        }
        if (this.spaces) ((t.spaces.before = this.spaces), (this.spaces = ""));
        return this.current.append(t);
      }),
      (e.prototype.content = function (t) {
        if (t === void 0) t = this.currToken;
        return this.css.slice(t[Da.FIELDS.START_POS], t[Da.FIELDS.END_POS]);
      }),
      Object.defineProperty(e.prototype, "currToken", {
        get: function () {
          return this.tokens[this.position];
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, "nextToken", {
        get: function () {
          return this.tokens[this.position + 1];
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, "prevToken", {
        get: function () {
          return this.tokens[this.position - 1];
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.locateNextMeaningfulToken = function (t) {
        if (t === void 0) t = this.position + 1;
        var r = t;
        while (r < this.tokens.length)
          if (Soa[this.tokens[r][Da.FIELDS.TYPE]]) {
            r++;
            continue;
          } else return r;
        return -1;
      }),
      e
    );
  })();
  sb.default = voa;
});