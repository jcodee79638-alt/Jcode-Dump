
var aCr = Ie(function (nbA, $Yi) {
  var XZa = sCr(),
    JZa = oCr(),
    KZa = PQe(),
    zZa = $wt(),
    QZa = Lwt(),
    YZa = gwt(),
    ZZa = (e, t, r, s) => {
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
          return XZa(e, r, s);
        case "!=":
          return JZa(e, r, s);
        case ">":
          return KZa(e, r, s);
        case ">=":
          return zZa(e, r, s);
        case "<":
          return QZa(e, r, s);
        case "<=":
          return YZa(e, r, s);
        default:
          throw TypeError(`Invalid operator: ${t}`);
      }
    };
  $Yi.exports = ZZa;
});