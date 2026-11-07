
function WAn(e, t, r) {
  switch (e._tag) {
    case "Declaration": {
      let s = e.annotations?.toCodecJson ?? e.annotations?.toCodec;
      if (Fq(s)) {
        let a = UQ(e) ? e.typeParameters.map((f) => cd(t(ME(f)))) : [],
          H = s(a),
          u = t(H.to);
        return x$(e, u === H.to ? [H] : [new S$(u, H.transformation)]);
      }
      return r(e);
    }
    case "Null":
      return x$(e, [LBs]);
    case "Boolean":
      return x$(e, [$Bs]);
    case "Unknown":
    case "ObjectKeyword":
      return x$(e, [Gan]);
    case "Enum":
    case "Number":
    case "Literal":
    case "UniqueSymbol":
    case "Symbol":
    case "BigInt":
      return e.toCodecStringTree();
    case "Objects": {
      if (e.propertySignatures.some((s) => typeof s.name !== "string"))
        throw new globalThis.Error("Objects property names must be strings", { cause: e });
      return e.recur(t);
    }
    case "Union": {
      let s = hBs(e.types);
      if (s !== e.types)
        return new b6(s, e.mode, e.annotations, e.checks, e.encoding, e.context, e.encodingChecks).recur(t);
      return e.recur(t);
    }
    case "Arrays":
    case "Suspend":
      return e.recur(t);
  }
  return e;
}