
var vxt = Ie(function (p$a) {
  var Tgr = ob(),
    WMi = Ebe(),
    A$a = Sxt(),
    TN = kD(),
    VMi = xgr(),
    u$a = Sgr(),
    TZ = (p$a.elements = {}),
    _Ge = Object.create(null);
  p$a.createElement = function (e, t, r) {
    var s = _Ge[t] || f$a;
    return new s(e, t, r);
  };
  function Tc(e) {
    return u$a(e, Su, TZ, _Ge);
  }
  function OD(e) {
    return {
      get: function () {
        var t = this._getattr(e);
        if (t === null) return "";
        var r = this.doc._resolve(t);
        return r === null ? t : r;
      },
      set: function (t) {
        this._setattr(e, t);
      },
    };
  }
  function Txt(e) {
    return {
      get: function () {
        var t = this._getattr(e);
        if (t === null) return null;
        if (t.toLowerCase() === "use-credentials") return "use-credentials";
        return "anonymous";
      },
      set: function (t) {
        if (t === null || t === void 0) this.removeAttribute(e);
        else this._setattr(e, t);
      },
    };
  }
  var Dbe = {
      type: [
        "",
        "no-referrer",
        "no-referrer-when-downgrade",
        "same-origin",
        "origin",
        "strict-origin",
        "origin-when-cross-origin",
        "strict-origin-when-cross-origin",
        "unsafe-url",
      ],
      missing: "",
    },
    l$a = { A: !0, LINK: !0, BUTTON: !0, INPUT: !0, SELECT: !0, TEXTAREA: !0, COMMAND: !0 },
    t7 = function (e, t, r) {
      (Su.call(this, e, t, r), (this._form = null));
    },
    Su = (p$a.HTMLElement = Tc({
      superclass: WMi,
      name: "HTMLElement",
      ctor: function (t, r, s) {
        WMi.call(this, t, r, TN.NAMESPACE.HTML, s);
      },
      props: {
        dangerouslySetInnerHTML: {
          set: function (e) {
            this._innerHTML = e;
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: function (e) {
            var t = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, this);
            t.parse(e === null ? "" : String(e), !0);
            var r = this instanceof _Ge.template ? this.content : this;
            while (r.hasChildNodes()) r.removeChild(r.firstChild);
            r.appendChild(t._asDocumentFragment());
          },
        },
        style: {
          get: function () {
            if (!this._style) this._style = new A$a(this);
            return this._style;
          },
          set: function (e) {
            if (e === null || e === void 0) e = "";
            this._setattr("style", String(e));
          },
        },
        blur: { value: function () {} },
        focus: { value: function () {} },
        forceSpellCheck: { value: function () {} },
        click: {
          value: function () {
            if (this._click_in_progress) return;
            this._click_in_progress = !0;
            try {
              if (this._pre_click_activation_steps) this._pre_click_activation_steps();
              var e = this.ownerDocument.createEvent("MouseEvent");
              e.initMouseEvent(
                "click",
                !0,
                !0,
                this.ownerDocument.defaultView,
                1,
                0,
                0,
                0,
                0,
                !1,
                !1,
                !1,
                !1,
                0,
                null,
              );
              var t = this.dispatchEvent(e);
              if (t) {
                if (this._post_click_activation_steps) this._post_click_activation_steps(e);
              } else if (this._cancelled_activation_steps) this._cancelled_activation_steps();
            } finally {
              this._click_in_progress = !1;
            }
          },
        },
        submit: { value: TN.nyi },
      },
      attributes: {
        title: String,
        lang: String,
        dir: { type: ["ltr", "rtl", "auto"], missing: "" },
        draggable: { type: ["true", "false"], treatNullAsEmptyString: !0 },
        spellcheck: { type: ["true", "false"], missing: "" },
        enterKeyHint: { type: ["enter", "done", "go", "next", "previous", "search", "send"], missing: "" },
        autoCapitalize: { type: ["off", "on", "none", "sentences", "words", "characters"], missing: "" },
        autoFocus: Boolean,
        accessKey: String,
        nonce: String,
        hidden: Boolean,
        translate: { type: ["no", "yes"], missing: "" },
        tabIndex: {
          type: "long",
          default: function () {
            if (this.tagName in l$a || this.contentEditable) return 0;
            else return -1;
          },
        },
      },
      events: [
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
      ],
    })),
    f$a = Tc({
      name: "HTMLUnknownElement",
      ctor: function (t, r, s) {
        Su.call(this, t, r, s);
      },
    }),
    r7 = {
      form: {
        get: function () {
          return this._form;
        },
      },
    };
  Tc({
    tag: "a",
    name: "HTMLAnchorElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      _post_click_activation_steps: {
        value: function (e) {
          if (this.href) this.ownerDocument.defaultView.location = this.href;
        },
      },
    },
    attributes: {
      href: OD,
      ping: String,
      download: String,
      target: String,
      rel: String,
      media: String,
      hreflang: String,
      type: String,
      referrerPolicy: Dbe,
      coords: String,
      charset: String,
      name: String,
      rev: String,
      shape: String,
    },
  });
  VMi._inherit(_Ge.a.prototype);
  Tc({
    tag: "area",
    name: "HTMLAreaElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      alt: String,
      target: String,
      download: String,
      rel: String,
      media: String,
      href: OD,
      hreflang: String,
      type: String,
      shape: String,
      coords: String,
      ping: String,
      referrerPolicy: Dbe,
      noHref: Boolean,
    },
  });
  VMi._inherit(_Ge.area.prototype);
  Tc({
    tag: "br",
    name: "HTMLBRElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { clear: String },
  });
  Tc({
    tag: "base",
    name: "HTMLBaseElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { target: String },
  });
  Tc({
    tag: "body",
    name: "HTMLBodyElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    events: [
      "afterprint",
      "beforeprint",
      "beforeunload",
      "blur",
      "error",
      "focus",
      "hashchange",
      "load",
      "message",
      "offline",
      "online",
      "pagehide",
      "pageshow",
      "popstate",
      "resize",
      "scroll",
      "storage",
      "unload",
    ],
    attributes: {
      text: { type: String, treatNullAsEmptyString: !0 },
      link: { type: String, treatNullAsEmptyString: !0 },
      vLink: { type: String, treatNullAsEmptyString: !0 },
      aLink: { type: String, treatNullAsEmptyString: !0 },
      bgColor: { type: String, treatNullAsEmptyString: !0 },
      background: String,
    },
  });
  Tc({
    tag: "button",
    name: "HTMLButtonElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: r7,
    attributes: {
      name: String,
      value: String,
      disabled: Boolean,
      autofocus: Boolean,
      type: { type: ["submit", "reset", "button", "menu"], missing: "submit" },
      formTarget: String,
      formAction: OD,
      formNoValidate: Boolean,
      formMethod: { type: ["get", "post", "dialog"], invalid: "get", missing: "" },
      formEnctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: "",
      },
    },
  });
  Tc({
    tag: "dl",
    name: "HTMLDListElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { compact: Boolean },
  });
  Tc({
    tag: "data",
    name: "HTMLDataElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { value: String },
  });
  Tc({
    tag: "datalist",
    name: "HTMLDataListElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
  });
  Tc({
    tag: "details",
    name: "HTMLDetailsElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { open: Boolean },
  });
  Tc({
    tag: "div",
    name: "HTMLDivElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { align: String },
  });
  Tc({
    tag: "embed",
    name: "HTMLEmbedElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { src: OD, type: String, width: String, height: String, align: String, name: String },
  });
  Tc({
    tag: "fieldset",
    name: "HTMLFieldSetElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: r7,
    attributes: { disabled: Boolean, name: String },
  });
  Tc({
    tag: "form",
    name: "HTMLFormElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      action: String,
      autocomplete: { type: ["on", "off"], missing: "on" },
      name: String,
      acceptCharset: { name: "accept-charset" },
      target: String,
      noValidate: Boolean,
      method: { type: ["get", "post", "dialog"], invalid: "get", missing: "get" },
      enctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: "application/x-www-form-urlencoded",
      },
      encoding: {
        name: "enctype",
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: "application/x-www-form-urlencoded",
      },
    },
  });
  Tc({
    tag: "hr",
    name: "HTMLHRElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { align: String, color: String, noShade: Boolean, size: String, width: String },
  });
  Tc({
    tag: "head",
    name: "HTMLHeadElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
  });
  Tc({
    tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
    name: "HTMLHeadingElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { align: String },
  });
  Tc({
    tag: "html",
    name: "HTMLHtmlElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { xmlns: OD, version: String },
  });
  Tc({
    tag: "iframe",
    name: "HTMLIFrameElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      src: OD,
      srcdoc: String,
      name: String,
      width: String,
      height: String,
      seamless: Boolean,
      allow: Boolean,
      allowFullscreen: Boolean,
      allowUserMedia: Boolean,
      allowPaymentRequest: Boolean,
      referrerPolicy: Dbe,
      loading: { type: ["eager", "lazy"], treatNullAsEmptyString: !0 },
      align: String,
      scrolling: String,
      frameBorder: String,
      longDesc: OD,
      marginHeight: { type: String, treatNullAsEmptyString: !0 },
      marginWidth: { type: String, treatNullAsEmptyString: !0 },
    },
  });
  Tc({
    tag: "img",
    name: "HTMLImageElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      alt: String,
      src: OD,
      srcset: String,
      crossOrigin: Txt,
      useMap: String,
      isMap: Boolean,
      sizes: String,
      height: { type: "unsigned long", default: 0 },
      width: { type: "unsigned long", default: 0 },
      referrerPolicy: Dbe,
      loading: { type: ["eager", "lazy"], missing: "" },
      name: String,
      lowsrc: OD,
      align: String,
      hspace: { type: "unsigned long", default: 0 },
      vspace: { type: "unsigned long", default: 0 },
      longDesc: OD,
      border: { type: String, treatNullAsEmptyString: !0 },
    },
  });
  Tc({
    tag: "input",
    name: "HTMLInputElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: {
      form: r7.form,
      _post_click_activation_steps: {
        value: function (e) {
          if (this.type === "checkbox") this.checked = !this.checked;
          else if (this.type === "radio") {
            var t = this.form.getElementsByName(this.name);
            for (var r = t.length - 1; r >= 0; r--) {
              var s = t[r];
              s.checked = s === this;
            }
          }
        },
      },
    },
    attributes: {
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      accept: String,
      alt: String,
      max: String,
      min: String,
      pattern: String,
      placeholder: String,
      step: String,
      dirName: String,
      defaultValue: { name: "value" },
      multiple: Boolean,
      required: Boolean,
      readOnly: Boolean,
      checked: Boolean,
      value: String,
      src: OD,
      defaultChecked: { name: "checked", type: Boolean },
      size: { type: "unsigned long", default: 20, min: 1, setmin: 1 },
      width: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
      height: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
      minLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
      maxLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
      autocomplete: String,
      type: {
        type: [
          "text",
          "hidden",
          "search",
          "tel",
          "url",
          "email",
          "password",
          "datetime",
          "date",
          "month",
          "week",
          "time",
          "datetime-local",
          "number",
          "range",
          "color",
          "checkbox",
          "radio",
          "file",
          "submit",
          "image",
          "reset",
          "button",
        ],
        missing: "text",
      },
      formTarget: String,
      formNoValidate: Boolean,
      formMethod: { type: ["get", "post"], invalid: "get", missing: "" },
      formEnctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: "",
      },
      inputMode: {
        type: [
          "verbatim",
          "latin",
          "latin-name",
          "latin-prose",
          "full-width-latin",
          "kana",
          "kana-name",
          "katakana",
          "numeric",
          "tel",
          "email",
          "url",
        ],
        missing: "",
      },
      align: String,
      useMap: String,
    },
  });
  Tc({
    tag: "keygen",
    name: "HTMLKeygenElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: r7,
    attributes: {
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      challenge: String,
      keytype: { type: ["rsa"], missing: "" },
    },
  });
  Tc({
    tag: "li",
    name: "HTMLLIElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { value: { type: "long", default: 0 }, type: String },
  });
  Tc({
    tag: "label",
    name: "HTMLLabelElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: r7,
    attributes: { htmlFor: { name: "for", type: String } },
  });
  Tc({
    tag: "legend",
    name: "HTMLLegendElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { align: String },
  });
  Tc({
    tag: "link",
    name: "HTMLLinkElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      href: OD,
      rel: String,
      media: String,
      hreflang: String,
      type: String,
      crossOrigin: Txt,
      nonce: String,
      integrity: String,
      referrerPolicy: Dbe,
      imageSizes: String,
      imageSrcset: String,
      charset: String,
      rev: String,
      target: String,
    },
  });
  Tc({
    tag: "map",
    name: "HTMLMapElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { name: String },
  });
  Tc({
    tag: "menu",
    name: "HTMLMenuElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      type: { type: ["context", "popup", "toolbar"], missing: "toolbar" },
      label: String,
      compact: Boolean,
    },
  });
  Tc({
    tag: "meta",
    name: "HTMLMetaElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      name: String,
      content: String,
      httpEquiv: { name: "http-equiv", type: String },
      scheme: String,
    },
  });
  Tc({
    tag: "meter",
    name: "HTMLMeterElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: r7,
  });
  Tc({
    tags: ["ins", "del"],
    name: "HTMLModElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { cite: OD, dateTime: String },
  });
  Tc({
    tag: "ol",
    name: "HTMLOListElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      _numitems: {
        get: function () {
          var e = 0;
          return (
            this.childNodes.forEach(function (t) {
              if (t.nodeType === Tgr.ELEMENT_NODE && t.tagName === "LI") e++;
            }),
            e
          );
        },
      },
    },
    attributes: {
      type: String,
      reversed: Boolean,
      start: {
        type: "long",
        default: function () {
          if (this.reversed) return this._numitems;
          else return 1;
        },
      },
      compact: Boolean,
    },
  });
  Tc({
    tag: "object",
    name: "HTMLObjectElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: r7,
    attributes: {
      data: OD,
      type: String,
      name: String,
      useMap: String,
      typeMustMatch: Boolean,
      width: String,
      height: String,
      align: String,
      archive: String,
      code: String,
      declare: Boolean,
      hspace: { type: "unsigned long", default: 0 },
      standby: String,
      vspace: { type: "unsigned long", default: 0 },
      codeBase: OD,
      codeType: String,
      border: { type: String, treatNullAsEmptyString: !0 },
    },
  });
  Tc({
    tag: "optgroup",
    name: "HTMLOptGroupElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { disabled: Boolean, label: String },
  });
  Tc({
    tag: "option",
    name: "HTMLOptionElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      form: {
        get: function () {
          var e = this.parentNode;
          while (e && e.nodeType === Tgr.ELEMENT_NODE) {
            if (e.localName === "select") return e.form;
            e = e.parentNode;
          }
        },
      },
      value: {
        get: function () {
          return this._getattr("value") || this.text;
        },
        set: function (e) {
          this._setattr("value", e);
        },
      },
      text: {
        get: function () {
          return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim();
        },
        set: function (e) {
          this.textContent = e;
        },
      },
    },
    attributes: { disabled: Boolean, defaultSelected: { name: "selected", type: Boolean }, label: String },
  });
  Tc({
    tag: "output",
    name: "HTMLOutputElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: r7,
    attributes: { name: String },
  });
  Tc({
    tag: "p",
    name: "HTMLParagraphElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { align: String },
  });
  Tc({
    tag: "param",
    name: "HTMLParamElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { name: String, value: String, type: String, valueType: String },
  });
  Tc({
    tags: ["pre", "listing", "xmp"],
    name: "HTMLPreElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { width: { type: "long", default: 0 } },
  });
  Tc({
    tag: "progress",
    name: "HTMLProgressElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: r7,
    attributes: { max: { type: Number, float: !0, default: 1, min: 0 } },
  });
  Tc({
    tags: ["q", "blockquote"],
    name: "HTMLQuoteElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { cite: OD },
  });
  Tc({
    tag: "script",
    name: "HTMLScriptElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      text: {
        get: function () {
          var e = "";
          for (var t = 0, r = this.childNodes.length; t < r; t++) {
            var s = this.childNodes[t];
            if (s.nodeType === Tgr.TEXT_NODE) e += s._data;
          }
          return e;
        },
        set: function (e) {
          if ((this.removeChildren(), e !== null && e !== ""))
            this.appendChild(this.ownerDocument.createTextNode(e));
        },
      },
    },
    attributes: {
      src: OD,
      type: String,
      charset: String,
      referrerPolicy: Dbe,
      defer: Boolean,
      async: Boolean,
      nomodule: Boolean,
      crossOrigin: Txt,
      nonce: String,
      integrity: String,
    },
  });
  Tc({
    tag: "select",
    name: "HTMLSelectElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: {
      form: r7.form,
      options: {
        get: function () {
          return this.getElementsByTagName("option");
        },
      },
    },
    attributes: {
      autocomplete: String,
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      multiple: Boolean,
      required: Boolean,
      size: { type: "unsigned long", default: 0 },
    },
  });
  Tc({
    tag: "span",
    name: "HTMLSpanElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
  });
  Tc({
    tag: "style",
    name: "HTMLStyleElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { media: String, type: String, scoped: Boolean },
  });
  Tc({
    tag: "caption",
    name: "HTMLTableCaptionElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { align: String },
  });
  Tc({
    name: "HTMLTableCellElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      colSpan: { type: "unsigned long", default: 1 },
      rowSpan: { type: "unsigned long", default: 1 },
      scope: { type: ["row", "col", "rowgroup", "colgroup"], missing: "" },
      abbr: String,
      align: String,
      axis: String,
      height: String,
      width: String,
      ch: { name: "char", type: String },
      chOff: { name: "charoff", type: String },
      noWrap: Boolean,
      vAlign: String,
      bgColor: { type: String, treatNullAsEmptyString: !0 },
    },
  });
  Tc({
    tags: ["col", "colgroup"],
    name: "HTMLTableColElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      span: { type: "limited unsigned long with fallback", default: 1, min: 1 },
      align: String,
      ch: { name: "char", type: String },
      chOff: { name: "charoff", type: String },
      vAlign: String,
      width: String,
    },
  });
  Tc({
    tag: "table",
    name: "HTMLTableElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      rows: {
        get: function () {
          return this.getElementsByTagName("tr");
        },
      },
    },
    attributes: {
      align: String,
      border: String,
      frame: String,
      rules: String,
      summary: String,
      width: String,
      bgColor: { type: String, treatNullAsEmptyString: !0 },
      cellPadding: { type: String, treatNullAsEmptyString: !0 },
      cellSpacing: { type: String, treatNullAsEmptyString: !0 },
    },
  });
  Tc({
    tag: "template",
    name: "HTMLTemplateElement",
    ctor: function (t, r, s) {
      (Su.call(this, t, r, s), (this._contentFragment = t._templateDoc.createDocumentFragment()));
    },
    props: {
      content: {
        get: function () {
          return this._contentFragment;
        },
      },
      serialize: {
        value: function () {
          return this.content.serialize();
        },
      },
    },
  });
  Tc({
    tag: "tr",
    name: "HTMLTableRowElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      cells: {
        get: function () {
          return this.querySelectorAll("td,th");
        },
      },
    },
    attributes: {
      align: String,
      ch: { name: "char", type: String },
      chOff: { name: "charoff", type: String },
      vAlign: String,
      bgColor: { type: String, treatNullAsEmptyString: !0 },
    },
  });
  Tc({
    tags: ["thead", "tfoot", "tbody"],
    name: "HTMLTableSectionElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      rows: {
        get: function () {
          return this.getElementsByTagName("tr");
        },
      },
    },
    attributes: {
      align: String,
      ch: { name: "char", type: String },
      chOff: { name: "charoff", type: String },
      vAlign: String,
    },
  });
  Tc({
    tag: "textarea",
    name: "HTMLTextAreaElement",
    ctor: function (t, r, s) {
      t7.call(this, t, r, s);
    },
    props: {
      form: r7.form,
      type: {
        get: function () {
          return "textarea";
        },
      },
      defaultValue: {
        get: function () {
          return this.textContent;
        },
        set: function (e) {
          this.textContent = e;
        },
      },
      value: {
        get: function () {
          return this.defaultValue;
        },
        set: function (e) {
          this.defaultValue = e;
        },
      },
      textLength: {
        get: function () {
          return this.value.length;
        },
      },
    },
    attributes: {
      autocomplete: String,
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      placeholder: String,
      wrap: String,
      dirName: String,
      required: Boolean,
      readOnly: Boolean,
      rows: { type: "limited unsigned long with fallback", default: 2 },
      cols: { type: "limited unsigned long with fallback", default: 20 },
      maxLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
      minLength: { type: "unsigned long", min: 0, setmin: 0, default: -1 },
      inputMode: {
        type: [
          "verbatim",
          "latin",
          "latin-name",
          "latin-prose",
          "full-width-latin",
          "kana",
          "kana-name",
          "katakana",
          "numeric",
          "tel",
          "email",
          "url",
        ],
        missing: "",
      },
    },
  });
  Tc({
    tag: "time",
    name: "HTMLTimeElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { dateTime: String, pubDate: Boolean },
  });
  Tc({
    tag: "title",
    name: "HTMLTitleElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      text: {
        get: function () {
          return this.textContent;
        },
      },
    },
  });
  Tc({
    tag: "ul",
    name: "HTMLUListElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { type: String, compact: Boolean },
  });
  Tc({
    name: "HTMLMediaElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      src: OD,
      crossOrigin: Txt,
      preload: { type: ["metadata", "none", "auto", { value: "", alias: "auto" }], missing: "auto" },
      loop: Boolean,
      autoplay: Boolean,
      mediaGroup: String,
      controls: Boolean,
      defaultMuted: { name: "muted", type: Boolean },
    },
  });
  Tc({
    name: "HTMLAudioElement",
    tag: "audio",
    superclass: TZ.HTMLMediaElement,
    ctor: function (t, r, s) {
      TZ.HTMLMediaElement.call(this, t, r, s);
    },
  });
  Tc({
    name: "HTMLVideoElement",
    tag: "video",
    superclass: TZ.HTMLMediaElement,
    ctor: function (t, r, s) {
      TZ.HTMLMediaElement.call(this, t, r, s);
    },
    attributes: {
      poster: OD,
      width: { type: "unsigned long", min: 0, default: 0 },
      height: { type: "unsigned long", min: 0, default: 0 },
    },
  });
  Tc({
    tag: "td",
    name: "HTMLTableDataCellElement",
    superclass: TZ.HTMLTableCellElement,
    ctor: function (t, r, s) {
      TZ.HTMLTableCellElement.call(this, t, r, s);
    },
  });
  Tc({
    tag: "th",
    name: "HTMLTableHeaderCellElement",
    superclass: TZ.HTMLTableCellElement,
    ctor: function (t, r, s) {
      TZ.HTMLTableCellElement.call(this, t, r, s);
    },
  });
  Tc({
    tag: "frameset",
    name: "HTMLFrameSetElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
  });
  Tc({
    tag: "frame",
    name: "HTMLFrameElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
  });
  Tc({
    tag: "canvas",
    name: "HTMLCanvasElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      getContext: { value: TN.nyi },
      probablySupportsContext: { value: TN.nyi },
      setContext: { value: TN.nyi },
      transferControlToProxy: { value: TN.nyi },
      toDataURL: { value: TN.nyi },
      toBlob: { value: TN.nyi },
    },
    attributes: {
      width: { type: "unsigned long", default: 300 },
      height: { type: "unsigned long", default: 150 },
    },
  });
  Tc({
    tag: "dialog",
    name: "HTMLDialogElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: { show: { value: TN.nyi }, showModal: { value: TN.nyi }, close: { value: TN.nyi } },
    attributes: { open: Boolean, returnValue: String },
  });
  Tc({
    tag: "menuitem",
    name: "HTMLMenuItemElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    props: {
      _label: {
        get: function () {
          var e = this._getattr("label");
          if (e !== null && e !== "") return e;
          return ((e = this.textContent), e.replace(/[ \t\n\f\r]+/g, " ").trim());
        },
      },
      label: {
        get: function () {
          var e = this._getattr("label");
          if (e !== null) return e;
          return this._label;
        },
        set: function (e) {
          this._setattr("label", e);
        },
      },
    },
    attributes: {
      type: { type: ["command", "checkbox", "radio"], missing: "command" },
      icon: OD,
      disabled: Boolean,
      checked: Boolean,
      radiogroup: String,
      default: Boolean,
    },
  });
  Tc({
    tag: "source",
    name: "HTMLSourceElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      srcset: String,
      sizes: String,
      media: String,
      src: OD,
      type: String,
      width: String,
      height: String,
    },
  });
  Tc({
    tag: "track",
    name: "HTMLTrackElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      src: OD,
      srclang: String,
      label: String,
      default: Boolean,
      kind: {
        type: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
        missing: "subtitles",
        invalid: "metadata",
      },
    },
    props: {
      NONE: {
        get: function () {
          return 0;
        },
      },
      LOADING: {
        get: function () {
          return 1;
        },
      },
      LOADED: {
        get: function () {
          return 2;
        },
      },
      ERROR: {
        get: function () {
          return 3;
        },
      },
      readyState: { get: TN.nyi },
      track: { get: TN.nyi },
    },
  });
  Tc({
    tag: "font",
    name: "HTMLFontElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: {
      color: { type: String, treatNullAsEmptyString: !0 },
      face: { type: String },
      size: { type: String },
    },
  });
  Tc({
    tag: "dir",
    name: "HTMLDirectoryElement",
    ctor: function (t, r, s) {
      Su.call(this, t, r, s);
    },
    attributes: { compact: Boolean },
  });
  Tc({
    tags: [
      "abbr",
      "address",
      "article",
      "aside",
      "b",
      "bdi",
      "bdo",
      "cite",
      "content",
      "code",
      "dd",
      "dfn",
      "dt",
      "em",
      "figcaption",
      "figure",
      "footer",
      "header",
      "hgroup",
      "i",
      "kbd",
      "main",
      "mark",
      "nav",
      "noscript",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "section",
      "small",
      "strong",
      "sub",
      "summary",
      "sup",
      "u",
      "var",
      "wbr",
      "acronym",
      "basefont",
      "big",
      "center",
      "nobr",
      "noembed",
      "noframes",
      "plaintext",
      "strike",
      "tt",
    ],
  });
});