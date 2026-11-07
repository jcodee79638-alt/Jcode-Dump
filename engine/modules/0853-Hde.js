
var Hde = ne(() => {
  Hde();
  Gt();
  Hu();
  ade();
  Hu();
  ((gG = re.pipe(
    Jl("ProviderV2.ID"),
    Bl((e) => ({
      opencode: e.make("opencode"),
      anthropic: e.make("anthropic"),
      openai: e.make("openai"),
      google: e.make("google"),
      googleVertex: e.make("google-vertex"),
      githubCopilot: e.make("github-copilot"),
      amazonBedrock: e.make("amazon-bedrock"),
      azure: e.make("azure"),
      openrouter: e.make("openrouter"),
      mistral: e.make("mistral"),
      gitlab: e.make("gitlab"),
    })),
  )),
    (ctr = nt({ type: ri("aisdk"), package: re, url: re.pipe(Gn), settings: ks(re, PH).pipe(Gn) }).annotate({
      identifier: "Provider.AISDK",
    })),
    (Atr = nt({ type: ri("native"), url: re.pipe(Gn), settings: ks(re, PH) }).annotate({
      identifier: "Provider.Native",
    })),
    (ndn = Io([ctr, Atr]).pipe(_D("type")).annotate({ identifier: "Provider.Api" })),
    (n3e = nt({ headers: ks(re, re), body: ks(re, Qie) }).annotate({ identifier: "Provider.Request" })),
    (utr = nt({ id: gG, integrationID: rY.pipe(Gn), name: re, disabled: Vi.pipe(Gn), api: ndn, request: n3e })
      .annotate({ identifier: "ProviderV2.Info" })
      .pipe(
        Bl((e) => ({
          empty: (t) =>
            e.make({
              id: t,
              name: t,
              api: { type: "native", settings: {} },
              request: { headers: {}, body: {} },
            }),
        })),
      )));
});