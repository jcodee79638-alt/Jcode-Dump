
var rTi = "~effect/httpapi/HttpApiGroup",
  NEa,
  oHe = (e) => {
    function t() {}
    return (
      Object.setPrototypeOf(t, NEa),
      (t.key = `effect/httpapi/HttpApiGroup/${e.identifier}`),
      Object.assign(t, e)
    );
  },
  zd = (e, t) => oHe({ identifier: e, topLevel: t?.topLevel ?? !1, endpoints: iut(), annotations: Hg() });