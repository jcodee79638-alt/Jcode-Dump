
var _0t = Ie(function (W5n) {
  Object.defineProperty(W5n, "__esModule", { value: !0 });
  W5n.getNodeHttpConfigurationDefaults =
    W5n.mergeOtlpNodeHttpConfigurationWithDefaults =
    W5n.httpAgentFactoryFromOptions =
      void 0;
  var m0t = B5n();
  function R5n(e) {
    return async (t) => {
      let r = t === "http:",
        s = r ? import("http") : import("https"),
        { Agent: a } = await s;
      if (r) {
        let { ca: H, cert: u, key: f, ...d } = e;
        return new a(d);
      }
      return new a(e);
    };
  }
  W5n.httpAgentFactoryFromOptions = R5n;
  function kPo(e, t, r) {
    return {
      ...m0t.mergeOtlpHttpConfigurationWithDefaults(e, t, r),
      agentFactory: e.agentFactory ?? t.agentFactory ?? r.agentFactory,
      userAgent: e.userAgent,
    };
  }
  W5n.mergeOtlpNodeHttpConfigurationWithDefaults = kPo;
  function OPo(e, t) {
    return { ...m0t.getHttpConfigurationDefaults(e, t), agentFactory: R5n({ keepAlive: !0 }) };
  }
  W5n.getNodeHttpConfigurationDefaults = OPo;
});