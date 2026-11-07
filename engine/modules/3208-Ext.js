
var Ext = Ie(function (Nvc, C1i) {
  var bLa = ob(),
    jLa = w$r(),
    egr = function (e, t) {
      var r = e.createDocumentFragment();
      for (var s = 0; s < t.length; s++) {
        var a = t[s],
          H = a instanceof bLa;
        r.appendChild(H ? a : e.createTextNode(String(a)));
      }
      return r;
    },
    PLa = {
      after: {
        value: function () {
          var t = Array.prototype.slice.call(arguments),
            r = this.parentNode,
            s = this.nextSibling;
          if (r === null) return;
          while (
            s &&
            t.some(function (H) {
              return H === s;
            })
          )
            s = s.nextSibling;
          var a = egr(this.doc, t);
          r.insertBefore(a, s);
        },
      },
      before: {
        value: function () {
          var t = Array.prototype.slice.call(arguments),
            r = this.parentNode,
            s = this.previousSibling;
          if (r === null) return;
          while (
            s &&
            t.some(function (u) {
              return u === s;
            })
          )
            s = s.previousSibling;
          var a = egr(this.doc, t),
            H = s ? s.nextSibling : r.firstChild;
          r.insertBefore(a, H);
        },
      },
      remove: {
        value: function () {
          if (this.parentNode === null) return;
          if (this.doc) {
            if ((this.doc._preremoveNodeIterators(this), this.rooted)) this.doc.mutateRemove(this);
          }
          (this._remove(), (this.parentNode = null));
        },
      },
      _remove: {
        value: function () {
          var t = this.parentNode;
          if (t === null) return;
          if (t._childNodes) t._childNodes.splice(this.index, 1);
          else if (t._firstChild === this)
            if (this._nextSibling === this) t._firstChild = null;
            else t._firstChild = this._nextSibling;
          (jLa.remove(this), t.modify());
        },
      },
      replaceWith: {
        value: function () {
          var t = Array.prototype.slice.call(arguments),
            r = this.parentNode,
            s = this.nextSibling;
          if (r === null) return;
          while (
            s &&
            t.some(function (H) {
              return H === s;
            })
          )
            s = s.nextSibling;
          var a = egr(this.doc, t);
          if (this.parentNode === r) r.replaceChild(a, this);
          else r.insertBefore(a, s);
        },
      },
    };
  C1i.exports = PLa;
});