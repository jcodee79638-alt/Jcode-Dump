
function Xie(e, t) {
  let r = _lt(e)?.toEquivalence;
  if (r) return r(UQ(e) ? e.typeParameters.map((s) => Xie(s, t)) : []);
  switch (e._tag) {
    case "Never":
      throw Zcn(`Unsupported AST ${e._tag}`, t);
    case "Declaration":
    case "Null":
    case "Undefined":
    case "Void":
    case "Unknown":
    case "Any":
    case "String":
    case "Number":
    case "Boolean":
    case "BigInt":
    case "Symbol":
    case "Literal":
    case "UniqueSymbol":
    case "ObjectKeyword":
    case "Enum":
    case "TemplateLiteral":
      return hp;
    case "Arrays": {
      let s = e.elements.map((u, f) => Xie(u, [...t, f])),
        a = e.elements.length,
        H = e.rest.map((u, f) => Xie(u, [...t, a + f]));
      return LW((u, f) => {
        if (!Array.isArray(u) || !Array.isArray(f)) return !1;
        let d = u.length;
        if (d !== f.length) return !1;
        let _ = 0;
        for (; _ < Math.min(d, e.elements.length); _++) if (!s[_](u[_], f[_])) return !1;
        if (H.length > 0) {
          let [L, ...I] = H;
          for (; _ < d - I.length; _++) if (!L(u[_], f[_])) return !1;
          for (let D = 0; D < I.length; D++) if (((_ += D), !I[D](u[_], f[_]))) return !1;
        }
        return !0;
      });
    }
    case "Objects": {
      if (e.propertySignatures.length === 0 && e.indexSignatures.length === 0) return hp;
      let s = e.propertySignatures.map((H) => Xie(H.type, [...t, H.name])),
        a = e.indexSignatures.map((H) => Xie(H.type, t));
      return LW((H, u) => {
        if (!Dv(H) || !Dv(u)) return !1;
        for (let f = 0; f < s.length; f++) {
          let d = e.propertySignatures[f],
            _ = d.name,
            L = Object.hasOwn(H, _),
            I = Object.hasOwn(u, _);
          if (h1(d.type)) {
            if (L !== I) return !1;
          }
          if (L && I && !s[f](H[_], u[_])) return !1;
        }
        for (let f = 0; f < a.length; f++) {
          let d = e.indexSignatures[f],
            _ = Kye(H, d.parameter),
            L = Kye(u, d.parameter);
          if (_.length !== L.length) return !1;
          for (let I = 0; I < _.length; I++) {
            let D = _[I];
            if (!Object.hasOwn(u, D) || !a[f](H[D], u[D])) return !1;
          }
        }
        return !0;
      });
    }
    case "Union":
      return LW((s, a) => {
        let H = Ult(s, e.types),
          u = H.map($1e);
        for (let f = 0; f < H.length; f++) {
          let d = u[f];
          if (d(s) && d(a)) return Xie(H[f], t)(s, a);
        }
        return !1;
      });
    case "Suspend": {
      let s = Nlt(() => Xie(e.thunk(), t));
      return LW((a, H) => s()(a, H));
    }
  }
}