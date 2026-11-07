
const ga = {
  get(e, n, i) {
    return n === kr ? i : e.get(n);
  },
  has(e, n) {
    return n === kr ? !0 : e.has(n);
  },
  set: Pn,
  deleteProperty: Pn,
  getOwnPropertyDescriptor(e, n) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(n);
      },
      set: Pn,
      deleteProperty: Pn,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};