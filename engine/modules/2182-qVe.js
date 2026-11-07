
var qVe = Ie(function (vkn) {
  Object.defineProperty(vkn, "__esModule", { value: !0 });
  vkn.ROOT_CONTEXT = vkn.createContextKey = void 0;
  function nho(e) {
    return Symbol.for(e);
  }
  vkn.createContextKey = nho;
  class Y$t {
    constructor(e) {
      let t = this;
      ((t._currentContext = e ? new Map(e) : new Map()),
        (t.getValue = (r) => t._currentContext.get(r)),
        (t.setValue = (r, s) => {
          let a = new Y$t(t._currentContext);
          return (a._currentContext.set(r, s), a);
        }),
        (t.deleteValue = (r) => {
          let s = new Y$t(t._currentContext);
          return (s._currentContext.delete(r), s);
        }));
    }
  }
  vkn.ROOT_CONTEXT = new Y$t();
});