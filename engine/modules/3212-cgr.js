
var cgr = Ie(function (Wvc, J1i) {
  J1i.exports = X1i;
  var q1i = ob(),
    VLa = ahe(),
    G1i = kD(),
    { HierarchyRequestError: V1i, NotFoundError: qLa } = G1i;
  function X1i() {
    q1i.call(this);
  }
  X1i.prototype = Object.create(q1i.prototype, {
    hasChildNodes: {
      value: function () {
        return !1;
      },
    },
    firstChild: { value: null },
    lastChild: { value: null },
    insertBefore: {
      value: function (e, t) {
        if (!e.nodeType) throw TypeError("not a node");
        V1i();
      },
    },
    replaceChild: {
      value: function (e, t) {
        if (!e.nodeType) throw TypeError("not a node");
        V1i();
      },
    },
    removeChild: {
      value: function (e) {
        if (!e.nodeType) throw TypeError("not a node");
        qLa();
      },
    },
    removeChildren: { value: function () {} },
    childNodes: {
      get: function () {
        if (!this._childNodes) this._childNodes = new VLa();
        return this._childNodes;
      },
    },
  });
});