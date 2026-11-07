
var Ypt = ne(() => {
  R0();
  RQ();
  KH();
  q_();
  gE();
  Dd();
  Yu();
  _ie();
  ((vWs = B2e),
    (bWs = Wr(2, (e, t) => _pe((r) => t(e.log(r))))),
    (GRe = _pe),
    (PWs = _pe(({ cause: e, date: t, fiber: r, logLevel: s, message: a }) => {
      let H = {},
        u = {},
        f = r.getRef(die);
      for (let [I, D] of Object.entries(f)) H[I] = But(D);
      let d = t.getTime(),
        _ = r.getRef(mie);
      for (let [I, D] of _) u[I] = d - D;
      let L = Rq(a);
      return {
        message: L.length === 1 ? But(L[0]) : L.map(But),
        level: s.toUpperCase(),
        timestamp: t.toISOString(),
        cause: e.reasons.length > 0 ? $ye(e) : void 0,
        annotations: H,
        spans: u,
        fiberId: jWs(r.id),
      };
    })),
    (CWs = Wr(2, (e, t) =>
      Fu(dpe, (r) => {
        let s = [],
          a = Gm(() => {
            if (s.length === 0) return Lp;
            let H = s;
            return ((s = []), t.flush(H));
          });
        return E6((H) =>
          H(xQ(t.window).pipe(g6(a), yye)).pipe(
            wut,
            Fu((u) => MW(r, () => gye(u))),
            g6(N2e(() => a)),
            WM(
              _pe((u) => {
                s.push(e.log(u));
              }),
            ),
          ),
        );
      }),
    )),
    (wWs = Wr(
      (e) => TWs(e[0]),
      (e, t, r) =>
        yut(function* () {
          let a = yield* (yield* g1).open(t, { flag: "a+", ...r }),
            H = new TextEncoder();
          return yield* CWs(e, {
            window: r?.batchWindow ?? 1000,
            flush: (u) =>
              but(
                a.write(
                  H.encode(
                    u.join(`
`) +
                      `
`,
                  ),
                ),
              ),
          });
        }),
    )));
});