
var Xar = Ie(function (zec, ICn) {
  var rdo = qar(),
    ndo = Gar(),
    ido = CVe(),
    sdo = k$t(),
    odo = w$t(),
    ado = O$t(),
    Hdo = (e, t, r, s) => {
      switch (t) {
        case "===":
          if (typeof e === "object") e = e.version;
          if (typeof r === "object") r = r.version;
          return e === r;
        case "!==":
          if (typeof e === "object") e = e.version;
          if (typeof r === "object") r = r.version;
          return e !== r;
        case "":
        case "=":
        case "==":
          return rdo(e, r, s);
        case "!=":
          return ndo(e, r, s);
        case ">":
          return ido(e, r, s);
        case ">=":
          return sdo(e, r, s);
        case "<":
          return odo(e, r, s);
        case "<=":
          return ado(e, r, s);
        default:
          throw TypeError(`Invalid operator: ${t}`);
      }
    };
  ICn.exports = Hdo;
});