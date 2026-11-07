
var hMi = Ie(function (Yvc, _Mi) {
  _Mi.exports = mMi;
  var r$a = ob(),
    ab = dGe(),
    lMi = $gr(),
    dMi = kD(),
    ggr = { first: "firstChild", last: "lastChild", next: "firstChild", previous: "lastChild" },
    Egr = { first: "nextSibling", last: "previousSibling", next: "nextSibling", previous: "previousSibling" };
  function fMi(e, t) {
    var r, s, a, H, u;
    s = e._currentNode[ggr[t]];
    while (s !== null) {
      if (((H = e._internalFilter(s)), H === ab.FILTER_ACCEPT)) return ((e._currentNode = s), s);
      if (H === ab.FILTER_SKIP) {
        if (((r = s[ggr[t]]), r !== null)) {
          s = r;
          continue;
        }
      }
      while (s !== null) {
        if (((u = s[Egr[t]]), u !== null)) {
          s = u;
          break;
        }
        if (((a = s.parentNode), a === null || a === e.root || a === e._currentNode)) return null;
        else s = a;
      }
    }
    return null;
  }
  function pMi(e, t) {
    var r, s, a;
    if (((r = e._currentNode), r === e.root)) return null;
    while (!0) {
      a = r[Egr[t]];
      while (a !== null) {
        if (((r = a), (s = e._internalFilter(r)), s === ab.FILTER_ACCEPT)) return ((e._currentNode = r), r);
        if (((a = r[ggr[t]]), s === ab.FILTER_REJECT || a === null)) a = r[Egr[t]];
      }
      if (((r = r.parentNode), r === null || r === e.root)) return null;
      if (e._internalFilter(r) === ab.FILTER_ACCEPT) return null;
    }
  }
  function mMi(e, t, r) {
    if (!e || !e.nodeType) dMi.NotSupportedError();
    ((this._root = e),
      (this._whatToShow = Number(t) || 0),
      (this._filter = r || null),
      (this._active = !1),
      (this._currentNode = e));
  }
  Object.defineProperties(mMi.prototype, {
    root: {
      get: function () {
        return this._root;
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
    currentNode: {
      get: function () {
        return this._currentNode;
      },
      set: function (t) {
        if (!(t instanceof r$a)) throw TypeError("Not a Node");
        this._currentNode = t;
      },
    },
    _internalFilter: {
      value: function (t) {
        var r, s;
        if (this._active) dMi.InvalidStateError();
        if (!((1 << (t.nodeType - 1)) & this._whatToShow)) return ab.FILTER_SKIP;
        if (((s = this._filter), s === null)) r = ab.FILTER_ACCEPT;
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
    parentNode: {
      value: function () {
        var t = this._currentNode;
        while (t !== this.root) {
          if (((t = t.parentNode), t === null)) return null;
          if (this._internalFilter(t) === ab.FILTER_ACCEPT) return ((this._currentNode = t), t);
        }
        return null;
      },
    },
    firstChild: {
      value: function () {
        return fMi(this, "first");
      },
    },
    lastChild: {
      value: function () {
        return fMi(this, "last");
      },
    },
    previousSibling: {
      value: function () {
        return pMi(this, "previous");
      },
    },
    nextSibling: {
      value: function () {
        return pMi(this, "next");
      },
    },
    previousNode: {
      value: function () {
        var t, r, s, a;
        t = this._currentNode;
        while (t !== this._root) {
          for (s = t.previousSibling; s; s = t.previousSibling) {
            if (((t = s), (r = this._internalFilter(t)), r === ab.FILTER_REJECT)) continue;
            for (a = t.lastChild; a; a = t.lastChild)
              if (((t = a), (r = this._internalFilter(t)), r === ab.FILTER_REJECT)) break;
            if (r === ab.FILTER_ACCEPT) return ((this._currentNode = t), t);
          }
          if (t === this.root || t.parentNode === null) return null;
          if (((t = t.parentNode), this._internalFilter(t) === ab.FILTER_ACCEPT))
            return ((this._currentNode = t), t);
        }
        return null;
      },
    },
    nextNode: {
      value: function () {
        var t, r, s, a;
        ((t = this._currentNode), (r = ab.FILTER_ACCEPT));
        e: while (!0) {
          for (s = t.firstChild; s; s = t.firstChild)
            if (((t = s), (r = this._internalFilter(t)), r === ab.FILTER_ACCEPT))
              return ((this._currentNode = t), t);
            else if (r === ab.FILTER_REJECT) break;
          for (a = lMi.nextSkippingChildren(t, this.root); a; a = lMi.nextSkippingChildren(t, this.root))
            if (((t = a), (r = this._internalFilter(t)), r === ab.FILTER_ACCEPT))
              return ((this._currentNode = t), t);
            else if (r === ab.FILTER_SKIP) continue e;
          return null;
        }
      },
    },
    toString: {
      value: function () {
        return "[object TreeWalker]";
      },
    },
  });
});