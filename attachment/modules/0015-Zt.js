
const Zt = (function () {
  function t(e, s) {
    ((this.message = e), (this.name = s));
  }
  return ((t.prototype = new Error()), (t.constructor = t), t);
})();