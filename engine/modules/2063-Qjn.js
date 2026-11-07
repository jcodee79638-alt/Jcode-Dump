
var Qjn = Ie(function (rZH, zjn) {
  var Kjn = $Ve(),
    Zlo = Mar(),
    F2 = I$t();
  zjn.exports = function (e) {
    if (Kjn(e) !== "object") e = { content: e };
    if (Kjn(e.data) !== "object") e.data = {};
    if (e.contents && e.content == null) e.content = e.contents;
    return (
      F2.define(e, "orig", F2.toBuffer(e.content)),
      F2.define(e, "language", e.language || ""),
      F2.define(e, "matter", e.matter || ""),
      F2.define(e, "stringify", function (t, r) {
        if (r && r.language) e.language = r.language;
        return Zlo(e, t, r);
      }),
      (e.content = F2.toString(e.content)),
      (e.isEmpty = !1),
      (e.excerpt = ""),
      e
    );
  };
});