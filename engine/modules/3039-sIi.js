
var sIi = ne(() => {
  Gt();
  kse();
  GS();
  EMt();
  ((rDc = JU.generate), (nDc = JU.stream));
  iDc = Ge("LLM.generateObject")(function* (e, t) {
    let r = DLr(e),
      s = mV.update(r, { tools: ILr({ [IMt]: t }), toolChoice: dV.named(IMt) }),
      a = yield* JU.generate(s),
      H = a.toolCalls.find((f) => tA.is.toolCall(f) && f.name === IMt);
    if (!H || !tA.is.toolCall(H))
      return yield* new MD({
        module: "LLM",
        method: "generateObject",
        reason: new Nde({ message: `generateObject: model did not call the forced \`${IMt}\` tool` }),
      });
    let u = yield* t
      ._decode(H.input)
      .pipe(
        Zo(
          (f) =>
            new MD({
              module: "LLM",
              method: "generateObject",
              reason: new Nde({ message: `generateObject: tool input failed schema decode: ${f.message}` }),
            }),
        ),
      );
    return new iIi(u, a);
  });
});