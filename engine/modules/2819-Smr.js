
var Smr = Ie(function (cLc, Qmi) {
  var cta = (e, t) => {
    for (let r of e.ancestry()) {
      if (r.isProjectRoot || !r.resolveParent || r.globalTop) return r;
      let s = r.edgesOut.get(t);
      if (!s || !s.peer) return r;
    }
  };
  Qmi.exports = cta;
});