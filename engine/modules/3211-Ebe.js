
var Ebe = Ie(function (Rvc, W1i) {
  W1i.exports = nHe;
  var ngr = _xt(),
    SI = kD(),
    iX = SI.NAMESPACE,
    Dxt = J$r(),
    e7 = ob(),
    igr = ahe(),
    wLa = k$r(),
    Ixt = D1i(),
    gbe = lxt(),
    kLa = z$r(),
    sgr = gxt(),
    F1i = mxt(),
    OLa = Ext(),
    ULa = tgr(),
    B1i = rgr(),
    N1i = Object.create(null);
  function nHe(e, t, r, s) {
    (F1i.call(this),
      (this.nodeType = e7.ELEMENT_NODE),
      (this.ownerDocument = e),
      (this.localName = t),
      (this.namespaceURI = r),
      (this.prefix = s),
      (this._tagName = void 0),
      (this._attrsByQName = Object.create(null)),
      (this._attrsByLName = Object.create(null)),
      (this._attrKeys = []));
  }
  function ogr(e, t) {
    if (e.nodeType === e7.TEXT_NODE) t.push(e._data);
    else for (var r = 0, s = e.childNodes.length; r < s; r++) ogr(e.childNodes[r], t);
  }
  nHe.prototype = Object.create(F1i.prototype, {
    isHTML: {
      get: function () {
        return this.namespaceURI === iX.HTML && this.ownerDocument.isHTML;
      },
    },
    tagName: {
      get: function () {
        if (this._tagName === void 0) {
          var t;
          if (this.prefix === null) t = this.localName;
          else t = this.prefix + ":" + this.localName;
          if (this.isHTML) {
            var r = N1i[t];
            if (!r) N1i[t] = r = SI.toASCIIUpperCase(t);
            t = r;
          }
          this._tagName = t;
        }
        return this._tagName;
      },
    },
    nodeName: {
      get: function () {
        return this.tagName;
      },
    },
    nodeValue: {
      get: function () {
        return null;
      },
      set: function () {},
    },
    textContent: {
      get: function () {
        var e = [];
        return (ogr(this, e), e.join(""));
      },
      set: function (e) {
        if ((this.removeChildren(), e !== null && e !== void 0 && e !== ""))
          this._appendChild(this.ownerDocument.createTextNode(e));
      },
    },
    innerText: {
      get: function () {
        var e = [];
        return (
          ogr(this, e),
          e
            .join("")
            .replace(/[ \t\n\f\r]+/g, " ")
            .trim()
        );
      },
      set: function (e) {
        if ((this.removeChildren(), e !== null && e !== void 0 && e !== ""))
          this._appendChild(this.ownerDocument.createTextNode(e));
      },
    },
    innerHTML: {
      get: function () {
        return this.serialize();
      },
      set: SI.nyi,
    },
    outerHTML: {
      get: function () {
        return wLa.serializeOne(this, { nodeType: 0 });
      },
      set: function (e) {
        var t = this.ownerDocument,
          r = this.parentNode;
        if (r === null) return;
        if (r.nodeType === e7.DOCUMENT_NODE) SI.NoModificationAllowedError();
        if (r.nodeType === e7.DOCUMENT_FRAGMENT_NODE) r = r.ownerDocument.createElement("body");
        var s = t.implementation.mozHTMLParser(t._address, r);
        (s.parse(e === null ? "" : String(e), !0), this.replaceWith(s._asDocumentFragment()));
      },
    },
    _insertAdjacent: {
      value: function (t, r) {
        var s = !1;
        switch (t) {
          case "beforebegin":
            s = !0;
          case "afterend":
            var a = this.parentNode;
            if (a === null) return null;
            return a.insertBefore(r, s ? this : this.nextSibling);
          case "afterbegin":
            s = !0;
          case "beforeend":
            return this.insertBefore(r, s ? this.firstChild : null);
          default:
            return SI.SyntaxError();
        }
      },
    },
    insertAdjacentElement: {
      value: function (t, r) {
        if (r.nodeType !== e7.ELEMENT_NODE) throw TypeError("not an element");
        return ((t = SI.toASCIILowerCase(String(t))), this._insertAdjacent(t, r));
      },
    },
    insertAdjacentText: {
      value: function (t, r) {
        var s = this.ownerDocument.createTextNode(r);
        ((t = SI.toASCIILowerCase(String(t))), this._insertAdjacent(t, s));
      },
    },
    insertAdjacentHTML: {
      value: function (t, r) {
        ((t = SI.toASCIILowerCase(String(t))), (r = String(r)));
        var s;
        switch (t) {
          case "beforebegin":
          case "afterend":
            if (((s = this.parentNode), s === null || s.nodeType === e7.DOCUMENT_NODE))
              SI.NoModificationAllowedError();
            break;
          case "afterbegin":
          case "beforeend":
            s = this;
            break;
          default:
            SI.SyntaxError();
        }
        if (
          !(s instanceof nHe) ||
          (s.ownerDocument.isHTML && s.localName === "html" && s.namespaceURI === iX.HTML)
        )
          s = s.ownerDocument.createElementNS(iX.HTML, "body");
        var a = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, s);
        (a.parse(r, !0), this._insertAdjacent(t, a._asDocumentFragment()));
      },
    },
    children: {
      get: function () {
        if (!this._children) this._children = new R1i(this);
        return this._children;
      },
    },
    attributes: {
      get: function () {
        if (!this._attributes) this._attributes = new Hgr(this);
        return this._attributes;
      },
    },
    firstElementChild: {
      get: function () {
        for (var e = this.firstChild; e !== null; e = e.nextSibling)
          if (e.nodeType === e7.ELEMENT_NODE) return e;
        return null;
      },
    },
    lastElementChild: {
      get: function () {
        for (var e = this.lastChild; e !== null; e = e.previousSibling)
          if (e.nodeType === e7.ELEMENT_NODE) return e;
        return null;
      },
    },
    childElementCount: {
      get: function () {
        return this.children.length;
      },
    },
    nextElement: {
      value: function (e) {
        if (!e) e = this.ownerDocument.documentElement;
        var t = this.firstElementChild;
        if (!t) {
          if (this === e) return null;
          t = this.nextElementSibling;
        }
        if (t) return t;
        for (var r = this.parentElement; r && r !== e; r = r.parentElement)
          if (((t = r.nextElementSibling), t)) return t;
        return null;
      },
    },
    getElementsByTagName: {
      value: function (t) {
        var r;
        if (!t) return new igr();
        if (t === "*")
          r = function () {
            return !0;
          };
        else if (this.isHTML) r = NLa(t);
        else r = agr(t);
        return new Ixt(this, r);
      },
    },
    getElementsByTagNameNS: {
      value: function (t, r) {
        var s;
        if (t === "*" && r === "*")
          s = function () {
            return !0;
          };
        else if (t === "*") s = agr(r);
        else if (r === "*") s = FLa(t);
        else s = BLa(t, r);
        return new Ixt(this, s);
      },
    },
    getElementsByClassName: {
      value: function (t) {
        if (((t = String(t).trim()), t === "")) {
          var r = new igr();
          return r;
        }
        return ((t = t.split(/[ \t\r\n\f]+/)), new Ixt(this, RLa(t)));
      },
    },
    getElementsByName: {
      value: function (t) {
        return new Ixt(this, WLa(String(t)));
      },
    },
    clone: {
      value: function () {
        var t;
        if (this.namespaceURI !== iX.HTML || this.prefix || !this.ownerDocument.isHTML)
          t = this.ownerDocument.createElementNS(
            this.namespaceURI,
            this.prefix !== null ? this.prefix + ":" + this.localName : this.localName,
          );
        else t = this.ownerDocument.createElement(this.localName);
        for (var r = 0, s = this._attrKeys.length; r < s; r++) {
          var a = this._attrKeys[r],
            H = this._attrsByLName[a],
            u = H.cloneNode();
          (u._setOwnerElement(t), (t._attrsByLName[a] = u), t._addQName(u));
        }
        return ((t._attrKeys = this._attrKeys.concat()), t);
      },
    },
    isEqual: {
      value: function (t) {
        if (
          this.localName !== t.localName ||
          this.namespaceURI !== t.namespaceURI ||
          this.prefix !== t.prefix ||
          this._numattrs !== t._numattrs
        )
          return !1;
        for (var r = 0, s = this._numattrs; r < s; r++) {
          var a = this._attr(r);
          if (!t.hasAttributeNS(a.namespaceURI, a.localName)) return !1;
          if (t.getAttributeNS(a.namespaceURI, a.localName) !== a.value) return !1;
        }
        return !0;
      },
    },
    _lookupNamespacePrefix: {
      value: function (t, r) {
        if (
          this.namespaceURI &&
          this.namespaceURI === t &&
          this.prefix !== null &&
          r.lookupNamespaceURI(this.prefix) === t
        )
          return this.prefix;
        for (var s = 0, a = this._numattrs; s < a; s++) {
          var H = this._attr(s);
          if (H.prefix === "xmlns" && H.value === t && r.lookupNamespaceURI(H.localName) === t)
            return H.localName;
        }
        var u = this.parentElement;
        return u ? u._lookupNamespacePrefix(t, r) : null;
      },
    },
    lookupNamespaceURI: {
      value: function (t) {
        if (t === "" || t === void 0) t = null;
        if (this.namespaceURI !== null && this.prefix === t) return this.namespaceURI;
        for (var r = 0, s = this._numattrs; r < s; r++) {
          var a = this._attr(r);
          if (a.namespaceURI === iX.XMLNS) {
            if (
              (a.prefix === "xmlns" && a.localName === t) ||
              (t === null && a.prefix === null && a.localName === "xmlns")
            )
              return a.value || null;
          }
        }
        var H = this.parentElement;
        return H ? H.lookupNamespaceURI(t) : null;
      },
    },
    getAttribute: {
      value: function (t) {
        var r = this.getAttributeNode(t);
        return r ? r.value : null;
      },
    },
    getAttributeNS: {
      value: function (t, r) {
        var s = this.getAttributeNodeNS(t, r);
        return s ? s.value : null;
      },
    },
    getAttributeNode: {
      value: function (t) {
        if (((t = String(t)), /[A-Z]/.test(t) && this.isHTML)) t = SI.toASCIILowerCase(t);
        var r = this._attrsByQName[t];
        if (!r) return null;
        if (Array.isArray(r)) r = r[0];
        return r;
      },
    },
    getAttributeNodeNS: {
      value: function (t, r) {
        ((t = t === void 0 || t === null ? "" : String(t)), (r = String(r)));
        var s = this._attrsByLName[t + "|" + r];
        return s ? s : null;
      },
    },
    hasAttribute: {
      value: function (t) {
        if (((t = String(t)), /[A-Z]/.test(t) && this.isHTML)) t = SI.toASCIILowerCase(t);
        return this._attrsByQName[t] !== void 0;
      },
    },
    hasAttributeNS: {
      value: function (t, r) {
        ((t = t === void 0 || t === null ? "" : String(t)), (r = String(r)));
        var s = t + "|" + r;
        return this._attrsByLName[s] !== void 0;
      },
    },
    hasAttributes: {
      value: function () {
        return this._numattrs > 0;
      },
    },
    toggleAttribute: {
      value: function (t, r) {
        if (((t = String(t)), !ngr.isValidName(t))) SI.InvalidCharacterError();
        if (/[A-Z]/.test(t) && this.isHTML) t = SI.toASCIILowerCase(t);
        var s = this._attrsByQName[t];
        if (s === void 0) {
          if (r === void 0 || r === !0) return (this._setAttribute(t, ""), !0);
          return !1;
        } else {
          if (r === void 0 || r === !1) return (this.removeAttribute(t), !1);
          return !0;
        }
      },
    },
    _setAttribute: {
      value: function (t, r) {
        var s = this._attrsByQName[t],
          a;
        if (!s) ((s = this._newattr(t)), (a = !0));
        else if (Array.isArray(s)) s = s[0];
        if (((s.value = r), this._attributes)) this._attributes[t] = s;
        if (a && this._newattrhook) this._newattrhook(t, r);
      },
    },
    setAttribute: {
      value: function (t, r) {
        if (((t = String(t)), !ngr.isValidName(t))) SI.InvalidCharacterError();
        if (/[A-Z]/.test(t) && this.isHTML) t = SI.toASCIILowerCase(t);
        this._setAttribute(t, String(r));
      },
    },
    _setAttributeNS: {
      value: function (t, r, s) {
        var a = r.indexOf(":"),
          H,
          u;
        if (a < 0) ((H = null), (u = r));
        else ((H = r.substring(0, a)), (u = r.substring(a + 1)));
        if (t === "" || t === void 0) t = null;
        var f = (t === null ? "" : t) + "|" + u,
          d = this._attrsByLName[f],
          _;
        if (!d) {
          if (((d = new AGe(this, u, H, t)), (_ = !0), (this._attrsByLName[f] = d), this._attributes))
            this._attributes[this._attrKeys.length] = d;
          (this._attrKeys.push(f), this._addQName(d));
        }
        if (((d.value = s), _ && this._newattrhook)) this._newattrhook(r, s);
      },
    },
    setAttributeNS: {
      value: function (t, r, s) {
        if (
          ((t = t === null || t === void 0 || t === "" ? null : String(t)),
          (r = String(r)),
          !ngr.isValidQName(r))
        )
          SI.InvalidCharacterError();
        var a = r.indexOf(":"),
          H = a < 0 ? null : r.substring(0, a);
        if (
          (H !== null && t === null) ||
          (H === "xml" && t !== iX.XML) ||
          ((r === "xmlns" || H === "xmlns") && t !== iX.XMLNS) ||
          (t === iX.XMLNS && !(r === "xmlns" || H === "xmlns"))
        )
          SI.NamespaceError();
        this._setAttributeNS(t, r, String(s));
      },
    },
    setAttributeNode: {
      value: function (t) {
        if (t.ownerElement !== null && t.ownerElement !== this) throw new gbe(gbe.INUSE_ATTRIBUTE_ERR);
        var r = null,
          s = this._attrsByQName[t.name];
        if (s) {
          if (!Array.isArray(s)) s = [s];
          if (
            s.some(function (a) {
              return a === t;
            })
          )
            return t;
          else if (t.ownerElement !== null) throw new gbe(gbe.INUSE_ATTRIBUTE_ERR);
          (s.forEach(function (a) {
            this.removeAttributeNode(a);
          }, this),
            (r = s[0]));
        }
        return (this.setAttributeNodeNS(t), r);
      },
    },
    setAttributeNodeNS: {
      value: function (t) {
        if (t.ownerElement !== null) throw new gbe(gbe.INUSE_ATTRIBUTE_ERR);
        var r = t.namespaceURI,
          s = (r === null ? "" : r) + "|" + t.localName,
          a = this._attrsByLName[s];
        if (a) this.removeAttributeNode(a);
        if ((t._setOwnerElement(this), (this._attrsByLName[s] = t), this._attributes))
          this._attributes[this._attrKeys.length] = t;
        if ((this._attrKeys.push(s), this._addQName(t), this._newattrhook))
          this._newattrhook(t.name, t.value);
        return a || null;
      },
    },
    removeAttribute: {
      value: function (t) {
        if (((t = String(t)), /[A-Z]/.test(t) && this.isHTML)) t = SI.toASCIILowerCase(t);
        var r = this._attrsByQName[t];
        if (!r) return;
        if (Array.isArray(r))
          if (r.length > 2) r = r.shift();
          else ((this._attrsByQName[t] = r[1]), (r = r[0]));
        else this._attrsByQName[t] = void 0;
        var s = r.namespaceURI,
          a = (s === null ? "" : s) + "|" + r.localName;
        this._attrsByLName[a] = void 0;
        var H = this._attrKeys.indexOf(a);
        if (this._attributes)
          (Array.prototype.splice.call(this._attributes, H, 1), (this._attributes[t] = void 0));
        this._attrKeys.splice(H, 1);
        var u = r.onchange;
        if ((r._setOwnerElement(null), u)) u.call(r, this, r.localName, r.value, null);
        if (this.rooted) this.ownerDocument.mutateRemoveAttr(r);
      },
    },
    removeAttributeNS: {
      value: function (t, r) {
        ((t = t === void 0 || t === null ? "" : String(t)), (r = String(r)));
        var s = t + "|" + r,
          a = this._attrsByLName[s];
        if (!a) return;
        this._attrsByLName[s] = void 0;
        var H = this._attrKeys.indexOf(s);
        if (this._attributes) Array.prototype.splice.call(this._attributes, H, 1);
        (this._attrKeys.splice(H, 1), this._removeQName(a));
        var u = a.onchange;
        if ((a._setOwnerElement(null), u)) u.call(a, this, a.localName, a.value, null);
        if (this.rooted) this.ownerDocument.mutateRemoveAttr(a);
      },
    },
    removeAttributeNode: {
      value: function (t) {
        var r = t.namespaceURI,
          s = (r === null ? "" : r) + "|" + t.localName;
        if (this._attrsByLName[s] !== t) SI.NotFoundError();
        return (this.removeAttributeNS(r, t.localName), t);
      },
    },
    getAttributeNames: {
      value: function () {
        var t = this;
        return this._attrKeys.map(function (r) {
          return t._attrsByLName[r].name;
        });
      },
    },
    _getattr: {
      value: function (t) {
        var r = this._attrsByQName[t];
        return r ? r.value : null;
      },
    },
    _setattr: {
      value: function (t, r) {
        var s = this._attrsByQName[t],
          a;
        if (!s) ((s = this._newattr(t)), (a = !0));
        if (((s.value = String(r)), this._attributes)) this._attributes[t] = s;
        if (a && this._newattrhook) this._newattrhook(t, r);
      },
    },
    _newattr: {
      value: function (t) {
        var r = new AGe(this, t, null, null),
          s = "|" + t;
        if (((this._attrsByQName[t] = r), (this._attrsByLName[s] = r), this._attributes))
          this._attributes[this._attrKeys.length] = r;
        return (this._attrKeys.push(s), r);
      },
    },
    _addQName: {
      value: function (e) {
        var t = e.name,
          r = this._attrsByQName[t];
        if (!r) this._attrsByQName[t] = e;
        else if (Array.isArray(r)) r.push(e);
        else this._attrsByQName[t] = [r, e];
        if (this._attributes) this._attributes[t] = e;
      },
    },
    _removeQName: {
      value: function (e) {
        var t = e.name,
          r = this._attrsByQName[t];
        if (Array.isArray(r)) {
          var s = r.indexOf(e);
          if ((SI.assert(s !== -1), r.length === 2)) {
            if (((this._attrsByQName[t] = r[1 - s]), this._attributes))
              this._attributes[t] = this._attrsByQName[t];
          } else if ((r.splice(s, 1), this._attributes && this._attributes[t] === e))
            this._attributes[t] = r[0];
        } else if ((SI.assert(r === e), (this._attrsByQName[t] = void 0), this._attributes))
          this._attributes[t] = void 0;
      },
    },
    _numattrs: {
      get: function () {
        return this._attrKeys.length;
      },
    },
    _attr: {
      value: function (e) {
        return this._attrsByLName[this._attrKeys[e]];
      },
    },
    id: Dxt.property({ name: "id" }),
    className: Dxt.property({ name: "class" }),
    classList: {
      get: function () {
        var e = this;
        if (this._classList) return this._classList;
        var t = new kLa(
          function () {
            return e.className || "";
          },
          function (r) {
            e.className = r;
          },
        );
        return ((this._classList = t), t);
      },
      set: function (e) {
        this.className = e;
      },
    },
    matches: {
      value: function (e) {
        return sgr.matches(this, e);
      },
    },
    closest: {
      value: function (e) {
        var t = this;
        do {
          if (t.matches && t.matches(e)) return t;
          t = t.parentElement || t.parentNode;
        } while (t !== null && t.nodeType === e7.ELEMENT_NODE);
        return null;
      },
    },
    querySelector: {
      value: function (e) {
        return sgr(e, this)[0];
      },
    },
    querySelectorAll: {
      value: function (e) {
        var t = sgr(e, this);
        return t.item ? t : new igr(t);
      },
    },
  });
  Object.defineProperties(nHe.prototype, OLa);
  Object.defineProperties(nHe.prototype, ULa);
  Dxt.registerChangeHandler(nHe, "id", function (e, t, r, s) {
    if (e.rooted) {
      if (r) e.ownerDocument.delId(r, e);
      if (s) e.ownerDocument.addId(s, e);
    }
  });
  Dxt.registerChangeHandler(nHe, "class", function (e, t, r, s) {
    if (e._classList) e._classList._update();
  });
  function AGe(e, t, r, s, a) {
    ((this.localName = t),
      (this.prefix = r === null || r === "" ? null : "" + r),
      (this.namespaceURI = s === null || s === "" ? null : "" + s),
      (this.data = a),
      this._setOwnerElement(e));
  }
  AGe.prototype = Object.create(Object.prototype, {
    ownerElement: {
      get: function () {
        return this._ownerElement;
      },
    },
    _setOwnerElement: {
      value: function (t) {
        if (((this._ownerElement = t), this.prefix === null && this.namespaceURI === null && t))
          this.onchange = t._attributeChangeHandlers[this.localName];
        else this.onchange = null;
      },
    },
    name: {
      get: function () {
        return this.prefix ? this.prefix + ":" + this.localName : this.localName;
      },
    },
    specified: {
      get: function () {
        return !0;
      },
    },
    value: {
      get: function () {
        return this.data;
      },
      set: function (e) {
        var t = this.data;
        if (((e = e === void 0 ? "" : e + ""), e === t)) return;
        if (((this.data = e), this.ownerElement)) {
          if (this.onchange) this.onchange(this.ownerElement, this.localName, t, e);
          if (this.ownerElement.rooted) this.ownerElement.ownerDocument.mutateAttr(this, t);
        }
      },
    },
    cloneNode: {
      value: function (t) {
        return new AGe(null, this.localName, this.prefix, this.namespaceURI, this.data);
      },
    },
    nodeType: {
      get: function () {
        return e7.ATTRIBUTE_NODE;
      },
    },
    nodeName: {
      get: function () {
        return this.name;
      },
    },
    nodeValue: {
      get: function () {
        return this.value;
      },
      set: function (e) {
        this.value = e;
      },
    },
    textContent: {
      get: function () {
        return this.value;
      },
      set: function (e) {
        if (e === null || e === void 0) e = "";
        this.value = e;
      },
    },
    innerText: {
      get: function () {
        return this.value;
      },
      set: function (e) {
        if (e === null || e === void 0) e = "";
        this.value = e;
      },
    },
  });
  nHe._Attr = AGe;
  function Hgr(e) {
    B1i.call(this, e);
    for (var t in e._attrsByQName) this[t] = e._attrsByQName[t];
    for (var r = 0; r < e._attrKeys.length; r++) this[r] = e._attrsByLName[e._attrKeys[r]];
  }
  Hgr.prototype = Object.create(B1i.prototype, {
    length: {
      get: function () {
        return this.element._attrKeys.length;
      },
      set: function () {},
    },
    item: {
      value: function (e) {
        if (((e = e >>> 0), e >= this.length)) return null;
        return this.element._attrsByLName[this.element._attrKeys[e]];
      },
    },
  });
  if (globalThis.Symbol?.iterator)
    Hgr.prototype[globalThis.Symbol.iterator] = function () {
      var e = 0,
        t = this.length,
        r = this;
      return {
        next: function () {
          if (e < t) return { value: r.item(e++) };
          return { done: !0 };
        },
      };
    };
  function R1i(e) {
    ((this.element = e), this.updateCache());
  }
  R1i.prototype = Object.create(Object.prototype, {
    length: {
      get: function () {
        return (this.updateCache(), this.childrenByNumber.length);
      },
    },
    item: {
      value: function (t) {
        return (this.updateCache(), this.childrenByNumber[t] || null);
      },
    },
    namedItem: {
      value: function (t) {
        return (this.updateCache(), this.childrenByName[t] || null);
      },
    },
    namedItems: {
      get: function () {
        return (this.updateCache(), this.childrenByName);
      },
    },
    updateCache: {
      value: function () {
        var t = /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
        if (this.lastModTime !== this.element.lastModTime) {
          this.lastModTime = this.element.lastModTime;
          var r = (this.childrenByNumber && this.childrenByNumber.length) || 0;
          for (var s = 0; s < r; s++) this[s] = void 0;
          ((this.childrenByNumber = []), (this.childrenByName = Object.create(null)));
          for (var a = this.element.firstChild; a !== null; a = a.nextSibling)
            if (a.nodeType === e7.ELEMENT_NODE) {
              ((this[this.childrenByNumber.length] = a), this.childrenByNumber.push(a));
              var H = a.getAttribute("id");
              if (H && !this.childrenByName[H]) this.childrenByName[H] = a;
              var u = a.getAttribute("name");
              if (
                u &&
                this.element.namespaceURI === iX.HTML &&
                t.test(this.element.localName) &&
                !this.childrenByName[u]
              )
                this.childrenByName[H] = a;
            }
        }
      },
    },
  });
  function agr(e) {
    return function (t) {
      return t.localName === e;
    };
  }
  function NLa(e) {
    var t = SI.toASCIILowerCase(e);
    if (t === e) return agr(e);
    return function (r) {
      return r.isHTML ? r.localName === t : r.localName === e;
    };
  }
  function FLa(e) {
    return function (t) {
      return t.namespaceURI === e;
    };
  }
  function BLa(e, t) {
    return function (r) {
      return r.namespaceURI === e && r.localName === t;
    };
  }
  function RLa(e) {
    return function (t) {
      return e.every(function (r) {
        return t.classList.contains(r);
      });
    };
  }
  function WLa(e) {
    return function (t) {
      if (t.namespaceURI !== iX.HTML) return !1;
      return t.getAttribute("name") === e;
    };
  }
});