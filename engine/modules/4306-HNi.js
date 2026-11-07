
var HNi = Ie(function (oNi) {
  Object.defineProperty(oNi, "__esModule", { value: !0 });
  oNi.boolOrEmptySchema = oNi.topBoolOrEmptySchema = void 0;
  var nNi = PXe(),
    iNi = fd(),
    Kwa = dee(),
    zwa = { message: "boolean schema is false" };
  function Qwa(e) {
    let { gen: t, schema: r, validateName: s } = e;
    if (r === !1) sNi(e, !1);
    else if (typeof r == "object" && r.$async === !0) t.return(Kwa.default.data);
    else (t.assign(iNi._`${s}.errors`, null), t.return(!0));
  }
  oNi.topBoolOrEmptySchema = Qwa;
  function Ywa(e, t) {
    let { gen: r, schema: s } = e;
    if (s === !1) (r.var(t, !1), sNi(e));
    else r.var(t, !0);
  }
  oNi.boolOrEmptySchema = Ywa;
  function sNi(e, t) {
    let { gen: r, data: s } = e;
    nNi.reportError(
      {
        gen: r,
        keyword: "false schema",
        data: s,
        schema: !1,
        schemaCode: !1,
        schemaValue: !1,
        params: {},
        it: e,
      },
      zwa,
      void 0,
      t,
    );
  }
});