
function lZt(e, t) {
  let r = t?.generateDescriptions ?? !1,
    s = t?.additionalProperties ?? !1,
    a = t?.includeAnnotationKey,
    H = vv(e.references, (S) => u(S));
  return { dialect: "draft-2020-12", schemas: jv(e.representations, (S) => u(S)), definitions: H };
  function u(S) {
    let T = f(S);
    if ("annotations" in S) {
      let C = _(S.annotations);
      if (C) T = { ...T, ...C };
    }
    if ("checks" in S) {
      let C = L(S.checks, T.type);
      for (let O of C) T = oZt(T, O);
    }
    return T;
  }
  function f(S) {
    switch (S._tag) {
      case "Any":
      case "Unknown":
        return {};
      case "ObjectKeyword":
        return { anyOf: [{ type: "object" }, { type: "array" }] };
      case "Void":
      case "Undefined":
        return { type: "null" };
      case "BigInt":
        return { type: "string", allOf: [{ pattern: "^-?\\d+$" }] };
      case "Symbol":
      case "UniqueSymbol":
        return { type: "string", allOf: [{ pattern: "^Symbol\\((.*)\\)$" }] };
      case "Declaration":
        return u(S.encodedSchema);
      case "Suspend":
        return u(S.thunk);
      case "Reference":
        return { $ref: `#/$defs/${oRe(S.$ref)}` };
      case "Null":
        return { type: "null" };
      case "Never":
        return { not: {} };
      case "String": {
        let T = { type: "string" };
        if (S.contentMediaType !== void 0) T.contentMediaType = S.contentMediaType;
        if (S.contentSchema !== void 0) T.contentSchema = u(S.contentSchema);
        return T;
      }
      case "Number":
        return aZt(S.checks, "isInt")
          ? { type: "integer" }
          : aZt(S.checks, "isFinite")
            ? { type: "number" }
            : {
                anyOf: [
                  { type: "number" },
                  { type: "string", enum: ["NaN"] },
                  { type: "string", enum: ["Infinity"] },
                  { type: "string", enum: ["-Infinity"] },
                ],
              };
      case "Boolean":
        return { type: "boolean" };
      case "Literal": {
        let T = S.literal;
        if (typeof T === "string") return { type: "string", enum: [T] };
        if (typeof T === "number") return { type: "number", enum: [T] };
        if (typeof T === "boolean") return { type: "boolean", enum: [T] };
        return { type: "string", enum: [String(T)] };
      }
      case "Enum":
        return u({
          _tag: "Union",
          types: S.enums.map(([T, C]) => ({ _tag: "Literal", literal: C, annotations: { title: T } })),
          mode: "anyOf",
          annotations: S.annotations,
        });
      case "TemplateLiteral":
        return { type: "string", pattern: `^${S.parts.map(Oft).join("")}$` };
      case "Arrays": {
        if (S.rest.length > 1)
          throw new globalThis.Error("Generating a JSON Schema for post-rest elements is not supported");
        let T = { type: "array" },
          C = S.elements.length,
          O = S.elements.map((B) => {
            if (B.isOptional) C--;
            let V = u(B.type),
              q = _(B.annotations);
            return q ? oZt(V, q) : V;
          });
        if (O.length > 0) {
          if (((T.prefixItems = O), (T.maxItems = S.elements.length), C > 0)) T.minItems = C;
        } else T.items = !1;
        if (S.rest.length > 0) {
          delete T.maxItems;
          let B = u(S.rest[0]);
          if (Object.keys(B).length > 0) T.items = B;
          else delete T.items;
        }
        return T;
      }
      case "Objects": {
        if (S.propertySignatures.length === 0 && S.indexSignatures.length === 0)
          return { anyOf: [{ type: "object" }, { type: "array" }] };
        let T = { type: "object" },
          C = {},
          O = [];
        for (let V of S.propertySignatures) {
          let q = V.name;
          if (typeof q !== "string")
            throw new globalThis.Error(`Unsupported property signature name: ${af(q)}`);
          let Z = u(V.type),
            se = _(V.annotations);
          if (((C[q] = se ? oZt(Z, se) : Z), !V.isOptional)) O.push(q);
        }
        if (Object.keys(C).length > 0) T.properties = C;
        if (O.length > 0) T.required = O;
        T.additionalProperties = s;
        let B = {};
        for (let V of S.indexSignatures) {
          let q = u(V.type);
          if (Object.keys(q).length === 1 && "not" in q) q = !1;
          let Z = D(V.parameter);
          if (Z.length > 0) for (let se of Z) B[se] = q;
          else T.additionalProperties = q;
        }
        if (Object.keys(B).length > 0) ((T.patternProperties = B), delete T.additionalProperties);
        if (Dv(T.additionalProperties) && L2e(T.additionalProperties)) delete T.additionalProperties;
        return T;
      }
      case "Union": {
        let T = S.types.map(u);
        if (T.length === 0) return { not: {} };
        if (T.length > 1) {
          let C = d(T);
          if (C) return C;
        }
        return S.mode === "anyOf" ? { anyOf: T } : { oneOf: T };
      }
    }
  }
  function d(S) {
    let T,
      C = [];
    for (let O of S) {
      if (Object.keys(O).length !== 2 || O.type === void 0 || !Array.isArray(O.enum) || O.enum.length === 0)
        return;
      if (T === void 0) T = O.type;
      else if (O.type !== T) return;
      for (let V of O.enum) C.push(V);
    }
    return { type: T, enum: C };
  }
  function _(S) {
    if (S === void 0) return;
    let T = {};
    if (typeof S.title === "string") T.title = S.title;
    if (typeof S.description === "string") T.description = S.description;
    else if (r && typeof S.expected === "string") T.description = S.expected;
    if (S.default !== void 0) T.default = S.default;
    if (Array.isArray(S.examples)) T.examples = S.examples;
    if (typeof S.readOnly === "boolean") T.readOnly = S.readOnly;
    if (typeof S.writeOnly === "boolean") T.writeOnly = S.writeOnly;
    if (typeof S.format === "string") T.format = S.format;
    if (typeof S.contentEncoding === "string") T.contentEncoding = S.contentEncoding;
    if (typeof S.contentMediaType === "string") T.contentMediaType = S.contentMediaType;
    if (a)
      for (let [C, O] of Object.entries(S)) {
        if (O === void 0) continue;
        if (y2s.has(C)) continue;
        if (!a(C)) continue;
        T[C] = O;
      }
    if (Object.keys(T).length > 0) return T;
  }
  function L(S, T) {
    return S.map(C).filter((O) => O !== void 0);
    function C(O) {
      switch (O._tag) {
        case "Filter":
          return I(O, T);
        case "FilterGroup": {
          let B = O.checks.map(C).filter((Z) => Z !== void 0);
          if (B.length === 0) return;
          let V = { allOf: B },
            q = _(O.annotations);
          if (q) V = { ...V, ...q };
          return V;
        }
      }
    }
  }
  function I(S, T) {
    let C = S.meta;
    if (!C) return;
    let O = V(C),
      B = _(S.annotations);
    if (B) O = { ...O, ...B };
    return O;
    function V(q) {
      switch (q._tag) {
        case "isMinLength":
          return T === "array" ? { minItems: q.minLength } : { minLength: q.minLength };
        case "isMaxLength":
          return T === "array" ? { maxItems: q.maxLength } : { maxLength: q.maxLength };
        case "isLengthBetween":
          return T === "array"
            ? { allOf: [{ minItems: q.minimum }, { maxItems: q.maximum }] }
            : { allOf: [{ minLength: q.minimum }, { maxLength: q.maximum }] };
        case "isPattern":
        case "isGUID":
        case "isULID":
        case "isBase64":
        case "isBase64Url":
        case "isStartsWith":
        case "isEndsWith":
        case "isIncludes":
        case "isUppercased":
        case "isLowercased":
        case "isCapitalized":
        case "isUncapitalized":
        case "isTrimmed":
        case "isStringFinite":
        case "isStringBigInt":
        case "isStringSymbol":
          return { pattern: q.regExp.source };
        case "isUUID":
          return { pattern: q.regExp.source, format: "uuid" };
        case "isFinite":
        case "isInt":
          return;
        case "isMultipleOf":
          return { multipleOf: q.divisor };
        case "isGreaterThanOrEqualTo":
          return { minimum: q.minimum };
        case "isLessThanOrEqualTo":
          return { maximum: q.maximum };
        case "isGreaterThan":
          return { exclusiveMinimum: q.exclusiveMinimum };
        case "isLessThan":
          return { exclusiveMaximum: q.exclusiveMaximum };
        case "isBetween":
          return {
            [q.exclusiveMinimum ? "exclusiveMinimum" : "minimum"]: q.minimum,
            [q.exclusiveMaximum ? "exclusiveMaximum" : "maximum"]: q.maximum,
          };
        case "isUnique":
          return { uniqueItems: !0 };
        case "isMinProperties":
          return { minProperties: q.minProperties };
        case "isMaxProperties":
          return { maxProperties: q.maxProperties };
        case "isPropertiesLengthBetween":
          return { minProperties: q.minimum, maxProperties: q.maximum };
        case "isPropertyNames":
          return { propertyNames: u(q.propertyNames) };
        case "isDateValid":
          return { format: "date-time" };
      }
    }
  }
  function D(S) {
    switch (S._tag) {
      default:
        throw new globalThis.Error(`Unsupported index signature parameter: ${S._tag}`);
      case "Reference":
        return D(e.references[S.$ref]);
      case "String":
        return M2s(S);
      case "TemplateLiteral":
        return [`^${S.parts.map(Oft).join("")}$`];
      case "Union":
        return S.types.flatMap(D);
    }
  }
}