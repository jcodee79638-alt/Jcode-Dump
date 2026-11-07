
var k$r = Ie(function (Tvc, n1i) {
  n1i.exports = {
    serializeOne: eLa,
    ɵescapeMatchingClosingTag: e1i,
    ɵescapeClosingCommentTag: t1i,
    ɵescapeProcessingInstructionContent: r1i,
  };
  var Zyi = kD(),
    ohe = Zyi.NAMESPACE,
    zyi = { STYLE: !0, SCRIPT: !0, XMP: !0, IFRAME: !0, NOEMBED: !0, NOFRAMES: !0, PLAINTEXT: !0 },
    Jha = {
      area: !0,
      base: !0,
      basefont: !0,
      bgsound: !0,
      br: !0,
      col: !0,
      embed: !0,
      frame: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
    Kha = {},
    Qyi = /[&<>\u00A0]/g,
    Yyi = /[&"<>\u00A0]/g;
  function zha(e) {
    if (!Qyi.test(e)) return e;
    return e.replace(Qyi, (t) => {
      switch (t) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "\xA0":
          return "&nbsp;";
      }
    });
  }
  function Qha(e) {
    if (!Yyi.test(e)) return e;
    return e.replace(Yyi, (t) => {
      switch (t) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case '"':
          return "&quot;";
        case "\xA0":
          return "&nbsp;";
      }
    });
  }
  function Yha(e) {
    var t = e.namespaceURI;
    if (!t) return e.localName;
    if (t === ohe.XML) return "xml:" + e.localName;
    if (t === ohe.XLINK) return "xlink:" + e.localName;
    if (t === ohe.XMLNS)
      if (e.localName === "xmlns") return "xmlns";
      else return "xmlns:" + e.localName;
    return e.name;
  }
  function e1i(e, t) {
    let r = "</" + t;
    if (!e.toLowerCase().includes(r)) return e;
    let s = [...e],
      a = e.matchAll(new RegExp(r, "ig"));
    for (let H of a) s[H.index] = "&lt;";
    return s.join("");
  }
  var Zha = /--!?>/;
  function t1i(e) {
    if (!Zha.test(e)) return e;
    return e.replace(/(--\!?)>/g, "$1&gt;");
  }
  function r1i(e) {
    return e.includes(">") ? e.replaceAll(">", "&gt;") : e;
  }
  function eLa(e, t) {
    var r = "";
    switch (e.nodeType) {
      case 1:
        var s = e.namespaceURI,
          a = s === ohe.HTML,
          H = a || s === ohe.SVG || s === ohe.MATHML ? e.localName : e.tagName;
        r += "<" + H;
        for (var u = 0, f = e._numattrs; u < f; u++) {
          var d = e._attr(u);
          if (((r += " " + Yha(d)), d.value !== void 0)) r += '="' + Qha(d.value) + '"';
        }
        if (((r += ">"), !(a && Jha[H]))) {
          var _ = e.serialize();
          if (zyi[H.toUpperCase()]) _ = e1i(_, H);
          if (
            a &&
            Kha[H] &&
            _.charAt(0) ===
              `
`
          )
            r += `
`;
          ((r += _), (r += "</" + H + ">"));
        }
        break;
      case 3:
      case 4:
        var L;
        if (t.nodeType === 1 && t.namespaceURI === ohe.HTML) L = t.tagName;
        else L = "";
        if (zyi[L] || (L === "NOSCRIPT" && t.ownerDocument._scripting_enabled)) r += e.data;
        else r += zha(e.data);
        break;
      case 8:
        r += "<!--" + t1i(e.data) + "-->";
        break;
      case 7:
        let I = r1i(e.data);
        r += "<?" + e.target + " " + I + "?>";
        break;
      case 10:
        ((r += "<!DOCTYPE " + e.name), (r += ">"));
        break;
      default:
        Zyi.InvalidStateError();
    }
    return r;
  }
});