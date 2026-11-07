
function mDa(e, t, r, s) {
  let a = pDa(e, t);
  if (!a) return;
  Object.defineProperty(a, t, {
    configurable: !0,
    get() {
      let H = { configurable: !0, writable: !0, enumerable: s, value: void 0 };
      return (
        Object.defineProperty(this, t, H),
        (H.value = r(this)),
        Object.defineProperty(this, t, H),
        H.value
      );
    },
    set(H) {
      Object.defineProperty(this, t, { configurable: !0, writable: !0, enumerable: s, value: H });
    },
  });
}