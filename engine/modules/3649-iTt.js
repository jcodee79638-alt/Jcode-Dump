
function iTt(e, t, r) {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    get() {
      let s = r(this);
      return (Object.defineProperty(this, t, { value: s, configurable: !0, writable: !0 }), s);
    },
    set(s) {
      Object.defineProperty(this, t, { value: s, configurable: !0, writable: !0 });
    },
  });
}