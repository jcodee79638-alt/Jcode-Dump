
function Dvi(e, t, r) {
  Object.defineProperty(e, t, {
    get() {
      let s = r();
      return (wN(this, t, s), s);
    },
    enumerable: !0,
    configurable: !0,
  });
}