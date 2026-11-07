
var ugr = Ie(function (qvc, tMi) {
  tMi.exports = Agr;
  var Y1i = kD(),
    Z1i = ob(),
    eMi = uGe();
  function Agr(e, t) {
    (eMi.call(this),
      (this.nodeType = Z1i.TEXT_NODE),
      (this.ownerDocument = e),
      (this._data = t),
      (this._index = void 0));
  }
  var lGe = {
    get: function () {
      return this._data;
    },
    set: function (e) {
      if (e === null || e === void 0) e = "";
      else e = String(e);
      if (e === this._data) return;
      if (((this._data = e), this.rooted)) this.ownerDocument.mutateValue(this);
      if (this.parentNode && this.parentNode._textchangehook) this.parentNode._textchangehook(this);
    },
  };
  Agr.prototype = Object.create(eMi.prototype, {
    nodeName: { value: "#text" },
    nodeValue: lGe,
    textContent: lGe,
    innerText: lGe,
    data: {
      get: lGe.get,
      set: function (e) {
        lGe.set.call(this, e === null ? "" : String(e));
      },
    },
    splitText: {
      value: function (t) {
        if (t > this._data.length || t < 0) Y1i.IndexSizeError();
        var r = this._data.substring(t),
          s = this.ownerDocument.createTextNode(r);
        this.data = this.data.substring(0, t);
        var a = this.parentNode;
        if (a !== null) a.insertBefore(s, this.nextSibling);
        return s;
      },
    },
    wholeText: {
      get: function () {
        var t = this.textContent;
        for (var r = this.nextSibling; r; r = r.nextSibling) {
          if (r.nodeType !== Z1i.TEXT_NODE) break;
          t += r.textContent;
        }
        return t;
      },
    },
    replaceWholeText: { value: Y1i.nyi },
    clone: {
      value: function () {
        return new Agr(this.ownerDocument, this._data);
      },
    },
  });
});