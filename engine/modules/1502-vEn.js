
var vEn = "~effect/http/HttpRouter",
  Pde,
  AKs,
  xnr,
  eWe,
  o_t = (e) => zg(Hi(Pde, e)),
  i_t,
  bEn = "~effect/http/HttpRouter/Route",
  s_t = (e) => ({
    ...e,
    uninterruptible: e.uninterruptible ?? !1,
    prefix: typeof e.prefix === "string" ? Lo(e.prefix) : (e.prefix ?? eH()),
    [bEn]: bEn,
  }),
  Snr = (e, t, r, s) =>
    s_t({
      ...s,
      method: e,
      path: t,
      handler: F6(r) ? Jt(r) : ug(r) ? r : Hi(Md, r),
      uninterruptible: s?.uninterruptible ?? !1,
    }),
  lKs = (e) => (e.endsWith("/") ? e.slice(0, -1) : e),
  gMe,
  fKs,
  pKs = "~effect/http/HttpRouter/Middleware",
  Cde = function () {
    if (arguments.length === 0) return jEn;
    return jEn(arguments[0], arguments[1]);
  },
  jEn = (e, t) =>
    t?.global
      ? zg(
          ft(function* () {
            let r = yield* Pde,
              s = ug(e) ? yield* e : e;
            yield* r.addGlobalMiddleware(s);
          }),
        )
      : new Tnr(ug(e) ? Xq(Vn(e, (r) => B0(new Map([[Mnr, r]])))) : q2e(B0(new Map([[Mnr, e]])))),
  dKs = 0,
  Mnr = "effect/http/HttpRouter/MiddlewareFn",
  Tnr,
  PEn,
  CEn = (e) => {
    let t = PEn.get(e);
    if (t) return t;
    let r = ZF(),
      s = 0;
    for (let [a, H] of e.mapUnsafe)
      if (a.startsWith("effect/http/HttpRouter/Middleware-")) {
        if ((r.push(H), H.length > s)) s = H.length;
      }
    if (r.length === 0) t = [];
    else {
      let a = new Set();
      for (let H = s - 1; H >= 0; H--) for (let u of r) if (H < u.length) a.add(u[H]);
      t = Xg(a).reverse();
    }
    return (PEn.set(e, t), t);
  },
  NBH,
  mKs = (e, t) => {
    let r = t?.middleware;
    if (t?.disableLogger !== !0) r = r ? ZJt(r, kRe) : kRe;
    let s = t?.routerConfig ? ou(i_t, bf(xnr)(t.routerConfig)) : i_t;
    return ft(function* () {
      let H = (yield* Pde).asHttpEffect();
      return r ? xer(H, r) : xer(H);
    }).pipe($ie, Jm(e), ou(s), t?.disableListenLog ? Za : bln);
  },
  _Ks = (e, t) => {
    let r = t?.middleware;
    if (t?.disableLogger !== !0) r = r ? ZJt(r, kRe) : kRe;
    let s = t?.routerConfig ? ou(i_t, bf(xnr)(t.routerConfig)) : i_t;
    return xln(Jm(e, s), {
      toHandler: (a) => Jt(Pp(a, Pde).asHttpEffect()),
      middleware: r,
      memoMap: t?.memoMap,
    });
  };