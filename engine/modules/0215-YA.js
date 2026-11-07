
var YA = ne(() => {
  uye();
  Sj();
  KH();
  wC();
  q_();
  Hf();
  Yu();
  ((gOs = {
    [trn]: trn,
    ...Bq({
      label: "Service",
      evaluate(e) {
        return kh(Pp(e.context, this));
      },
    }),
    toJSON() {
      return { _id: "Service", key: this.key, stack: this.stack };
    },
    of(e) {
      return e;
    },
    context(e) {
      return hQ(this, e);
    },
    use(e) {
      return Hl((t) => e(Pp(t.context, this)));
    },
    useSync(e) {
      return Hl((t) => kh(e(Pp(t.context, this))));
    },
  }),
    (EOs = {
      ...wh,
      [rrn]: { _Services: (e) => e },
      toJSON() {
        return {
          _id: "Context",
          services: Array.from(this.mapUnsafe).map(([e, t]) => ({ key: e, value: t })),
        };
      },
      [V_](e) {
        if (!d2e(e) || this.mapUnsafe.size !== e.mapUnsafe.size) return !1;
        for (let t of this.mapUnsafe.keys())
          if (!e.mapUnsafe.has(t) || !hp(this.mapUnsafe.get(t), e.mapUnsafe.get(t))) return !1;
        return !0;
      },
      [W_]() {
        return Kfe(this.mapUnsafe.size);
      },
    }),
    (IOs = B0(new Map())),
    (Oh = Wr(3, (e, t, r) =>
      PKt(e, (s) => {
        s.set(t.key, r);
      }),
    )),
    (pye = Wr(3, (e, t, r) => {
      if (e.mapUnsafe.has(t.key)) return e.mapUnsafe.get(t.key);
      return nrn(t) ? tut(t) : r();
    })),
    (rpe = Wr(2, (e, t) => e.mapUnsafe.get(t.key))),
    (cg = Wr(2, (e, t) => {
      if (!e.mapUnsafe.has(t.key)) {
        if (eut in t) return tut(t);
        throw DOs(t);
      }
      return e.mapUnsafe.get(t.key);
    })),
    (Pp = cg),
    (LQ = Wr(2, (e, t) => {
      if (e.mapUnsafe.has(t.key)) return Lo(e.mapUnsafe.get(t.key));
      return nrn(t) ? Lo(tut(t)) : eH();
    })),
    (_I = Wr(2, (e, t) => {
      if (e.mapUnsafe.size === 0) return t;
      if (t.mapUnsafe.size === 0) return e;
      return PKt(e, (r) => {
        t.mapUnsafe.forEach((s, a) => r.set(a, s));
      });
    })),
    (jKt = Wr(2, (e, t) => {
      let r = B0(new Map(e.mapUnsafe));
      r.mutable = !0;
      let s = t(r);
      return ((s.mutable = !1), s);
    })),
    (bA = _i));
});