
function mBs(e, t) {
  switch (e._tag) {
    case "Declaration": {
      let r = e.annotations?.toCodecJson ?? e.annotations?.toCodec;
      if (Fq(r)) {
        let s = UQ(e) ? e.typeParameters.map((u) => E1e(ME(u))) : [],
          a = r(s),
          H = t(a.to);
        return x$(e, H === a.to ? [a] : [new S$(H, a.transformation)]);
      }
      return x$(e, [Van]);
    }
    case "Unknown":
    case "ObjectKeyword":
      return x$(e, [qan]);
    case "Undefined":
    case "Void":
    case "Literal":
    case "Number":
      return e.toCodecJson();
    case "UniqueSymbol":
    case "Symbol":
    case "BigInt":
      return e.toCodecStringTree();
    case "Objects": {
      if (e.propertySignatures.some((r) => typeof r.name !== "string"))
        throw new globalThis.Error("Objects property names must be strings", { cause: e });
      return e.recur(t);
    }
    case "Union": {
      let r = wft(e.types);
      if (r !== e.types)
        return new b6(r, e.mode, e.annotations, e.checks, e.encoding, e.context, e.encodingChecks).recur(t);
      return e.recur(t);
    }
    case "Arrays":
    case "Suspend":
      return e.recur(t);
  }
  return e;
}