
var Cxt = Ie(function (pbc, Hxi) {
  Hxi.exports = Pxt;
  var w$a = ob(),
    axi = cgr(),
    k$a = Ext();
  function Pxt(e, t, r, s) {
    (axi.call(this),
      (this.nodeType = w$a.DOCUMENT_TYPE_NODE),
      (this.ownerDocument = e || null),
      (this.name = t),
      (this.publicId = r || ""),
      (this.systemId = s || ""));
  }
  Pxt.prototype = Object.create(axi.prototype, {
    nodeName: {
      get: function () {
        return this.name;
      },
    },
    nodeValue: {
      get: function () {
        return null;
      },
      set: function () {},
    },
    clone: {
      value: function () {
        return new Pxt(this.ownerDocument, this.name, this.publicId, this.systemId);
      },
    },
    isEqual: {
      value: function (t) {
        return this.name === t.name && this.publicId === t.publicId && this.systemId === t.systemId;
      },
    },
  });
  Object.defineProperties(Pxt.prototype, k$a);
});