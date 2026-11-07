
var EYi = Ie(function (ibA, gYi) {
  var eeH = Mb(),
    teH = aAe(),
    { safeRe: Ewt, t: Iwt } = Swe(),
    reH = (e, t) => {
      if (e instanceof eeH) return e;
      if (typeof e === "number") e = String(e);
      if (typeof e !== "string") return null;
      t = t || {};
      let r = null;
      if (!t.rtl) r = e.match(t.includePrerelease ? Ewt[Iwt.COERCEFULL] : Ewt[Iwt.COERCE]);
      else {
        let d = t.includePrerelease ? Ewt[Iwt.COERCERTLFULL] : Ewt[Iwt.COERCERTL],
          _;
        while ((_ = d.exec(e)) && (!r || r.index + r[0].length !== e.length)) {
          if (!r || _.index + _[0].length !== r.index + r[0].length) r = _;
          d.lastIndex = _.index + _[1].length + _[2].length;
        }
        d.lastIndex = -1;
      }
      if (r === null) return null;
      let s = r[2],
        a = r[3] || "0",
        H = r[4] || "0",
        u = t.includePrerelease && r[5] ? `-${r[5]}` : "",
        f = t.includePrerelease && r[6] ? `+${r[6]}` : "";
      return teH(`${s}.${a}.${H}${u}${f}`, t);
    };
  gYi.exports = reH;
});