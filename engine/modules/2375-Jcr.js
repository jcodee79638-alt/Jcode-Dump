
var Jcr = Ie(function (i5n) {
  Object.defineProperty(i5n, "__esModule", { value: !0 });
  i5n.createBoundedQueueExportPromiseHandler = void 0;
  class n5n {
    _concurrencyLimit;
    _sendingPromises = [];
    constructor(e) {
      this._concurrencyLimit = e;
    }
    pushPromise(e) {
      if (this.hasReachedLimit()) throw Error("Concurrency Limit reached");
      this._sendingPromises.push(e);
      let t = () => {
        let r = this._sendingPromises.indexOf(e);
        this._sendingPromises.splice(r, 1);
      };
      e.then(t, t);
    }
    hasReachedLimit() {
      return this._sendingPromises.length >= this._concurrencyLimit;
    }
    async awaitAll() {
      await Promise.all(this._sendingPromises);
    }
  }
  function cPo(e) {
    return new n5n(e.concurrencyLimit);
  }
  i5n.createBoundedQueueExportPromiseHandler = cPo;
});