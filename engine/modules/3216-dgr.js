
var dgr = Ie(function (Xvc, oMi) {
  oMi.exports = pgr;
  var KLa = ob(),
    zLa = ahe(),
    sMi = mxt(),
    Mxt = Ebe(),
    QLa = gxt(),
    iMi = kD();
  function pgr(e) {
    (sMi.call(this), (this.nodeType = KLa.DOCUMENT_FRAGMENT_NODE), (this.ownerDocument = e));
  }
  pgr.prototype = Object.create(sMi.prototype, {
    nodeName: { value: "#document-fragment" },
    nodeValue: {
      get: function () {
        return null;
      },
      set: function () {},
    },
    textContent: Object.getOwnPropertyDescriptor(Mxt.prototype, "textContent"),
    innerText: Object.getOwnPropertyDescriptor(Mxt.prototype, "innerText"),
    querySelector: {
      value: function (e) {
        var t = this.querySelectorAll(e);
        return t.length ? t[0] : null;
      },
    },
    querySelectorAll: {
      value: function (e) {
        var t = Object.create(this);
        ((t.isHTML = !0),
          (t.getElementsByTagName = Mxt.prototype.getElementsByTagName),
          (t.nextElement = Object.getOwnPropertyDescriptor(Mxt.prototype, "firstElementChild").get));
        var r = QLa(e, t);
        return r.item ? r : new zLa(r);
      },
    },
    clone: {
      value: function () {
        return new pgr(this.ownerDocument);
      },
    },
    isEqual: {
      value: function (t) {
        return !0;
      },
    },
    innerHTML: {
      get: function () {
        return this.serialize();
      },
      set: iMi.nyi,
    },
    outerHTML: {
      get: function () {
        return this.serialize();
      },
      set: iMi.nyi,
    },
  });
});