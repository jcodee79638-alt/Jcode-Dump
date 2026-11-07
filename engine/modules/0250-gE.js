
var gE = ne(() => {
  R0();
  YA();
  $6();
  Sj();
  D2e();
  FM();
  KH();
  wC();
  mI();
  Hf();
  fye();
  R_();
  Yu();
  eie();
  Tv();
  GKt();
  gQ();
  nye();
  q_();
  ezt();
  Brn();
  fzt = class fzt extends t2e {
    fiberId;
    constructor(e, t = r2e) {
      super("Interrupt", t, "Interrupted");
      this.fiberId = e;
    }
    toString() {
      return `Interrupt(${this.fiberId})`;
    }
    toJSON() {
      return { _tag: "Interrupt", fiberId: this.fiberId };
    }
    [V_](e) {
      return cye(e) && this.fiberId === e.fiberId && this.annotations === e.annotations;
    }
    [W_]() {
      return yv(N0(`${this._tag}:${this.fiberId}`))(WAt(this.annotations));
    }
  };
  ((Qrn = Srn(DW)),
    (mzt = Wr(2, (e, t) => {
      if (e.reasons.length === 0) return t;
      else if (t.reasons.length === 0) return e;
      let r = new mQ(prn(e.reasons, t.reasons));
      return hp(e, r) ? e : r;
    })),
    (HUs = /\((.*)\)/g),
    ($ut = `~effect/Fiber/${Lut}`),
    (uUs = { _A: Za, _E: Za }),
    (lUs = { id: 0 }));
  hzt = class hzt {
    constructor(e, t = !0) {
      ((this[$ut] = uUs),
        this.setContext(e),
        (this.id = ++lUs.id),
        (this.currentOpCount = 0),
        (this.currentLoopCount = 0),
        (this.interruptible = t),
        (this._stack = []),
        (this._observers = []),
        (this._exit = void 0),
        (this._children = void 0),
        (this._interruptedCause = void 0),
        (this._yielded = void 0),
        this.runtimeMetrics?.recordFiberStart(this.context));
    }
    [$ut];
    id;
    interruptible;
    currentOpCount;
    currentLoopCount;
    _stack;
    _observers;
    _exit;
    _currentExit;
    _children;
    _interruptedCause;
    _yielded;
    context;
    currentScheduler;
    currentTracerContext;
    currentSpan;
    currentLogLevel;
    minimumLogLevel;
    currentStackFrame;
    runtimeMetrics;
    maxOpsBeforeYield;
    currentPreventYield;
    _dispatcher = void 0;
    get currentDispatcher() {
      return (this._dispatcher ??= this.currentScheduler.makeDispatcher());
    }
    getRef(e) {
      return npe(this.context, e);
    }
    addObserver(e) {
      if (this._exit) return (e(this._exit), m6);
      return (
        this._observers.push(e),
        () => {
          let t = this._observers.indexOf(e);
          if (t >= 0) this._observers.splice(t, 1);
        }
      );
    }
    interruptUnsafe(e, t) {
      if (this._exit) return;
      let r = Hpe(e);
      if (this.currentStackFrame) r = i2e(r, hQ(s2e, this.currentStackFrame));
      if (t) r = i2e(r, t);
      if (
        ((this._interruptedCause = this._interruptedCause ? mzt(this._interruptedCause, r) : r),
        this.interruptible)
      )
        this.evaluate(V0(this._interruptedCause));
    }
    pollUnsafe() {
      return this._exit;
    }
    evaluate(e) {
      if (this._exit) return;
      else if (this._yielded !== void 0) {
        let s = this._yielded;
        ((this._yielded = void 0), s());
      }
      let t = this.runLoop(e);
      if (t === nie) return;
      let r = izt.interruptChildren && izt.interruptChildren(this);
      if (r !== void 0) return this.evaluate(Fu(r, () => t));
      ((this._exit = t), this.runtimeMetrics?.recordFiberEnd(this.context, this._exit));
      for (let s = 0; s < this._observers.length; s++) this._observers[s](t);
      this._observers.length = 0;
    }
    runLoop(e) {
      let t = globalThis[tye];
      globalThis[tye] = this;
      let r = !1,
        s = e;
      this.currentOpCount = 0;
      let a = ++this.currentLoopCount;
      try {
        while (!0) {
          if (
            (this.currentOpCount++,
            !r && !this.currentPreventYield && this.currentScheduler.shouldYield(this))
          ) {
            r = !0;
            let H = s;
            s = Fu(P2e, () => H);
          }
          if (
            ((s = this.currentTracerContext ? this.currentTracerContext(s, this) : s[AD](this)),
            a !== this.currentLoopCount)
          )
            return nie;
          else if (s === nie) {
            let H = this._yielded;
            if (Yfe in H) return ((this._yielded = void 0), H);
            return nie;
          }
        }
      } catch (H) {
        if (!Ma(s, AD)) return sie(`Fiber.runLoop: Not a valid effect: ${String(s)}`);
        return this.runLoop(sie(H));
      } finally {
        globalThis[tye] = t;
      }
    }
    getCont(e) {
      while (!0) {
        let t = this._stack.pop();
        if (!t) return;
        let r = t[rie] && t[rie](this);
        if (r) return ((r[e] = r), r);
        if (t[e]) return t;
      }
    }
    yieldWith(e) {
      return ((this._yielded = e), nie);
    }
    children() {
      return (this._children ??= new Set());
    }
    pipe() {
      return vA(this, arguments);
    }
    setContext(e) {
      this.context = e;
      let t = this.getRef(qKt);
      if (t !== this.currentScheduler) ((this.currentScheduler = t), (this._dispatcher = void 0));
      ((this.currentSpan = e.mapUnsafe.get(XKt)),
        (this.currentLogLevel = this.getRef(ZKt)),
        (this.minimumLogLevel = this.getRef(_ut)),
        (this.currentStackFrame = e.mapUnsafe.get(y2e.key)),
        (this.maxOpsBeforeYield = this.getRef(jrn)),
        (this.currentPreventYield = this.getRef(Prn)),
        (this.runtimeMetrics = e.mapUnsafe.get(Nrn)));
      let r = e.mapUnsafe.get(KKt);
      this.currentTracerContext = r ? r.context : void 0;
    }
    get currentSpanLocal() {
      return this.currentSpan?._tag === "Span" ? this.currentSpan : void 0;
    }
  };
  ((izt = { interruptChildren: void 0 }),
    ($zt = Wr(
      (e) => Ma(e[0], $ut),
      (e, t, r) =>
        Hl((s) => {
          let a = j2e(s);
          return ((a = a && r ? _I(a, r) : (a ?? r)), e.interruptUnsafe(t, a), C2e(Lzt(e)));
        }),
    )),
    (inn = Wr(2, (e, t) =>
      Hl((r) => {
        let s = j2e(r);
        for (let a of e) a.interruptUnsafe(t, s);
        return C2e(Ape(e));
      }),
    )),
    (Mu = kh),
    (V0 = Mv),
    (TU = MU),
    ($p = zF({
      op: "Sync",
      [AD](e) {
        let t = this[Id](),
          r = e.getCont(L6);
        return r ? r[L6](t, e) : e.yieldWith(kh(t));
      },
    })),
    (Gm = zF({
      op: "Suspend",
      [AD](e) {
        return this[Id]();
      },
    })),
    (gzt = rut({ onFailure: TU, onSuccess: Mu })),
    (snn = zF({
      op: "Yield",
      [AD](e) {
        let t = !1;
        return (
          e.currentDispatcher.scheduleTask(() => {
            if (t) return;
            e.evaluate(p1);
          }, this[Id] ?? 0),
          e.yieldWith(() => {
            t = !0;
          })
        );
      },
    })),
    (P2e = snn(0)),
    (upe = Mu(eH())),
    (Lp = Mu(void 0)),
    (yzt = zF({
      op: "Async",
      single: !1,
      [AD](e) {
        let t = I$(() => this[Id][0].bind(e.currentScheduler)),
          r = !1,
          s = !1,
          a = this[Id][1] ? new AbortController() : void 0,
          H = t((u) => {
            if (r) return;
            if (((r = !0), s)) e.evaluate(u);
            else s = u;
          }, a?.signal);
        if (s !== !1) return s;
        if (
          ((s = !0),
          (e._yielded = () => {
            r = !0;
          }),
          a === void 0 && H === void 0)
        )
          return nie;
        return (e._stack.push(dUs(() => ((r = !0), a?.abort(), H ?? p1))), nie);
      },
    })),
    (dUs = zF({
      op: "AsyncFinalizer",
      [rie](e) {
        if (e.interruptible) ((e.interruptible = !1), e._stack.push(Cut));
      },
      [hW](e, t) {
        return Iut(e) ? Fu(this[Id](), () => V0(e)) : V0(e);
      },
    })),
    (Mzt = bS(m6)),
    (Rrn = rzt(2)),
    (Lye = zF({
      op: "Iterator",
      single: !1,
      [L6](e, t) {
        let r = this[Id][0];
        while (!0) {
          let s = r.next(e);
          if (s.done) return Mu(s.value);
          if (!NC(s.value)) return (t._stack.push(this), s.value);
          else if (s.value._tag === "Failure") return s.value;
          e = s.value.value;
        }
      },
      [AD](e) {
        return this[L6](this[Id][1], e);
      },
    })),
    (WM = Wr(2, (e, t) => {
      let r = Mu(t);
      return Fu(e, (s) => r);
    })),
    (g6 = Wr(2, (e, t) => Fu(e, (r) => (L_(t) ? t : I$(() => t(r)))))),
    (fpe = Wr(2, (e, t) => Fu(e, (r) => WM(L_(t) ? t : I$(() => t(r)), r)))),
    (unn = Wr(
      (e) => L_(e[1]),
      (e, t, r) => Szt([e, t], r),
    )),
    (Mut = Wr(
      (e) => L_(e[1]),
      (e, t, r) => Ann([e, t], r),
    )),
    (Fu = Wr(2, (e, t) => {
      let r = Object.create(mUs);
      return ((r[Id] = e), (r[L6] = t.length !== 1 ? (s) => t(s) : t), r);
    })),
    (mUs = _Q({
      op: "OnSuccess",
      [AD](e) {
        return (e._stack.push(this), this[Id]);
      },
    })),
    (lnn = Wr(2, (e, t) => {
      if (NC(e)) return e._tag === "Success" ? t.onSuccess(e.value) : t.onFailure(e.cause);
      return Vq(e, t);
    })),
    (fnn = Wr(2, (e, t) => {
      if (NC(e)) return e._tag === "Success" ? t(e.value) : e;
      return Fu(e, t);
    })),
    ($_ = Wr(2, (e, t) => Fu(e, (r) => Mu(I$(() => t(r)))))),
    (dnn = Wr(2, (e, t) => (NC(e) ? gnn(e, t) : $_(e, t)))),
    (mnn = Wr(2, (e, t) => (NC(e) ? Tzt(e, t) : Pzt(e, t)))),
    (_nn = Wr(2, (e, t) => (NC(e) ? Enn(e, t) : Unn(e, t)))),
    (hnn = Wr(2, (e, t) => {
      if (NC(e)) {
        if (e._tag === "Success") return e;
        let r = DW(e.cause);
        if (xm(r)) return e;
        return t(r.success);
      }
      return yW(e, t);
    })),
    (p1 = kh(void 0)),
    (gnn = Wr(2, (e, t) => (e._tag === "Success" ? kh(t(e.value)) : e))),
    (Tzt = Wr(2, (e, t) => {
      if (e._tag === "Success") return e;
      let r = DW(e.cause);
      if (xm(r)) return e;
      return MU(t(r.success));
    })),
    (Enn = Wr(2, (e, t) => {
      if (e._tag === "Success") return kh(t.onSuccess(e.value));
      let r = DW(e.cause);
      if (xm(r)) return e;
      return MU(t.onFailure(r.success));
    })),
    (Inn = Wr(2, (e, t) => (Dye(e) ? t : e))),
    (IQ = Wr(2, (e, t) =>
      Hl((r) => {
        let s = r.context,
          a = t(s);
        if (s === a) return e;
        return (
          r.setContext(a),
          yQ(e, () => {
            r.setContext(s);
            return;
          })
        );
      }),
    )),
    (w2e = Wr(3, (e, t, r) =>
      IQ(e, (s) => {
        let a = cg(s, t),
          H = r(a);
        if (a === H) return s;
        return Oh(s, t, H);
      }),
    )),
    (_Us = Hl((e) => Mu(e.context))),
    (DQ = Wr(2, (e, t) => {
      if (NC(e)) return e;
      return IQ(e, _I(t));
    })),
    (vzt = Wr(
      (e) => L_(e[1]),
      (e, t, r) => Tnn(e, t, (s, a) => [s, a], r),
    )),
    (Tnn = Wr(
      (e) => L_(e[1]),
      (e, t, r, s) =>
        s?.concurrent
          ? $_(Wzt([e, t], { concurrency: 2 }), ([a, H]) => I$(() => r(a, H)))
          : Fu(e, (a) => $_(t, (H) => I$(() => r(a, H)))),
    )),
    (vnn = Wr(2, (e, t) => Fu(t, (r) => (r ? lpe(e) : upe)))),
    (yye = Wr(
      (e) => L_(e[0]),
      (e, t) => Tye({ while: d6, body: ph(t?.disableYield ? e : Fu(e, (r) => P2e)), step: m6 }),
    )),
    (vU = Wr(2, (e, t) => {
      let r = Object.create(hUs);
      return ((r[Id] = e), (r[hW] = t.length !== 1 ? (s) => t(s) : t), r);
    })),
    (hUs = _Q({
      op: "OnFailure",
      [AD](e) {
        return (e._stack.push(this), this[Id]);
      },
    })),
    (bnn = Wr(3, (e, t, r) =>
      vU(e, (s) => {
        if (!t(s)) return V0(s);
        return I$(() => r(s));
      }),
    )),
    (k2e = Wr(3, (e, t, r) =>
      vU(e, (s) => {
        let a = t(s);
        return xm(a) ? V0(a.failure) : I$(() => r(a.success, s));
      }),
    )),
    (yW = Wr(2, (e, t) => k2e(e, DW, (r) => t(r)))),
    (jnn = Wr(2, (e, t) => k2e(e, Yrn, t))),
    (Pnn = Wr(2, (e, t) =>
      vU(e, (r) =>
        g6(
          I$(() => t(r)),
          V0(r),
        ),
      ),
    )),
    (Cnn = Wr(3, (e, t, r) =>
      vU(e, (s) => {
        let a = t(s);
        if (xm(a)) return V0(s);
        return g6(
          I$(() => r(a.success, s)),
          V0(s),
        );
      }),
    )),
    (wnn = Wr(2, (e, t) => Cnn(e, DW, (r) => t(r)))),
    (Tut = Wr(
      (e) => L_(e[0]),
      (e, t, r, s) =>
        vU(e, (a) => {
          let H = DW(a);
          if (xm(H)) return V0(H.failure);
          if (!t(H.success)) return s ? I$(() => s(H.success)) : V0(a);
          return I$(() => r(H.success));
        }),
    )),
    (bzt = Wr(
      (e) => L_(e[0]),
      (e, t, r, s) =>
        vU(e, (a) => {
          let H = DW(a);
          if (xm(H)) return V0(H.failure);
          let u = t(H.success);
          if (xm(u)) return s ? I$(() => s(u.failure)) : V0(a);
          return I$(() => r(u.success));
        }),
    )),
    (jzt = Wr(
      (e) => L_(e[0]),
      (e, t, r, s) => {
        let a = Array.isArray(t) ? (H) => Ma(H, "_tag") && t.includes(H._tag) : pQ(t);
        return Tut(e, a, r, s);
      },
    )),
    (knn = Wr(
      (e) => L_(e[0]),
      (e, t, r) => {
        let s;
        return bzt(
          e,
          (a) => ((s ??= Object.keys(t)), Ma(a, "_tag") && lQ(a._tag) && s.includes(a._tag) ? D$(a) : dh(a)),
          (a) => I$(() => t[a._tag](a)),
          r,
        );
      },
    )),
    (Onn = Wr(
      (e) => L_(e[0]),
      (e, t, r, s, a) =>
        Tut(
          e,
          (H) => pQ(H, t) && Ma(H, "reason"),
          (H) => {
            let u = H.reason;
            if (pQ(u, r)) return s(u, H);
            return a ? I$(() => a(u, H)) : TU(H);
          },
        ),
    )),
    (Pzt = Wr(2, (e, t) => yW(e, (r) => Izt(() => t(r))))),
    (Unn = Wr(2, (e, t) =>
      O2e(e, { onFailure: (r) => Izt(() => t.onFailure(r)), onSuccess: (r) => $p(() => t.onSuccess(r)) }),
    )),
    (Nnn = Wr(2, (e, t) => yW(e, (r) => $p(t)))),
    (but = Wr(
      (e) => L_(e[0]),
      (e, t) => {
        if (!t?.log) return O2e(e, { onFailure: (s) => Lp, onSuccess: (s) => Lp });
        let r = uie(t.log === !0 ? void 0 : t.log);
        return Vq(e, {
          onFailure(s) {
            let a = zrn(s);
            return xm(a) ? V0(a.failure) : t.message === void 0 ? r(s) : r(t.message, s);
          },
          onSuccess: (s) => Lp,
        });
      },
    )),
    (Fnn = Wr(
      (e) => L_(e[0]),
      (e, t) => {
        if (!t?.log) return Vq(e, { onFailure: (s) => Lp, onSuccess: (s) => Lp });
        let r = uie(t.log === !0 ? void 0 : t.log);
        return Vq(e, {
          onFailure: (s) => (t.message === void 0 ? r(s) : r(t.message, s)),
          onSuccess: (s) => Lp,
        });
      },
    )),
    (Vq = Wr(2, (e, t) => {
      let r = Object.create(LUs);
      return (
        (r[Id] = e),
        (r[L6] = t.onSuccess.length !== 1 ? (s) => t.onSuccess(s) : t.onSuccess),
        (r[hW] = t.onFailure.length !== 1 ? (s) => t.onFailure(s) : t.onFailure),
        r
      );
    })),
    (LUs = _Q({
      op: "OnSuccessAndFailure",
      [AD](e) {
        return (e._stack.push(this), this[Id]);
      },
    })),
    (O2e = Wr(2, (e, t) =>
      Vq(e, {
        onFailure: (r) => {
          let s = r.reasons.find(aye);
          return s ? I$(() => t.onFailure(s.error)) : V0(r);
        },
        onSuccess: t.onSuccess,
      }),
    )),
    (jut = Wr(2, (e, t) =>
      O2e(e, { onFailure: (r) => $p(() => t.onFailure(r)), onSuccess: (r) => $p(() => t.onSuccess(r)) }),
    )),
    (Rnn = Wr(2, (e, t) => {
      if (NC(e)) {
        if (e._tag === "Success") return kh(t.onSuccess(e.value));
        let r = DW(e.cause);
        if (xm(r)) return e;
        return kh(t.onFailure(r.success));
      }
      return jut(e, t);
    })),
    ($Us = zF({
      op: "Exit",
      [AD](e) {
        return (e._stack.push(this), this[Id]);
      },
      [L6](e, t, r) {
        return Mu(r ?? kh(e));
      },
      [hW](e, t, r) {
        return Mu(r ?? Mv(e));
      },
    })),
    (Wnn = Wr(2, (e, t) => g6(xQ(t), e))),
    (Czt = Wr(2, (e, t) => Mut(e, Fu(xQ(t.duration), t.orElse)))),
    (Vnn = Wr(2, (e, t) => Czt(e, { duration: t, orElse: () => TU(new zzt()) }))),
    (qnn = Wr(2, (e, t) => Mut(lpe(e), WM(xQ(t), eH())))),
    (Mye = _i("effect/Scope")),
    (gUs = Iye(function* (e, t, r) {
      let s = [],
        a = [],
        H = Array.from(t.values()),
        u = cpe();
      for (let f = H.length - 1; f >= 0; f--) {
        let d = H[f];
        if (e.strategy === "sequential") s.push(yield* ppe(d(r)));
        else a.push(Gq(u, d(r), !0, !0, "inherit"));
      }
      if (a.length > 0) s = yield* Ape(a);
      return yield* Dnn(s);
    })),
    (EUs = { _tag: "Empty" }),
    (dpe = Mye),
    (Knn = qq(Mye)),
    (yQ = zF({
      op: "OnExit",
      single: !1,
      [AD](e) {
        return (e._stack.push(this), this[Id][0]);
      },
      [rie](e) {
        if (e.interruptible && this[Id][2] !== !0) (e._stack.push(Cut), (e.interruptible = !1));
      },
      [L6](e, t, r) {
        r ??= kh(e);
        let s = this[Id][1](r);
        return s ? Fu(s, (a) => r) : r;
      },
      [hW](e, t, r) {
        r ??= Mv(e);
        let s = this[Id][1](r);
        return s ? Fu(s, (a) => r) : r;
      },
    })),
    (FC = Wr(2, yQ)),
    (Qnn = Wr(2, (e, t) => FC(e, (r) => t))),
    (Ynn = Wr(3, (e, t, r) =>
      FC(e, (s) => {
        let a = t(s);
        return xm(a) ? Lp : r(a.success, s);
      }),
    )),
    (Nzt = Wr(2, (e, t) => Ynn(e, Lnn, t))),
    (Znn = Wr(3, (e, t, r) =>
      FC(e, (s) => {
        if (s._tag !== "Failure") return Lp;
        let a = t(s.cause);
        return xm(a) ? Lp : r(a.success, s.cause);
      }),
    )),
    (ein = Wr(2, (e, t) => Znn(dzt, t)(e))),
    (Fzt = Wr(2, (e, t) =>
      $p(() => {
        let r = $E(Ag(t)),
          s = Number.isFinite(r),
          a = Uut(!1),
          H = 0,
          u = !1,
          f,
          d = Fu(a.await, () => f);
        return [
          Hl((_) => {
            let L = _.getRef(Cv),
              I = s ? L.currentTimeMillisUnsafe() : 0;
            if (u || I < H) return f ?? d;
            return (
              (u = !0),
              a.closeUnsafe(),
              (f = void 0),
              FC(e, (D) =>
                $p(() => {
                  ((u = !1), (H = L.currentTimeMillisUnsafe() + r), (f = D), a.openUnsafe());
                }),
              )
            );
          }),
          $p(() => {
            ((H = 0), a.closeUnsafe(), (f = void 0));
          }),
        ];
      }),
    )),
    (Bzt = Wr(2, (e, t) => $_(Fzt(e, t), (r) => r[0]))),
    (Sye = Hl((e) => V0(Hpe(e.id)))),
    (nin = zF({
      op: "SetInterruptible",
      [rie](e) {
        if (((e.interruptible = this[Id]), e._interruptedCause && e.interruptible))
          return () => V0(e._interruptedCause);
      },
    })),
    (Cut = nin(!0)),
    (iin = nin(!1)),
    (Tye = zF({
      op: "While",
      [L6](e, t) {
        if ((this[Id].step(e), this[Id].while())) return (t._stack.push(this), this[Id].body());
        return p1;
      },
      [AD](e) {
        if (this[Id].while()) return (e._stack.push(this), this[Id].body());
        return p1;
      },
    })),
    (EQ = Wr(
      (e) => typeof e[1] === "function",
      (e, t, r) =>
        Hl((s) => {
          let a = r?.concurrency === "inherit" ? s.getRef(zKt) : (r?.concurrency ?? 1),
            H = a === "unbounded" ? Number.POSITIVE_INFINITY : Math.max(1, a);
          if (H === 1) return IUs(e, t, r);
          let u = Xg(e),
            f = u.length;
          if (f === 0) return r?.discard ? Lp : Mu([]);
          let d = r?.discard ? void 0 : Array(f),
            _ = DUs({ f: t, out: d }, u, { concurrency: H });
          return _ ? WM(_, d) : Mu(d);
        }),
    )),
    (DUs = oin({
      onItem(e, t, r) {
        return e.f(t, r);
      },
      step(e, t, r, s) {
        if (r._tag === "Failure") return r;
        else if (e.out) e.out[s] = r.value;
      },
    })),
    (ain = Wr(
      (e) => L_(e[0]),
      (e, t) => Hl((r) => (wUs(), Mu(Gq(r, e, t?.startImmediately, !1, t?.uninterruptible ?? !1)))),
    )),
    (wut = Wr(
      (e) => L_(e[0]),
      (e, t) => Hl((r) => Mu(Gq(r, e, t?.startImmediately, !0, t?.uninterruptible))),
    )),
    (Vzt = Wr(
      (e) => L_(e[0]),
      (e, t, r) =>
        Hl((s) => {
          let a = Gq(s, e, r?.startImmediately, !0, r?.uninterruptible);
          if (!a._exit)
            if (t.state._tag !== "Closed") {
              let H = {};
              (v2e(t, H, () => pUs((f) => (f === a.id ? Lp : gye(a)))), a.addObserver(() => Ozt(t, H)));
            } else a.interruptUnsafe(s.id, j2e(s));
          return Mu(a);
        }),
    )),
    (Hin = Wr(
      (e) => L_(e[0]),
      (e, t) => Fu(dpe, (r) => Vzt(e, r, t)),
    )),
    (cin = Wr(2, (e, t) => {
      if (e._exit) return e;
      else if (t.state._tag === "Closed") return (e.interruptUnsafe(e.id), e);
      let r = {};
      return (v2e(t, r, () => gye(e)), e.addObserver(() => Ozt(t, r)), e);
    })),
    (Ain = vye(Hg())),
    (uin = qzt(Hg())),
    (lin = kut(Hg())),
    (fin = Gzt(Hg())),
    (pin = Out(Hg())),
    (din = Xzt(Hg())),
    (Grn = Mu(!0)),
    (Xrn = Mu(!1)));
  ((hin = qq(M2e)),
    (azt = BigInt(0)),
    (yUs = {
      _tag: "Span",
      spanId: "noop",
      traceId: "noop",
      sampled: !1,
      status: { _tag: "Ended", startTime: azt, endTime: azt, exit: p1 },
      attributes: new Map(),
      links: [],
      kind: "internal",
      attribute() {},
      event() {},
      end() {},
      addLinks() {},
    }),
    (Hzt = qq(IW)),
    (Cv = bA("effect/Clock", { defaultValue: () => new gin() })));
  ((Jrn = (function () {
    let e = BigInt(1e6);
    if (typeof performance > "u" || typeof performance.now > "u") return () => BigInt(Date.now()) * e;
    else if (typeof performance.timeOrigin === "number" && performance.timeOrigin === 0)
      return () => BigInt(Math.round(performance.now() * 1e6));
    let t = BigInt(Date.now()) * e - BigInt(Math.round(performance.now() * 1e6));
    return () => t + BigInt(Math.round(performance.now() * 1e6));
  })()),
    (TUs = (function () {
      let e =
        typeof process === "object" && "hrtime" in process && typeof process.hrtime.bigint === "function"
          ? process.hrtime
          : void 0;
      if (!e) return Jrn;
      let t = Jrn() - e.bigint();
      return () => t + e.bigint();
    })()),
    (Nut = mpe((e) => e.currentTimeMillis)));
  zzt = class zzt extends oie("TimeoutError") {
    [Eut] = Eut;
    constructor(e) {
      super({ message: e });
    }
  };
  Qzt = class Qzt extends oie("IllegalArgumentError") {
    [czt] = czt;
    constructor(e) {
      super({ message: e });
    }
  };
  Yzt = class Yzt extends oie("ExceededCapacityError") {
    [Azt] = Azt;
    constructor(e) {
      super({ message: e });
    }
  };
  Zzt = class Zzt extends oie("AsyncFiberError") {
    [uzt] = uzt;
    constructor(e) {
      super({ message: "An asynchronous Effect was executed with Effect.runSync", fiber: e });
    }
  };
  Fut = class Fut extends oie("UnknownError") {
    [lzt] = lzt;
    constructor(e, t) {
      super({ message: t, cause: e });
    }
  };
  ((Iin = bA("effect/Console/CurrentConsole", { defaultValue: () => globalThis.console })),
    (bUs = MKt($W, vUs)),
    (Din = tpe(bUs)),
    (B2e = bA("effect/Loggers/CurrentLoggers", { defaultValue: () => new Set([Sin, Tin]) })),
    (yin = bA("effect/Logger/LogToStderr", { defaultValue: dW })),
    (PUs = {
      [jUs]: { _Message: Za, _Output: Za },
      pipe() {
        return vA(this, arguments);
      },
    }),
    (ape = {
      bold: "1",
      red: "31",
      green: "32",
      yellow: "33",
      blue: "34",
      cyan: "36",
      white: "37",
      gray: "90",
      black: "30",
      bgBrightRed: "101",
    }),
    (tuH = {
      None: [],
      All: [],
      Trace: [ape.gray],
      Debug: [ape.blue],
      Info: [ape.green],
      Warn: [ape.yellow],
      Error: [ape.red],
      Fatal: [ape.bgBrightRed, ape.black],
    }),
    (Sin = _pe(({ cause: e, date: t, fiber: r, logLevel: s, message: a }) => {
      let H = Array.isArray(a) ? a.slice() : [a];
      if (e.reasons.length > 0) H.push($ye(e));
      let u = t.getTime(),
        f = r.getRef(hut),
        d = "";
      for (let D of f) d += ` ${xin(D, u)}`;
      let _ = r.getRef(S2e);
      if (Object.keys(_).length > 0) H.push(_);
      let L = r.getRef(Iin);
      (r.getRef(yin) ? L.error : L.log)(`[${CUs(t)}] ${s.toUpperCase()} (#${r.id})${d}:`, ...H);
    })),
    (Tin = _pe(({ cause: e, fiber: t, logLevel: r, message: s }) => {
      let a = t.getRef(Cv),
        H = t.getRef(S2e),
        u = t.currentSpan;
      if (u === void 0 || u._tag === "ExternalSpan") return;
      let f = {};
      for (let [d, _] of Object.entries(H)) f[d] = _;
      if (((f["effect.fiberId"] = t.id), (f["effect.logLevel"] = r.toUpperCase()), e.reasons.length > 0))
        f["effect.cause"] = $ye(e);
      u.event(XAt(Array.isArray(s) && s.length === 1 ? s[0] : s), a.currentTimeNanosUnsafe(), f);
    })));
  ((Rut = Mu(void 0)),
    (vin = Wr(
      (e) => L_(e[0]),
      (e, t) => Nzt(e, (r) => Hl((s) => (Wut(s, r, t?.defectsOnly), Lp))),
    )));
});