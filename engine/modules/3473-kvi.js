
function kvi(e, t) {
  for (let r in e) {
    let s = e[r];
    Object.defineProperty(t, r, {
      configurable: !0,
      enumerable: !0,
      get() {
        return GZ(this, r, s(this));
      },
      set(a) {
        GZ(this, r, a);
      },
    });
  }
  return t;
}