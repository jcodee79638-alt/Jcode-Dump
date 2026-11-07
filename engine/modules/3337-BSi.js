
var BSi = "~effect/httpapi/HttpApiMiddleware",
  l0r = "~effect/httpapi/HttpApiMiddleware/Security",
  rSt = (e) => Ma(e, l0r),
  CZ = () => (e, t) => {
    let r = globalThis.Error,
      s = r.stackTraceLimit;
    r.stackTraceLimit = 2;
    let a = new r();
    r.stackTraceLimit = s;
    class H extends _i()(e) {}
    let u = H;
    if (
      (Object.defineProperty(H, "stack", {
        get() {
          return a.stack;
        },
      }),
      (u[BSi] = BSi),
      (u.error = nEa(t?.error)),
      (u.requiredForClient = t?.requiredForClient ?? !1),
      t?.security !== void 0)
    ) {
      if (Object.keys(t.security).length === 0)
        throw Error("HttpApiMiddleware.Service: security object must not be empty");
      ((u[l0r] = l0r), (u.security = t.security));
    }
    return u;
  },
  RSi = (e, t) => bf(e, (r, s) => $s(r, (a) => (kB.is(a) ? t(a, s) : bn(a))));