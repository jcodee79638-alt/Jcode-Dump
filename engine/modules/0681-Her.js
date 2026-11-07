
var Her = "~effect/FiberSet",
  IRs = (e) => Ma(e, Her),
  DRs,
  yRs = (e, t) => {
    let r = Object.create(DRs);
    return ((r.state = { _tag: "Open", backing: e }), (r.deferred = t), r);
  },
  _pt = () =>
    Bd(
      jn(() => yRs(new Set(), Kg())),
      (e) =>
        yH(() => {
          let t = e.state;
          if (t._tag === "Closed") return ti;
          e.state = { _tag: "Closed" };
          let r = t.backing;
          return zlt(r).pipe(Jut(e.deferred));
        }),
    ),
  MRs = () => Hi(_pt(), (e) => uer(e)()),
  cer = -1,
  xRs,
  Fun,
  Aer = (e) =>
    yH(() => {
      if (e.state._tag === "Closed") return ti;
      return nYt(e.state.backing, cer);
    }),
  Run,
  Wun = function () {
    let e = arguments[0];
    if (!ug(arguments[1])) {
      let t = arguments[1];
      return (r) => Nun(e, r, t);
    }
    return Nun(e, arguments[1], arguments[2]);
  },
  Nun = (e, t, r) =>
    hl((s) => {
      if (e.state._tag === "Closed") return jn(Run);
      let a = G0(s.context)(t);
      return (Fun(e, a, r), Jt(a));
    }),
  uer = (e) => () =>
    Vn(Qg(), (t) => {
      let r = G0(t);
      return (s, a) => {
        if (e.state._tag === "Closed") return Run();
        let H = r(s, a);
        return (Fun(e, H), H);
      };
    }),
  hpt = (e) => Fl(e.deferred),
  SRs = (e) =>
    Kq({
      while: () => e.state._tag === "Open" && e.state.backing.size > 0,
      body: () => Cpe(m2e(e)),
      step: m6,
    });