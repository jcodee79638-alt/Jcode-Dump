
var Dd = ne(() => {
  YA();
  e2();
  KH();
  q_();
  gE();
  R_();
  fD();
  GUs = {
    [VUs]: { _ROut: Za, _E: Za, _RIn: Za },
    pipe() {
      return vA(this, arguments);
    },
  };
  Zin = class Zin {
    get [Kin]() {
      return Kin;
    }
    parent;
    constructor(e) {
      this.parent = e;
    }
    map = new Map();
    get(e, t) {
      let r = this.map.get(e);
      if (r) return qUs(r, t);
      return this.parent?.get(e, t);
    }
    getOrElseMemoize(e, t, r) {
      let s = this.get(e, t);
      if (s) return s;
      return XUs(this, e, t, r);
    }
  };
  hie = class hie extends _i()("effect/Layer/CurrentMemoMap") {
    static getOrCreate = pye(this, Lie);
  };
  ((t2 = Wr(3, (e, t, r) => qq($_(e.build(t, r), Oh(hie, t)), hie, t))),
    (Qut = Wr(2, (e, t) => Hl((r) => t2(e, hie.getOrCreate(r.context), t)))),
    (Lpe = q2e(Hg())),
    (gie = Wr(2, (e, t) => VC(e, ...(Array.isArray(t) ? t : [t])))),
    (ou = Wr(2, (e, t) => tsn(e, t, Za))),
    (Jm = Wr(2, (e, t) => tsn(e, t, (r, s) => _I(s, r)))),
    (JUs = Wr(2, (e, t) => G2e((r, s) => Fu(e.build(r, s), (a) => t(a).build(r, s))))),
    (KUs = Wr(2, (e, t) => G2e((r, s) => Fu(e.build(r, s), (a) => $I(WM(t(a), a), s))))));
});