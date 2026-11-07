
var Dsn = "~effect/Schedule",
  oNs,
  Q2e,
  aNs,
  Y2e = (e) => Ma(e, Dsn),
  Z2e = (e) => {
    let t = Object.create(aNs);
    return ((t.step = e), t);
  },
  dQt = () => {
    let e = 0,
      t,
      r;
    return (s, a) => {
      if (r === void 0) r = s;
      let H = s - r,
        u = t === void 0 ? 0 : s - t;
      return ((t = s), { input: a, attempt: ++e, start: r, now: s, elapsed: H, elapsedSincePrevious: u });
    };
  },
  mQt = (e) =>
    Z2e(
      $_(e, (t) => {
        let r = dQt();
        return (s, a) => t(r(s, a));
      }),
    ),
  Cye = (e) => vU(e.step, (t) => Mu(() => V0(t))),
  _Qt = (e) =>
    mpe((t) =>
      $_(Cye(e), (r) => {
        let s = dQt();
        return (a) =>
          Gm(() => {
            let H = t.currentTimeMillisUnsafe();
            return Fu(r(H, a), ([u, f]) => {
              let d = s(H, a);
              return ((d.output = u), (d.duration = f), WM(xQ(f), d));
            });
          });
      }),
    ),
  ysn,
  HNs,
  cNs,
  slt = (e, t = 2) => {
    let r = $E(Ag(e));
    return mQt(
      Mu((s) => {
        let a = UC(r * Math.pow(t, s.attempt - 1));
        return Mu([a, a]);
      }),
    );
  },
  Msn,
  olt = (e) =>
    Msn(e, (t, r) =>
      $_(oNs, (s) => {
        let a = $E(Ag(r));
        return UC(a * 0.8 * (1 - s) + a * 1.2 * s);
      }),
    ),
  gpe = (e) =>
    Z2e(
      $_(
        Cye(e),
        (t) => (r, s) =>
          z2e(t(r, s), { onSuccess: (a) => Mu([s, a[1]]), onFailure: V0, onDone: () => Xp(s) }),
      ),
    ),
  Die = (e) => {
    let t = Ag(e);
    return mQt(Mu((r) => Mu([r.attempt - 1, t])));
  },
  eBe,
  alt;