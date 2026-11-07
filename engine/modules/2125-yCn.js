
var yCn = Ie(function (Qec, DCn) {
  var cdo = Zv(),
    Ado = coe(),
    { safeRe: U$t, t: N$t } = Wxe(),
    udo = (e, t) => {
      if (e instanceof cdo) return e;
      if (typeof e === "number") e = String(e);
      if (typeof e !== "string") return null;
      t = t || {};
      let r = null;
      if (!t.rtl) r = e.match(t.includePrerelease ? U$t[N$t.COERCEFULL] : U$t[N$t.COERCE]);
      else {
        let d = t.includePrerelease ? U$t[N$t.COERCERTLFULL] : U$t[N$t.COERCERTL],
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
      return Ado(`${s}.${a}.${H}${u}${f}`, t);
    };
  DCn.exports = udo;
});