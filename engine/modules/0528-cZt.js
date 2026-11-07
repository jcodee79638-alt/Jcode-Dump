
function cZt(e) {
  let t = {},
    r = new Map(),
    s = new Set(),
    a = new Set();
  return { representations: jv(e, (I) => f(I)), references: t };
  function u(I) {
    let D = I,
      S = 0;
    while (s.has(D)) D = `${I}${++S}`;
    return (s.add(D), D);
  }
  function f(I, D) {
    let S = r.get(I);
    if (S !== void 0) return { _tag: "Reference", $ref: S };
    let T = Ppe(I),
      C = uBe(I) ?? D;
    if (I !== T) return f(T, C);
    if (C !== void 0) {
      let V = u(C);
      r.set(I, V);
      let q = _(I),
        Z = t[C];
      if (Z !== void 0 && hp(q, Z)) return (r.set(I, C), { _tag: "Reference", $ref: C });
      return ((t[V] = q), { _tag: "Reference", $ref: V });
    }
    if (a.has(I)) {
      let V = u(`${I._tag}_`);
      return (r.set(I, V), { _tag: "Reference", $ref: V });
    }
    a.add(I);
    let O = _(I);
    a.delete(I);
    let B = r.get(I);
    if (B !== void 0) return ((t[B] = O), { _tag: "Reference", $ref: B });
    return O;
  }
  function d(I) {
    let D = I.annotations?.toCodecJson ?? I.annotations?.toCodec;
    if (Fq(D)) {
      let S = I.typeParameters.map((C) => E1e(ME(C))),
        T = D(S);
      return x$(I, [T]);
    }
    return Jye;
  }
  function _(I) {
    let D = aRe(I.annotations);
    switch (I._tag) {
      case "Declaration": {
        let S = f(d(I));
        return {
          _tag: "Declaration",
          typeParameters: I.typeParameters.map((T) => f(T)),
          encodedSchema: S,
          checks: L(I.checks),
          ...D,
        };
      }
      case "Null":
      case "Undefined":
      case "Void":
      case "Never":
      case "Unknown":
      case "Any":
      case "Boolean":
      case "Symbol":
        return { _tag: I._tag, ...D };
      case "String": {
        let S = I.annotations?.contentMediaType,
          T = I.annotations?.contentSchema;
        return {
          _tag: I._tag,
          checks: L(I.checks),
          ...D,
          ...(typeof S === "string" && ian(T) ? { contentSchema: f(T) } : void 0),
        };
      }
      case "Number":
      case "BigInt":
        return { _tag: I._tag, checks: L(I.checks), ...D };
      case "Literal":
        return { _tag: I._tag, literal: I.literal, ...D };
      case "UniqueSymbol":
        return { _tag: I._tag, symbol: I.symbol, ...D };
      case "ObjectKeyword":
        return { _tag: I._tag, ...D };
      case "Enum":
        return { _tag: I._tag, enums: I.enums, ...D };
      case "TemplateLiteral":
        return { _tag: I._tag, parts: I.parts.map((S) => f(S)), ...D };
      case "Arrays":
        return {
          _tag: I._tag,
          elements: I.elements.map((S) => {
            let T = Ppe(S);
            return { isOptional: h1(T), type: f(S), ...aRe(T.context?.annotations) };
          }),
          rest: I.rest.map((S) => f(S)),
          checks: L(I.checks),
          ...D,
        };
      case "Objects":
        return {
          _tag: I._tag,
          propertySignatures: I.propertySignatures.map((S) => {
            let T = Ppe(S.type);
            return {
              name: S.name,
              type: f(S.type),
              isOptional: h1(T),
              isMutable: jan(T),
              ...aRe(T.context?.annotations),
            };
          }),
          indexSignatures: I.indexSignatures.map((S) => ({ parameter: f(S.parameter), type: f(S.type) })),
          checks: L(I.checks),
          ...D,
        };
      case "Union": {
        let S = wft(I.types);
        return { _tag: I._tag, types: S.map((T) => f(T)), mode: I.mode, ...D };
      }
      case "Suspend":
        return { _tag: "Suspend", checks: [], thunk: f(I.thunk()), ...D };
    }
  }
  function L(I) {
    if (!I) return [];
    return I.map(D).filter((S) => S !== void 0);
    function D(S) {
      switch (S._tag) {
        case "Filter": {
          let T = S.annotations?.meta;
          if (T)
            return {
              _tag: "Filter",
              meta:
                T._tag === "isPropertyNames"
                  ? { _tag: "isPropertyNames", propertyNames: f(T.propertyNames) }
                  : T,
              ...aRe(S.annotations),
            };
          return;
        }
        case "FilterGroup": {
          let T = L(S.checks);
          if (TS(T)) return { _tag: "FilterGroup", checks: T, ...aRe(S.annotations) };
        }
      }
    }
  }
}