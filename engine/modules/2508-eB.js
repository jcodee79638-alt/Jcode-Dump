
var eB = Ie(function (juc, wYn) {
  var CYn = typeof Intl === "object" && !!Intl,
    SOo = CYn && Intl.Collator,
    hur = new Map(),
    TOo = (e, t) => {
      let r = new SOo(e, t);
      return (s, a) => r.compare(s, a);
    },
    vOo = (e, t) => (r, s) => r.localeCompare(s, e, t),
    bOo = ["sensitivity", "numeric", "ignorePunctuation", "caseFirst"],
    { hasOwnProperty: jOo } = Object.prototype;
  wYn.exports = (e, t = {}) => {
    if (!e || typeof e !== "string") throw TypeError("locale required");
    let r = bOo.reduce((H, u) => {
        if (jOo.call(t, u)) H[u] = t[u];
        return H;
      }, {}),
      s = `${e}
${JSON.stringify(r)}`;
    if (hur.has(s)) return hur.get(s);
    let a = CYn ? TOo(e, r) : vOo(e, r);
    return (hur.set(s, a), a);
  };
});