
var jSt = (e) => {
    let t = (r, s, a, H) => {
      let u = a ? { ...a, async: !1 } : { async: !1 },
        f = r._zod.run({ value: s, issues: [] }, u);
      if (f instanceof Promise) throw new LX();
      if (f.issues.length) {
        let d = new (H?.Err ?? e)(f.issues.map((_) => hX(_, u, U8())));
        throw (K0r(d, H?.callee ?? t), d);
      }
      return f.value;
    };
    return t;
  },
  PSt = (e) => {
    let t = async (r, s, a, H) => {
      let u = a ? { ...a, async: !0 } : { async: !0 },
        f = r._zod.run({ value: s, issues: [] }, u);
      if (f instanceof Promise) f = await f;
      if (f.issues.length) {
        let d = new (H?.Err ?? e)(f.issues.map((_) => hX(_, u, U8())));
        throw (K0r(d, H?.callee ?? t), d);
      }
      return f.value;
    };
    return t;
  },
  n5e = (e) => (t, r, s) => {
    let a = s ? { ...s, async: !1 } : { async: !1 },
      H = t._zod.run({ value: r, issues: [] }, a);
    if (H instanceof Promise) throw new LX();
    return H.issues.length ? Vvi(e, H.issues, a) : { success: !0, data: H.value };
  },
  aEr,
  CSt = (e) => async (t, r, s) => {
    let a = s ? { ...s, async: !0 } : { async: !0 },
      H = t._zod.run({ value: r, issues: [] }, a);
    if (H instanceof Promise) H = await H;
    return H.issues.length ? Vvi(e, H.issues, a) : { success: !0, data: H.value };
  },
  DDa,
  yDa,
  wSt = (e, t, r) => {
    let s = e._zod.bag.validator;
    if (s !== void 0) {
      if (s(t) !== DDa) return !0;
      if (s.definite === !0 && r === void 0) return !1;
    }
    return MDa(e, t, r);
  },
  kSt = async (e, t, r) => {
    let s = r ? { ...r, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 },
      a = e._zod.run({ value: t, issues: [] }, s);
    if (a instanceof Promise) a = await a;
    return a.issues.length === 0;
  },
  qvi = (e) => {
    let t = jSt(e),
      r = (s, a, H, u) => {
        let f = H ? { ...H, direction: "backward" } : { direction: "backward" };
        return t(s, a, f, bSt(r, u));
      };
    return r;
  },
  Gvi = (e) => {
    let t = jSt(e),
      r = (s, a, H, u) => t(s, a, H, bSt(r, u));
    return r;
  },
  Xvi = (e) => {
    let t = PSt(e),
      r = async (s, a, H, u) => {
        let f = H ? { ...H, direction: "backward" } : { direction: "backward" };
        return await t(s, a, f, bSt(r, u));
      };
    return r;
  },
  Jvi = (e) => {
    let t = PSt(e),
      r = async (s, a, H, u) => await t(s, a, H, bSt(r, u));
    return r;
  },
  Kvi = (e) => (t, r, s) => {
    let a = s ? { ...s, direction: "backward" } : { direction: "backward" };
    return n5e(e)(t, r, a);
  },
  zvi = (e) => (t, r, s) => n5e(e)(t, r, s),
  Qvi = (e) => async (t, r, s) => {
    let a = s ? { ...s, direction: "backward" } : { direction: "backward" };
    return CSt(e)(t, r, a);
  },
  Yvi = (e) => async (t, r, s) => CSt(e)(t, r, s);