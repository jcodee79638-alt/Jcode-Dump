
function Ivi(e, t, r) {
  let s = void 0;
  Object.defineProperty(e, t, {
    get() {
      if (s === Lvi) return;
      if (s === void 0) ((s = Lvi), (s = r()));
      return s;
    },
    set(a) {
      Object.defineProperty(e, t, { value: a });
    },
    configurable: !0,
  });
}