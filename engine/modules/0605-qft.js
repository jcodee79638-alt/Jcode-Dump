
function qft(e, t) {
  let r = mZt()(
    [e, t],
    ([s, a]) => {
      let H = On(IAn(s, a));
      return (u, f, d) => {
        if (!bin(u)) return bn(new OU(f, Lo(u)));
        return cBe(uG(H)(u.reasons, d), {
          onSuccess: lie,
          onFailure: (_) => new XM(f, Lo(u), [new v6(["failures"], _)]),
        });
      };
    },
    {
      typeConstructor: { _tag: "effect/Cause" },
      generation: {
        runtime: "Schema.Cause(?, ?)",
        Type: "Cause.Cause<?, ?>",
        importDeclaration: 'import * as Cause from "effect/Cause"',
      },
      expected: "Cause",
      toCodec: ([s, a]) => JW()(On(IAn(s, a)), Zq({ decode: lie, encode: ({ reasons: H }) => H })),
      toArbitrary: ([s, a]) => Y2s(s, a),
      toEquivalence: ([s, a]) => Z2s(s, a),
      toFormatter: ([s, a]) => eBs(s, a),
    },
  );
  return cd(r.ast, { error: e, defect: t });
}