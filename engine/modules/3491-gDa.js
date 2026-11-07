
var gDa,
  nEr,
  Fvi,
  Bvi = (e, t) => {
    ((e.name = "$ZodError"),
      (nEr.value = t),
      Object.defineProperty(e, "issues", nEr),
      (nEr.value = void 0),
      Object.defineProperty(e, "message", gDa));
    let r = Object.getPrototypeOf(e);
    if (!Fvi.has(r))
      (Fvi.add(r),
        Object.defineProperty(r, "toString", {
          configurable: !0,
          enumerable: !1,
          get() {
            let s = () => this.message;
            return (Object.defineProperty(this, "toString", { value: s, configurable: !0, writable: !0 }), s);
          },
          set(s) {
            Object.defineProperty(this, "toString", { value: s, configurable: !0, writable: !0 });
          },
        }));
  },
  Rvi,
  Wvi;