
var dQ = "~effect/Effect",
  Yfe = "~effect/Exit",
  cOs,
  ktn,
  Id,
  AD,
  L6,
  hW,
  rie,
  nie,
  wh,
  cAH,
  AOs,
  L_ = (e) => Ma(e, dQ),
  JAt = (e) => Ma(e, Yfe),
  ZFe = "~effect/Cause",
  e2e = "~effect/Cause/Reason",
  sye = (e) => Ma(e, ZFe),
  Otn = (e) => Ma(e, e2e),
  mQ,
  wtn,
  t2e,
  r2e,
  n2e,
  iie = (e) => new mQ(e),
  KAt,
  oye = (e) => new mQ([new n2e(e)]),
  zAt,
  pKt = (e) => new mQ([new zAt(e)]),
  i2e,
  aye = (e) => e._tag === "Fail",
  Hye = (e) => e._tag === "Die",
  cye = (e) => e._tag === "Interrupt",
  _Q = (e) => ({ ...AOs, [ktn]: e.op, [AD]: e[AD] ?? uOs, [L6]: e[L6], [hW]: e[hW], [rie]: e[rie] }),
  zF = (e) => {
    let t = _Q(e);
    return function () {
      let r = Object.create(t);
      return ((r[Id] = e.single === !1 ? arguments : arguments[0]), r);
    };
  },
  Utn = (e) => {
    let t = {
      ..._Q(e),
      [Yfe]: Yfe,
      _tag: e.op,
      get [e.prop]() {
        return this[Id];
      },
      toString() {
        return `${e.op}(${af(this[Id])})`;
      },
      toJSON() {
        return { _id: "Exit", _tag: e.op, [e.prop]: this[Id] };
      },
      [V_](r) {
        return JAt(r) && r._tag === this._tag && hp(this[Id], r[Id]);
      },
      [W_]() {
        return yv(N0(e.op), ad(this[Id]));
      },
    };
    return function (r) {
      let s = Object.create(t);
      return ((s[Id] = r), s);
    };
  },
  kh,
  s2e,
  Ntn,
  Mv,
  MU = (e) => Mv(oye(e)),
  sie = (e) => Mv(pKt(e)),
  Hl,
  lOs,
  o2e,
  oie = (e) => {
    class t extends o2e {
      _tag = e;
    }
    return ((t.prototype.name = e), t);
  },
  Ftn = "~effect/Cause/NoSuchElementError",
  dKt = (e) => Ma(e, Ftn),
  iye = "~effect/Cause/Done",
  QAt = (e) => Ma(e, iye),
  Btn,
  Aye = (e) => {
    if (e === void 0) return Btn;
    return { [iye]: iye, _tag: "Done", value: e };
  },
  fOs,
  Rtn = (e) => {
    if (e === void 0) return fOs;
    return MU(Aye(e));
  };