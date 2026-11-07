
var xVe = Ie(function (YYH, Vjn) {
  var Xlo = Dar(),
    Wjn = I$t();
  Vjn.exports = function (e) {
    let t = Object.assign({}, e);
    if (((t.delimiters = Wjn.arrayify(t.delims || t.delimiters || "---")), t.delimiters.length === 1))
      t.delimiters.push(t.delimiters[0]);
    return (
      (t.language = (t.language || t.lang || "yaml").toLowerCase()),
      (t.engines = Object.assign({}, Xlo, t.parsers, t.engines)),
      t
    );
  };
});