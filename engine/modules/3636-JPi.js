
var JPi,
  qPi,
  KPi =
    (e, t = {}) =>
    (r) => {
      let s = f5e({ ...r, processors: t });
      return (Dg(e, s), p5e(s, e), d5e(s, e));
    },
  l5e =
    (e, t, r = {}) =>
    (s) => {
      let { libraryOptions: a, target: H } = s ?? {},
        u = f5e({ ...(a ?? {}), target: H, io: t, processors: r });
      return (Dg(e, u), p5e(u, e), d5e(u, e));
    };