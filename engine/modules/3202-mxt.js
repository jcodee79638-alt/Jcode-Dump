
var mxt = Ie(function (Cvc, _1i) {
  _1i.exports = m1i;
  var d1i = ob(),
    sLa = ahe();
  function m1i() {
    (d1i.call(this), (this._firstChild = this._childNodes = null));
  }
  m1i.prototype = Object.create(d1i.prototype, {
    hasChildNodes: {
      value: function () {
        if (this._childNodes) return this._childNodes.length > 0;
        return this._firstChild !== null;
      },
    },
    childNodes: {
      get: function () {
        return (this._ensureChildNodes(), this._childNodes);
      },
    },
    firstChild: {
      get: function () {
        if (this._childNodes) return this._childNodes.length === 0 ? null : this._childNodes[0];
        return this._firstChild;
      },
    },
    lastChild: {
      get: function () {
        var e = this._childNodes,
          t;
        if (e) return e.length === 0 ? null : e[e.length - 1];
        if (((t = this._firstChild), t === null)) return null;
        return t._previousSibling;
      },
    },
    _ensureChildNodes: {
      value: function () {
        if (this._childNodes) return;
        var e = this._firstChild,
          t = e,
          r = (this._childNodes = new sLa());
        if (e)
          do (r.push(t), (t = t._nextSibling));
          while (t !== e);
        this._firstChild = null;
      },
    },
    removeChildren: {
      value: function () {
        var t = this.rooted ? this.ownerDocument : null,
          r = this.firstChild,
          s;
        while (r !== null) {
          if (((s = r), (r = s.nextSibling), t)) t.mutateRemove(s);
          s.parentNode = null;
        }
        if (this._childNodes) this._childNodes.length = 0;
        else this._firstChild = null;
        this.modify();
      },
    },
  });
});