
var vme = Ie(function (ikn) {
  Object.defineProperty(ikn, "__esModule", { value: !0 });
  ikn.unregisterGlobal = ikn.getGlobal = ikn.registerGlobal = void 0;
  var rkn = Xwn(),
    G2 = AHr(),
    nkn = tkn(),
    V_o = G2.VERSION.split(".")[0],
    RVe = Symbol.for(`opentelemetry.js.api.${V_o}`),
    WVe = rkn._globalThis;
  function q_o(e, t, r, s = !1) {
    var a;
    let H = (WVe[RVe] = (a = WVe[RVe]) !== null && a !== void 0 ? a : { version: G2.VERSION });
    if (!s && H[e]) {
      let u = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);
      return (r.error(u.stack || u.message), !1);
    }
    if (H.version !== G2.VERSION) {
      let u = Error(
        `@opentelemetry/api: Registration of version v${H.version} for ${e} does not match previously registered API v${G2.VERSION}`,
      );
      return (r.error(u.stack || u.message), !1);
    }
    return ((H[e] = t), r.debug(`@opentelemetry/api: Registered a global for ${e} v${G2.VERSION}.`), !0);
  }
  ikn.registerGlobal = q_o;
  function G_o(e) {
    var t, r;
    let s = (t = WVe[RVe]) === null || t === void 0 ? void 0 : t.version;
    if (!s || !nkn.isCompatible(s)) return;
    return (r = WVe[RVe]) === null || r === void 0 ? void 0 : r[e];
  }
  ikn.getGlobal = G_o;
  function X_o(e, t) {
    t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${G2.VERSION}.`);
    let r = WVe[RVe];
    if (r) delete r[e];
  }
  ikn.unregisterGlobal = X_o;
});