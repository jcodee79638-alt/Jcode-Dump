
var R0 = ne(() => {
  Sj();
  aie();
  KH();
  Hf();
  Tv();
  ((ipe = globalThis.Array),
    (sut = Wr(2, (e, t) => [...e, t])),
    (UKt = Wr(2, (e, t) => Xg(e).concat(Xg(t)))),
    (crn = ipe.isArray),
    (UOs = OOs),
    (TS = CKt),
    (bv = CKt));
  ((NOs = Wr(2, (e, t) => {
    let r = Math.floor(t);
    return Arn(r, e) ? eH() : Lo(e[r]);
  })),
    (urn = Wr(2, (e, t) => {
      let r = Math.floor(t);
      if (Arn(r, e)) throw Error(`Index out of bounds: ${r}`);
      return e[r];
    })),
    (lrn = NOs(0)),
    (FOs = urn(0)),
    (NKt = Wr(3, (e, t, r) =>
      ipe
        .from(e)
        .map((s) => [s, t(s)])
        .sort(([, s], [, a]) => r(s, a))
        .map(([s]) => s),
    )),
    (ROs = Wr(3, (e, t, r) => {
      let s = Xg(e),
        a = Xg(t);
      if (bv(s)) {
        if (bv(a)) return mrn(r)(UKt(s, a));
        return s;
      }
      return a;
    })),
    (prn = Wr(2, (e, t) => ROs(e, t, uKt()))),
    (jv = Wr(2, (e, t) => e.map(t))),
    (WOs = Wr(2, (e, t) => {
      if (UOs(e)) return [];
      let r = [];
      for (let s = 0; s < e.length; s++) {
        let a = t(e[s], s);
        for (let H = 0; H < a.length; H++) r.push(a[H]);
      }
      return r;
    })),
    (VOs = Wr(2, (e, t) => {
      let r = Xg(e),
        s = [];
      for (let a = 0; a < r.length; a++) {
        let H = t(r[a], a);
        if (gW(H)) s.push(H.success);
      }
      return s;
    })),
    (g2e = Wr(2, (e, t) => {
      let r = Xg(e),
        s = [];
      for (let a = 0; a < r.length; a++) if (t(r[a], a)) s.push(r[a]);
      return s;
    })),
    (E2e = Wr(3, (e, t, r) => Xg(e).reduce((s, a, H) => r(s, a, H), t))),
    (drn = YAt),
    (mrn = Wr(2, (e, t) => {
      let r = Xg(e);
      if (bv(r)) {
        let s = [FOs(r)],
          a = BOs(r);
        for (let H of a) if (s.every((u) => !t(H, u))) s.push(H);
        return s;
      }
      return [];
    })));
});