
var Bbn = Ie(function (GYH, Fbn) {
  var d$t;
  try {
    ((mar = cr), (d$t = mar("esprima")));
  } catch (e) {
    if (typeof window < "u") d$t = window.esprima;
  }
  var mar,
    tuo = ix();
  function ruo(e) {
    if (e === null) return !1;
    try {
      var t = "(" + e + ")",
        r = d$t.parse(t, { range: !0 });
      if (
        r.type !== "Program" ||
        r.body.length !== 1 ||
        r.body[0].type !== "ExpressionStatement" ||
        (r.body[0].expression.type !== "ArrowFunctionExpression" &&
          r.body[0].expression.type !== "FunctionExpression")
      )
        return !1;
      return !0;
    } catch (s) {
      return !1;
    }
  }
  function nuo(e) {
    var t = "(" + e + ")",
      r = d$t.parse(t, { range: !0 }),
      s = [],
      a;
    if (
      r.type !== "Program" ||
      r.body.length !== 1 ||
      r.body[0].type !== "ExpressionStatement" ||
      (r.body[0].expression.type !== "ArrowFunctionExpression" &&
        r.body[0].expression.type !== "FunctionExpression")
    )
      throw Error("Failed to resolve function");
    if (
      (r.body[0].expression.params.forEach(function (H) {
        s.push(H.name);
      }),
      (a = r.body[0].expression.body.range),
      r.body[0].expression.body.type === "BlockStatement")
    )
      return Function(s, t.slice(a[0] + 1, a[1] - 1));
    return Function(s, "return " + t.slice(a[0], a[1]));
  }
  function iuo(e) {
    return e.toString();
  }
  function suo(e) {
    return Object.prototype.toString.call(e) === "[object Function]";
  }
  Fbn.exports = new tuo("tag:yaml.org,2002:js/function", {
    kind: "scalar",
    resolve: ruo,
    construct: nuo,
    predicate: suo,
    represent: iuo,
  });
});