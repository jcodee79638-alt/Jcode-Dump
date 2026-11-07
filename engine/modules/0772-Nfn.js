
var Nfn = ne(() => {
  BH();
  Dd();
  Hf();
  PW();
  Yu();
  s1e();
  ucn();
  wfn();
  ((kfn = ni(function* (e = Ufn) {
    let t = process.stdin,
      r = process.stdout,
      s = yield* Acn({
        acquire: Bd(
          jn(() => {
            let _ = Kpt.createInterface({ input: t, escapeCodeTimeout: 50 });
            if ((Kpt.emitKeypressEvents(t, _), t.isTTY)) t.setRawMode(!0);
            return _;
          }),
          (_) =>
            jn(() => {
              if (t.isTTY) t.setRawMode(!1);
              _.close();
            }),
        ),
      }),
      a = jn(() => r.columns ?? 0),
      H = jn(() => r.rows ?? 0),
      u = ft(function* () {
        yield* NYt(s);
        let _ = yield* BQ(),
          L = (I, D) => {
            let S = {
              input: l2e(I),
              key: { name: D.name ?? "", ctrl: !!D.ctrl, meta: !!D.meta, shift: !!D.shift },
            };
            if ((JM(_, S), e(S))) i1e(_);
          };
        return (yield* sL(() => jn(() => t.off("keypress", L))), t.on("keypress", L), _);
      }),
      f = FL(
        Hi(NYt(s), (_) =>
          Fd((L) => {
            let I = (D) => L(Jt(D));
            return (_.once("line", I), jn(() => _.off("line", I)));
          }),
        ),
      );
    return Cfn({
      columns: a,
      rows: H,
      readInput: u,
      readLine: f,
      display: (_) =>
        BL(
          Fd((L) => {
            r.write(_, (I) =>
              Mtn(I)
                ? L(ti)
                : L(
                    bn(
                      FQ({
                        module: "Terminal",
                        method: "display",
                        description: "Failed to write prompt to stdout",
                        cause: I,
                      }),
                    ),
                  ),
            );
          }),
        ),
    });
  })),
    (Ofn = Es(Ver, kfn(Ufn))));
});