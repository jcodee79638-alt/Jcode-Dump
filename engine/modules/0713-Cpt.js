
var Cpt = (e, t, r) => {
    let a = XC(e, {
        onSuccess: (u) => {
          let f = ZC(),
            d = cg(f.context, Md),
            _ = wRe.get(d.source);
          if (_ === void 0) return ((d[N1e] = !0), bW(t(d, u), () => u));
          return _1(_(d, u), (L) => ((d[N1e] = !0), bW(t(d, L), () => u)));
        },
        onFailure: (u) =>
          _1(bRe(u), ([f, d]) => {
            let _ = ZC();
            Wut(_, d);
            let L = cg(_.context, Md),
              I = wRe.get(L.source),
              D = d.reasons.length === 0 ? Jt(f) : NL(d);
            if (I === void 0) return ((L[N1e] = !0), _1(t(L, f), () => D));
            return _1(
              _1(I(L, f), (S) => ((L[N1e] = !0), t(L, S))),
              () => D,
            );
          }),
      }),
      H =
        r === void 0
          ? Ier(a)
          : XC(Ier(r(a)), {
              onFailure(u) {
                let f = ZC();
                Wut(f, u);
                let d = cg(f.context, Md);
                if (N1e in d) return ti;
                return Vsn(bRe(u), {
                  onFailure(_) {
                    return t(d, Rd({ status: 500 }));
                  },
                  onSuccess([_]) {
                    return t(d, _);
                  },
                });
              },
              onSuccess(u) {
                let f = ZC(),
                  d = cg(f.context, Md);
                return N1e in d ? ti : t(d, u);
              },
            });
    return BL(A3s(H));
  },
  N1e,
  H3s = (e) => {
    e[Mln] = !0;
  },
  c3s = (e) => {
    if (e.body._tag !== "Stream") return e;
    let t = ZC(),
      r = cg(t.context, $f);
    return (
      H3s(r),
      ter(
        e,
        Zpe(
          Lcn(e.body.stream, (s) => cl(r, s)),
          e.body.contentType,
          e.body.contentLength,
        ),
      )
    );
  },
  Mln,
  A3s = (e) =>
    hl((t) => {
      let r = VM(),
        s = t.context;
      return (
        t.setContext(Oh(t.context, $f, r)),
        sBe(
          e,
          (a) => {
            if ((t.setContext(s), Mln in r)) return;
            return Jin(r, a);
          },
          !0,
        )
      );
    }),
  wpt = (e) => Md.use((t) => (jpt(t, e), ti)),
  u3s = (e) => (t, r) => {
    let s = Symbol.for("@effect/platform/HttpApp/resolve"),
      a = Cpt(
        t,
        (H, u) => ((u = c3s(u)), H[s](Cun(u, { withoutBody: H.method === "HEAD", context: e })), ti),
        r,
      );
    return (H, u) =>
      new Promise((f) => {
        let d = new Map(e.mapUnsafe);
        if (d2e(u)) for (let [I, D] of u.mapUnsafe) d.set(I, D);
        let _ = gln(H);
        (d.set(Md.key, _), (_[s] = f));
        let L = G0(B0(d))(a);
        H.signal?.addEventListener(
          "abort",
          () => {
            L.interruptUnsafe(void 0, ede.annotation);
          },
          { once: !0 },
        );
      });
  },
  xln = (e, t) => {
    let r = VM(),
      s = () => oL(cl(r, M$)),
      a,
      H;
    function u(f, d) {
      if (a) return a(f, d);
      return (
        (H ??= oL(
          ft(function* () {
            let _ = yield* t.memoMap ? t2(e, t.memoMap, r) : Qut(e, r);
            return (a = u3s(_)(yield* t.toHandler(_), t.middleware));
          }),
        )),
        H.then((_) => _(f, d))
      );
    }
    return { dispose: s, handler: u };
  };