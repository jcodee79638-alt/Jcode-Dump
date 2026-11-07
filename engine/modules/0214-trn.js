
var trn = "~effect/Context/Service",
  _i = function () {
    let e = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    let t = Error();
    Error.stackTraceLimit = e;
    function r() {}
    let s = r;
    if (
      (Object.setPrototypeOf(s, gOs),
      Object.defineProperty(s, "stack", {
        get() {
          return t.stack;
        },
      }),
      arguments.length > 0)
    ) {
      if (((s.key = arguments[0]), arguments[1]?.defaultValue))
        ((s[eut] = eut), (s.defaultValue = arguments[1].defaultValue));
      return s;
    }
    return function (a, H) {
      if (((s.key = a), H?.make)) s.make = H.make;
      return s;
    };
  },
  gOs,
  eut = "~effect/Context/Reference",
  rrn = "~effect/Context",
  B0 = (e) => {
    let t = Object.create(EOs);
    return ((t.mapUnsafe = e), (t.mutable = !1), t);
  },
  EOs,
  d2e = (e) => Ma(e, rrn),
  nrn = (e) => Ma(e, eut),
  Hg = () => IOs,
  IOs,
  hQ = (e, t) => B0(new Map([[e.key, t]])),
  Oh,
  pye,
  rpe,
  cg,
  Pp,
  npe = (e, t) => {
    if (!e.mapUnsafe.has(t.key)) return tut(t);
    return e.mapUnsafe.get(t.key);
  },
  vKt = "~effect/Context/defaultValue",
  tut = (e) => {
    if (vKt in e) return e[vKt];
    return (e[vKt] = e.defaultValue());
  },
  DOs = (e) => {
    let t = Error(`Service not found${e.key ? `: ${String(e.key)}` : ""}`);
    if (e.stack) {
      let r = e.stack.split(`
`);
      if (r.length > 2) {
        let s = r[2].match(/at (.*)/);
        if (s) t.message = t.message + ` (defined at ${s[1]})`;
      }
    }
    if (t.stack) {
      let r = t.stack.split(`
`);
      (r.splice(1, 3),
        (t.stack = r.join(`
`)));
    }
    return t;
  },
  LQ,
  _I,
  irn = (...e) => {
    let t = new Map();
    for (let r = 0; r < e.length; r++)
      e[r].mapUnsafe.forEach((s, a) => {
        t.set(a, s);
      });
    return B0(t);
  },
  bKt =
    (...e) =>
    (t) =>
      PKt(t, (r) => {
        for (let s = 0; s < e.length; s++) r.delete(e[s].key);
      }),
  jKt,
  PKt = (e, t) => {
    if (e.mutable) return (t(e.mapUnsafe), e);
    let r = new Map(e.mapUnsafe);
    return (t(r), B0(r));
  },
  bA;