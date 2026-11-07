
var Slr = Ie(function (ifc, xti) {
  var g2o = (e, t) => (typeof t === "string" ? { [e]: t } : t),
    E2o = (e, t) => {
      let r = g2o(e.name, e.bin),
        s = t.replace(/^[^\\/]*\//, "");
      for (let a of Object.entries(r)) if (a[1] === s) return !0;
      return !1;
    };
  xti.exports = (e, t) => (e && e.bin ? E2o(e, t) : !1);
});