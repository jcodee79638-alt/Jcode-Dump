
var I_t,
  Nnr = (e) => {
    let t = {
      load: e,
      orElse: (r) => Nnr(e.pipe($s(() => r.load))),
      bearer: () => lIn(t, (r) => ({ authorization: `Bearer ${r}` })),
      header: (r) => lIn(t, (s) => ({ [r]: s })),
      pipe: (r) => r(t),
    };
    return t;
  },
  D_t = (e) => {
    let t = {
      apply: e,
      andThen: (r) => D_t((s) => e(s).pipe(Hi((a) => r.apply({ ...s, headers: a })))),
      orElse: (r) => D_t((s) => e(s).pipe($s(() => r.apply(s)))),
      pipe: (r) => r(t),
    };
    return t;
  },
  lIn = (e, t) => D_t((r) => e.load.pipe(Vn((s) => $Re(r.headers, t(Dlt(s)))))),
  fIn = (e, t) => {
    let r = typeof e === "string" ? T6(e) : e;
    if (Dlt(r) === "") return bn(new I_t(t));
    return Jt(r);
  },
  pIn = (e, t) => {
    if (typeof e === "string" || bQt(e)) return Nnr(fIn(e, t));
    return Nnr(
      ft(function* () {
        return yield* fIn(yield* e, t);
      }),
    );
  },
  Bnr = (e, t = "value") => pIn(e, t),
  Pse,
  Fnr = (e) => (typeof e === "string" || bQt(e) || DBs(e) ? pIn(e, "value") : e),
  VKs = (e) => {
    if (e instanceof I_t || e instanceof Xft)
      return new MD({
        module: "Auth",
        method: "apply",
        reason:
          e instanceof I_t
            ? new Ude({ message: e.message, kind: "missing" })
            : new bse({ message: `Failed to resolve auth config: ${e.message}` }),
      });
    return e;
  },
  qKs = (e) => (t) => e.apply(t).pipe(Zo(VKs));