
var Pjn = Ie(function (plo, Iar) {
  var yVe = gme(),
    MVe = bxe(),
    Cuo = EVe(),
    wuo = Pxe(),
    hjn = Object.prototype.toString,
    Ljn = Object.prototype.hasOwnProperty,
    kuo = 9,
    DVe = 10,
    Ouo = 13,
    Uuo = 32,
    Nuo = 33,
    Fuo = 34,
    $jn = 35,
    Buo = 37,
    Ruo = 38,
    Wuo = 39,
    Vuo = 42,
    gjn = 44,
    quo = 45,
    Ejn = 58,
    Guo = 61,
    Xuo = 62,
    Juo = 63,
    Kuo = 64,
    Ijn = 91,
    Djn = 93,
    zuo = 96,
    yjn = 123,
    Quo = 124,
    Mjn = 125,
    zj = {};
  zj[0] = "\\0";
  zj[7] = "\\a";
  zj[8] = "\\b";
  zj[9] = "\\t";
  zj[10] = "\\n";
  zj[11] = "\\v";
  zj[12] = "\\f";
  zj[13] = "\\r";
  zj[27] = "\\e";
  zj[34] = '\\"';
  zj[92] = "\\\\";
  zj[133] = "\\N";
  zj[160] = "\\_";
  zj[8232] = "\\L";
  zj[8233] = "\\P";
  var Yuo = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF",
  ];
  function Zuo(e, t) {
    var r, s, a, H, u, f, d;
    if (t === null) return {};
    ((r = {}), (s = Object.keys(t)));
    for (a = 0, H = s.length; a < H; a += 1) {
      if (((u = s[a]), (f = String(t[u])), u.slice(0, 2) === "!!")) u = "tag:yaml.org,2002:" + u.slice(2);
      if (((d = e.compiledTypeMap.fallback[u]), d && Ljn.call(d.styleAliases, f))) f = d.styleAliases[f];
      r[u] = f;
    }
    return r;
  }
  function ujn(e) {
    var t, r, s;
    if (((t = e.toString(16).toUpperCase()), e <= 255)) ((r = "x"), (s = 2));
    else if (e <= 65535) ((r = "u"), (s = 4));
    else if (e <= 4294967295) ((r = "U"), (s = 8));
    else throw new MVe("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + r + yVe.repeat("0", s - t.length) + t;
  }
  function elo(e) {
    ((this.schema = e.schema || Cuo),
      (this.indent = Math.max(1, e.indent || 2)),
      (this.noArrayIndent = e.noArrayIndent || !1),
      (this.skipInvalid = e.skipInvalid || !1),
      (this.flowLevel = yVe.isNothing(e.flowLevel) ? -1 : e.flowLevel),
      (this.styleMap = Zuo(this.schema, e.styles || null)),
      (this.sortKeys = e.sortKeys || !1),
      (this.lineWidth = e.lineWidth || 80),
      (this.noRefs = e.noRefs || !1),
      (this.noCompatMode = e.noCompatMode || !1),
      (this.condenseFlow = e.condenseFlow || !1),
      (this.implicitTypes = this.schema.compiledImplicit),
      (this.explicitTypes = this.schema.compiledExplicit),
      (this.tag = null),
      (this.result = ""),
      (this.duplicates = []),
      (this.usedDuplicates = null));
  }
  function ljn(e, t) {
    var r = yVe.repeat(" ", t),
      s = 0,
      a = -1,
      H = "",
      u,
      f = e.length;
    while (s < f) {
      if (
        ((a = e.indexOf(
          `
`,
          s,
        )),
        a === -1)
      )
        ((u = e.slice(s)), (s = f));
      else ((u = e.slice(s, a + 1)), (s = a + 1));
      if (
        u.length &&
        u !==
          `
`
      )
        H += r;
      H += u;
    }
    return H;
  }
  function $ar(e, t) {
    return (
      `
` + yVe.repeat(" ", e.indent * t)
    );
  }
  function tlo(e, t) {
    var r, s, a;
    for (r = 0, s = e.implicitTypes.length; r < s; r += 1)
      if (((a = e.implicitTypes[r]), a.resolve(t))) return !0;
    return !1;
  }
  function Ear(e) {
    return e === Uuo || e === kuo;
  }
  function Oxe(e) {
    return (
      (32 <= e && e <= 126) ||
      (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
      (57344 <= e && e <= 65533 && e !== 65279) ||
      (65536 <= e && e <= 1114111)
    );
  }
  function rlo(e) {
    return Oxe(e) && !Ear(e) && e !== 65279 && e !== Ouo && e !== DVe;
  }
  function fjn(e, t) {
    return (
      Oxe(e) &&
      e !== 65279 &&
      e !== gjn &&
      e !== Ijn &&
      e !== Djn &&
      e !== yjn &&
      e !== Mjn &&
      e !== Ejn &&
      (e !== $jn || (t && rlo(t)))
    );
  }
  function nlo(e) {
    return (
      Oxe(e) &&
      e !== 65279 &&
      !Ear(e) &&
      e !== quo &&
      e !== Juo &&
      e !== Ejn &&
      e !== gjn &&
      e !== Ijn &&
      e !== Djn &&
      e !== yjn &&
      e !== Mjn &&
      e !== $jn &&
      e !== Ruo &&
      e !== Vuo &&
      e !== Nuo &&
      e !== Quo &&
      e !== Guo &&
      e !== Xuo &&
      e !== Wuo &&
      e !== Fuo &&
      e !== Buo &&
      e !== Kuo &&
      e !== zuo
    );
  }
  function xjn(e) {
    var t = /^\n* /;
    return t.test(e);
  }
  var Sjn = 1,
    Tjn = 2,
    vjn = 3,
    bjn = 4,
    $$t = 5;
  function ilo(e, t, r, s, a) {
    var H,
      u,
      f,
      d = !1,
      _ = !1,
      L = s !== -1,
      I = -1,
      D = nlo(e.charCodeAt(0)) && !Ear(e.charCodeAt(e.length - 1));
    if (t)
      for (H = 0; H < e.length; H++) {
        if (((u = e.charCodeAt(H)), !Oxe(u))) return $$t;
        ((f = H > 0 ? e.charCodeAt(H - 1) : null), (D = D && fjn(u, f)));
      }
    else {
      for (H = 0; H < e.length; H++) {
        if (((u = e.charCodeAt(H)), u === DVe)) {
          if (((d = !0), L)) ((_ = _ || (H - I - 1 > s && e[I + 1] !== " ")), (I = H));
        } else if (!Oxe(u)) return $$t;
        ((f = H > 0 ? e.charCodeAt(H - 1) : null), (D = D && fjn(u, f)));
      }
      _ = _ || (L && H - I - 1 > s && e[I + 1] !== " ");
    }
    if (!d && !_) return D && !a(e) ? Sjn : Tjn;
    if (r > 9 && xjn(e)) return $$t;
    return _ ? bjn : vjn;
  }
  function slo(e, t, r, s) {
    e.dump = (function () {
      if (t.length === 0) return "''";
      if (!e.noCompatMode && Yuo.indexOf(t) !== -1) return "'" + t + "'";
      var a = e.indent * Math.max(1, r),
        H = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a),
        u = s || (e.flowLevel > -1 && r >= e.flowLevel);
      function f(d) {
        return tlo(e, d);
      }
      switch (ilo(t, u, e.indent, H, f)) {
        case Sjn:
          return t;
        case Tjn:
          return "'" + t.replace(/'/g, "''") + "'";
        case vjn:
          return "|" + pjn(t, e.indent) + djn(ljn(t, a));
        case bjn:
          return ">" + pjn(t, e.indent) + djn(ljn(olo(t, H), a));
        case $$t:
          return '"' + alo(t, H) + '"';
        default:
          throw new MVe("impossible error: invalid scalar style");
      }
    })();
  }
  function pjn(e, t) {
    var r = xjn(e) ? String(t) : "",
      s =
        e[e.length - 1] ===
        `
`,
      a =
        s &&
        (e[e.length - 2] ===
          `
` ||
          e ===
            `
`),
      H = a ? "+" : s ? "" : "-";
    return (
      r +
      H +
      `
`
    );
  }
  function djn(e) {
    return e[e.length - 1] ===
      `
`
      ? e.slice(0, -1)
      : e;
  }
  function olo(e, t) {
    var r = /(\n+)([^\n]*)/g,
      s = (function () {
        var _ = e.indexOf(`
`);
        return ((_ = _ !== -1 ? _ : e.length), (r.lastIndex = _), mjn(e.slice(0, _), t));
      })(),
      a =
        e[0] ===
          `
` || e[0] === " ",
      H,
      u;
    while ((u = r.exec(e))) {
      var f = u[1],
        d = u[2];
      ((H = d[0] === " "),
        (s +=
          f +
          (!a && !H && d !== ""
            ? `
`
            : "") +
          mjn(d, t)),
        (a = H));
    }
    return s;
  }
  function mjn(e, t) {
    if (e === "" || e[0] === " ") return e;
    var r = / [^ ]/g,
      s,
      a = 0,
      H,
      u = 0,
      f = 0,
      d = "";
    while ((s = r.exec(e))) {
      if (((f = s.index), f - a > t))
        ((H = u > a ? u : f),
          (d +=
            `
` + e.slice(a, H)),
          (a = H + 1));
      u = f;
    }
    if (
      ((d += `
`),
      e.length - a > t && u > a)
    )
      d +=
        e.slice(a, u) +
        `
` +
        e.slice(u + 1);
    else d += e.slice(a);
    return d.slice(1);
  }
  function alo(e) {
    var t = "",
      r,
      s,
      a;
    for (var H = 0; H < e.length; H++) {
      if (((r = e.charCodeAt(H)), r >= 55296 && r <= 56319)) {
        if (((s = e.charCodeAt(H + 1)), s >= 56320 && s <= 57343)) {
          ((t += ujn((r - 55296) * 1024 + s - 56320 + 65536)), H++);
          continue;
        }
      }
      ((a = zj[r]), (t += !a && Oxe(r) ? e[H] : a || ujn(r)));
    }
    return t;
  }
  function Hlo(e, t, r) {
    var s = "",
      a = e.tag,
      H,
      u;
    for (H = 0, u = r.length; H < u; H += 1)
      if (yme(e, t, r[H], !1, !1)) {
        if (H !== 0) s += "," + (!e.condenseFlow ? " " : "");
        s += e.dump;
      }
    ((e.tag = a), (e.dump = "[" + s + "]"));
  }
  function clo(e, t, r, s) {
    var a = "",
      H = e.tag,
      u,
      f;
    for (u = 0, f = r.length; u < f; u += 1)
      if (yme(e, t + 1, r[u], !0, !0)) {
        if (!s || u !== 0) a += $ar(e, t);
        if (e.dump && DVe === e.dump.charCodeAt(0)) a += "-";
        else a += "- ";
        a += e.dump;
      }
    ((e.tag = H), (e.dump = a || "[]"));
  }
  function Alo(e, t, r) {
    var s = "",
      a = e.tag,
      H = Object.keys(r),
      u,
      f,
      d,
      _,
      L;
    for (u = 0, f = H.length; u < f; u += 1) {
      if (((L = ""), u !== 0)) L += ", ";
      if (e.condenseFlow) L += '"';
      if (((d = H[u]), (_ = r[d]), !yme(e, t, d, !1, !1))) continue;
      if (e.dump.length > 1024) L += "? ";
      if (
        ((L += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
        !yme(e, t, _, !1, !1))
      )
        continue;
      ((L += e.dump), (s += L));
    }
    ((e.tag = a), (e.dump = "{" + s + "}"));
  }
  function ulo(e, t, r, s) {
    var a = "",
      H = e.tag,
      u = Object.keys(r),
      f,
      d,
      _,
      L,
      I,
      D;
    if (e.sortKeys === !0) u.sort();
    else if (typeof e.sortKeys === "function") u.sort(e.sortKeys);
    else if (e.sortKeys) throw new MVe("sortKeys must be a boolean or a function");
    for (f = 0, d = u.length; f < d; f += 1) {
      if (((D = ""), !s || f !== 0)) D += $ar(e, t);
      if (((_ = u[f]), (L = r[_]), !yme(e, t + 1, _, !0, !0, !0))) continue;
      if (((I = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)), I))
        if (e.dump && DVe === e.dump.charCodeAt(0)) D += "?";
        else D += "? ";
      if (((D += e.dump), I)) D += $ar(e, t);
      if (!yme(e, t + 1, L, !0, I)) continue;
      if (e.dump && DVe === e.dump.charCodeAt(0)) D += ":";
      else D += ": ";
      ((D += e.dump), (a += D));
    }
    ((e.tag = H), (e.dump = a || "{}"));
  }
  function _jn(e, t, r) {
    var s, a, H, u, f, d;
    a = r ? e.explicitTypes : e.implicitTypes;
    for (H = 0, u = a.length; H < u; H += 1)
      if (
        ((f = a[H]),
        (f.instanceOf || f.predicate) &&
          (!f.instanceOf || (typeof t === "object" && t instanceof f.instanceOf)) &&
          (!f.predicate || f.predicate(t)))
      ) {
        if (((e.tag = r ? f.tag : "?"), f.represent)) {
          if (((d = e.styleMap[f.tag] || f.defaultStyle), hjn.call(f.represent) === "[object Function]"))
            s = f.represent(t, d);
          else if (Ljn.call(f.represent, d)) s = f.represent[d](t, d);
          else throw new MVe("!<" + f.tag + '> tag resolver accepts not "' + d + '" style');
          e.dump = s;
        }
        return !0;
      }
    return !1;
  }
  function yme(e, t, r, s, a, H) {
    if (((e.tag = null), (e.dump = r), !_jn(e, r, !1))) _jn(e, r, !0);
    var u = hjn.call(e.dump);
    if (s) s = e.flowLevel < 0 || e.flowLevel > t;
    var f = u === "[object Object]" || u === "[object Array]",
      d,
      _;
    if (f) ((d = e.duplicates.indexOf(r)), (_ = d !== -1));
    if ((e.tag !== null && e.tag !== "?") || _ || (e.indent !== 2 && t > 0)) a = !1;
    if (_ && e.usedDuplicates[d]) e.dump = "*ref_" + d;
    else {
      if (f && _ && !e.usedDuplicates[d]) e.usedDuplicates[d] = !0;
      if (u === "[object Object]") {
        if (s && Object.keys(e.dump).length !== 0) {
          if ((ulo(e, t, e.dump, a), _)) e.dump = "&ref_" + d + e.dump;
        } else if ((Alo(e, t, e.dump), _)) e.dump = "&ref_" + d + " " + e.dump;
      } else if (u === "[object Array]") {
        var L = e.noArrayIndent && t > 0 ? t - 1 : t;
        if (s && e.dump.length !== 0) {
          if ((clo(e, L, e.dump, a), _)) e.dump = "&ref_" + d + e.dump;
        } else if ((Hlo(e, L, e.dump), _)) e.dump = "&ref_" + d + " " + e.dump;
      } else if (u === "[object String]") {
        if (e.tag !== "?") slo(e, e.dump, t, H);
      } else {
        if (e.skipInvalid) return !1;
        throw new MVe("unacceptable kind of an object to dump " + u);
      }
      if (e.tag !== null && e.tag !== "?") e.dump = "!<" + e.tag + "> " + e.dump;
    }
    return !0;
  }
  function llo(e, t) {
    var r = [],
      s = [],
      a,
      H;
    gar(e, r, s);
    for (a = 0, H = s.length; a < H; a += 1) t.duplicates.push(r[s[a]]);
    t.usedDuplicates = Array(H);
  }
  function gar(e, t, r) {
    var s, a, H;
    if (e !== null && typeof e === "object")
      if (((a = t.indexOf(e)), a !== -1)) {
        if (r.indexOf(a) === -1) r.push(a);
      } else if ((t.push(e), Array.isArray(e))) for (a = 0, H = e.length; a < H; a += 1) gar(e[a], t, r);
      else {
        s = Object.keys(e);
        for (a = 0, H = s.length; a < H; a += 1) gar(e[s[a]], t, r);
      }
  }
  function jjn(e, t) {
    t = t || {};
    var r = new elo(t);
    if (!r.noRefs) llo(e, r);
    if (yme(r, 0, e, !0, !0))
      return (
        r.dump +
        `
`
      );
    return "";
  }
  function flo(e, t) {
    return jjn(e, yVe.extend({ schema: wuo }, t));
  }
  plo.dump = jjn;
  plo.safeDump = flo;
});