
var wXe = Ie(function (KNi) {
  Object.defineProperty(KNi, "__esModule", { value: !0 });
  KNi.getSchemaRefs =
    KNi.resolveUrl =
    KNi.normalizeId =
    KNi._getFullPath =
    KNi.getFullPath =
    KNi.inlineRef =
      void 0;
  var qNi = x_(),
    s6a = P1r(),
    o6a = VNi(),
    a6a = new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const",
    ]);
  function H6a(e, t = !0) {
    if (typeof e == "boolean") return !0;
    if (t === !0) return !C1r(e);
    if (!t) return !1;
    return GNi(e) <= t;
  }
  KNi.inlineRef = H6a;
  var c6a = new Set(["$ref", "$recursiveRef", "$recursiveAnchor", "$dynamicRef", "$dynamicAnchor"]);
  function C1r(e) {
    for (let t in e) {
      if (c6a.has(t)) return !0;
      let r = e[t];
      if (Array.isArray(r) && r.some(C1r)) return !0;
      if (typeof r == "object" && C1r(r)) return !0;
    }
    return !1;
  }
  function GNi(e) {
    let t = 0;
    for (let r in e) {
      if (r === "$ref") return 1 / 0;
      if ((t++, a6a.has(r))) continue;
      if (typeof e[r] == "object") qNi.eachItem(e[r], (s) => (t += GNi(s)));
      if (t === 1 / 0) return 1 / 0;
    }
    return t;
  }
  function XNi(e, t = "", r) {
    if (r !== !1) t = wje(t);
    let s = e.parse(t);
    return JNi(e, s);
  }
  KNi.getFullPath = XNi;
  function JNi(e, t) {
    return e.serialize(t).split("#")[0] + "#";
  }
  KNi._getFullPath = JNi;
  var A6a = /#\/?$/;
  function wje(e) {
    return e ? e.replace(A6a, "") : "";
  }
  KNi.normalizeId = wje;
  function u6a(e, t, r) {
    return ((r = wje(r)), e.resolve(t, r));
  }
  KNi.resolveUrl = u6a;
  var l6a = /^[a-z_][-a-z0-9._]*$/i;
  function f6a(e, t) {
    if (typeof e == "boolean") return {};
    let { schemaId: r, uriResolver: s } = this.opts,
      a = wje(e[r] || t),
      H = { "": a },
      u = XNi(s, a, !1),
      f = {},
      d = new Set();
    return (
      o6a(e, { allKeys: !0 }, (I, D, S, T) => {
        if (T === void 0) return;
        let C = u + D,
          O = H[T];
        if (typeof I[r] == "string") O = B.call(this, I[r]);
        (V.call(this, I.$anchor), V.call(this, I.$dynamicAnchor), (H[D] = O));
        function B(q) {
          let Z = this.opts.uriResolver.resolve;
          if (((q = wje(O ? Z(O, q) : q)), d.has(q))) throw L(q);
          d.add(q);
          let se = this.refs[q];
          if (typeof se == "string") se = this.refs[se];
          if (typeof se == "object") _(I, se.schema, q);
          else if (q !== wje(C))
            if (q[0] === "#") (_(I, f[q], q), (f[q] = I));
            else this.refs[q] = C;
          return q;
        }
        function V(q) {
          if (typeof q == "string") {
            if (!l6a.test(q)) throw Error(`invalid anchor "${q}"`);
            B.call(this, `#${q}`);
          }
        }
      }),
      f
    );
    function _(I, D, S) {
      if (D !== void 0 && !s6a(I, D)) throw L(S);
    }
    function L(I) {
      return Error(`reference "${I}" resolves to more than one schema`);
    }
  }
  KNi.getSchemaRefs = f6a;
});