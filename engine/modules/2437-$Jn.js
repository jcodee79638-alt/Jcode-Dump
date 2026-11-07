
var $Jn = Ie(function (Ncc, LJn) {
  var M0t = aJn(),
    _g = oAr(),
    CCo = HAr(),
    pJn = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    dJn = (e, { types: t, dynamicTypes: r }) => {
      let s = pJn(t, e),
        a = t[e];
      if (!s && typeof r === "function") {
        let H = r(e);
        if (H !== void 0) ((a = H), (s = !0));
      }
      return [s, a];
    },
    LSe = (e, t) => t && e === t,
    _5 = (e, t) => t && e.indexOf(t) !== -1,
    wCo = (e, t) => t && !_5(e, t);
  function kCo(
    e,
    {
      types: t,
      shorthands: r,
      typeDefs: s,
      invalidHandler: a,
      unknownHandler: H,
      abbrevHandler: u,
      typeDefault: f,
      dynamicTypes: d,
    } = {},
  ) {
    _g(t, r, e, s);
    let _ = {},
      L = { remain: [], cooked: e, original: e.slice(0) };
    return (
      _Jn(e, _, L.remain, {
        typeDefs: s,
        types: t,
        dynamicTypes: d,
        shorthands: r,
        unknownHandler: H,
        abbrevHandler: u,
      }),
      mJn(_, { types: t, dynamicTypes: d, typeDefs: s, invalidHandler: a, typeDefault: f }),
      (_.argv = L),
      Object.defineProperty(_.argv, "toString", {
        value: function () {
          return this.original.map(JSON.stringify).join(" ");
        },
        enumerable: !1,
      }),
      _
    );
  }
  function mJn(
    e,
    { types: t = {}, typeDefs: r = {}, dynamicTypes: s, invalidHandler: a, typeDefault: H } = {},
  ) {
    let u = r.String?.type,
      f = r.Number?.type,
      d = r.Array?.type,
      _ = r.Boolean?.type,
      L = r.Date?.type,
      I = typeof H < "u";
    if (!I) {
      if (((H = [!1, !0, null]), u)) H.push(u);
      if (d) H.push(d);
    }
    let D = {};
    Object.keys(e).forEach((S) => {
      if (S === "argv") return;
      let T = e[S];
      _g("val=%j", T);
      let C = Array.isArray(T),
        [O, B] = dJn(S, { types: t, dynamicTypes: s }),
        V = B;
      if (!C) T = [T];
      if (!V) V = H;
      if (LSe(V, d)) V = H.concat(d);
      if (!Array.isArray(V)) V = [V];
      if (
        (_g("val=%j", T),
        _g("types=", V),
        (T = T.map((q) => {
          if (typeof q === "string") {
            if (
              (_g("string %j", q),
              (q = q.trim()),
              (q === "null" && ~V.indexOf(null)) ||
                (q === "true" && (~V.indexOf(!0) || _5(V, _))) ||
                (q === "false" && (~V.indexOf(!1) || _5(V, _))))
            )
              ((q = JSON.parse(q)), _g("jsonable %j", q));
            else if (_5(V, f) && !isNaN(q)) (_g("convert to number", q), (q = +q));
            else if (_5(V, L) && !isNaN(Date.parse(q))) (_g("convert to date", q), (q = new Date(q)));
          }
          if (!O) {
            if (!I) return q;
            B = H;
          }
          if (q === !1 && ~V.indexOf(null) && !(~V.indexOf(!1) || _5(V, _))) q = null;
          let Z = {};
          if (((Z[S] = q), _g("prevalidated val", Z, q, B), !cAr(Z, S, q, B, { typeDefs: r }))) {
            if (a) a(S, q, B, e);
            else if (a !== !1) _g("invalid: " + S + "=" + q, B);
            return D;
          }
          return (_g("validated v", Z, q, B), Z[S]);
        }).filter((q) => q !== D)),
        !T.length && wCo(V, d))
      )
        (_g("VAL HAS NO LENGTH, DELETE IT", T, S, V.indexOf(d)), delete e[S]);
      else if (C) (_g(C, e[S], T), (e[S] = T));
      else e[S] = T[0];
      _g("k=%s val=%j", S, T, e[S]);
    });
  }
  function cAr(e, t, r, s, { typeDefs: a } = {}) {
    let H = a?.Array?.type;
    if (Array.isArray(s)) {
      for (let d = 0, _ = s.length; d < _; d++) {
        if (LSe(s[d], H)) continue;
        if (cAr(e, t, r, s[d], { typeDefs: a })) return !0;
      }
      return (delete e[t], !1);
    }
    if (LSe(s, H)) return !0;
    if (s !== s) return (_g("Poison NaN", t, r, s), delete e[t], !1);
    if (r === s) return (_g("Explicitly allowed %j", r), (e[t] = r), !0);
    let u = !1,
      f = Object.keys(a);
    for (let d = 0, _ = f.length; d < _; d++) {
      _g("test type %j %j %j", t, r, f[d]);
      let L = a[f[d]];
      if (L && (s && s.name && L.type && L.type.name ? s.name === L.type.name : s === L.type)) {
        let I = {};
        if (((u = L.validate(I, t, r) !== !1), (r = I[t]), u)) {
          e[t] = r;
          break;
        }
      }
    }
    if ((_g("OK? %j (%j %j %j)", u, t, r, f[f.length - 1]), !u)) delete e[t];
    return u;
  }
  function _Jn(
    e,
    t,
    r,
    {
      types: s = {},
      typeDefs: a = {},
      shorthands: H = {},
      dynamicTypes: u,
      unknownHandler: f,
      abbrevHandler: d,
    } = {},
  ) {
    let _ = a.String?.type,
      L = a.Number?.type,
      I = a.Array?.type,
      D = a.Boolean?.type;
    _g("parse", e, t, r);
    let S = M0t(Object.keys(s));
    _g("abbrevs=%j", S);
    let T = M0t(Object.keys(H));
    for (let C = 0; C < e.length; C++) {
      let O = e[C];
      if ((_g("arg", O), O.match(/^-{2,}$/))) {
        (r.push.apply(r, e.slice(C + 1)), (e[C] = "--"));
        break;
      }
      let B = !1;
      if (O.charAt(0) === "-" && O.length > 1) {
        let V = O.indexOf("=");
        if (V > -1) {
          B = !0;
          let Lt = O.slice(V + 1);
          ((O = O.slice(0, V)), e.splice(C, 1, O, Lt));
        }
        let q = hJn(O, T, S, { shorthands: H, abbrevHandler: d });
        if ((_g("arg=%j shRes=%j", O, q), q)) {
          if ((e.splice.apply(e, [C, 1].concat(q)), O !== q[0])) {
            C--;
            continue;
          }
        }
        O = O.replace(/^-+/, "");
        let Z = null;
        while (O.toLowerCase().indexOf("no-") === 0) ((Z = !Z), (O = O.slice(3)));
        if (S[O] && S[O] !== O) {
          if (d) d(O, S[O]);
          else if (d !== !1) _g(`abbrev: ${O} -> ${S[O]}`);
          O = S[O];
        }
        let [se, ae] = dJn(O, { types: s, dynamicTypes: u }),
          z = Array.isArray(ae);
        if (z && ae.length === 1) ((z = !1), (ae = ae[0]));
        let Ae = LSe(ae, I) || (z && _5(ae, I));
        if (!se && pJn(t, O)) {
          if (!Array.isArray(t[O])) t[O] = [t[O]];
          Ae = !0;
        }
        let le,
          Be = e[C + 1],
          Te =
            typeof Z === "boolean" ||
            LSe(ae, D) ||
            (z && _5(ae, D)) ||
            (typeof ae > "u" && !B) ||
            (Be === "false" && (ae === null || (z && ~ae.indexOf(null))));
        if (typeof ae > "u") {
          let Lt = !B && Be && !Be?.startsWith("-") && !["true", "false"].includes(Be);
          if (f)
            if (Lt) f(O, Be);
            else f(O);
          else if (f !== !1) {
            if ((_g(`unknown: ${O}`), Lt)) _g(`unknown: ${Be} parsed as normal opt`);
          }
        }
        if (Te) {
          if (((le = !Z), Be === "true" || Be === "false")) {
            if (((le = JSON.parse(Be)), (Be = null), Z)) le = !le;
            C++;
          }
          if (z && Be) {
            if (~ae.indexOf(Be)) ((le = Be), C++);
            else if (Be === "null" && ~ae.indexOf(null)) ((le = null), C++);
            else if (!Be.match(/^-{2,}[^-]/) && !isNaN(Be) && _5(ae, L)) ((le = +Be), C++);
            else if (!Be.match(/^-[^-]/) && _5(ae, _)) ((le = Be), C++);
          }
          if (Ae) (t[O] = t[O] || []).push(le);
          else t[O] = le;
          continue;
        }
        if (LSe(ae, _)) {
          if (Be === void 0) Be = "";
          else if (Be.match(/^-{1,2}[^-]+/)) ((Be = ""), C--);
        }
        if (Be && Be.match(/^-{2,}$/)) ((Be = void 0), C--);
        if (((le = Be === void 0 ? !0 : Be), Ae)) (t[O] = t[O] || []).push(le);
        else t[O] = le;
        C++;
        continue;
      }
      r.push(O);
    }
  }
  var fJn = Symbol("singles"),
    OCo = (e, t) => {
      let r = t[fJn];
      if (!r)
        ((r = Object.keys(t)
          .filter((a) => a.length === 1)
          .reduce((a, H) => ((a[H] = !0), a), {})),
          (t[fJn] = r),
          _g("shorthand singles", r));
      let s = e.split("").filter((a) => r[a]);
      return s.join("") === e ? s : null;
    };
  function hJn(e, ...t) {
    let { abbrevHandler: r, types: s = {}, shorthands: a = {} } = t.length ? t.pop() : {},
      H = t[0] ?? M0t(Object.keys(a)),
      u = t[1] ?? M0t(Object.keys(s));
    if (((e = e.replace(/^-+/, "")), u[e] === e)) return null;
    if (a[e]) {
      if (a[e] && !Array.isArray(a[e])) a[e] = a[e].split(/\s+/);
      return a[e];
    }
    let f = OCo(e, a);
    if (f) return f.map((d) => a[d]).reduce((d, _) => d.concat(_), []);
    if (u[e] && !a[e]) return null;
    if (H[e]) {
      if (r) r(e, H[e]);
      else if (r !== !1) _g(`abbrev: ${e} -> ${H[e]}`);
      e = H[e];
    }
    if (a[e] && !Array.isArray(a[e])) a[e] = a[e].split(/\s+/);
    return a[e];
  }
  LJn.exports = { nopt: kCo, clean: mJn, parse: _Jn, validate: cAr, resolveShort: hJn, typeDefs: CCo };
});