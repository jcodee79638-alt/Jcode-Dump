
var Qgr = ne(() => {
  Ega = [
    "ADDRESS",
    "ARTICLE",
    "ASIDE",
    "AUDIO",
    "BLOCKQUOTE",
    "BODY",
    "CANVAS",
    "CENTER",
    "DD",
    "DIR",
    "DIV",
    "DL",
    "DT",
    "FIELDSET",
    "FIGCAPTION",
    "FIGURE",
    "FOOTER",
    "FORM",
    "FRAMESET",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HEADER",
    "HGROUP",
    "HR",
    "HTML",
    "ISINDEX",
    "LI",
    "MAIN",
    "MENU",
    "NAV",
    "NOFRAMES",
    "NOSCRIPT",
    "OL",
    "OUTPUT",
    "P",
    "PRE",
    "SECTION",
    "TABLE",
    "TBODY",
    "TD",
    "TFOOT",
    "TH",
    "THEAD",
    "TR",
    "UL",
  ];
  Qxi = [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR",
  ];
  Zxi = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
  _P = {};
  _P.paragraph = {
    filter: "p",
    replacement: function (e) {
      return (
        `

` +
        e +
        `

`
      );
    },
  };
  _P.lineBreak = {
    filter: "br",
    replacement: function (e, t, r) {
      return (
        r.br +
        `
`
      );
    },
  };
  _P.heading = {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    replacement: function (e, t, r) {
      var s = Number(t.nodeName.charAt(1));
      if (r.headingStyle === "setext" && s < 3) {
        var a = Jgr(s === 1 ? "=" : "-", e.length);
        return (
          `

` +
          e +
          `
` +
          a +
          `

`
        );
      } else
        return (
          `

` +
          Jgr("#", s) +
          " " +
          e +
          `

`
        );
    },
  };
  _P.blockquote = {
    filter: "blockquote",
    replacement: function (e) {
      return (
        (e = e.replace(/^\n+|\n+$/g, "")),
        (e = e.replace(/^/gm, "> ")),
        `

` +
          e +
          `

`
      );
    },
  };
  _P.list = {
    filter: ["ul", "ol"],
    replacement: function (e, t) {
      var r = t.parentNode;
      if (r.nodeName === "LI" && r.lastElementChild === t)
        return (
          `
` + e
        );
      else
        return (
          `

` +
          e +
          `

`
        );
    },
  };
  _P.listItem = {
    filter: "li",
    replacement: function (e, t, r) {
      e = e
        .replace(/^\n+/, "")
        .replace(
          /\n+$/,
          `
`,
        )
        .replace(
          /\n/gm,
          `
    `,
        );
      var s = r.bulletListMarker + "   ",
        a = t.parentNode;
      if (a.nodeName === "OL") {
        var H = a.getAttribute("start"),
          u = Array.prototype.indexOf.call(a.children, t);
        s = (H ? Number(H) + u : u + 1) + ".  ";
      }
      return (
        s +
        e +
        (t.nextSibling && !/\n$/.test(e)
          ? `
`
          : "")
      );
    },
  };
  _P.indentedCodeBlock = {
    filter: function (e, t) {
      return (
        t.codeBlockStyle === "indented" &&
        e.nodeName === "PRE" &&
        e.firstChild &&
        e.firstChild.nodeName === "CODE"
      );
    },
    replacement: function (e, t, r) {
      return (
        `

    ` +
        t.firstChild.textContent.replace(
          /\n/g,
          `
    `,
        ) +
        `

`
      );
    },
  };
  _P.fencedCodeBlock = {
    filter: function (e, t) {
      return (
        t.codeBlockStyle === "fenced" &&
        e.nodeName === "PRE" &&
        e.firstChild &&
        e.firstChild.nodeName === "CODE"
      );
    },
    replacement: function (e, t, r) {
      var s = t.firstChild.getAttribute("class") || "",
        a = (s.match(/language-(\S+)/) || [null, ""])[1],
        H = t.firstChild.textContent,
        u = r.fence.charAt(0),
        f = 3,
        d = new RegExp("^" + u + "{3,}", "gm"),
        _;
      while ((_ = d.exec(H))) if (_[0].length >= f) f = _[0].length + 1;
      var L = Jgr(u, f);
      return (
        `

` +
        L +
        a +
        `
` +
        H.replace(/\n$/, "") +
        `
` +
        L +
        `

`
      );
    },
  };
  _P.horizontalRule = {
    filter: "hr",
    replacement: function (e, t, r) {
      return (
        `

` +
        r.hr +
        `

`
      );
    },
  };
  _P.inlineLink = {
    filter: function (e, t) {
      return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
    },
    replacement: function (e, t) {
      var r = t.getAttribute("href");
      if (r) r = r.replace(/([()])/g, "\\$1");
      var s = Vxt(t.getAttribute("title"));
      if (s) s = ' "' + s.replace(/"/g, '\\"') + '"';
      return "[" + e + "](" + r + s + ")";
    },
  };
  _P.referenceLink = {
    filter: function (e, t) {
      return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
    },
    replacement: function (e, t, r) {
      var s = t.getAttribute("href"),
        a = Vxt(t.getAttribute("title"));
      if (a) a = ' "' + a + '"';
      var H, u;
      switch (r.linkReferenceStyle) {
        case "collapsed":
          ((H = "[" + e + "][]"), (u = "[" + e + "]: " + s + a));
          break;
        case "shortcut":
          ((H = "[" + e + "]"), (u = "[" + e + "]: " + s + a));
          break;
        default:
          var f = this.references.length + 1;
          ((H = "[" + e + "][" + f + "]"), (u = "[" + f + "]: " + s + a));
      }
      return (this.references.push(u), H);
    },
    references: [],
    append: function (e) {
      var t = "";
      if (this.references.length)
        ((t =
          `

` +
          this.references.join(`
`) +
          `

`),
          (this.references = []));
      return t;
    },
  };
  _P.emphasis = {
    filter: ["em", "i"],
    replacement: function (e, t, r) {
      if (!e.trim()) return "";
      return r.emDelimiter + e + r.emDelimiter;
    },
  };
  _P.strong = {
    filter: ["strong", "b"],
    replacement: function (e, t, r) {
      if (!e.trim()) return "";
      return r.strongDelimiter + e + r.strongDelimiter;
    },
  };
  _P.code = {
    filter: function (e) {
      var t = e.previousSibling || e.nextSibling,
        r = e.parentNode.nodeName === "PRE" && !t;
      return e.nodeName === "CODE" && !r;
    },
    replacement: function (e) {
      if (!e) return "";
      e = e.replace(/\r?\n|\r/g, " ");
      var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "",
        r = "`",
        s = e.match(/`+/gm) || [];
      while (s.indexOf(r) !== -1) r = r + "`";
      return r + t + e + t + r;
    },
  };
  _P.image = {
    filter: "img",
    replacement: function (e, t) {
      var r = Vxt(t.getAttribute("alt")),
        s = t.getAttribute("src") || "",
        a = Vxt(t.getAttribute("title")),
        H = a ? ' "' + a + '"' : "";
      return s ? "![" + r + "](" + s + H + ")" : "";
    },
  };
  tSi.prototype = {
    add: function (e, t) {
      this.array.unshift(t);
    },
    keep: function (e) {
      this._keep.unshift({ filter: e, replacement: this.keepReplacement });
    },
    remove: function (e) {
      this._remove.unshift({
        filter: e,
        replacement: function () {
          return "";
        },
      });
    },
    forNode: function (e) {
      if (e.isBlank) return this.blankRule;
      var t;
      if ((t = qgr(this.array, e, this.options))) return t;
      if ((t = qgr(this._keep, e, this.options))) return t;
      if ((t = qgr(this._remove, e, this.options))) return t;
      return this.defaultRule;
    },
    forEach: function (e) {
      for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
    },
  };
  rSi = typeof window < "u" ? window : {};
  vga = Sga() ? rSi.DOMParser : Tga();
  ((Uga = Array.prototype.reduce),
    (Nga = [
      [/\\/g, "\\\\"],
      [/\*/g, "\\*"],
      [/^-/g, "\\-"],
      [/^\+ /g, "\\+ "],
      [/^(=+)/g, "\\$1"],
      [/^(#{1,6}) /g, "\\$1 "],
      [/`/g, "\\`"],
      [/^~~~/g, "\\~~~"],
      [/\[/g, "\\["],
      [/\]/g, "\\]"],
      [/^>/g, "\\>"],
      [/_/g, "\\_"],
      [/^(\d+)\. /g, "$1\\. "],
    ]));
  qxt.prototype = {
    turndown: function (e) {
      if (!Rga(e)) throw TypeError(e + " is not a string, or an element/document/fragment node.");
      if (e === "") return "";
      var t = nSi.call(this, new bga(e, this.options));
      return Fga.call(this, t);
    },
    use: function (e) {
      if (Array.isArray(e)) for (var t = 0; t < e.length; t++) this.use(e[t]);
      else if (typeof e === "function") e(this);
      else throw TypeError("plugin must be a Function or an Array of Functions");
      return this;
    },
    addRule: function (e, t) {
      return (this.rules.add(e, t), this);
    },
    keep: function (e) {
      return (this.rules.keep(e), this);
    },
    remove: function (e) {
      return (this.rules.remove(e), this);
    },
    escape: function (e) {
      return Nga.reduce(function (t, r) {
        return t.replace(r[0], r[1]);
      }, e);
    },
  };
  Gxt = qxt;
});