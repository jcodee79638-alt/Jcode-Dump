
function fDa(e, t, r) {
  Object.defineProperty(e, t, {
    configurable: !0,
    get() {
      return this == null ? r : GZ(this, t, r.bind(this));
    },
    set(s) {
      GZ(this, t, s);
    },
  });
}