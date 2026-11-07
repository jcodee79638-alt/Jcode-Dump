
var $gr = Ie(function (Qvc, uMi) {
  var zvc = (uMi.exports = {
    nextSkippingChildren: ZLa,
    nextAncestorSibling: Lgr,
    next: e$a,
    previous: t$a,
    deepLastChild: AMi,
  });
  function ZLa(e, t) {
    if (e === t) return null;
    if (e.nextSibling !== null) return e.nextSibling;
    return Lgr(e, t);
  }
  function Lgr(e, t) {
    for (e = e.parentNode; e !== null; e = e.parentNode) {
      if (e === t) return null;
      if (e.nextSibling !== null) return e.nextSibling;
    }
    return null;
  }
  function e$a(e, t) {
    var r = e.firstChild;
    if (r !== null) return r;
    if (e === t) return null;
    if (((r = e.nextSibling), r !== null)) return r;
    return Lgr(e, t);
  }
  function AMi(e) {
    while (e.lastChild) e = e.lastChild;
    return e;
  }
  function t$a(e, t) {
    var r = e.previousSibling;
    if (r !== null) return AMi(r);
    if (((r = e.parentNode), r === t)) return null;
    return r;
  }
});