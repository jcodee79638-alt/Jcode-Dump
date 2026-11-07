
var VUs = "~effect/Layer",
  Kin = "~effect/Layer/MemoMap",
  qUs = (e, t) => (
    e.observers++,
    g6(
      MW(t, (r) => e.finalizer(r)),
      e.effect,
    )
  ),
  GUs,
  zut = (e) => {
    let t = Object.create(GUs);
    return ((t.build = e), t);
  },
  G2e = (e) =>
    zut((t, r) => {
      let s = qM(r);
      return FC(e(t, s), (a) => (a._tag === "Failure" ? cl(s, a) : Lp));
    }),
  Yin = (e) => {
    let t = G2e((r, s) => r.getOrElseMemoize(t, s, e));
    return t;
  },
  XUs = (e, t, r, s) => {
    let a = VM(),
      H = Kg(),
      u = {
        observers: 1,
        effect: Fl(H),
        finalizer: (f) =>
          Gm(() => {
            if ((u.observers--, u.observers === 0)) return (e.map.delete(t), cl(a, f));
            return Lp;
          }),
      };
    return (
      e.map.set(t, u),
      MW(r, u.finalizer).pipe(
        Fu(() => s(e, a)),
        FC((f) => ((u.effect = f), SQ(H, f))),
      )
    );
  },
  Zin,
  Lie = () => new Zin(),
  hie,
  t2,
  Qut,
  bf = function () {
    if (arguments.length === 1) return (e) => q2e(hQ(arguments[0], e));
    return q2e(hQ(arguments[0], arguments[1]));
  },
  q2e = (e) => zut(ph(Mu(e))),
  Lpe,
  sQt = function () {
    if (arguments.length === 1) return (e) => zin(() => hQ(arguments[0], e()));
    return zin(() => hQ(arguments[0], arguments[1]()));
  },
  zin = (e) => Yin(ph($p(e))),
  Es = function () {
    if (arguments.length === 1) return (e) => Qin(arguments[0], e);
    return Qin(arguments[0], arguments[1]);
  },
  Qin = (e, t) => Xq($_(t, (r) => hQ(e, r))),
  Xq = (e) => Yin((t, r) => $I(e, r)),
  zg = (e) => Xq(WM(e, Hg())),
  $ie = (e) => {
    let t = _i("effect/Layer/unwrap");
    return JUs(Es(t)(e), Pp(t));
  },
  esn = (e, t, r) => {
    let s = qM(r, "parallel");
    return EQ(e, (a) => a.build(t, qM(s, "sequential")), { concurrency: e.length }).pipe(
      $_((a) => irn(...a)),
    );
  },
  VC = (...e) => G2e((t, r) => esn(e, t, r)),
  gie,
  tsn = (e, t, r) =>
    G2e((s, a) =>
      Fu(Array.isArray(t) ? esn(t, s, a) : t.build(s, a), (H) =>
        e.build(s, a).pipe(
          DQ(H),
          $_((u) => r(u, H)),
        ),
      ),
    ),
  ou,
  Jm,
  JUs,
  KUs,
  X2e = (e) => zut((t, r) => vut(e.build(t, r))),
  rsn = (e) => zut((t, r) => e.build(Lie(), r));