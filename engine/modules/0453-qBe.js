
var qBe = ne(() => {
  Sj();
  FM();
  KH();
  wC();
  mI();
  Hf();
  R_();
  ((tFs = {
    [tcn]: tcn,
    [Symbol.iterator]() {
      return this.backing[Symbol.iterator]();
    },
    toString() {
      return `MutableHashMap(${af(Array.from(this))})`;
    },
    toJSON() {
      return { _id: "MutableHashMap", values: BM(Array.from(this)) };
    },
    [F0]() {
      return this.toJSON();
    },
    pipe() {
      return vA(this, arguments);
    },
  }),
    (tw = Wr(2, (e, t) => {
      if (e.backing.has(t)) return Lo(e.backing.get(t));
      else if (CYt(t)) return eH();
      let r = RBe.get(e);
      if (r !== void 0) return e.backing.has(r) ? Lo(e.backing.get(r)) : eH();
      let s = ad(t),
        a = e.buckets.get(s);
      if (a === void 0) return eH();
      return nFs(e, a, t);
    })),
    (RBe = new WeakMap()),
    (WBe = Wr(2, (e, t) => Nu(tw(e, t)))),
    (P6 = Wr(3, (e, t, r) => {
      if (e.backing.has(t) || CYt(t)) return (e.backing.set(t, r), e);
      let s = RBe.get(e);
      if (s !== void 0 && e.backing.has(s)) return (e.backing.set(s, r), e);
      let a = ad(t),
        H = e.buckets.get(a);
      if (H === void 0) return (e.buckets.set(a, [t]), e.backing.set(t, r), e);
      if (((s = iFs(H, t)), s === void 0)) (H.push(t), (s = t));
      return (e.backing.set(s, r), e);
    })),
    (L1 = Wr(2, (e, t) => {
      if (CYt(t)) return (e.backing.delete(t), e);
      let r = RBe.get(e) ?? t,
        s = ad(r),
        a = e.buckets.get(s);
      if (a === void 0) return e;
      for (let H = 0, u = a.length; H < u; H++) {
        let f = a[H];
        if (f === r || hp(r, f)) {
          (e.backing.delete(f), a.splice(H, 1));
          break;
        }
      }
      if (a.length === 0) e.buckets.delete(s);
      return e;
    })));
});