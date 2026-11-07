
var fgr = Ie(function (Gvc, nMi) {
  nMi.exports = lgr;
  var JLa = ob(),
    rMi = uGe();
  function lgr(e, t) {
    (rMi.call(this), (this.nodeType = JLa.COMMENT_NODE), (this.ownerDocument = e), (this._data = t));
  }
  var fGe = {
    get: function () {
      return this._data;
    },
    set: function (e) {
      if (e === null || e === void 0) e = "";
      else e = String(e);
      if (((this._data = e), this.rooted)) this.ownerDocument.mutateValue(this);
    },
  };
  lgr.prototype = Object.create(rMi.prototype, {
    nodeName: { value: "#comment" },
    nodeValue: fGe,
    textContent: fGe,
    innerText: fGe,
    data: {
      get: fGe.get,
      set: function (e) {
        fGe.set.call(this, e === null ? "" : String(e));
      },
    },
    clone: {
      value: function () {
        return new lgr(this.ownerDocument, this._data);
      },
    },
  });
});