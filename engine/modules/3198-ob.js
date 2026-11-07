
var ob = Ie(function (vvc, c1i) {
  c1i.exports = wE;
  var H1i = C$r(),
    pxt = w$r(),
    i1i = k$r(),
    Nh = kD();
  function wE() {
    (H1i.call(this),
      (this.parentNode = null),
      (this._nextSibling = this._previousSibling = this),
      (this._index = void 0));
  }
  var b8 = (wE.ELEMENT_NODE = 1),
    O$r = (wE.ATTRIBUTE_NODE = 2),
    dxt = (wE.TEXT_NODE = 3),
    tLa = (wE.CDATA_SECTION_NODE = 4),
    rLa = (wE.ENTITY_REFERENCE_NODE = 5),
    U$r = (wE.ENTITY_NODE = 6),
    s1i = (wE.PROCESSING_INSTRUCTION_NODE = 7),
    o1i = (wE.COMMENT_NODE = 8),
    iGe = (wE.DOCUMENT_NODE = 9),
    wB = (wE.DOCUMENT_TYPE_NODE = 10),
    tHe = (wE.DOCUMENT_FRAGMENT_NODE = 11),
    N$r = (wE.NOTATION_NODE = 12),
    F$r = (wE.DOCUMENT_POSITION_DISCONNECTED = 1),
    B$r = (wE.DOCUMENT_POSITION_PRECEDING = 2),
    R$r = (wE.DOCUMENT_POSITION_FOLLOWING = 4),
    a1i = (wE.DOCUMENT_POSITION_CONTAINS = 8),
    W$r = (wE.DOCUMENT_POSITION_CONTAINED_BY = 16),
    V$r = (wE.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32);
  wE.prototype = Object.create(H1i.prototype, {
    baseURI: { get: Nh.nyi },
    parentElement: {
      get: function () {
        return this.parentNode && this.parentNode.nodeType === b8 ? this.parentNode : null;
      },
    },
    hasChildNodes: { value: Nh.shouldOverride },
    firstChild: { get: Nh.shouldOverride },
    lastChild: { get: Nh.shouldOverride },
    isConnected: {
      get: function () {
        let e = this;
        while (e != null) {
          if (e.nodeType === wE.DOCUMENT_NODE) return !0;
          if (((e = e.parentNode), e != null && e.nodeType === wE.DOCUMENT_FRAGMENT_NODE)) e = e.host;
        }
        return !1;
      },
    },
    previousSibling: {
      get: function () {
        var e = this.parentNode;
        if (!e) return null;
        if (this === e.firstChild) return null;
        return this._previousSibling;
      },
    },
    nextSibling: {
      get: function () {
        var e = this.parentNode,
          t = this._nextSibling;
        if (!e) return null;
        if (t === e.firstChild) return null;
        return t;
      },
    },
    textContent: {
      get: function () {
        return null;
      },
      set: function (e) {},
    },
    innerText: {
      get: function () {
        return null;
      },
      set: function (e) {},
    },
    _countChildrenOfType: {
      value: function (e) {
        var t = 0;
        for (var r = this.firstChild; r !== null; r = r.nextSibling) if (r.nodeType === e) t++;
        return t;
      },
    },
    _ensureInsertValid: {
      value: function (t, r, s) {
        var a = this,
          H,
          u;
        if (!t.nodeType) throw TypeError("not a node");
        switch (a.nodeType) {
          case iGe:
          case tHe:
          case b8:
            break;
          default:
            Nh.HierarchyRequestError();
        }
        if (t.isAncestor(a)) Nh.HierarchyRequestError();
        if (r !== null || !s) {
          if (r.parentNode !== a) Nh.NotFoundError();
        }
        switch (t.nodeType) {
          case tHe:
          case wB:
          case b8:
          case dxt:
          case s1i:
          case o1i:
            break;
          default:
            Nh.HierarchyRequestError();
        }
        if (a.nodeType === iGe)
          switch (t.nodeType) {
            case dxt:
              Nh.HierarchyRequestError();
              break;
            case tHe:
              if (t._countChildrenOfType(dxt) > 0) Nh.HierarchyRequestError();
              switch (t._countChildrenOfType(b8)) {
                case 0:
                  break;
                case 1:
                  if (r !== null) {
                    if (s && r.nodeType === wB) Nh.HierarchyRequestError();
                    for (u = r.nextSibling; u !== null; u = u.nextSibling)
                      if (u.nodeType === wB) Nh.HierarchyRequestError();
                  }
                  if (((H = a._countChildrenOfType(b8)), s)) {
                    if (H > 0) Nh.HierarchyRequestError();
                  } else if (H > 1 || (H === 1 && r.nodeType !== b8)) Nh.HierarchyRequestError();
                  break;
                default:
                  Nh.HierarchyRequestError();
              }
              break;
            case b8:
              if (r !== null) {
                if (s && r.nodeType === wB) Nh.HierarchyRequestError();
                for (u = r.nextSibling; u !== null; u = u.nextSibling)
                  if (u.nodeType === wB) Nh.HierarchyRequestError();
              }
              if (((H = a._countChildrenOfType(b8)), s)) {
                if (H > 0) Nh.HierarchyRequestError();
              } else if (H > 1 || (H === 1 && r.nodeType !== b8)) Nh.HierarchyRequestError();
              break;
            case wB:
              if (r === null) {
                if (a._countChildrenOfType(b8)) Nh.HierarchyRequestError();
              } else
                for (u = a.firstChild; u !== null; u = u.nextSibling) {
                  if (u === r) break;
                  if (u.nodeType === b8) Nh.HierarchyRequestError();
                }
              if (((H = a._countChildrenOfType(wB)), s)) {
                if (H > 0) Nh.HierarchyRequestError();
              } else if (H > 1 || (H === 1 && r.nodeType !== wB)) Nh.HierarchyRequestError();
              break;
          }
        else if (t.nodeType === wB) Nh.HierarchyRequestError();
      },
    },
    insertBefore: {
      value: function (t, r) {
        var s = this;
        s._ensureInsertValid(t, r, !0);
        var a = r;
        if (a === t) a = t.nextSibling;
        return (s.doc.adoptNode(t), t._insertOrReplace(s, a, !1), t);
      },
    },
    appendChild: {
      value: function (e) {
        return this.insertBefore(e, null);
      },
    },
    _appendChild: {
      value: function (e) {
        e._insertOrReplace(this, null, !1);
      },
    },
    removeChild: {
      value: function (t) {
        var r = this;
        if (!t.nodeType) throw TypeError("not a node");
        if (t.parentNode !== r) Nh.NotFoundError();
        return (t.remove(), t);
      },
    },
    replaceChild: {
      value: function (t, r) {
        var s = this;
        if ((s._ensureInsertValid(t, r, !1), t.doc !== s.doc)) s.doc.adoptNode(t);
        return (t._insertOrReplace(s, r, !0), r);
      },
    },
    contains: {
      value: function (t) {
        if (t === null) return !1;
        if (this === t) return !0;
        return (this.compareDocumentPosition(t) & W$r) !== 0;
      },
    },
    compareDocumentPosition: {
      value: function (t) {
        if (this === t) return 0;
        if (this.doc !== t.doc || this.rooted !== t.rooted) return F$r + V$r;
        var r = [],
          s = [];
        for (var a = this; a !== null; a = a.parentNode) r.push(a);
        for (a = t; a !== null; a = a.parentNode) s.push(a);
        if ((r.reverse(), s.reverse(), r[0] !== s[0])) return F$r + V$r;
        a = Math.min(r.length, s.length);
        for (var H = 1; H < a; H++)
          if (r[H] !== s[H])
            if (r[H].index < s[H].index) return R$r;
            else return B$r;
        if (r.length < s.length) return R$r + W$r;
        else return B$r + a1i;
      },
    },
    isSameNode: {
      value: function (t) {
        return this === t;
      },
    },
    isEqualNode: {
      value: function (t) {
        if (!t) return !1;
        if (t.nodeType !== this.nodeType) return !1;
        if (!this.isEqual(t)) return !1;
        for (var r = this.firstChild, s = t.firstChild; r && s; r = r.nextSibling, s = s.nextSibling)
          if (!r.isEqualNode(s)) return !1;
        return r === null && s === null;
      },
    },
    cloneNode: {
      value: function (e) {
        var t = this.clone();
        if (e) for (var r = this.firstChild; r !== null; r = r.nextSibling) t._appendChild(r.cloneNode(!0));
        return t;
      },
    },
    lookupPrefix: {
      value: function (t) {
        var r;
        if (t === "" || t === null || t === void 0) return null;
        switch (this.nodeType) {
          case b8:
            return this._lookupNamespacePrefix(t, this);
          case iGe:
            return ((r = this.documentElement), r ? r.lookupPrefix(t) : null);
          case U$r:
          case N$r:
          case tHe:
          case wB:
            return null;
          case O$r:
            return ((r = this.ownerElement), r ? r.lookupPrefix(t) : null);
          default:
            return ((r = this.parentElement), r ? r.lookupPrefix(t) : null);
        }
      },
    },
    lookupNamespaceURI: {
      value: function (t) {
        if (t === "" || t === void 0) t = null;
        var r;
        switch (this.nodeType) {
          case b8:
            return Nh.shouldOverride();
          case iGe:
            return ((r = this.documentElement), r ? r.lookupNamespaceURI(t) : null);
          case U$r:
          case N$r:
          case wB:
          case tHe:
            return null;
          case O$r:
            return ((r = this.ownerElement), r ? r.lookupNamespaceURI(t) : null);
          default:
            return ((r = this.parentElement), r ? r.lookupNamespaceURI(t) : null);
        }
      },
    },
    isDefaultNamespace: {
      value: function (t) {
        if (t === "" || t === void 0) t = null;
        var r = this.lookupNamespaceURI(null);
        return r === t;
      },
    },
    index: {
      get: function () {
        var e = this.parentNode;
        if (this === e.firstChild) return 0;
        var t = e.childNodes;
        if (this._index === void 0 || t[this._index] !== this) {
          for (var r = 0; r < t.length; r++) t[r]._index = r;
          Nh.assert(t[this._index] === this);
        }
        return this._index;
      },
    },
    isAncestor: {
      value: function (e) {
        if (this.doc !== e.doc) return !1;
        if (this.rooted !== e.rooted) return !1;
        for (var t = e; t; t = t.parentNode) if (t === this) return !0;
        return !1;
      },
    },
    ensureSameDoc: {
      value: function (e) {
        if (e.ownerDocument === null) e.ownerDocument = this.doc;
        else if (e.ownerDocument !== this.doc) Nh.WrongDocumentError();
      },
    },
    removeChildren: { value: Nh.shouldOverride },
    _insertOrReplace: {
      value: function (t, r, s) {
        var a = this,
          H,
          u;
        if (a.nodeType === tHe && a.rooted) Nh.HierarchyRequestError();
        if (t._childNodes) {
          if (((H = r === null ? t._childNodes.length : r.index), a.parentNode === t)) {
            var f = a.index;
            if (f < H) H--;
          }
        }
        if (s) {
          if (r.rooted) r.doc.mutateRemove(r);
          r.parentNode = null;
        }
        var d = r;
        if (d === null) d = t.firstChild;
        var _ = a.rooted && t.rooted;
        if (a.nodeType === tHe) {
          var L = [0, s ? 1 : 0],
            I;
          for (var D = a.firstChild; D !== null; D = I) ((I = D.nextSibling), L.push(D), (D.parentNode = t));
          var S = L.length;
          if (s) pxt.replace(d, S > 2 ? L[2] : null);
          else if (S > 2 && d !== null) pxt.insertBefore(L[2], d);
          if (t._childNodes) {
            ((L[0] = r === null ? t._childNodes.length : r._index),
              t._childNodes.splice.apply(t._childNodes, L));
            for (u = 2; u < S; u++) L[u]._index = L[0] + (u - 2);
          } else if (t._firstChild === r) {
            if (S > 2) t._firstChild = L[2];
            else if (s) t._firstChild = null;
          }
          if (a._childNodes) a._childNodes.length = 0;
          else a._firstChild = null;
          if (t.rooted) {
            t.modify();
            for (u = 2; u < S; u++) t.doc.mutateInsert(L[u]);
          }
        } else {
          if (r === a) return;
          if (_) a._remove();
          else if (a.parentNode) a.remove();
          if (((a.parentNode = t), s)) {
            if ((pxt.replace(d, a), t._childNodes)) ((a._index = H), (t._childNodes[H] = a));
            else if (t._firstChild === r) t._firstChild = a;
          } else {
            if (d !== null) pxt.insertBefore(a, d);
            if (t._childNodes) ((a._index = H), t._childNodes.splice(H, 0, a));
            else if (t._firstChild === r) t._firstChild = a;
          }
          if (_) (t.modify(), t.doc.mutateMove(a));
          else if (t.rooted) (t.modify(), t.doc.mutateInsert(a));
        }
      },
    },
    lastModTime: {
      get: function () {
        if (!this._lastModTime) this._lastModTime = this.doc.modclock;
        return this._lastModTime;
      },
    },
    modify: {
      value: function () {
        if (this.doc.modclock) {
          var e = ++this.doc.modclock;
          for (var t = this; t; t = t.parentElement) if (t._lastModTime) t._lastModTime = e;
        }
      },
    },
    doc: {
      get: function () {
        return this.ownerDocument || this;
      },
    },
    rooted: {
      get: function () {
        return !!this._nid;
      },
    },
    normalize: {
      value: function () {
        var e;
        for (var t = this.firstChild; t !== null; t = e) {
          if (((e = t.nextSibling), t.normalize)) t.normalize();
          if (t.nodeType !== wE.TEXT_NODE) continue;
          if (t.nodeValue === "") {
            this.removeChild(t);
            continue;
          }
          var r = t.previousSibling;
          if (r === null) continue;
          else if (r.nodeType === wE.TEXT_NODE) (r.appendData(t.nodeValue), this.removeChild(t));
        }
      },
    },
    serialize: {
      value: function () {
        if (this._innerHTML) return this._innerHTML;
        var e = "";
        for (var t = this.firstChild; t !== null; t = t.nextSibling) e += i1i.serializeOne(t, this);
        return e;
      },
    },
    outerHTML: {
      get: function () {
        return i1i.serializeOne(this, { nodeType: 0 });
      },
      set: Nh.nyi,
    },
    ELEMENT_NODE: { value: b8 },
    ATTRIBUTE_NODE: { value: O$r },
    TEXT_NODE: { value: dxt },
    CDATA_SECTION_NODE: { value: tLa },
    ENTITY_REFERENCE_NODE: { value: rLa },
    ENTITY_NODE: { value: U$r },
    PROCESSING_INSTRUCTION_NODE: { value: s1i },
    COMMENT_NODE: { value: o1i },
    DOCUMENT_NODE: { value: iGe },
    DOCUMENT_TYPE_NODE: { value: wB },
    DOCUMENT_FRAGMENT_NODE: { value: tHe },
    NOTATION_NODE: { value: N$r },
    DOCUMENT_POSITION_DISCONNECTED: { value: F$r },
    DOCUMENT_POSITION_PRECEDING: { value: B$r },
    DOCUMENT_POSITION_FOLLOWING: { value: R$r },
    DOCUMENT_POSITION_CONTAINS: { value: a1i },
    DOCUMENT_POSITION_CONTAINED_BY: { value: W$r },
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: V$r },
  });
});