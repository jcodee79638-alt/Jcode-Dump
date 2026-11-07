
var q_ = ne(() => {
  Sj();
  FM();
  KH();
  wC();
  mI();
  R_();
  Yu();
  nye();
  ((cOs = { _A: Za, _E: Za, _R: Za }),
    (ktn = `${dQ}/identifier`),
    (Id = `${dQ}/args`),
    (AD = `${dQ}/evaluate`),
    (L6 = `${dQ}/successCont`),
    (hW = `${dQ}/failureCont`),
    (rie = `${dQ}/ensureCont`),
    (nie = Symbol.for("effect/Effect/Yield")),
    (wh = {
      pipe() {
        return vA(this, arguments);
      },
      toJSON() {
        return { ...this };
      },
      toString() {
        return af(this.toJSON(), { ignoreToString: !0, space: 2 });
      },
      [F0]() {
        return this.toJSON();
      },
    }),
    (cAH = {
      [W_]() {
        return aKt(this, Object.keys(this));
      },
      [V_](e) {
        let t = Object.keys(this),
          r = Object.keys(e);
        if (t.length !== r.length) return !1;
        for (let s = 0; s < t.length; s++) if (t[s] !== r[s] && !hp(this[t[s]], e[t[s]])) return !1;
        return !0;
      },
    }),
    (AOs = {
      [dQ]: cOs,
      ...wh,
      [Symbol.iterator]() {
        return new tie(this);
      },
      toJSON() {
        return { _id: "Effect", op: this[ktn], ...(Id in this ? { args: this[Id] } : void 0) };
      },
    }));
  mQ = class mQ {
    [ZFe];
    reasons;
    constructor(e) {
      ((this[ZFe] = ZFe), (this.reasons = e));
    }
    pipe() {
      return vA(this, arguments);
    }
    toJSON() {
      return { _id: "Cause", failures: this.reasons.map((e) => e.toJSON()) };
    }
    toString() {
      return `Cause(${af(this.reasons)})`;
    }
    [F0]() {
      return this.toJSON();
    }
    [V_](e) {
      return (
        sye(e) &&
        this.reasons.length === e.reasons.length &&
        this.reasons.every((t, r) => hp(t, e.reasons[r]))
      );
    }
    [W_]() {
      return YFe(this.reasons);
    }
  };
  wtn = new WeakMap();
  t2e = class t2e {
    [e2e];
    annotations;
    _tag;
    constructor(e, t, r) {
      if (
        ((this[e2e] = e2e), (this._tag = e), t !== r2e && typeof r === "object" && r !== null && t.size > 0)
      ) {
        let s = wtn.get(r);
        if (s) t = new Map([...s, ...t]);
        wtn.set(r, t);
      }
      this.annotations = t;
    }
    annotate(e, t) {
      if (e.mapUnsafe.size === 0) return this;
      let r = new Map(this.annotations);
      e.mapUnsafe.forEach((a, H) => {
        if (t?.overwrite !== !0 && r.has(H)) return;
        r.set(H, a);
      });
      let s = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
      return ((s.annotations = r), s);
    }
    pipe() {
      return vA(this, arguments);
    }
    toString() {
      return af(this);
    }
    [F0]() {
      return this.toString();
    }
  };
  r2e = new Map();
  n2e = class n2e extends t2e {
    error;
    constructor(e, t = r2e) {
      super("Fail", t, e);
      this.error = e;
    }
    toString() {
      return `Fail(${af(this.error)})`;
    }
    toJSON() {
      return { _tag: "Fail", error: this.error };
    }
    [V_](e) {
      return aye(e) && hp(this.error, e.error) && hp(this.annotations, e.annotations);
    }
    [W_]() {
      return yv(N0(this._tag))(yv(ad(this.error))(ad(this.annotations)));
    }
  };
  KAt = new mQ([]);
  zAt = class zAt extends t2e {
    defect;
    constructor(e, t = r2e) {
      super("Die", t, e);
      this.defect = e;
    }
    toString() {
      return `Die(${af(this.defect)})`;
    }
    toJSON() {
      return { _tag: "Die", defect: this.defect };
    }
    [V_](e) {
      return Hye(e) && hp(this.defect, e.defect) && hp(this.annotations, e.annotations);
    }
    [W_]() {
      return yv(N0(this._tag))(yv(ad(this.defect))(ad(this.annotations)));
    }
  };
  i2e = Wr(
    (e) => sye(e[0]),
    (e, t, r) => {
      if (t.mapUnsafe.size === 0) return e;
      return new mQ(e.reasons.map((s) => s.annotate(t, r)));
    },
  );
  ((kh = Utn({
    op: "Success",
    prop: "value",
    [AD](e) {
      let t = e.getCont(L6);
      return t ? t[L6](this[Id], e, this) : e.yieldWith(this);
    },
  })),
    (s2e = { key: "effect/Cause/StackTrace" }),
    (Ntn = { key: "effect/Cause/InterruptorStackTrace" }),
    (Mv = Utn({
      op: "Failure",
      prop: "cause",
      [AD](e) {
        let t = this[Id],
          r = !1;
        if (e.currentStackFrame)
          ((t = i2e(t, { mapUnsafe: new Map([[s2e.key, e.currentStackFrame]]) })), (r = !0));
        let s = e.getCont(hW);
        while (e.interruptible && e._interruptedCause && s) s = e.getCont(hW);
        return s ? s[hW](t, e, r ? void 0 : this) : e.yieldWith(r ? this : Mv(t));
      },
    })),
    (Hl = zF({
      op: "WithFiber",
      [AD](e) {
        return this[Id](e);
      },
    })),
    (lOs = (function () {
      class e extends globalThis.Error {}
      let t = _Q({
        op: "YieldableError",
        [AD]() {
          return MU(this);
        },
      });
      return (delete t.toString, Object.assign(e.prototype, t), e);
    })()),
    (o2e = (function () {
      let e = Symbol.for("effect/Data/Error/plainArgs");
      return class extends lOs {
        constructor(r) {
          super(r?.message, r?.cause ? { cause: r.cause } : void 0);
          if (r) (Object.assign(this, r), Object.defineProperty(this, e, { value: r, enumerable: !1 }));
        }
        toJSON() {
          return { ...this[e], ...this };
        }
      };
    })()),
    (Btn = { [iye]: iye, _tag: "Done", value: void 0 }),
    (fOs = MU(Btn)));
});