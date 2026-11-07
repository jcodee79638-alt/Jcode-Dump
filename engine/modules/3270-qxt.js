
function qxt(e) {
  if (!(this instanceof qxt)) return new qxt(e);
  var t = {
    rules: _P,
    headingStyle: "setext",
    hr: "* * *",
    bulletListMarker: "*",
    codeBlockStyle: "indented",
    fence: "```",
    emDelimiter: "_",
    strongDelimiter: "**",
    linkStyle: "inlined",
    linkReferenceStyle: "full",
    br: "  ",
    preformattedCode: !1,
    blankReplacement: function (r, s) {
      return s.isBlock
        ? `

`
        : "";
    },
    keepReplacement: function (r, s) {
      return s.isBlock
        ? `

` +
            s.outerHTML +
            `

`
        : s.outerHTML;
    },
    defaultReplacement: function (r, s) {
      return s.isBlock
        ? `

` +
            r +
            `

`
        : r;
    },
  };
  ((this.options = Lga({}, t, e)), (this.rules = new tSi(this.options)));
}