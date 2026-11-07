
var ix = Ie(function (DYH, Zvn) {
  var Yvn = bxe(),
    Fco = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases",
    ],
    Bco = ["scalar", "sequence", "mapping"];
  function Rco(e) {
    var t = {};
    if (e !== null)
      Object.keys(e).forEach(function (r) {
        e[r].forEach(function (s) {
          t[String(s)] = r;
        });
      });
    return t;
  }
  function Wco(e, t) {
    if (
      ((t = t || {}),
      Object.keys(t).forEach(function (r) {
        if (Fco.indexOf(r) === -1)
          throw new Yvn('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
      }),
      (this.tag = e),
      (this.kind = t.kind || null),
      (this.resolve =
        t.resolve ||
        function () {
          return !0;
        }),
      (this.construct =
        t.construct ||
        function (r) {
          return r;
        }),
      (this.instanceOf = t.instanceOf || null),
      (this.predicate = t.predicate || null),
      (this.represent = t.represent || null),
      (this.defaultStyle = t.defaultStyle || null),
      (this.styleAliases = Rco(t.styleAliases || null)),
      Bco.indexOf(this.kind) === -1)
    )
      throw new Yvn('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
  }
  Zvn.exports = Wco;
});