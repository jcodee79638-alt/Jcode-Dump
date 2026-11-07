
var Ajn = Ie(function (Tuo, IVe) {
  var WY = gme(),
    Qbn = bxe(),
    ouo = Qvn(),
    Ybn = Pxe(),
    auo = EVe(),
    soe = Object.prototype.hasOwnProperty,
    m$t = 1,
    Zbn = 2,
    ejn = 3,
    _$t = 4,
    _ar = 1,
    Huo = 2,
    Vbn = 3,
    cuo =
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
    Auo = /[\x85\u2028\u2029]/,
    uuo = /[,\[\]\{\}]/,
    tjn = /^(?:!|!!|![a-z\-]+!)$/i,
    rjn = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function qbn(e) {
    return Object.prototype.toString.call(e);
  }
  function s5(e) {
    return e === 10 || e === 13;
  }
  function Dme(e) {
    return e === 9 || e === 32;
  }
  function Z6(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function Cxe(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function luo(e) {
    var t;
    if (48 <= e && e <= 57) return e - 48;
    if (((t = e | 32), 97 <= t && t <= 102)) return t - 97 + 10;
    return -1;
  }
  function fuo(e) {
    if (e === 120) return 2;
    if (e === 117) return 4;
    if (e === 85) return 8;
    return 0;
  }
  function puo(e) {
    if (48 <= e && e <= 57) return e - 48;
    return -1;
  }
  function Gbn(e) {
    return e === 48
      ? "\x00"
      : e === 97
        ? "\x07"
        : e === 98
          ? "\b"
          : e === 116
            ? "\t"
            : e === 9
              ? "\t"
              : e === 110
                ? `
`
                : e === 118
                  ? "\v"
                  : e === 102
                    ? "\f"
                    : e === 114
                      ? "\r"
                      : e === 101
                        ? "\x1B"
                        : e === 32
                          ? " "
                          : e === 34
                            ? '"'
                            : e === 47
                              ? "/"
                              : e === 92
                                ? "\\"
                                : e === 78
                                  ? "\x85"
                                  : e === 95
                                    ? "\xA0"
                                    : e === 76
                                      ? "\u2028"
                                      : e === 80
                                        ? "\u2029"
                                        : "";
  }
  function duo(e) {
    if (e <= 65535) return String.fromCharCode(e);
    return String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
  }
  function njn(e, t, r) {
    if (t === "__proto__")
      Object.defineProperty(e, t, { configurable: !0, enumerable: !0, writable: !0, value: r });
    else e[t] = r;
  }
  var ijn = Array(256),
    sjn = Array(256);
  for (noe = 0; noe < 256; noe++) ((ijn[noe] = Gbn(noe) ? 1 : 0), (sjn[noe] = Gbn(noe)));
  var noe;
  function muo(e, t) {
    ((this.input = e),
      (this.filename = t.filename || null),
      (this.schema = t.schema || auo),
      (this.onWarning = t.onWarning || null),
      (this.legacy = t.legacy || !1),
      (this.json = t.json || !1),
      (this.listener = t.listener || null),
      (this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys === "number" ? t.maxTotalMergeKeys : 1e4),
      (this.implicitTypes = this.schema.compiledImplicit),
      (this.typeMap = this.schema.compiledTypeMap),
      (this.length = e.length),
      (this.position = 0),
      (this.line = 0),
      (this.lineStart = 0),
      (this.lineIndent = 0),
      (this.totalMergeKeys = 0),
      (this.documents = []));
  }
  function ojn(e, t) {
    return new Qbn(t, new ouo(e.filename, e.input, e.position, e.line, e.position - e.lineStart));
  }
  function Al(e, t) {
    throw ojn(e, t);
  }
  function h$t(e, t) {
    if (e.onWarning) e.onWarning.call(null, ojn(e, t));
  }
  var Xbn = {
    YAML: function (t, r, s) {
      var a, H, u;
      if (t.version !== null) Al(t, "duplication of %YAML directive");
      if (s.length !== 1) Al(t, "YAML directive accepts exactly one argument");
      if (((a = /^([0-9]+)\.([0-9]+)$/.exec(s[0])), a === null))
        Al(t, "ill-formed argument of the YAML directive");
      if (((H = parseInt(a[1], 10)), (u = parseInt(a[2], 10)), H !== 1))
        Al(t, "unacceptable YAML version of the document");
      if (((t.version = s[0]), (t.checkLineBreaks = u < 2), u !== 1 && u !== 2))
        h$t(t, "unsupported YAML version of the document");
    },
    TAG: function (t, r, s) {
      var a, H;
      if (s.length !== 2) Al(t, "TAG directive accepts exactly two arguments");
      if (((a = s[0]), (H = s[1]), !tjn.test(a)))
        Al(t, "ill-formed tag handle (first argument) of the TAG directive");
      if (soe.call(t.tagMap, a)) Al(t, 'there is a previously declared suffix for "' + a + '" tag handle');
      if (!rjn.test(H)) Al(t, "ill-formed tag prefix (second argument) of the TAG directive");
      t.tagMap[a] = H;
    },
  };
  function ioe(e, t, r, s) {
    var a, H, u, f;
    if (t < r) {
      if (((f = e.input.slice(t, r)), s)) {
        for (a = 0, H = f.length; a < H; a += 1)
          if (((u = f.charCodeAt(a)), !(u === 9 || (32 <= u && u <= 1114111))))
            Al(e, "expected valid JSON character");
      } else if (cuo.test(f)) Al(e, "the stream contains non-printable characters");
      e.result += f;
    }
  }
  function Jbn(e) {
    if (((e.totalMergeKeys += 1), e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys))
      Al(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")");
  }
  function Kbn(e, t, r, s) {
    var a, H, u, f;
    if (!WY.isObject(r)) Al(e, "cannot merge mappings; the provided source object is unacceptable");
    (Jbn(e), (a = Object.keys(r)));
    for (u = 0, f = a.length; u < f; u += 1)
      if (((H = a[u]), Jbn(e), !soe.call(t, H))) (njn(t, H, r[H]), (s[H] = !0));
  }
  function wxe(e, t, r, s, a, H, u, f) {
    var d, _;
    if (Array.isArray(a)) {
      a = Array.prototype.slice.call(a);
      for (d = 0, _ = a.length; d < _; d += 1) {
        if (Array.isArray(a[d])) Al(e, "nested arrays are not supported inside keys");
        if (typeof a === "object" && qbn(a[d]) === "[object Object]") a[d] = "[object Object]";
      }
    }
    if (typeof a === "object" && qbn(a) === "[object Object]") a = "[object Object]";
    if (((a = String(a)), t === null)) t = {};
    if (s === "tag:yaml.org,2002:merge")
      if (Array.isArray(H)) {
        if (H.length > 100) Al(e, "abnormal merge sequence size");
        for (d = 0, _ = H.length; d < _; d += 1) Kbn(e, t, H[d], r);
      } else Kbn(e, t, H, r);
    else {
      if (!e.json && !soe.call(r, a) && soe.call(t, a))
        ((e.line = u || e.line), (e.position = f || e.position), Al(e, "duplicated mapping key"));
      (njn(t, a, H), delete r[a]);
    }
    return t;
  }
  function har(e) {
    var t = e.input.charCodeAt(e.position);
    if (t === 10) e.position++;
    else if (t === 13) {
      if ((e.position++, e.input.charCodeAt(e.position) === 10)) e.position++;
    } else Al(e, "a line break is expected");
    ((e.line += 1), (e.lineStart = e.position));
  }
  function T1(e, t, r) {
    var s = 0,
      a = e.input.charCodeAt(e.position);
    while (a !== 0) {
      while (Dme(a)) a = e.input.charCodeAt(++e.position);
      if (t && a === 35)
        do a = e.input.charCodeAt(++e.position);
        while (a !== 10 && a !== 13 && a !== 0);
      if (s5(a)) {
        (har(e), (a = e.input.charCodeAt(e.position)), s++, (e.lineIndent = 0));
        while (a === 32) (e.lineIndent++, (a = e.input.charCodeAt(++e.position)));
      } else break;
    }
    if (r !== -1 && s !== 0 && e.lineIndent < r) h$t(e, "deficient indentation");
    return s;
  }
  function L$t(e) {
    var t = e.position,
      r;
    if (
      ((r = e.input.charCodeAt(t)),
      (r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2))
    ) {
      if (((t += 3), (r = e.input.charCodeAt(t)), r === 0 || Z6(r))) return !0;
    }
    return !1;
  }
  function Lar(e, t) {
    if (t === 1) e.result += " ";
    else if (t > 1)
      e.result += WY.repeat(
        `
`,
        t - 1,
      );
  }
  function _uo(e, t, r) {
    var s,
      a,
      H,
      u,
      f,
      d,
      _,
      L,
      { kind: I, result: D } = e,
      S;
    if (
      ((S = e.input.charCodeAt(e.position)),
      Z6(S) ||
        Cxe(S) ||
        S === 35 ||
        S === 38 ||
        S === 42 ||
        S === 33 ||
        S === 124 ||
        S === 62 ||
        S === 39 ||
        S === 34 ||
        S === 37 ||
        S === 64 ||
        S === 96)
    )
      return !1;
    if (S === 63 || S === 45) {
      if (((a = e.input.charCodeAt(e.position + 1)), Z6(a) || (r && Cxe(a)))) return !1;
    }
    ((e.kind = "scalar"), (e.result = ""), (H = u = e.position), (f = !1));
    while (S !== 0) {
      if (S === 58) {
        if (((a = e.input.charCodeAt(e.position + 1)), Z6(a) || (r && Cxe(a)))) break;
      } else if (S === 35) {
        if (((s = e.input.charCodeAt(e.position - 1)), Z6(s))) break;
      } else if ((e.position === e.lineStart && L$t(e)) || (r && Cxe(S))) break;
      else if (s5(S))
        if (((d = e.line), (_ = e.lineStart), (L = e.lineIndent), T1(e, !1, -1), e.lineIndent >= t)) {
          ((f = !0), (S = e.input.charCodeAt(e.position)));
          continue;
        } else {
          ((e.position = u), (e.line = d), (e.lineStart = _), (e.lineIndent = L));
          break;
        }
      if (f) (ioe(e, H, u, !1), Lar(e, e.line - d), (H = u = e.position), (f = !1));
      if (!Dme(S)) u = e.position + 1;
      S = e.input.charCodeAt(++e.position);
    }
    if ((ioe(e, H, u, !1), e.result)) return !0;
    return ((e.kind = I), (e.result = D), !1);
  }
  function huo(e, t) {
    var r, s, a;
    if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
    ((e.kind = "scalar"), (e.result = ""), e.position++, (s = a = e.position));
    while ((r = e.input.charCodeAt(e.position)) !== 0)
      if (r === 39)
        if ((ioe(e, s, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
          ((s = e.position), e.position++, (a = e.position));
        else return !0;
      else if (s5(r)) (ioe(e, s, a, !0), Lar(e, T1(e, !1, t)), (s = a = e.position));
      else if (e.position === e.lineStart && L$t(e))
        Al(e, "unexpected end of the document within a single quoted scalar");
      else (e.position++, (a = e.position));
    Al(e, "unexpected end of the stream within a single quoted scalar");
  }
  function Luo(e, t) {
    var r, s, a, H, u, f;
    if (((f = e.input.charCodeAt(e.position)), f !== 34)) return !1;
    ((e.kind = "scalar"), (e.result = ""), e.position++, (r = s = e.position));
    while ((f = e.input.charCodeAt(e.position)) !== 0)
      if (f === 34) return (ioe(e, r, e.position, !0), e.position++, !0);
      else if (f === 92) {
        if ((ioe(e, r, e.position, !0), (f = e.input.charCodeAt(++e.position)), s5(f))) T1(e, !1, t);
        else if (f < 256 && ijn[f]) ((e.result += sjn[f]), e.position++);
        else if ((u = fuo(f)) > 0) {
          ((a = u), (H = 0));
          for (; a > 0; a--)
            if (((f = e.input.charCodeAt(++e.position)), (u = luo(f)) >= 0)) H = (H << 4) + u;
            else Al(e, "expected hexadecimal character");
          ((e.result += duo(H)), e.position++);
        } else Al(e, "unknown escape sequence");
        r = s = e.position;
      } else if (s5(f)) (ioe(e, r, s, !0), Lar(e, T1(e, !1, t)), (r = s = e.position));
      else if (e.position === e.lineStart && L$t(e))
        Al(e, "unexpected end of the document within a double quoted scalar");
      else (e.position++, (s = e.position));
    Al(e, "unexpected end of the stream within a double quoted scalar");
  }
  function $uo(e, t) {
    var r = !0,
      s,
      a = e.tag,
      H,
      u = e.anchor,
      f,
      d,
      _,
      L,
      I,
      D = {},
      S,
      T,
      C,
      O;
    if (((O = e.input.charCodeAt(e.position)), O === 91)) ((d = 93), (I = !1), (H = []));
    else if (O === 123) ((d = 125), (I = !0), (H = {}));
    else return !1;
    if (e.anchor !== null) e.anchorMap[e.anchor] = H;
    O = e.input.charCodeAt(++e.position);
    while (O !== 0) {
      if ((T1(e, !0, t), (O = e.input.charCodeAt(e.position)), O === d))
        return (
          e.position++,
          (e.tag = a),
          (e.anchor = u),
          (e.kind = I ? "mapping" : "sequence"),
          (e.result = H),
          !0
        );
      else if (!r) Al(e, "missed comma between flow collection entries");
      if (((T = S = C = null), (_ = L = !1), O === 63)) {
        if (((f = e.input.charCodeAt(e.position + 1)), Z6(f))) ((_ = L = !0), e.position++, T1(e, !0, t));
      }
      if (
        ((s = e.line),
        kxe(e, t, m$t, !1, !0),
        (T = e.tag),
        (S = e.result),
        T1(e, !0, t),
        (O = e.input.charCodeAt(e.position)),
        (L || e.line === s) && O === 58)
      )
        ((_ = !0),
          (O = e.input.charCodeAt(++e.position)),
          T1(e, !0, t),
          kxe(e, t, m$t, !1, !0),
          (C = e.result));
      if (I) wxe(e, H, D, T, S, C);
      else if (_) H.push(wxe(e, null, D, T, S, C));
      else H.push(S);
      if ((T1(e, !0, t), (O = e.input.charCodeAt(e.position)), O === 44))
        ((r = !0), (O = e.input.charCodeAt(++e.position)));
      else r = !1;
    }
    Al(e, "unexpected end of the stream within a flow collection");
  }
  function guo(e, t) {
    var r,
      s,
      a = _ar,
      H = !1,
      u = !1,
      f = t,
      d = 0,
      _ = !1,
      L,
      I;
    if (((I = e.input.charCodeAt(e.position)), I === 124)) s = !1;
    else if (I === 62) s = !0;
    else return !1;
    ((e.kind = "scalar"), (e.result = ""));
    while (I !== 0)
      if (((I = e.input.charCodeAt(++e.position)), I === 43 || I === 45))
        if (_ar === a) a = I === 43 ? Vbn : Huo;
        else Al(e, "repeat of a chomping mode identifier");
      else if ((L = puo(I)) >= 0)
        if (L === 0) Al(e, "bad explicit indentation width of a block scalar; it cannot be less than one");
        else if (!u) ((f = t + L - 1), (u = !0));
        else Al(e, "repeat of an indentation width identifier");
      else break;
    if (Dme(I)) {
      do I = e.input.charCodeAt(++e.position);
      while (Dme(I));
      if (I === 35)
        do I = e.input.charCodeAt(++e.position);
        while (!s5(I) && I !== 0);
    }
    while (I !== 0) {
      (har(e), (e.lineIndent = 0), (I = e.input.charCodeAt(e.position)));
      while ((!u || e.lineIndent < f) && I === 32) (e.lineIndent++, (I = e.input.charCodeAt(++e.position)));
      if (!u && e.lineIndent > f) f = e.lineIndent;
      if (s5(I)) {
        d++;
        continue;
      }
      if (e.lineIndent < f) {
        if (a === Vbn)
          e.result += WY.repeat(
            `
`,
            H ? 1 + d : d,
          );
        else if (a === _ar) {
          if (H)
            e.result += `
`;
        }
        break;
      }
      if (s)
        if (Dme(I))
          ((_ = !0),
            (e.result += WY.repeat(
              `
`,
              H ? 1 + d : d,
            )));
        else if (_)
          ((_ = !1),
            (e.result += WY.repeat(
              `
`,
              d + 1,
            )));
        else if (d === 0) {
          if (H) e.result += " ";
        } else
          e.result += WY.repeat(
            `
`,
            d,
          );
      else
        e.result += WY.repeat(
          `
`,
          H ? 1 + d : d,
        );
      ((H = !0), (u = !0), (d = 0), (r = e.position));
      while (!s5(I) && I !== 0) I = e.input.charCodeAt(++e.position);
      ioe(e, r, e.position, !1);
    }
    return !0;
  }
  function zbn(e, t) {
    var r,
      { tag: s, anchor: a } = e,
      H = [],
      u,
      f = !1,
      d;
    if (e.anchor !== null) e.anchorMap[e.anchor] = H;
    d = e.input.charCodeAt(e.position);
    while (d !== 0) {
      if (d !== 45) break;
      if (((u = e.input.charCodeAt(e.position + 1)), !Z6(u))) break;
      if (((f = !0), e.position++, T1(e, !0, -1))) {
        if (e.lineIndent <= t) {
          (H.push(null), (d = e.input.charCodeAt(e.position)));
          continue;
        }
      }
      if (
        ((r = e.line),
        kxe(e, t, ejn, !1, !0),
        H.push(e.result),
        T1(e, !0, -1),
        (d = e.input.charCodeAt(e.position)),
        (e.line === r || e.lineIndent > t) && d !== 0)
      )
        Al(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < t) break;
    }
    if (f) return ((e.tag = s), (e.anchor = a), (e.kind = "sequence"), (e.result = H), !0);
    return !1;
  }
  function Euo(e, t, r) {
    var s,
      a,
      H,
      u,
      { tag: f, anchor: d } = e,
      _ = {},
      L = {},
      I = null,
      D = null,
      S = null,
      T = !1,
      C = !1,
      O;
    if (e.anchor !== null) e.anchorMap[e.anchor] = _;
    O = e.input.charCodeAt(e.position);
    while (O !== 0) {
      if (
        ((s = e.input.charCodeAt(e.position + 1)),
        (H = e.line),
        (u = e.position),
        (O === 63 || O === 58) && Z6(s))
      ) {
        if (O === 63) {
          if (T) (wxe(e, _, L, I, D, null), (I = D = S = null));
          ((C = !0), (T = !0), (a = !0));
        } else if (T) ((T = !1), (a = !0));
        else
          Al(
            e,
            "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line",
          );
        ((e.position += 1), (O = s));
      } else if (kxe(e, r, Zbn, !1, !0))
        if (e.line === H) {
          O = e.input.charCodeAt(e.position);
          while (Dme(O)) O = e.input.charCodeAt(++e.position);
          if (O === 58) {
            if (((O = e.input.charCodeAt(++e.position)), !Z6(O)))
              Al(
                e,
                "a whitespace character is expected after the key-value separator within a block mapping",
              );
            if (T) (wxe(e, _, L, I, D, null), (I = D = S = null));
            ((C = !0), (T = !1), (a = !1), (I = e.tag), (D = e.result));
          } else if (C) Al(e, "can not read an implicit mapping pair; a colon is missed");
          else return ((e.tag = f), (e.anchor = d), !0);
        } else if (C) Al(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else return ((e.tag = f), (e.anchor = d), !0);
      else break;
      if (e.line === H || e.lineIndent > t) {
        if (kxe(e, t, _$t, !0, a))
          if (T) D = e.result;
          else S = e.result;
        if (!T) (wxe(e, _, L, I, D, S, H, u), (I = D = S = null));
        (T1(e, !0, -1), (O = e.input.charCodeAt(e.position)));
      }
      if (e.lineIndent > t && O !== 0) Al(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < t) break;
    }
    if (T) wxe(e, _, L, I, D, null);
    if (C) ((e.tag = f), (e.anchor = d), (e.kind = "mapping"), (e.result = _));
    return C;
  }
  function Iuo(e) {
    var t,
      r = !1,
      s = !1,
      a,
      H,
      u;
    if (((u = e.input.charCodeAt(e.position)), u !== 33)) return !1;
    if (e.tag !== null) Al(e, "duplication of a tag property");
    if (((u = e.input.charCodeAt(++e.position)), u === 60))
      ((r = !0), (u = e.input.charCodeAt(++e.position)));
    else if (u === 33) ((s = !0), (a = "!!"), (u = e.input.charCodeAt(++e.position)));
    else a = "!";
    if (((t = e.position), r)) {
      do u = e.input.charCodeAt(++e.position);
      while (u !== 0 && u !== 62);
      if (e.position < e.length) ((H = e.input.slice(t, e.position)), (u = e.input.charCodeAt(++e.position)));
      else Al(e, "unexpected end of the stream within a verbatim tag");
    } else {
      while (u !== 0 && !Z6(u)) {
        if (u === 33)
          if (!s) {
            if (((a = e.input.slice(t - 1, e.position + 1)), !tjn.test(a)))
              Al(e, "named tag handle cannot contain such characters");
            ((s = !0), (t = e.position + 1));
          } else Al(e, "tag suffix cannot contain exclamation marks");
        u = e.input.charCodeAt(++e.position);
      }
      if (((H = e.input.slice(t, e.position)), uuo.test(H)))
        Al(e, "tag suffix cannot contain flow indicator characters");
    }
    if (H && !rjn.test(H)) Al(e, "tag name cannot contain such characters: " + H);
    if (r) e.tag = H;
    else if (soe.call(e.tagMap, a)) e.tag = e.tagMap[a] + H;
    else if (a === "!") e.tag = "!" + H;
    else if (a === "!!") e.tag = "tag:yaml.org,2002:" + H;
    else Al(e, 'undeclared tag handle "' + a + '"');
    return !0;
  }
  function Duo(e) {
    var t, r;
    if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
    if (e.anchor !== null) Al(e, "duplication of an anchor property");
    ((r = e.input.charCodeAt(++e.position)), (t = e.position));
    while (r !== 0 && !Z6(r) && !Cxe(r)) r = e.input.charCodeAt(++e.position);
    if (e.position === t) Al(e, "name of an anchor node must contain at least one character");
    return ((e.anchor = e.input.slice(t, e.position)), !0);
  }
  function yuo(e) {
    var t, r, s;
    if (((s = e.input.charCodeAt(e.position)), s !== 42)) return !1;
    ((s = e.input.charCodeAt(++e.position)), (t = e.position));
    while (s !== 0 && !Z6(s) && !Cxe(s)) s = e.input.charCodeAt(++e.position);
    if (e.position === t) Al(e, "name of an alias node must contain at least one character");
    if (((r = e.input.slice(t, e.position)), !soe.call(e.anchorMap, r)))
      Al(e, 'unidentified alias "' + r + '"');
    return ((e.result = e.anchorMap[r]), T1(e, !0, -1), !0);
  }
  function kxe(e, t, r, s, a) {
    var H,
      u,
      f,
      d = 1,
      _ = !1,
      L = !1,
      I,
      D,
      S,
      T,
      C;
    if (e.listener !== null) e.listener("open", e);
    if (
      ((e.tag = null),
      (e.anchor = null),
      (e.kind = null),
      (e.result = null),
      (H = u = f = _$t === r || ejn === r),
      s)
    ) {
      if (T1(e, !0, -1)) {
        if (((_ = !0), e.lineIndent > t)) d = 1;
        else if (e.lineIndent === t) d = 0;
        else if (e.lineIndent < t) d = -1;
      }
    }
    if (d === 1)
      while (Iuo(e) || Duo(e))
        if (T1(e, !0, -1)) {
          if (((_ = !0), (f = H), e.lineIndent > t)) d = 1;
          else if (e.lineIndent === t) d = 0;
          else if (e.lineIndent < t) d = -1;
        } else f = !1;
    if (f) f = _ || a;
    if (d === 1 || _$t === r) {
      if (m$t === r || Zbn === r) T = t;
      else T = t + 1;
      if (((C = e.position - e.lineStart), d === 1))
        if ((f && (zbn(e, C) || Euo(e, C, T))) || $uo(e, T)) L = !0;
        else {
          if ((u && guo(e, T)) || huo(e, T) || Luo(e, T)) L = !0;
          else if (yuo(e)) {
            if (((L = !0), e.tag !== null || e.anchor !== null))
              Al(e, "alias node should not have any properties");
          } else if (_uo(e, T, m$t === r)) {
            if (((L = !0), e.tag === null)) e.tag = "?";
          }
          if (e.anchor !== null) e.anchorMap[e.anchor] = e.result;
        }
      else if (d === 0) L = f && zbn(e, C);
    }
    if (e.tag !== null && e.tag !== "!")
      if (e.tag === "?") {
        if (e.result !== null && e.kind !== "scalar")
          Al(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
        for (I = 0, D = e.implicitTypes.length; I < D; I += 1)
          if (((S = e.implicitTypes[I]), S.resolve(e.result))) {
            if (((e.result = S.construct(e.result)), (e.tag = S.tag), e.anchor !== null))
              e.anchorMap[e.anchor] = e.result;
            break;
          }
      } else if (soe.call(e.typeMap[e.kind || "fallback"], e.tag)) {
        if (((S = e.typeMap[e.kind || "fallback"][e.tag]), e.result !== null && S.kind !== e.kind))
          Al(
            e,
            "unacceptable node kind for !<" +
              e.tag +
              '> tag; it should be "' +
              S.kind +
              '", not "' +
              e.kind +
              '"',
          );
        if (!S.resolve(e.result)) Al(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
        else if (((e.result = S.construct(e.result)), e.anchor !== null)) e.anchorMap[e.anchor] = e.result;
      } else Al(e, "unknown tag !<" + e.tag + ">");
    if (e.listener !== null) e.listener("close", e);
    return e.tag !== null || e.anchor !== null || L;
  }
  function Muo(e) {
    var t = e.position,
      r,
      s,
      a,
      H = !1,
      u;
    ((e.version = null), (e.checkLineBreaks = e.legacy), (e.tagMap = {}), (e.anchorMap = {}));
    while ((u = e.input.charCodeAt(e.position)) !== 0) {
      if ((T1(e, !0, -1), (u = e.input.charCodeAt(e.position)), e.lineIndent > 0 || u !== 37)) break;
      ((H = !0), (u = e.input.charCodeAt(++e.position)), (r = e.position));
      while (u !== 0 && !Z6(u)) u = e.input.charCodeAt(++e.position);
      if (((s = e.input.slice(r, e.position)), (a = []), s.length < 1))
        Al(e, "directive name must not be less than one character in length");
      while (u !== 0) {
        while (Dme(u)) u = e.input.charCodeAt(++e.position);
        if (u === 35) {
          do u = e.input.charCodeAt(++e.position);
          while (u !== 0 && !s5(u));
          break;
        }
        if (s5(u)) break;
        r = e.position;
        while (u !== 0 && !Z6(u)) u = e.input.charCodeAt(++e.position);
        a.push(e.input.slice(r, e.position));
      }
      if (u !== 0) har(e);
      if (soe.call(Xbn, s)) Xbn[s](e, s, a);
      else h$t(e, 'unknown document directive "' + s + '"');
    }
    if (
      (T1(e, !0, -1),
      e.lineIndent === 0 &&
        e.input.charCodeAt(e.position) === 45 &&
        e.input.charCodeAt(e.position + 1) === 45 &&
        e.input.charCodeAt(e.position + 2) === 45)
    )
      ((e.position += 3), T1(e, !0, -1));
    else if (H) Al(e, "directives end mark is expected");
    if (
      (kxe(e, e.lineIndent - 1, _$t, !1, !0),
      T1(e, !0, -1),
      e.checkLineBreaks && Auo.test(e.input.slice(t, e.position)))
    )
      h$t(e, "non-ASCII line breaks are interpreted as content");
    if ((e.documents.push(e.result), e.position === e.lineStart && L$t(e))) {
      if (e.input.charCodeAt(e.position) === 46) ((e.position += 3), T1(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1) Al(e, "end of the stream or a document separator is expected");
    else return;
  }
  function ajn(e, t) {
    if (((e = String(e)), (t = t || {}), e.length !== 0)) {
      if (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13)
        e += `
`;
      if (e.charCodeAt(0) === 65279) e = e.slice(1);
    }
    var r = new muo(e, t),
      s = e.indexOf("\x00");
    if (s !== -1) ((r.position = s), Al(r, "null byte is not allowed in input"));
    r.input += "\x00";
    while (r.input.charCodeAt(r.position) === 32) ((r.lineIndent += 1), (r.position += 1));
    while (r.position < r.length - 1) Muo(r);
    return r.documents;
  }
  function Hjn(e, t, r) {
    if (t !== null && typeof t === "object" && typeof r > "u") ((r = t), (t = null));
    var s = ajn(e, r);
    if (typeof t !== "function") return s;
    for (var a = 0, H = s.length; a < H; a += 1) t(s[a]);
  }
  function cjn(e, t) {
    var r = ajn(e, t);
    if (r.length === 0) return;
    else if (r.length === 1) return r[0];
    throw new Qbn("expected a single document in the stream, but found more");
  }
  function xuo(e, t, r) {
    if (typeof t === "object" && t !== null && typeof r > "u") ((r = t), (t = null));
    return Hjn(e, t, WY.extend({ schema: Ybn }, r));
  }
  function Suo(e, t) {
    return cjn(e, WY.extend({ schema: Ybn }, t));
  }
  Tuo.loadAll = Hjn;
  Tuo.load = cjn;
  Tuo.safeLoadAll = xuo;
  Tuo.safeLoad = Suo;
});