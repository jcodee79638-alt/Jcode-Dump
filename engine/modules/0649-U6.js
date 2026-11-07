
var U6 = ne(() => {
  YA();
  Sj();
  aie();
  KH();
  wC();
  mI();
  $Q();
  eie();
  ylt();
  ((sun = Symbol.for("~effect/http/Headers")),
    (LRe = Object.defineProperties(Object.create(null), {
      [sun]: { value: sun },
      [eye]: {
        value(e) {
          return Yie(this, Pp(e, x1e));
        },
      },
      toJSON: {
        value() {
          return DU(this);
        },
      },
      [V_]: {
        value(e) {
          return kBs(this, e);
        },
      },
      [W_]: {
        value() {
          return QFe(this);
        },
      },
      toString: { value: KF.toString },
      [F0]: { value: KF[F0] },
    })),
    (kBs = Hrn(H2e())),
    (FU = Object.create(LRe)),
    (mG = Wr(3, (e, t, r) => {
      let s = rpt(e);
      return ((s[t.toLowerCase()] = r), s);
    })),
    ($Re = Wr(2, (e, t) => rpt({ ...e, ...SE(t) }))),
    (KQ = Wr(2, (e, t) => {
      let r = rpt(e);
      return (Object.assign(r, t), r);
    })),
    (M1e = Wr(2, (e, t) => {
      let r = rpt(e);
      return (delete r[t.toLowerCase()], r);
    })),
    (Yie = Wr(2, (e, t) => {
      let r = { ...e },
        s = (a) => {
          if (typeof a === "string") {
            let H = a.toLowerCase();
            if (H in e) r[H] = T6(e[H]);
          } else for (let H in e) if (a.test(H)) r[H] = T6(e[H]);
        };
      if (Array.isArray(t)) for (let a = 0; a < t.length; a++) s(t[a]);
      else s(t);
      return r;
    })),
    (x1e = bA("effect/Headers/CurrentRedactedNames", {
      defaultValue: () => ["authorization", "cookie", "set-cookie", "x-api-key"],
    })));
});