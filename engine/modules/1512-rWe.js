
var rWe = ne(() => {
  Gt();
  MMe();
  vnr = ks(re, ks(re, PH));
  dw = class dw extends (
    Pa("LLM.HttpOptions")({ body: be(yMe), headers: be(ks(re, re)), query: be(ks(re, re)) })
  ) {};
  ((t) => (t.make = (r) => (r instanceof dw ? r : new dw(r))))((dw ||= {}));
  mw = class mw extends (
    Pa("LLM.GenerationOptions")({
      maxTokens: be(Aa),
      temperature: be(Aa),
      topP: be(Aa),
      topK: be(Aa),
      frequencyPenalty: be(Aa),
      presencePenalty: be(Aa),
      seed: be(Aa),
      stop: be(On(re)),
    })
  ) {};
  ((t) => (t.make = (r = {}) => (r instanceof mw ? r : new mw(r))))((mw ||= {}));
  hY = class hY extends Pa("LLM.ModelLimits")({ context: be(Aa), output: be(Aa) }) {};
  ((t) => (t.make = (r) => (r instanceof hY ? r : new hY(r ?? {}))))((hY ||= {}));
  xMe = class xMe extends (
    Pa("LLM.ModelDefaults")({ limits: be(hY), generation: be(mw), providerOptions: be(vnr), http: be(dw) })
  ) {};
  ((t) =>
    (t.make = (r) => {
      if (r instanceof xMe) return r;
      return new xMe({
        limits: r.limits === void 0 ? void 0 : hY.make(r.limits),
        generation: r.generation === void 0 ? void 0 : mw.make(r.generation),
        providerOptions: r.providerOptions,
        http: r.http === void 0 ? void 0 : dw.make(r.http),
      });
    }))((xMe ||= {}));
  LKs = Jo(["gemini", "moonshot"]);
  SMe = class SMe extends Pa("LLM.ModelCompatibility")({ toolSchema: be(LKs) }) {};
  ((t) => (t.make = (r) => (r instanceof SMe ? r : new SMe(r))))((SMe ||= {}));
  u_t = qW((e) => e instanceof wde, { expected: "LLM.Model" });
  LY = class LY extends Pa("LLM.CacheHint")({ type: Jo(["ephemeral", "persistent"]), ttlSeconds: be(Aa) }) {};
  (($Ks = nt({
    tools: be(Vi),
    system: be(Vi),
    messages: be(Io([ri("latest-user-message"), ri("latest-assistant"), nt({ tail: Aa })])),
    ttlSeconds: be(Aa),
  })),
    (BEn = Io([ri("auto"), ri("none"), $Ks])));
});