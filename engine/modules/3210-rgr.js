
var rgr = Ie(function (Bvc, U1i) {
  U1i.exports = O1i;
  var $be = kD();
  function O1i(e) {
    this.element = e;
  }
  Object.defineProperties(O1i.prototype, {
    length: { get: $be.shouldOverride },
    item: { value: $be.shouldOverride },
    getNamedItem: {
      value: function (t) {
        return this.element.getAttributeNode(t);
      },
    },
    getNamedItemNS: {
      value: function (t, r) {
        return this.element.getAttributeNodeNS(t, r);
      },
    },
    setNamedItem: { value: $be.nyi },
    setNamedItemNS: { value: $be.nyi },
    removeNamedItem: {
      value: function (t) {
        var r = this.element.getAttributeNode(t);
        if (r) return (this.element.removeAttribute(t), r);
        $be.NotFoundError();
      },
    },
    removeNamedItemNS: {
      value: function (t, r) {
        var s = this.element.getAttributeNodeNS(t, r);
        if (s) return (this.element.removeAttributeNS(t, r), s);
        $be.NotFoundError();
      },
    },
  });
});