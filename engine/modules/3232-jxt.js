
var jxt = Ie(function (fbc, oxi) {
  oxi.exports = LGe;
  var pP = ob(),
    $$a = ahe(),
    rxi = mxt(),
    iHe = Ebe(),
    g$a = ugr(),
    E$a = fgr(),
    hGe = dbe(),
    I$a = dgr(),
    D$a = _gr(),
    y$a = $Ge(),
    M$a = hMi(),
    x$a = DMi(),
    QMi = dGe(),
    YMi = xxt(),
    ZMi = gxt(),
    S$a = Mgr(),
    bxt = _xt(),
    Pgr = vxt(),
    T$a = jgr(),
    Eh = kD(),
    ybe = zMi(),
    xbe = Eh.NAMESPACE,
    Cgr = fxt().isApiWritable;
  function LGe(e, t) {
    (rxi.call(this),
      (this.nodeType = pP.DOCUMENT_NODE),
      (this.isHTML = e),
      (this._address = t || "about:blank"),
      (this.readyState = "loading"),
      (this.implementation = new y$a(this)),
      (this.ownerDocument = null),
      (this._contentType = e ? "text/html" : "application/xml"),
      (this.doctype = null),
      (this.documentElement = null),
      (this._templateDocCache = null),
      (this._nodeIterators = null),
      (this._nid = 1),
      (this._nextnid = 2),
      (this._nodes = [null, this]),
      (this.byId = Object.create(null)),
      (this.modclock = 0));
  }
  var v$a = { event: "Event", customevent: "CustomEvent", uievent: "UIEvent", mouseevent: "MouseEvent" },
    b$a = {
      events: "event",
      htmlevents: "event",
      mouseevents: "mouseevent",
      mutationevents: "mutationevent",
      uievents: "uievent",
    },
    Mbe = function (e, t, r) {
      return {
        get: function () {
          var s = e.call(this);
          if (s) return s[t];
          return r;
        },
        set: function (s) {
          var a = e.call(this);
          if (a) a[t] = s;
        },
      };
    };
  function exi(e, t) {
    var r, s, a;
    if (e === "") e = null;
    if (!bxt.isValidQName(t)) Eh.InvalidCharacterError();
    if (((r = null), (s = t), (a = t.indexOf(":")), a >= 0))
      ((r = t.substring(0, a)), (s = t.substring(a + 1)));
    if (r !== null && e === null) Eh.NamespaceError();
    if (r === "xml" && e !== xbe.XML) Eh.NamespaceError();
    if ((r === "xmlns" || t === "xmlns") && e !== xbe.XMLNS) Eh.NamespaceError();
    if (e === xbe.XMLNS && !(r === "xmlns" || t === "xmlns")) Eh.NamespaceError();
    return { namespace: e, prefix: r, localName: s };
  }
  LGe.prototype = Object.create(rxi.prototype, {
    _setMutationHandler: {
      value: function (e) {
        this.mutationHandler = e;
      },
    },
    _dispatchRendererEvent: {
      value: function (e, t, r) {
        var s = this._nodes[e];
        if (!s) return;
        s._dispatchEvent(new hGe(t, r), !0);
      },
    },
    nodeName: { value: "#document" },
    nodeValue: {
      get: function () {
        return null;
      },
      set: function () {},
    },
    documentURI: {
      get: function () {
        return this._address;
      },
      set: Eh.nyi,
    },
    compatMode: {
      get: function () {
        return this._quirks ? "BackCompat" : "CSS1Compat";
      },
    },
    createTextNode: {
      value: function (e) {
        return new g$a(this, String(e));
      },
    },
    createComment: {
      value: function (e) {
        return new E$a(this, e);
      },
    },
    createDocumentFragment: {
      value: function () {
        return new I$a(this);
      },
    },
    createProcessingInstruction: {
      value: function (e, t) {
        if (!bxt.isValidName(e) || t.indexOf("?>") !== -1) Eh.InvalidCharacterError();
        return new D$a(this, e, t);
      },
    },
    createAttribute: {
      value: function (e) {
        if (((e = String(e)), !bxt.isValidName(e))) Eh.InvalidCharacterError();
        if (this.isHTML) e = Eh.toASCIILowerCase(e);
        return new iHe._Attr(null, e, null, null, "");
      },
    },
    createAttributeNS: {
      value: function (e, t) {
        ((e = e === null || e === void 0 || e === "" ? null : String(e)), (t = String(t)));
        var r = exi(e, t);
        return new iHe._Attr(null, r.localName, r.prefix, r.namespace, "");
      },
    },
    createElement: {
      value: function (e) {
        if (((e = String(e)), !bxt.isValidName(e))) Eh.InvalidCharacterError();
        if (this.isHTML) {
          if (/[A-Z]/.test(e)) e = Eh.toASCIILowerCase(e);
          return Pgr.createElement(this, e, null);
        } else if (this.contentType === "application/xhtml+xml") return Pgr.createElement(this, e, null);
        else return new iHe(this, e, null, null);
      },
      writable: Cgr,
    },
    createElementNS: {
      value: function (e, t) {
        ((e = e === null || e === void 0 || e === "" ? null : String(e)), (t = String(t)));
        var r = exi(e, t);
        return this._createElementNS(r.localName, r.namespace, r.prefix);
      },
      writable: Cgr,
    },
    _createElementNS: {
      value: function (e, t, r) {
        if (t === xbe.HTML) return Pgr.createElement(this, e, r);
        else if (t === xbe.SVG) return T$a.createElement(this, e, r);
        return new iHe(this, e, t, r);
      },
    },
    createEvent: {
      value: function (t) {
        t = t.toLowerCase();
        var r = b$a[t] || t,
          s = S$a[v$a[r]];
        if (s) {
          var a = new s();
          return ((a._initialized = !1), a);
        } else Eh.NotSupportedError();
      },
    },
    createTreeWalker: {
      value: function (e, t, r) {
        if (!e) throw TypeError("root argument is required");
        if (!(e instanceof pP)) throw TypeError("root not a node");
        return ((t = t === void 0 ? QMi.SHOW_ALL : +t), (r = r === void 0 ? null : r), new M$a(e, t, r));
      },
    },
    createNodeIterator: {
      value: function (e, t, r) {
        if (!e) throw TypeError("root argument is required");
        if (!(e instanceof pP)) throw TypeError("root not a node");
        return ((t = t === void 0 ? QMi.SHOW_ALL : +t), (r = r === void 0 ? null : r), new x$a(e, t, r));
      },
    },
    _attachNodeIterator: {
      value: function (e) {
        if (!this._nodeIterators) this._nodeIterators = [];
        this._nodeIterators.push(e);
      },
    },
    _detachNodeIterator: {
      value: function (e) {
        var t = this._nodeIterators.indexOf(e);
        this._nodeIterators.splice(t, 1);
      },
    },
    _preremoveNodeIterators: {
      value: function (e) {
        if (this._nodeIterators)
          this._nodeIterators.forEach(function (t) {
            t._preremove(e);
          });
      },
    },
    _updateDocTypeElement: {
      value: function () {
        this.doctype = this.documentElement = null;
        for (var t = this.firstChild; t !== null; t = t.nextSibling)
          if (t.nodeType === pP.DOCUMENT_TYPE_NODE) this.doctype = t;
          else if (t.nodeType === pP.ELEMENT_NODE) this.documentElement = t;
      },
    },
    insertBefore: {
      value: function (t, r) {
        return (pP.prototype.insertBefore.call(this, t, r), this._updateDocTypeElement(), t);
      },
    },
    replaceChild: {
      value: function (t, r) {
        return (pP.prototype.replaceChild.call(this, t, r), this._updateDocTypeElement(), r);
      },
    },
    removeChild: {
      value: function (t) {
        return (pP.prototype.removeChild.call(this, t), this._updateDocTypeElement(), t);
      },
    },
    getElementById: {
      value: function (e) {
        var t = this.byId[e];
        if (!t) return null;
        if (t instanceof vZ) return t.getFirst();
        return t;
      },
    },
    _hasMultipleElementsWithId: {
      value: function (e) {
        return this.byId[e] instanceof vZ;
      },
    },
    getElementsByName: { value: iHe.prototype.getElementsByName },
    getElementsByTagName: { value: iHe.prototype.getElementsByTagName },
    getElementsByTagNameNS: { value: iHe.prototype.getElementsByTagNameNS },
    getElementsByClassName: { value: iHe.prototype.getElementsByClassName },
    adoptNode: {
      value: function (t) {
        if (t.nodeType === pP.DOCUMENT_NODE) Eh.NotSupportedError();
        if (t.nodeType === pP.ATTRIBUTE_NODE) return t;
        if (t.parentNode) t.parentNode.removeChild(t);
        if (t.ownerDocument !== this) sxi(t, this);
        return t;
      },
    },
    importNode: {
      value: function (t, r) {
        return this.adoptNode(t.cloneNode(r));
      },
      writable: Cgr,
    },
    origin: {
      get: function () {
        return null;
      },
    },
    characterSet: {
      get: function () {
        return "UTF-8";
      },
    },
    contentType: {
      get: function () {
        return this._contentType;
      },
    },
    URL: {
      get: function () {
        return this._address;
      },
    },
    domain: { get: Eh.nyi, set: Eh.nyi },
    referrer: { get: Eh.nyi },
    cookie: { get: Eh.nyi, set: Eh.nyi },
    lastModified: { get: Eh.nyi },
    location: {
      get: function () {
        return this.defaultView ? this.defaultView.location : null;
      },
      set: Eh.nyi,
    },
    _titleElement: {
      get: function () {
        return this.getElementsByTagName("title").item(0) || null;
      },
    },
    title: {
      get: function () {
        var e = this._titleElement,
          t = e ? e.textContent : "";
        return t.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "");
      },
      set: function (e) {
        var t = this._titleElement,
          r = this.head;
        if (!t && !r) return;
        if (!t) ((t = this.createElement("title")), r.appendChild(t));
        t.textContent = e;
      },
    },
    dir: Mbe(
      function () {
        var e = this.documentElement;
        if (e && e.tagName === "HTML") return e;
      },
      "dir",
      "",
    ),
    fgColor: Mbe(
      function () {
        return this.body;
      },
      "text",
      "",
    ),
    linkColor: Mbe(
      function () {
        return this.body;
      },
      "link",
      "",
    ),
    vlinkColor: Mbe(
      function () {
        return this.body;
      },
      "vLink",
      "",
    ),
    alinkColor: Mbe(
      function () {
        return this.body;
      },
      "aLink",
      "",
    ),
    bgColor: Mbe(
      function () {
        return this.body;
      },
      "bgColor",
      "",
    ),
    charset: {
      get: function () {
        return this.characterSet;
      },
    },
    inputEncoding: {
      get: function () {
        return this.characterSet;
      },
    },
    scrollingElement: {
      get: function () {
        return this._quirks ? this.body : this.documentElement;
      },
    },
    body: {
      get: function () {
        return txi(this.documentElement, "body");
      },
      set: Eh.nyi,
    },
    head: {
      get: function () {
        return txi(this.documentElement, "head");
      },
    },
    images: { get: Eh.nyi },
    embeds: { get: Eh.nyi },
    plugins: { get: Eh.nyi },
    links: { get: Eh.nyi },
    forms: { get: Eh.nyi },
    scripts: { get: Eh.nyi },
    applets: {
      get: function () {
        return [];
      },
    },
    activeElement: {
      get: function () {
        return null;
      },
    },
    innerHTML: {
      get: function () {
        return this.serialize();
      },
      set: Eh.nyi,
    },
    outerHTML: {
      get: function () {
        return this.serialize();
      },
      set: Eh.nyi,
    },
    write: {
      value: function (e) {
        if (!this.isHTML) Eh.InvalidStateError();
        if (!this._parser) return;
        if (!this._parser);
        var t = arguments.join("");
        this._parser.parse(t);
      },
    },
    writeln: {
      value: function (t) {
        this.write(
          Array.prototype.join.call(arguments, "") +
            `
`,
        );
      },
    },
    open: {
      value: function () {
        this.documentElement = null;
      },
    },
    close: {
      value: function () {
        if (
          ((this.readyState = "interactive"),
          this._dispatchEvent(new hGe("readystatechange"), !0),
          this._dispatchEvent(new hGe("DOMContentLoaded"), !0),
          (this.readyState = "complete"),
          this._dispatchEvent(new hGe("readystatechange"), !0),
          this.defaultView)
        )
          this.defaultView._dispatchEvent(new hGe("load"), !0);
      },
    },
    clone: {
      value: function () {
        var t = new LGe(this.isHTML, this._address);
        return ((t._quirks = this._quirks), (t._contentType = this._contentType), t);
      },
    },
    cloneNode: {
      value: function (t) {
        var r = pP.prototype.cloneNode.call(this, !1);
        if (t)
          for (var s = this.firstChild; s !== null; s = s.nextSibling) r._appendChild(r.importNode(s, !0));
        return (r._updateDocTypeElement(), r);
      },
    },
    isEqual: {
      value: function (t) {
        return !0;
      },
    },
    mutateValue: {
      value: function (e) {
        if (this.mutationHandler) this.mutationHandler({ type: ybe.VALUE, target: e, data: e.data });
      },
    },
    mutateAttr: {
      value: function (e, t) {
        if (this.mutationHandler) this.mutationHandler({ type: ybe.ATTR, target: e.ownerElement, attr: e });
      },
    },
    mutateRemoveAttr: {
      value: function (e) {
        if (this.mutationHandler)
          this.mutationHandler({ type: ybe.REMOVE_ATTR, target: e.ownerElement, attr: e });
      },
    },
    mutateRemove: {
      value: function (e) {
        if (this.mutationHandler) this.mutationHandler({ type: ybe.REMOVE, target: e.parentNode, node: e });
        ixi(e);
      },
    },
    mutateInsert: {
      value: function (e) {
        if ((nxi(e), this.mutationHandler))
          this.mutationHandler({ type: ybe.INSERT, target: e.parentNode, node: e });
      },
    },
    mutateMove: {
      value: function (e) {
        if (this.mutationHandler) this.mutationHandler({ type: ybe.MOVE, target: e });
      },
    },
    addId: {
      value: function (t, r) {
        var s = this.byId[t];
        if (!s) this.byId[t] = r;
        else {
          if (!(s instanceof vZ)) ((s = new vZ(s)), (this.byId[t] = s));
          s.add(r);
        }
      },
    },
    delId: {
      value: function (t, r) {
        var s = this.byId[t];
        if ((Eh.assert(s), s instanceof vZ)) {
          if ((s.del(r), s.length === 1)) this.byId[t] = s.downgrade();
        } else this.byId[t] = void 0;
      },
    },
    _resolve: {
      value: function (e) {
        return new YMi(this._documentBaseURL).resolve(e);
      },
    },
    _documentBaseURL: {
      get: function () {
        var e = this._address;
        if (e === "about:blank") e = "/";
        var t = this.querySelector("base[href]");
        if (t) return new YMi(e).resolve(t.getAttribute("href"));
        return e;
      },
    },
    _templateDoc: {
      get: function () {
        if (!this._templateDocCache) {
          var e = new LGe(this.isHTML, this._address);
          this._templateDocCache = e._templateDocCache = e;
        }
        return this._templateDocCache;
      },
    },
    querySelector: {
      value: function (e) {
        return ZMi(e, this)[0];
      },
    },
    querySelectorAll: {
      value: function (e) {
        var t = ZMi(e, this);
        return t.item ? t : new $$a(t);
      },
    },
  });
  var j$a = [
    "abort",
    "canplay",
    "canplaythrough",
    "change",
    "click",
    "contextmenu",
    "cuechange",
    "dblclick",
    "drag",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "dragstart",
    "drop",
    "durationchange",
    "emptied",
    "ended",
    "input",
    "invalid",
    "keydown",
    "keypress",
    "keyup",
    "loadeddata",
    "loadedmetadata",
    "loadstart",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "mousewheel",
    "pause",
    "play",
    "playing",
    "progress",
    "ratechange",
    "readystatechange",
    "reset",
    "seeked",
    "seeking",
    "select",
    "show",
    "stalled",
    "submit",
    "suspend",
    "timeupdate",
    "volumechange",
    "waiting",
    "blur",
    "error",
    "focus",
    "load",
    "scroll",
  ];
  j$a.forEach(function (e) {
    Object.defineProperty(LGe.prototype, "on" + e, {
      get: function () {
        return this._getEventHandler(e);
      },
      set: function (t) {
        this._setEventHandler(e, t);
      },
    });
  });
  function txi(e, t) {
    if (e && e.isHTML) {
      for (var r = e.firstChild; r !== null; r = r.nextSibling)
        if (r.nodeType === pP.ELEMENT_NODE && r.localName === t && r.namespaceURI === xbe.HTML) return r;
    }
    return null;
  }
  function P$a(e) {
    if (
      ((e._nid = e.ownerDocument._nextnid++),
      (e.ownerDocument._nodes[e._nid] = e),
      e.nodeType === pP.ELEMENT_NODE)
    ) {
      var t = e.getAttribute("id");
      if (t) e.ownerDocument.addId(t, e);
      if (e._roothook) e._roothook();
    }
  }
  function C$a(e) {
    if (e.nodeType === pP.ELEMENT_NODE) {
      var t = e.getAttribute("id");
      if (t) e.ownerDocument.delId(t, e);
    }
    ((e.ownerDocument._nodes[e._nid] = void 0), (e._nid = void 0));
  }
  function nxi(e) {
    if ((P$a(e), e.nodeType === pP.ELEMENT_NODE))
      for (var t = e.firstChild; t !== null; t = t.nextSibling) nxi(t);
  }
  function ixi(e) {
    C$a(e);
    for (var t = e.firstChild; t !== null; t = t.nextSibling) ixi(t);
  }
  function sxi(e, t) {
    if (
      ((e.ownerDocument = t), (e._lastModTime = void 0), Object.prototype.hasOwnProperty.call(e, "_tagName"))
    )
      e._tagName = void 0;
    for (var r = e.firstChild; r !== null; r = r.nextSibling) sxi(r, t);
  }
  function vZ(e) {
    ((this.nodes = Object.create(null)),
      (this.nodes[e._nid] = e),
      (this.length = 1),
      (this.firstNode = void 0));
  }
  vZ.prototype.add = function (e) {
    if (!this.nodes[e._nid]) ((this.nodes[e._nid] = e), this.length++, (this.firstNode = void 0));
  };
  vZ.prototype.del = function (e) {
    if (this.nodes[e._nid]) (delete this.nodes[e._nid], this.length--, (this.firstNode = void 0));
  };
  vZ.prototype.getFirst = function () {
    if (!this.firstNode) {
      var e;
      for (e in this.nodes)
        if (
          this.firstNode === void 0 ||
          this.firstNode.compareDocumentPosition(this.nodes[e]) & pP.DOCUMENT_POSITION_PRECEDING
        )
          this.firstNode = this.nodes[e];
    }
    return this.firstNode;
  };
  vZ.prototype.downgrade = function () {
    if (this.length === 1) {
      var e;
      for (e in this.nodes) return this.nodes[e];
    }
    return this;
  };
});