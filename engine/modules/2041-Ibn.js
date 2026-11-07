
var Ibn = Ie(function (kYH, Ebn) {
  var gAo = ix(),
    $bn = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
    gbn = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$",
    );
  function EAo(e) {
    if (e === null) return !1;
    if ($bn.exec(e) !== null) return !0;
    if (gbn.exec(e) !== null) return !0;
    return !1;
  }
  function IAo(e) {
    var t,
      r,
      s,
      a,
      H,
      u,
      f,
      d = 0,
      _ = null,
      L,
      I,
      D;
    if (((t = $bn.exec(e)), t === null)) t = gbn.exec(e);
    if (t === null) throw Error("Date resolve error");
    if (((r = +t[1]), (s = +t[2] - 1), (a = +t[3]), !t[4])) return new Date(Date.UTC(r, s, a));
    if (((H = +t[4]), (u = +t[5]), (f = +t[6]), t[7])) {
      d = t[7].slice(0, 3);
      while (d.length < 3) d += "0";
      d = +d;
    }
    if (t[9]) {
      if (((L = +t[10]), (I = +(t[11] || 0)), (_ = (L * 60 + I) * 60000), t[9] === "-")) _ = -_;
    }
    if (((D = new Date(Date.UTC(r, s, a, H, u, f, d))), _)) D.setTime(D.getTime() - _);
    return D;
  }
  function DAo(e) {
    return e.toISOString();
  }
  Ebn.exports = new gAo("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: EAo,
    construct: IAo,
    instanceOf: Date,
    represent: DAo,
  });
});