
var CTn,
  yTn,
  Iw,
  Jao,
  oN,
  Mxe,
  xLt = "constructor",
  PLt = "prototype",
  yor = "configurable",
  SLt = "enumerable",
  yLt = "writable",
  YWe = "value",
  eoe = (e) => !!e && !!e[Iw],
  Kao,
  MTn,
  xTn = (e, t, r = tVe(e)) => (r === 2 ? e.has(t) : oN[PLt].hasOwnProperty.call(e, t)),
  Mor = (e, t, r = tVe(e)) => (r === 2 ? e.get(t) : e[t]),
  TLt = (e, t, r, s = tVe(e)) => {
    if (s === 2) e.set(t, r);
    else if (s === 3) e.add(r);
    else e[t] = r;
  },
  wLt,
  kLt = (e) => e instanceof Map,
  OLt = (e) => e instanceof Set,
  Por = (e) => typeof e === "object",
  ume = (e) => typeof e === "function",
  Ior = (e) => typeof e === "boolean",
  UY = (e) => e.copy_ || e.base_,
  Cor = (e) => (e.modified_ ? e.copy_ : e.base_),
  DLt,
  vLt = "MapSet",
  Sor = "Patches",
  STn = "ArrayMethods",
  kTn,
  TTn = (e) => !!kTn[e],
  ZWe,
  OTn = () => ZWe,
  Zao = (e, t) => ({
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
    handledSet_: new Set(),
    processedForPatches_: new Set(),
    mapSetPlugin_: TTn(vLt) ? lme(vLt) : void 0,
    arrayMethodsPlugin_: TTn(STn) ? lme(STn) : void 0,
  }),
  bTn = (e) => (ZWe = Zao(ZWe, e)),
  NLt = (e, t) => e.scope_ === t,
  rHo,
  jLt,
  eVe,
  aHo = class {
    constructor(e) {
      if (
        ((this.autoFreeze_ = !0),
        (this.useStrictShallowCopy_ = !1),
        (this.useStrictIteration_ = !1),
        (this.produce = (t, r, s) => {
          if (ume(t) && !ume(r)) {
            let H = r;
            r = t;
            let u = this;
            return function (d = H, ..._) {
              return u.produce(d, (L) => r.call(this, L, ..._));
            };
          }
          if (!ume(r)) sN(6);
          if (s !== void 0 && !ume(s)) sN(7);
          let a;
          if (NY(t)) {
            let H = bTn(this),
              u = jor(H, t, void 0),
              f = !0;
            try {
              ((a = r(u)), (f = !1));
            } finally {
              if (f) Tor(H);
              else vor(H);
            }
            return (vTn(H, s), jTn(a, H));
          } else if (!t || !Por(t)) {
            if (((a = r(t)), a === void 0)) a = t;
            if (a === CTn) a = void 0;
            if (this.autoFreeze_) wor(a, !0);
            if (s) {
              let H = [],
                u = [];
              (lme(Sor).generateReplacementPatches_(t, a, { patches_: H, inversePatches_: u }), s(H, u));
            }
            return a;
          } else sN(1, t);
        }),
        (this.produceWithPatches = (t, r) => {
          if (ume(t)) return (u, ...f) => this.produceWithPatches(u, (d) => t(d, ...f));
          let s, a;
          return [
            this.produce(t, r, (u, f) => {
              ((s = u), (a = f));
            }),
            s,
            a,
          ];
        }),
        Ior(e?.autoFreeze))
      )
        this.setAutoFreeze(e.autoFreeze);
      if (Ior(e?.useStrictShallowCopy)) this.setUseStrictShallowCopy(e.useStrictShallowCopy);
      if (Ior(e?.useStrictIteration)) this.setUseStrictIteration(e.useStrictIteration);
    }
    createDraft(e) {
      if (!NY(e)) sN(8);
      if (eoe(e)) e = HHo(e);
      let t = bTn(this),
        r = jor(t, e, void 0);
      return ((r[Iw].isManual_ = !0), vor(t), r);
    }
    finishDraft(e, t) {
      let r = e && e[Iw];
      if (!r || !r.isManual_) sN(9);
      let { scope_: s } = r;
      return (vTn(s, t), jTn(void 0, s));
    }
    setAutoFreeze(e) {
      this.autoFreeze_ = e;
    }
    setUseStrictShallowCopy(e) {
      this.useStrictShallowCopy_ = e;
    }
    setUseStrictIteration(e) {
      this.useStrictIteration_ = e;
    }
    shouldUseStrictIteration() {
      return this.useStrictIteration_;
    }
    applyPatches(e, t) {
      let r;
      for (r = t.length - 1; r >= 0; r--) {
        let a = t[r];
        if (a.path.length === 0 && a.op === "replace") {
          e = a.value;
          break;
        }
      }
      if (r > -1) t = t.slice(r + 1);
      let s = lme(Sor).applyPatches_;
      if (eoe(e)) return s(e, t);
      return this.produce(e, (a) => s(a, t));
    }
  },
  cHo,
  fme,
  pme = (e) => e;