
var tBe = ne(() => {
  Jg();
  YA();
  $6();
  KH();
  q_();
  gE();
  fQt();
  R_();
  Yu();
  TQ();
  ((oNs = nlt.useSync((e) => e.nextDoubleUnsafe())),
    (Q2e = bA("effect/Schedule/CurrentMetadata", {
      defaultValue: ph({
        input: void 0,
        output: void 0,
        duration: xU,
        attempt: 0,
        start: 0,
        now: 0,
        elapsed: 0,
        elapsedSincePrevious: 0,
      }),
    })),
    (aNs = {
      [Dsn]: { _Out: Za, _In: Za, _Env: Za },
      pipe() {
        return vA(this, arguments);
      },
    }),
    (ysn = Wr(2, (e, t) => Msn(e, (r, s) => $_(t(r), (a) => Mrn(Ag(a), Ag(s)))))),
    (HNs = Wr(2, (e, t) => cNs(e, t, (r, s) => [r, s]))),
    (cNs = Wr(3, (e, t, r) =>
      Z2e(
        $_(
          vzt(Cye(e), Cye(t)),
          ([s, a]) =>
            (H, u) =>
              z2e(s(H, u), {
                onSuccess: (f) =>
                  a(H, u).pipe(
                    $_((d) => [r(f[0], d[0]), yrn(f[1], d[1])]),
                    jS((d) => Mu([r(f[0], d), f[1]])),
                  ),
                onFailure: V0,
                onDone: (f) =>
                  a(H, u).pipe(
                    $_((d) => [r(f, d[0]), d[1]]),
                    jS((d) => Xp(r(f, d))),
                  ),
              }),
        ),
      ),
    )),
    (Msn = Wr(2, (e, t) =>
      Z2e($_(Cye(e), (r) => (s, a) => Fu(r(s, a), ([H, u]) => $_(t(H, u), (f) => [H, Ag(f)])))),
    )),
    (eBe = Wr(2, (e, t) =>
      Z2e(
        $_(Cye(e), (r) => {
          let s = dQt();
          return (a, H) =>
            Fu(r(a, H), (u) => {
              let [f, d] = u,
                _ = t({ ...s(a, H), output: f, duration: d });
              return Fu(L_(_) ? _ : Mu(_), (L) => (L ? Mu(u) : Xp(f)));
            });
        }),
      ),
    )),
    (alt = Die(xU)));
});