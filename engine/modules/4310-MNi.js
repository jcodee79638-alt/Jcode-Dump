
var MNi = Ie(function (DNi) {
  Object.defineProperty(DNi, "__esModule", { value: !0 });
  DNi.assignDefaults = void 0;
  var XB = fd(),
    INi = x_();
  function gka(e, t) {
    let { properties: r, items: s } = e.schema;
    if (t === "object" && r) for (let a in r) ENi(e, a, r[a].default);
    else if (t === "array" && Array.isArray(s)) s.forEach((a, H) => ENi(e, H, a.default));
  }
  DNi.assignDefaults = gka;
  function ENi(e, t, r) {
    let { gen: s, compositeRule: a, data: H, opts: u } = e;
    if (r === void 0) return;
    let f = XB._`${H}${XB.getProperty(t)}`;
    if (a) {
      INi.checkStrictMode(e, `default is ignored for: ${f}`);
      return;
    }
    let d = XB._`${f} === undefined`;
    if (u.useDefaults === "empty") d = XB._`${d} || ${f} === null || ${f} === ""`;
    s.if(d, XB._`${f} = ${XB.stringify(r)}`);
  }
});