
var DMi = Ie(function (Zvc, IMi) {
  IMi.exports = EMi;
  var Igr = dGe(),
    Dgr = $gr(),
    gMi = kD();
  function n$a(e, t, r) {
    if (r) return Dgr.next(e, t);
    else {
      if (e === t) return null;
      return Dgr.previous(e, null);
    }
  }
  function LMi(e, t) {
    for (; t; t = t.parentNode) if (e === t) return !0;
    return !1;
  }
  function $Mi(e, t) {
    var r, s;
    ((r = e._referenceNode), (s = e._pointerBeforeReferenceNode));
    while (!0) {
      if (s === t) s = !s;
      else if (((r = n$a(r, e._root, t)), r === null)) return null;
      var a = e._internalFilter(r);
      if (a === Igr.FILTER_ACCEPT) break;
    }
    return ((e._referenceNode = r), (e._pointerBeforeReferenceNode = s), r);
  }
  function EMi(e, t, r) {
    if (!e || !e.nodeType) gMi.NotSupportedError();
    ((this._root = e),
      (this._referenceNode = e),
      (this._pointerBeforeReferenceNode = !0),
      (this._whatToShow = Number(t) || 0),
      (this._filter = r || null),
      (this._active = !1),
      e.doc._attachNodeIterator(this));
  }
  Object.defineProperties(EMi.prototype, {
    root: {
      get: function () {
        return this._root;
      },
    },
    referenceNode: {
      get: function () {
        return this._referenceNode;
      },
    },
    pointerBeforeReferenceNode: {
      get: function () {
        return this._pointerBeforeReferenceNode;
      },
    },
    whatToShow: {
      get: function () {
        return this._whatToShow;
      },
    },
    filter: {
      get: function () {
        return this._filter;
      },
    },
    _internalFilter: {
      value: function (t) {
        var r, s;
        if (this._active) gMi.InvalidStateError();
        if (!((1 << (t.nodeType - 1)) & this._whatToShow)) return Igr.FILTER_SKIP;
        if (((s = this._filter), s === null)) r = Igr.FILTER_ACCEPT;
        else {
          this._active = !0;
          try {
            if (typeof s === "function") r = s(t);
            else r = s.acceptNode(t);
          } finally {
            this._active = !1;
          }
        }
        return +r;
      },
    },
    _preremove: {
      value: function (t) {
        if (LMi(t, this._root)) return;
        if (!LMi(t, this._referenceNode)) return;
        if (this._pointerBeforeReferenceNode) {
          var r = t;
          while (r.lastChild) r = r.lastChild;
          if (((r = Dgr.next(r, this.root)), r)) {
            this._referenceNode = r;
            return;
          }
          this._pointerBeforeReferenceNode = !1;
        }
        if (t.previousSibling === null) this._referenceNode = t.parentNode;
        else {
          this._referenceNode = t.previousSibling;
          var s;
          for (s = this._referenceNode.lastChild; s; s = this._referenceNode.lastChild)
            this._referenceNode = s;
        }
      },
    },
    nextNode: {
      value: function () {
        return $Mi(this, !0);
      },
    },
    previousNode: {
      value: function () {
        return $Mi(this, !1);
      },
    },
    detach: { value: function () {} },
    toString: {
      value: function () {
        return "[object NodeIterator]";
      },
    },
  });
});