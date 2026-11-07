
var I0r = Ie(function (ATi) {
  Object.defineProperty(ATi, "__esModule", { value: !0 });
  ATi.toType = ATi.toString = void 0;
  var cTi = (e) => "_" + e,
    WEa = (e) => ["name", "protocol", "subtype"].includes(e),
    VEa = (e) => {
      let t = { name: e.name, protocol: e.protocol, subtype: e.subtype };
      return Object.entries(t)
        .filter(([s, a]) => WEa(s) && a !== void 0)
        .reduce((s, [a, H]) => {
          switch (typeof H) {
            case "object":
              H.map((u) => s.push(cTi(u)));
              break;
            default:
              s.push(cTi(H));
              break;
          }
          return s;
        }, [])
        .join(".");
    };
  ATi.toString = VEa;
  var qEa = (e) => {
    let t = e.split("."),
      r;
    for (let s in t) {
      if (t[s][0] !== "_") continue;
      t[s] = t[s].slice(1);
    }
    if (t.includes("sub")) ((r = t.shift()), t.shift());
    return { name: t.shift(), protocol: t.shift() || null, subtype: r };
  };
  ATi.toType = qEa;
});