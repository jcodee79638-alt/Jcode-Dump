
var iPi = ne(() => {
  k8();
  tPi = class tPi extends Error {
    constructor() {
      super("Cannot parse a reference cycle that closes through a transform");
      this.name = "ZodCyclicError";
    }
  };
  ePi = [];
  nPi = new WeakMap();
  ((qSt = []),
    (GDa = {
      alloc(e, t, r) {
        let s = VSt;
        if (!s) return r;
        VSt = void 0;
        let a = { value: r, issues: null };
        return (s.set(t.value, a), qSt.push(a), r);
      },
      guard(e) {
        var t;
        ((t = e._zod).deferred ?? (t.deferred = []),
          e._zod.deferred.push(() => {
            let r = e._zod.parse,
              s = (a, H) => {
                if (H.direction !== "backward" && XDa(H, a.value)) throw new tPi();
                return r(a, H);
              };
            if (((e._zod.parse = s), e._zod.run === r)) e._zod.run = s;
          }));
      },
      attach(e) {
        var t;
        let r,
          s = !1,
          a,
          H;
        ((t = e._zod).deferred ?? (t.deferred = []),
          e._zod.deferred.push(() => {
            let u = e._zod.parse,
              f = (d, _) => {
                if (r === void 0) {
                  let B = XSt(e, new Set(), !1);
                  if (B === a5e) {
                    if (((e._zod.parse = u), e._zod.run === f)) e._zod.run = u;
                    return u(d, _);
                  }
                  if (B === H5e || s) r = !0;
                  else s = !0;
                }
                let L = d.value;
                if (!rPi(L)) return u(d, _);
                let I = _[yEr];
                if (!I) ((I = { buckets: new WeakMap(), backEdges: void 0 }), (_[yEr] = I));
                let D;
                if (a === _) D = H;
                else ((D = qDa(I, e)), (a = _), (H = D));
                let S = D.get(L);
                if (S) {
                  if (((d.value = S.value), S.issues)) {
                    if (S.issues.length) d.issues.push(...DEr(S.issues));
                  } else
                    ((d.memo = !0), I.backEdges ?? (I.backEdges = new WeakSet()), I.backEdges.add(S.value));
                  return d;
                }
                VSt = D;
                let T = qSt.length,
                  C = u(d, _);
                VSt = void 0;
                let O = qSt.length > T ? qSt.pop() : void 0;
                if (C instanceof Promise)
                  return C.then((B) => {
                    if (O) O.issues = B.issues.length ? DEr(B.issues) : ePi;
                    return B;
                  });
                if (O) O.issues = C.issues.length ? DEr(C.issues) : ePi;
                return C;
              };
            if (((e._zod.parse = f), e._zod.run === u)) e._zod.run = f;
          }));
      },
    }));
});