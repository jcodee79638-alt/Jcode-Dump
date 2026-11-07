
var iVn = Ie(function (rVn) {
  Object.defineProperty(rVn, "__esModule", { value: !0 });
  rVn.callWithTimeout = rVn.TimeoutError = void 0;
  class Sgt extends Error {
    constructor(e) {
      super(e);
      Object.setPrototypeOf(this, Sgt.prototype);
    }
  }
  rVn.TimeoutError = Sgt;
  function Evo(e, t) {
    let r,
      s = new Promise(function (H, u) {
        r = setTimeout(function () {
          u(new Sgt("Operation timed out."));
        }, t);
      });
    return Promise.race([e, s]).then(
      (a) => (clearTimeout(r), a),
      (a) => {
        throw (clearTimeout(r), a);
      },
    );
  }
  rVn.callWithTimeout = Evo;
});