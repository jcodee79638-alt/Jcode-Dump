
var _gr = Ie(function (Jvc, HMi) {
  HMi.exports = mgr;
  var YLa = ob(),
    aMi = uGe();
  function mgr(e, t, r) {
    (aMi.call(this),
      (this.nodeType = YLa.PROCESSING_INSTRUCTION_NODE),
      (this.ownerDocument = e),
      (this.target = t),
      (this._data = r));
  }
  var pGe = {
    get: function () {
      return this._data;
    },
    set: function (e) {
      if (e === null || e === void 0) e = "";
      else e = String(e);
      if (((this._data = e), this.rooted)) this.ownerDocument.mutateValue(this);
    },
  };
  mgr.prototype = Object.create(aMi.prototype, {
    nodeName: {
      get: function () {
        return this.target;
      },
    },
    nodeValue: pGe,
    textContent: pGe,
    innerText: pGe,
    data: {
      get: pGe.get,
      set: function (e) {
        pGe.set.call(this, e === null ? "" : String(e));
      },
    },
    clone: {
      value: function () {
        return new mgr(this.ownerDocument, this.target, this._data);
      },
    },
    isEqual: {
      value: function (t) {
        return this.target === t.target && this._data === t._data;
      },
    },
  });
});