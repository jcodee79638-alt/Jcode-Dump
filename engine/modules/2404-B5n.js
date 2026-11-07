
var B5n = Ie(function (N5n) {
  Object.defineProperty(N5n, "__esModule", { value: !0 });
  N5n.getHttpConfigurationDefaults = N5n.mergeOtlpHttpConfigurationWithDefaults = void 0;
  var d0t = c7e(),
    U5n = O5n();
  function bPo(e, t, r) {
    return async () => {
      let s = { ...(await r()) },
        a = {};
      if (t != null) Object.assign(a, await t());
      if (e != null) Object.assign(a, U5n.validateAndNormalizeHeaders(await e()));
      return Object.assign(a, s);
    };
  }
  function jPo(e) {
    if (e == null) return;
    try {
      let t = globalThis.location?.href;
      return new URL(e, t).href;
    } catch {
      throw Error(`Configuration: Could not parse user-provided export URL: '${e}'`);
    }
  }
  function PPo(e, t, r) {
    return {
      ...d0t.mergeOtlpSharedConfigurationWithDefaults(e, t, r),
      headers: bPo(e.headers, t.headers, r.headers),
      url: jPo(e.url) ?? t.url ?? r.url,
    };
  }
  N5n.mergeOtlpHttpConfigurationWithDefaults = PPo;
  function CPo(e, t) {
    return {
      ...d0t.getSharedConfigurationDefaults(),
      headers: async () => e,
      url: "http://localhost:4318/" + t,
    };
  }
  N5n.getHttpConfigurationDefaults = CPo;
});