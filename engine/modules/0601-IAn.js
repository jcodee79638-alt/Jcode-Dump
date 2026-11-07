
function IAn(e, t) {
  let r = mZt()(
    [e, t],
    ([s, a]) =>
      (H, u, f) => {
        if (!jin(H)) return bn(new OU(u, Lo(H)));
        switch (H._tag) {
          case "Fail":
            return cBe(uG(s)(H.error, f), {
              onSuccess: qut,
              onFailure: (d) => new XM(u, Lo(H), [new v6(["error"], d)]),
            });
          case "Die":
            return cBe(uG(a)(H.defect, f), {
              onSuccess: jye,
              onFailure: (d) => new XM(u, Lo(H), [new v6(["defect"], d)]),
            });
          case "Interrupt":
            return Jt(H);
        }
      },
    {
      typeConstructor: { _tag: "effect/Cause/Failure" },
      generation: {
        runtime: "Schema.CauseReason(?, ?)",
        Type: "Cause.Failure<?, ?>",
        importDeclaration: 'import * as Cause from "effect/Cause"',
      },
      expected: "Cause.Failure",
      toCodec: ([s, a]) =>
        JW()(
          Io([
            nt({ _tag: ri("Fail"), error: s }),
            nt({ _tag: ri("Die"), defect: a }),
            nt({ _tag: ri("Interrupt"), fiberId: XW(mo) }),
          ]),
          Zq({
            decode: (H) => {
              switch (H._tag) {
                case "Fail":
                  return qut(H.error);
                case "Die":
                  return jye(H.defect);
                case "Interrupt":
                  return Gut(H.fiberId);
              }
            },
            encode: Za,
          }),
        ),
      toArbitrary: ([s, a]) => CAn(s, a),
      toEquivalence: ([s, a]) => wAn(s, a),
      toFormatter: ([s, a]) => kAn(s, a),
    },
  );
  return cd(r.ast, { error: e, defect: t });
}