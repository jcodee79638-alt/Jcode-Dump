
var fzt,
  Krn = (e) => new fzt(e),
  Hpe = (e) => new mQ([new fzt(e)]),
  zrn = (e) => {
    let t = e.reasons.find(aye);
    return t ? D$(t) : dh(e);
  },
  DW = (e) => {
    for (let t = 0; t < e.reasons.length; t++) {
      let r = e.reasons[t];
      if (r._tag === "Fail") return D$(r.error);
    }
    return dh(e);
  },
  Qrn,
  pzt = (e) => e.reasons.some(Hye),
  Yrn = (e) => {
    let t = e.reasons.find(Hye);
    return t ? D$(t.defect) : dh(e);
  },
  Iut = (e) => e.reasons.some(cye),
  dzt = (e) => {
    let t;
    for (let r = 0; r < e.reasons.length; r++) {
      let s = e.reasons[r];
      if (s._tag !== "Interrupt") continue;
      if (((t ??= new Set()), s.fiberId !== void 0)) t.add(s.fiberId);
    }
    return t ? D$(t) : dh(e);
  },
  Zrn = (e) => e.reasons.length > 0 && e.reasons.every(cye),
  mzt,
  oUs = (e) => {
    let t = { Fail: [], Die: [], Interrupt: [] };
    for (let r = 0; r < e.reasons.length; r++) t[e.reasons[r]._tag].push(e.reasons[r]);
    return t;
  },
  Dut = (e) => {
    let t = oUs(e);
    if (t.Fail.length > 0) return t.Fail[0].error;
    else if (t.Die.length > 0) return t.Die[0].defect;
    else if (t.Interrupt.length > 0) return new globalThis.Error("All fibers interrupted without error");
    return new globalThis.Error("Empty cause");
  },
  _zt = (e) => {
    let t = [],
      r = [];
    if (e.reasons.length === 0) return t;
    let s = Error.stackTraceLimit;
    Error.stackTraceLimit = 1;
    for (let a of e.reasons) {
      if (a._tag === "Interrupt") {
        r.push(a);
        continue;
      }
      t.push(nzt(a._tag === "Die" ? a.defect : a.error, a.annotations));
    }
    if (t.length === 0) {
      let a = Error("The fiber was interrupted by:");
      ((a.name = "InterruptCause"), (a.stack = AUs(a, r)));
      let H = new globalThis.Error("All fibers interrupted without error", { cause: a });
      ((H.name = "InterruptError"), (H.stack = `${H.name}: ${H.message}`), t.push(nzt(H, r[0].annotations)));
    }
    return ((Error.stackTraceLimit = s), t);
  },
  nzt = (e, t) => {
    let r = typeof e,
      s;
    if (e && r === "object") {
      if (
        ((s = new globalThis.Error(aUs(e), { cause: e.cause ? nzt(e.cause) : void 0 })),
        typeof e.name === "string")
      )
        s.name = e.name;
      if (typeof e.stack === "string") s.stack = cUs(e.stack, s, t);
      else {
        let a = `${s.name}: ${s.message}`;
        s.stack = t ? enn(a, t) : a;
      }
      for (let a of Object.keys(e)) if (!(a in s)) s[a] = e[a];
    } else s = new globalThis.Error(!e ? `Unknown error: ${e}` : r === "string" ? e : Qfe(e));
    return s;
  },
  aUs = (e) => {
    if (typeof e.message === "string") return e.message;
    else if (
      typeof e.toString === "function" &&
      e.toString !== Object.prototype.toString &&
      e.toString !== Array.prototype.toString
    )
      try {
        return e.toString();
      } catch {}
    return Qfe(e);
  },
  HUs,
  cUs = (e, t, r) => {
    let s = `${t.name}: ${t.message}`,
      a = (e.startsWith(s) ? e.slice(s.length) : e).split(`
`),
      H = [s];
    for (let u = 1; u < a.length; u++) {
      if (/(?:Generator\.next|~effect\/Effect)/.test(a[u])) break;
      H.push(a[u]);
    }
    return r
      ? enn(
          H.join(`
`),
          r,
        )
      : H.join(`
`);
  },
  enn = (e, t) => {
    let r = t?.get(s2e.key);
    if (r)
      e = `${e}
${tnn(r)}`;
    return e;
  },
  AUs = (e, t) => {
    let r = [`${e.name}: ${e.message}`];
    for (let s of t) {
      let a = s.fiberId !== void 0 ? `#${s.fiberId}` : "unknown",
        H = s.annotations.get(Ntn.key);
      if ((r.push(`    at fiber (${a})`), H)) r.push(tnn(H));
    }
    return r.join(`
`);
  },
  tnn = (e) => {
    let t = [],
      r = e,
      s = 0;
    while (r && s < 10) {
      let a = r.stack();
      if (a) {
        let H = a.matchAll(HUs),
          u = !1;
        for (let [, f] of H) ((u = !0), t.push(`    at ${r.name} (${f})`));
        if (!u) t.push(`    at ${r.name} (${a.replace(/^at /, "")})`);
      } else t.push(`    at ${r.name}`);
      ((r = r.parent), s++);
    }
    return t.join(`
`);
  },
  $ye = (e) =>
    _zt(e).map((t) =>
      t.cause
        ? `${t.stack} {
${rnn(t.cause, "  ")}
}`
        : t.stack,
    ).join(`
`),
  rnn = (e, t) => {
    let r = e.stack.split(`
`),
      s = `${t}[cause]: ${r[0]}`;
    for (let a = 1, H = r.length; a < H; a++)
      s += `
${t}${r[a]}`;
    if (e.cause)
      s += ` {
${rnn(e.cause, `${t}  `)}
${t}}`;
    return s;
  },
  $ut,
  uUs,
  lUs,
  cpe = () => globalThis[tye],
  hzt,
  izt,
  j2e = (e) => {
    if (!e.currentStackFrame) return;
    let t = new Map();
    return (t.set(s2e.key, e.currentStackFrame), B0(t));
  },
  fUs = (e) => {
    if (e._children === void 0 || e._children.size === 0) return;
    return cie(e._children);
  },
  Lzt = (e) => {
    let t = e;
    if (t._exit) return Mu(t._exit);
    return bS((r) => {
      if (t._exit) return r(Mu(t._exit));
      return $p(e.addObserver((s) => r(Mu(s))));
    });
  },
  Ape = (e) =>
    bS((t) => {
      let r = e[Symbol.iterator](),
        s = [],
        a = void 0;
      function H() {
        let u = r.next();
        while (!u.done) {
          if (u.value._exit) {
            (s.push(u.value._exit), (u = r.next()));
            continue;
          }
          a = u.value.addObserver((f) => {
            (s.push(f), H());
          });
          return;
        }
        t(Mu(s));
      }
      return (H(), $p(() => a?.()));
    }),
  nnn = (e) => {
    let t = e;
    if (t._exit) return t._exit;
    return bS((r) => {
      if (t._exit) return r(t._exit);
      return $p(e.addObserver(r));
    });
  },
  gye = (e) => Hl((t) => $zt(e, t.id)),
  $zt,
  cie = (e) =>
    Hl((t) => {
      let r = j2e(t);
      for (let s of e) s.interruptUnsafe(t.id, r);
      return C2e(Ape(e));
    }),
  inn,
  Mu,
  V0,
  TU,
  $p,
  Gm,
  gzt,
  snn,
  P2e,
  Ezt = (e) => Mu(Lo(e)),
  upe,
  Eye = (e) => sie(e),
  Izt = (e) => Gm(() => TU(I$(e))),
  Lp,
  Dzt = (e) =>
    Gm(() => {
      try {
        return Mu(I$(e.try));
      } catch (t) {
        return TU(I$(() => e.catch(t)));
      }
    }),
  onn = (e) =>
    yzt(function (t, r) {
      I$(() => e(r)).then(
        (s) => t(Mu(s)),
        (s) => t(Eye(s)),
      );
    }, e.length !== 0),
  ann = (e) => {
    let t = typeof e === "function" ? e : e.try,
      r = typeof e === "function" ? (s) => new Fut(s, "An error occurred in Effect.tryPromise") : e.catch;
    return yzt(function (s, a) {
      try {
        I$(() => t(a)).then(
          (H) => s(Mu(H)),
          (H) => s(TU(I$(() => r(H)))),
        );
      } catch (H) {
        s(TU(I$(() => r(H))));
      }
    }, eval.length !== 0);
  },
  pUs = (e) => Hl((t) => e(t.id)),
  yzt,
  dUs,
  bS = (e) => yzt(e, e.length >= 2),
  Mzt,
  yut = (...e) => Gm(() => Lye(e.length === 1 ? e[0]() : e[1].call(e[0].self))),
  Iye = (e, ...t) => {
    let r =
      t.length === 0
        ? function () {
            return Gm(() => Lye(e.apply(this, arguments)));
          }
        : function () {
            let s = Gm(() => Lye(e.apply(this, arguments)));
            for (let a = 0; a < t.length; a++) s = t[a](s, ...arguments);
            return s;
          };
    return xzt(e.length, r);
  },
  xzt = (e, t) => Object.defineProperty(t, "length", { value: e, configurable: !0 }),
  Rrn,
  Hnn = function () {
    let e = typeof arguments[0] === "string",
      t = e ? arguments[0] : "Effect.fn",
      r = e ? arguments[1] : void 0,
      s = globalThis.Error.stackTraceLimit;
    globalThis.Error.stackTraceLimit = 2;
    let a = new globalThis.Error();
    if (((globalThis.Error.stackTraceLimit = s), e)) return (H, ...u) => Wrn(t, H, a, u, e, r);
    return Wrn(t, arguments[0], a, Array.prototype.slice.call(arguments, 1), e, r);
  },
  Wrn = (e, t, r, s, a, H) => {
    let u = typeof t === "function" ? t : s.pop().bind(t.self);
    return xzt(u.length, function (...f) {
      let d = Gm(() => {
        let I = u.apply(this, arguments);
        return L_(I) ? I : Lye(I);
      });
      for (let I = 0; I < s.length; I++) d = s[I](d, ...f);
      if (!L_(d)) return d;
      let _ = globalThis.Error.stackTraceLimit;
      globalThis.Error.stackTraceLimit = 2;
      let L = new globalThis.Error();
      return (
        (globalThis.Error.stackTraceLimit = _),
        w2e(a ? b2e(e, H, (I) => Hzt(d, I)) : d, y2e, (I) => ({
          name: e,
          stack: Rrn(() => L.stack),
          parent: { name: `${e} (definition)`, stack: Rrn(() => r.stack), parent: I },
        }))
      );
    });
  },
  cnn = (e, ...t) =>
    xzt(
      e.length,
      t.length === 0
        ? function () {
            return Vrn(() => e.apply(this, arguments));
          }
        : function () {
            let r = Vrn(() => e.apply(this, arguments));
            for (let s of t) r = s(r);
            return r;
          },
    ),
  Vrn = (e) => {
    try {
      let t = e(),
        r = void 0;
      while (!0) {
        let s = t.next(r);
        if (s.done) return Mu(s.value);
        let a = s.value;
        if (a && a._tag === "Success") {
          r = a.value;
          continue;
        } else if (a && a._tag === "Failure") return s.value;
        else {
          let H = !0;
          return Gm(() => {
            if (H) return ((H = !1), Fu(s.value, (u) => Lye(t, u)));
            else return Gm(() => Lye(e()));
          });
        }
      }
    } catch (t) {
      return Eye(t);
    }
  },
  Lye,
  WM,
  lpe = (e) => $_(e, Lo),
  g6,
  fpe,
  C2e = (e) => Fu(e, (t) => p1),
  Szt = (e, t) =>
    Hl((r) =>
      bS((s) => {
        let a = Xg(e),
          H = a.length,
          u = 0,
          f = !1,
          d = new Set(),
          _ = [],
          L = (I, D, S) => {
            if ((u++, I._tag === "Failure")) {
              if ((_.push(...I.cause.reasons), u >= H)) s(V0(iie(_)));
              return;
            }
            let T = !f;
            if (((f = !0), s(d.size === 0 ? I : Fu(MQ(cie(d)), () => I)), T && t?.onWinner))
              t.onWinner({ fiber: D, index: S, parentFiber: r });
          };
        for (let I = 0; I < H; I++) {
          let D = Gq(r, a[I], !0, !0, !1);
          if (
            (d.add(D),
            D.addObserver((S) => {
              (d.delete(D), L(S, D, I));
            }),
            f)
          )
            break;
        }
        return cie(d);
      }),
    ),
  Ann = (e, t) =>
    Hl((r) =>
      bS((s) => {
        let a = !1,
          H = new Set(),
          u = (d) => {
            ((a = !0), s(H.size === 0 ? d : Fu(MQ(cie(H)), () => d)));
          },
          f = 0;
        for (let d of e) {
          if (a) break;
          let _ = f++,
            L = Gq(r, d, !0, !0, !1);
          (H.add(L),
            L.addObserver((I) => {
              H.delete(L);
              let D = !a;
              if ((u(I), D && t?.onWinner)) t.onWinner({ fiber: L, index: _, parentFiber: r });
            }));
        }
        return cie(H);
      }),
    ),
  unn,
  Mut,
  Fu,
  mUs,
  lnn,
  NC = (e) => Yfe in e,
  fnn,
  pnn = (e) => Fu(e, Za),
  $_,
  dnn,
  mnn,
  _nn,
  hnn,
  xut = (e) => Mv(Hpe(e)),
  Dye = (e) => e._tag === "Success",
  Sut = (e) => e._tag === "Failure",
  Lnn = (e) => (e._tag === "Failure" ? D$(e.cause) : dh(e)),
  $nn = (e) => e._tag === "Failure" && Iut(e.cause),
  p1,
  gnn,
  Tzt,
  Enn,
  Inn,
  Dnn = (e) => {
    let t = [];
    for (let r of e) if (r._tag === "Failure") t.push(...r.cause.reasons);
    return t.length === 0 ? p1 : Mv(iie(t));
  },
  ynn = (e) => (Dye(e) ? Lo(e.value) : eH()),
  Mnn = (e) => e,
  xnn = (e) => Hl((t) => Mu(LQ(t.context, e))),
  IQ,
  w2e,
  Snn = () => _Us,
  _Us,
  Aie = (e) => Hl((t) => e(t.context)),
  DQ,
  qq = function () {
    if (arguments.length === 1) return Wr(2, (e, t) => qrn(e, arguments[0], t));
    return Wr(3, (e, t, r) => qrn(e, t, r)).apply(this, arguments);
  },
  qrn = (e, t, r) =>
    IQ(e, (s) => {
      if (s.mapUnsafe.get(t.key) === r) return s;
      return Oh(s, t, r);
    }),
  vzt,
  Tnn,
  vnn,
  yye,
  vU,
  hUs,
  bnn,
  k2e,
  yW,
  jnn,
  Pnn,
  Cnn,
  wnn,
  Tut,
  bzt,
  jzt,
  knn,
  Onn,
  Pzt,
  Unn,
  vut = (e) => yW(e, Eye),
  Nnn,
  but,
  Fnn,
  Bnn = (e) => jut(e, { onFailure: eH, onSuccess: Lo }),
  T2e = (e) => Rnn(e, { onFailure: dh, onSuccess: D$ }),
  Vq,
  LUs,
  O2e,
  jut,
  Rnn,
  ppe = (e) => (NC(e) ? kh(e) : $Us(e)),
  $Us,
  Wnn,
  Czt,
  Vnn,
  qnn,
  szt = "~effect/Scope",
  ozt = "~effect/Scope/Closeable",
  Mye,
  wzt = (e, t) => Gm(() => U2e(e, t) ?? Lp),
  U2e = (e, t) => {
    if (e.state._tag === "Closed") return;
    let r = { _tag: "Closed", exit: t };
    if (e.state._tag === "Empty") {
      e.state = r;
      return;
    }
    let { finalizers: s } = e.state;
    if (((e.state = r), s.size === 0)) return;
    else if (s.size === 1) return s.values().next().value(t);
    return gUs(e, s, t);
  },
  gUs,
  Gnn = (e, t) => $p(() => kzt(e, t)),
  kzt = (e, t) => {
    let r = xye(t);
    if (e.state._tag === "Closed") return ((r.state = e.state), r);
    let s = {};
    return (v2e(e, s, (a) => wzt(r, a)), v2e(r, s, (a) => $p(() => Ozt(e, s))), r);
  },
  MW = (e, t) =>
    Gm(() => {
      if (e.state._tag === "Closed") return t(e.state.exit);
      return (v2e(e, {}, t), Lp);
    }),
  Xnn = (e, t) => MW(e, ph(t)),
  v2e = (e, t, r) => {
    if (e.state._tag === "Empty") e.state = { _tag: "Open", finalizers: new Map([[t, r]]) };
    else if (e.state._tag === "Open") e.state.finalizers.set(t, r);
  },
  Ozt = (e, t) => {
    if (e.state._tag === "Open") e.state.finalizers.delete(t);
  },
  xye = (e = "sequential") => ({ [ozt]: ozt, [szt]: szt, strategy: e, state: EUs }),
  EUs,
  Jnn = (e) => $p(() => xye(e)),
  dpe,
  Knn,
  Uzt = (e) =>
    Hl((t) => {
      let r = t.context,
        s = xye();
      return (t.setContext(Oh(t.context, Mye, s)), yQ(e, (a) => (t.setContext(r), U2e(s, a))));
    }),
  Put = (e) =>
    Gm(() => {
      let t = xye();
      return FC(e(t), (r) => Gm(() => U2e(t, r) ?? Lp));
    }),
  znn = (e, t, r) =>
    Aie((s) =>
      E6((a) => Fu(dpe, (H) => fpe(r?.interruptible ? a(e) : e, (u) => MW(H, (f) => DQ(t(u, f), s))))),
    ),
  N2e = (e) => Fu(dpe, (t) => Aie((r) => MW(t, (s) => DQ(e(s), r)))),
  yQ,
  FC,
  Qnn,
  Ynn,
  Nzt,
  Znn,
  ein,
  tin = (e, t, r) => E6((s) => Fu(e, (a) => yQ(s(t(a)), (H) => r(a, H), !0))),
  Fzt,
  Bzt,
  rin = (e) => Bzt(e, SU),
  Sye,
  MQ = (e) =>
    Hl((t) => {
      if (!t.interruptible) return e;
      return ((t.interruptible = !1), t._stack.push(Cut), e);
    }),
  nin,
  Cut,
  iin,
  Rzt = (e) =>
    Hl((t) => {
      if (t.interruptible) return e;
      if (((t.interruptible = !0), t._stack.push(iin), t._interruptedCause)) return V0(t._interruptedCause);
      return e;
    }),
  E6 = (e) =>
    Hl((t) => {
      if (!t.interruptible) return e(Za);
      return ((t.interruptible = !1), t._stack.push(Cut), e(Rzt));
    }),
  sin = (e) =>
    Hl((t) => {
      if (t.interruptible) return e(Za);
      return ((t.interruptible = !0), t._stack.push(iin), e(MQ));
    }),
  Wzt = (e, t) => {
    if (vtn(e)) return t?.mode === "result" ? EQ(e, T2e, t) : EQ(e, Za, t);
    else if (t?.discard)
      return t.mode === "result" ? EQ(Object.values(e), T2e, t) : EQ(Object.values(e), Za, t);
    return Gm(() => {
      let r = {};
      return WM(
        EQ(
          Object.entries(e),
          ([s, a]) =>
            $_(t?.mode === "result" ? T2e(a) : a, (H) => {
              r[s] = H;
            }),
          { discard: !0, concurrency: t?.concurrency },
        ),
        r,
      );
    });
  },
  Tye,
  EQ,
  IUs = (e, t, r) =>
    Gm(() => {
      let s = r?.discard ? void 0 : [],
        a = e[Symbol.iterator](),
        H = a.next(),
        u = 0;
      return WM(
        Tye({
          while: () => !H.done,
          body: () => t(H.value, u++),
          step: (f) => {
            if (s) s.push(f);
            H = a.next();
          },
        }),
        s,
      );
    }),
  oin = (e) => {
    let { onItem: t, step: r } = e;
    return (s, a, H) => {
      let u = H?.start ?? 0,
        f = H?.end ?? a.length,
        d = H?.concurrency ?? 1,
        _ = !1,
        L,
        I,
        D,
        S = !1,
        T,
        C,
        O = () => {
          let B = !1;
          for (; !T && u < f; u++) {
            let V = a[u],
              q = C ?? t(s, V, u);
            if (NC(q)) {
              if (((T = r(s, V, q, u)), T)) break;
            } else if (d === 1) return Fu(ppe(q), (Z) => ((T = r(s, V, Z, u)), u++, T ?? O() ?? Lp));
            else if (!L)
              return bS((Z) => {
                ((L = cpe()), (C = q), (D = Z));
                let se = O();
                if (se) return Z(se);
                return Gm(() => ((T = p1), (S = !0), I ? cie(I) : Lp));
              });
            else {
              C = void 0;
              let Z = Gq(L, q, !0, !0, "inherit");
              if (Z._exit) {
                if (((T = r(s, V, Z._exit, u)), T)) break;
                continue;
              }
              if (I) I.add(Z);
              else I = new Set([Z]);
              let se = u;
              if (
                (Z.addObserver((ae) => {
                  if ((I.delete(Z), T)) {
                    if (!S && ae._tag === "Failure")
                      for (let z of ae.cause.reasons)
                        if (z._tag === "Interrupt") continue;
                        else if (T._tag === "Failure") T.cause.reasons.push(z);
                        else T = Mv(iie([z]));
                  } else {
                    let z = r(s, V, ae, se);
                    if (z) ((T = z._tag === "Failure" ? Mv(iie(z.cause.reasons.slice())) : z), O());
                  }
                  if (B) {
                    let z = O();
                    if (z) D(z);
                  } else if (_ && I.size === 0) D(T ?? Lp);
                }),
                I.size < d)
              )
                continue;
              ((B = !0), u++);
              return;
            }
          }
          if (((_ = !0), T)) {
            if (I && I.size > 0) {
              let V = j2e(L);
              I.forEach((q) => q.interruptUnsafe(L.id, V));
              return;
            }
            if (D || T._tag === "Failure") return T;
          } else if (D) {
            if (!I) return p1;
            else if (I.size === 0) D(Lp);
          }
        };
      return O();
    };
  },
  F2e = () => oin,
  DUs,
  ain,
  Gq = (e, t, r = !1, s = !1, a = !1) => {
    let H = a === "inherit" ? e.interruptible : !a,
      u = new hzt(e.context, H);
    if (r) u.evaluate(t);
    else e.currentDispatcher.scheduleTask(() => u.evaluate(t), 0);
    if (!s && !u._exit) (e.children().add(u), u.addObserver(() => e._children.delete(u)));
    return u;
  },
  wut,
  Vzt,
  Hin,
  vye = (e) => (t, r) => {
    let s = new hzt(r?.scheduler ? Oh(e, qKt, r.scheduler) : e, r?.uninterruptible !== !0);
    if ((s.evaluate(t), s._exit)) return s;
    if (r?.signal)
      if (r.signal.aborted) s.interruptUnsafe();
      else {
        let a = () => s.interruptUnsafe();
        (r.signal.addEventListener("abort", a, { once: !0 }),
          s.addObserver(() => r.signal.removeEventListener("abort", a)));
      }
    if (r?.onFiberStart) r.onFiberStart(s);
    return s;
  },
  cin,
  Ain,
  qzt = (e) => {
    let t = vye(e);
    return (r, s) => {
      let a = t(r, s);
      if (s?.onExit) a.addObserver(s.onExit);
      return (H) => a.interruptUnsafe(H);
    };
  },
  uin,
  kut = (e) => {
    let t = vye(e);
    return (r, s) => {
      let a = t(r, s);
      return new Promise((H) => {
        a.addObserver((u) => H(u));
      });
    };
  },
  lin,
  Gzt = (e) => {
    let t = kut(e);
    return (r, s) =>
      t(r, s).then((a) => {
        if (a._tag === "Failure") throw Dut(a.cause);
        return a.value;
      });
  },
  fin,
  Out = (e) => {
    let t = vye(e);
    return (r) => {
      if (NC(r)) return r;
      let s = new mye("sync"),
        a = t(r, { scheduler: s });
      return (a.currentDispatcher?.flush(), a._exit ?? sie(new Zzt(a)));
    };
  },
  pin,
  Xzt = (e) => {
    let t = Out(e);
    return (r) => {
      let s = t(r);
      if (s._tag === "Failure") throw Dut(s.cause);
      return s.value;
    };
  },
  din,
  Grn,
  Xrn,
  Uut = (e) => new min(e ?? !1),
  _in = (e) => $p(() => Uut(e)),
  hin,
  azt,
  yUs,
  MUs = (e) => Object.assign(Object.create(yUs), e),
  Lin = (e) => {
    if (!e) return eH();
    return Pp(e.annotations, hye) ? (e._tag === "Span" ? Lin(OL(e.parent)) : eH()) : Lo(e);
  },
  bye = (e, t, r) => {
    let s = !e.getRef(M2e) || (r?.annotations && Pp(r.annotations, hye)),
      a = r?.parent !== void 0 ? Lo(r.parent) : r?.root ? eH() : Lin(e.currentSpan),
      H;
    if (s) H = MUs({ name: t, parent: a, annotations: Oh(r?.annotations ?? Hg(), hye, !0) });
    else {
      let u = e.getRef(mut),
        f = e.getRef(Cv),
        d = e.getRef(x2e),
        _ = e.getRef(QKt),
        L = e.getRef(YKt),
        I = r?.level ?? e.getRef(krn),
        D = r?.links !== void 0 ? [...L, ...r.links] : L.slice();
      H = u.span({
        name: t,
        parent: a,
        annotations: r?.annotations ?? Hg(),
        links: D,
        startTime: d ? f.currentTimeNanosUnsafe() : BigInt(0),
        kind: r?.kind ?? "internal",
        root: r?.root ?? vl(a),
        sampled: r?.sampled ?? (Nu(a) && a.value.sampled === !1 ? !1 : !Din(e.getRef(Orn), I)),
      });
      for (let [S, T] of Object.entries(_)) H.attribute(S, T);
      if (r?.attributes !== void 0) for (let [S, T] of Object.entries(r.attributes)) H.attribute(S, T);
    }
    return H;
  },
  Jzt = (e, t) =>
    MQ(
      Hl((r) => {
        let s = cg(r.context, Mye),
          a = bye(r, e, t ?? {}),
          H = r.getRef(Cv),
          u = r.getRef(x2e);
        return WM(
          MW(s, (f) => Kzt(a, f, H, u)),
          a,
        );
      }),
    ),
  xUs = (e, t) => (
    (t = typeof t === "function" ? t : IU),
    w2e(y2e, (r) => ({ name: e, stack: t, parent: r }))
  ),
  Kzt = (e, t, r, s) =>
    $p(() => {
      if (e.status._tag === "Ended") return;
      e.end(s ? r.currentTimeNanosUnsafe() : azt, t);
    }),
  b2e = (e, ...t) => {
    let r = t.length === 1 ? void 0 : t[0],
      s = t[t.length - 1];
    return Hl((a) => {
      let H = bye(a, e, r),
        u = a.getRef(Cv);
      return FC(
        I$(() => s(H)),
        (f) =>
          $p(() => {
            if (H.status._tag === "Ended") return;
            H.end(u.currentTimeNanosUnsafe(), f);
          }),
      );
    });
  },
  Hzt,
  gut = function () {
    let e = L_(arguments[0]),
      t = e ? arguments[1] : arguments[0],
      r = e ? arguments[2] : arguments[1],
      s = Za;
    if (t._tag === "Span") ((r = tzt(r)), (s = xUs(t.name, r?.captureStackTrace)));
    if (e) return Hzt(s(arguments[0]), t);
    return (a) => Hzt(s(a), t);
  },
  $in = function () {
    let e = typeof arguments[0] !== "string",
      t = e ? arguments[1] : arguments[0],
      r = tzt(arguments[2]);
    if (e) {
      let H = arguments[0];
      return b2e(t, arguments[2], (u) => gut(H, u, r));
    }
    let s = typeof arguments[1] === "function" ? arguments[1] : void 0,
      a = s ? void 0 : arguments[1];
    return (H, ...u) => b2e(t, s ? s(...u) : a, (f) => gut(H, f, r));
  },
  Cv,
  SUs = 2147483647,
  Jrn,
  TUs,
  mpe = (e) => Hl((t) => e(t.getRef(Cv))),
  xQ = (e) => mpe((t) => t.sleep(Ag(e))),
  Nut,
  Eut = "~effect/Cause/TimeoutError",
  Ein = (e) => Ma(e, Eut),
  zzt,
  czt = "~effect/Cause/IllegalArgumentError",
  Qzt,
  Azt = "~effect/Cause/ExceededCapacityError",
  Yzt,
  uzt = "~effect/Cause/AsyncFiberError",
  Zzt,
  lzt = "~effect/Cause/UnknownError",
  Fut,
  Iin,
  vUs = (e) => {
    switch (e) {
      case "All":
        return Number.MIN_SAFE_INTEGER;
      case "Fatal":
        return 50000;
      case "Error":
        return 40000;
      case "Warn":
        return 30000;
      case "Info":
        return 20000;
      case "Debug":
        return 1e4;
      case "Trace":
        return 0;
      case "None":
        return Number.MAX_SAFE_INTEGER;
    }
  },
  bUs,
  Din,
  B2e,
  yin,
  jUs = "~effect/Logger",
  PUs,
  _pe = (e) => {
    let t = Object.create(PUs);
    return ((t.log = e), t);
  },
  Min = (e) => e.replace(/[\s="]/g, "_"),
  xin = (e, t) => `${Min(e[0])}=${t - e[1]}ms`,
  But = (e) => {
    switch (typeof e) {
      case "bigint":
      case "function":
      case "symbol":
        return String(e);
      default:
        return BM(e);
    }
  },
  uie =
    (e) =>
    (...t) => {
      let r = void 0;
      for (let s = 0, a = t.length; s < a; s++) {
        let H = t[s];
        if (sye(H)) {
          if (r) t.splice(s, 1);
          else t = t.slice(0, s).concat(t.slice(s + 1));
          ((r = r ? iie(r.reasons.concat(H.reasons)) : H), s--);
        }
      }
      if (r === void 0) r = KAt;
      return Hl((s) => {
        let a = e ?? s.currentLogLevel;
        if (Din(s.minimumLogLevel, a)) return Lp;
        let H = s.getRef(Cv),
          u = s.getRef(B2e);
        if (u.size > 0) {
          let f = new Date(H.currentTimeMillisUnsafe());
          for (let d of u) d.log({ cause: r, fiber: s, date: f, logLevel: a, message: t });
        }
        return Lp;
      });
    },
  ape,
  tuH,
  CUs = (e) =>
    `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}:${e.getSeconds().toString().padStart(2, "0")}.${e.getMilliseconds().toString().padStart(3, "0")}`,
  Sin,
  Tin,
  Rut,
  vin,
  Wut = (e, t, r) => {
    let s = e.getRef(Frn);
    if (s.size === 0) return;
    if (r && !pzt(t)) return;
    let a = { cause: t, fiber: e, timestamp: e.getRef(Cv).currentTimeNanosUnsafe() };
    s.forEach((H) => H.report(a));
  };