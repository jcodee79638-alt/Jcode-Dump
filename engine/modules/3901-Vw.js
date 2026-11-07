
var Vw = ne(async () => {
  Gt();
  iki();
  au();
  YM();
  BA();
  yy();
  zM();
  oje();
  Kne();
  TFe();
  ghe();
  await Jn([ADr(), Vw()]);
  ((hxa = nt({ id: re, url: re, npm: re })),
    (Eki = nt({ text: Vi, audio: Vi, image: Vi, video: Vi, pdf: Vi })),
    (Lxa = Io([Jo(["reasoning", "reasoning_content", "reasoning_text"]), re])),
    ($xa = Io([Vi, nt({ field: Lxa })])),
    (gxa = nt({
      temperature: Vi,
      reasoning: Vi,
      attachment: Vi,
      toolcall: Vi,
      input: Eki,
      output: Eki,
      interleaved: $xa,
    })),
    (uDr = nt({ read: mo, write: mo })),
    (Exa = nt({ input: mo, output: mo, cache: uDr, tier: nt({ type: ri("context"), size: mo }) })),
    (Ixa = nt({
      input: mo,
      output: mo,
      cache: uDr,
      tiers: Gn(On(Exa)),
      experimentalOver200K: Gn(nt({ input: mo, output: mo, cache: uDr })),
    })),
    (Dxa = nt({ context: mo, input: Gn(mo), output: mo })),
    (Dki = nt({
      id: WL,
      providerID: Kp,
      api: hxa,
      name: re,
      family: Gn(re),
      capabilities: gxa,
      cost: Ixa,
      limit: Dxa,
      status: gki,
      options: ks(re, e0),
      headers: ks(re, re),
      release_date: re,
      variants: Gn(ks(re, ks(re, e0))),
    }).annotate({ identifier: "Model" })),
    (yki = nt({
      id: Kp,
      name: re,
      source: Jo(["env", "config", "custom", "api"]),
      env: On(re),
      key: Gn(re),
      options: ks(re, e0),
      models: ks(re, Dki),
    }).annotate({ identifier: "Provider" })),
    (Mki = ks(re, re)),
    (yxa = nt({ all: On(yki), default: Mki, connected: On(re) })),
    (Mxa = nt({ providers: On(yki), default: Mki })));
  F5e = class F5e extends (
    ki()("ProviderModelNotFoundError", {
      providerID: Kp,
      modelID: WL,
      suggestions: be(On(re)),
      cause: be(yd()),
    })
  ) {
    get message() {
      let e = this.suggestions?.length ? ` Did you mean: ${this.suggestions.join(", ")}?` : "";
      return `Model not found: ${this.providerID}/${this.modelID}.${e}`;
    }
    static isInstance(e) {
      return e instanceof F5e;
    }
  };
  Tki = class Tki extends ki()("ProviderInitError", { providerID: Kp, cause: be(yd()) }) {
    get message() {
      return `Failed to initialize provider: ${this.providerID}`;
    }
    static isInstance(e) {
      return e instanceof Tki;
    }
  };
  vki = class vki extends ki()("ProviderNoProvidersError", {}) {
    get message() {
      return "No providers are available";
    }
    static isInstance(e) {
      return e instanceof vki;
    }
  };
  bki = class bki extends ki()("ProviderNoModelsError", { providerID: Kp }) {
    get message() {
      return `No models are available for provider: ${this.providerID}`;
    }
    static isInstance(e) {
      return e instanceof bki;
    }
  };
  FN = class FN extends _i()("@jaccode/Provider") {};
  ((gRc = vm(FN)),
    (f7 = {
      id: WL.make($he),
      providerID: Kp.make(QL),
      name: uvi,
      api: { id: $he, npm: "@ai-sdk/openai-compatible", url: O0 + "/v1" },
      family: "jaccoder",
      status: "active",
      release_date: "2026-10-17",
      options: {},
      headers: {},
      variants: {},
      limit: { context: 131072, output: 8192 },
      cost: { input: 0, output: 0, cache: { read: 0, write: 0 } },
      capabilities: {
        temperature: !1,
        reasoning: !0,
        attachment: !0,
        toolcall: !0,
        interleaved: { field: "reasoning_content" },
        input: { text: !0, image: !1, video: !1, audio: !1, pdf: !1 },
        output: { text: !0, image: !1, video: !1, audio: !1, pdf: !1 },
      },
    }),
    (lDr = Object.fromEntries(
      Object.entries(SFe).map(([e, t]) => [
        e,
        {
          ...f7,
          id: WL.make(e),
          name: t,
          api: { ...f7.api, id: e },
          capabilities: { ...f7.capabilities, input: { ...f7.capabilities.input, image: !0 } },
        },
      ]),
    )),
    (fDr = { id: f7.providerID, name: "Jac Code", source: "custom", env: [], options: {}, models: lDr }));
  ((Txa = Es(
    FN,
    ft(function* () {
      let e = nki({
        name: QL,
        baseURL: O0 + "/v1",
        apiKey: "jac-session",
        fetch: Object.assign(Xen, { preconnect: fetch.preconnect }),
      });
      return FN.of({
        list: () => Jt({ [QL]: fDr }),
        getProvider: () => Jt(fDr),
        getModel: Iki,
        getLanguage: (t) => Iki(t.providerID, t.id).pipe(Vn((r) => e.chatModel(r.api.id))),
        closest: (t) => Jt(t === f7.providerID ? { providerID: t, modelID: $he } : void 0),
        getSmallModel: () => Jt(f7),
        defaultModel: () => Jt({ providerID: f7.providerID, modelID: f7.id }),
      });
    }),
  )),
    (jhe = Ll({ service: FN, layer: Txa, deps: [] })));
});