
function wm(e, t, r) {
  let s = Object.getPrototypeOf(e._zod);
  if (t in s && X0r !== e._zod) {
    X0r = void 0;
    return;
  }
  ((X0r = e._zod),
    Object.defineProperty(s, t, {
      configurable: !0,
      get() {
        Object.defineProperty(this, t, dDa);
        let a = fHe;
        fHe = !1;
        try {
          let H = r(this);
          if (fHe) delete this[t];
          else Object.defineProperty(this, t, { configurable: !0, writable: !0, value: H });
          return ((fHe = fHe || a), H);
        } catch (H) {
          throw (delete this[t], (fHe = fHe || a), H);
        }
      },
      set(a) {
        Object.defineProperty(this, t, { configurable: !0, writable: !0, value: a });
      },
    }));
}