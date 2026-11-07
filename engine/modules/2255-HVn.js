
var HVn = Ie(function (oVn) {
  Object.defineProperty(oVn, "__esModule", { value: !0 });
  oVn.isUrlIgnored = oVn.urlMatches = void 0;
  function sVn(e, t) {
    if (typeof t === "string") return e === t;
    else return !!e.match(t);
  }
  oVn.urlMatches = sVn;
  function Dvo(e, t) {
    if (!t) return !1;
    for (let r of t) if (sVn(e, r)) return !0;
    return !1;
  }
  oVn.isUrlIgnored = Dvo;
});