
function to(e, t, r, s) {
  let a = {};
  function H(D) {
    ((this.def = D), (this.constr = I), (this.traits = new Set()));
  }
  H.prototype = a;
  let u = r,
    f = u && new WeakSet();
  function d(D, S) {
    if (!D._zod) {
      eEr.value = new H(S);
      try {
        Object.defineProperty(D, "_zod", eEr);
      } finally {
        eEr.value = void 0;
      }
    } else if (D._zod.traits.has(e)) return;
    if ((D._zod.traits.add(e), t(D, S), f)) {
      let C = Object.getPrototypeOf(D),
        O = D._zod.constr.prototype,
        B = C;
      while (B && B !== O) B = Object.getPrototypeOf(B);
      let V = B ?? C;
      if (!f.has(V)) (f.add(V), wvi(V, u));
    }
    let T = I.prototype;
    for (let C in T) {
      if (!Object.prototype.hasOwnProperty.call(T, C)) continue;
      if (!(C in D)) D[C] = T[C].bind(D);
    }
  }
  let _ = s?.Parent ?? Object;
  class L extends _ {}
  Object.defineProperty(L, "name", { value: e });
  function I(D) {
    let S = s?.Parent ? hDa(L) : this;
    d(S, D);
    let T = S._zod.deferred;
    if (T) {
      for (let O of T) O();
      S._zod.deferred = void 0;
    }
    let C = globalThis.__zod_globalConfig?.postProcessor;
    if (C) C(S);
    return S;
  }
  return (
    Object.defineProperty(I, "init", { value: d }),
    Object.defineProperty(I, Symbol.hasInstance, {
      value: (D) => {
        if (s?.Parent && D instanceof s.Parent) return !0;
        return D?._zod?.traits?.has(e);
      },
    }),
    Object.defineProperty(I, "name", { value: e }),
    I
  );
}