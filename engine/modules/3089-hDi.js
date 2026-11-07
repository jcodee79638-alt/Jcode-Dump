
var hDi,
  LDi,
  $Di,
  gDi,
  Jqe,
  Tda = (e, t) => {
    if (t?.type === "key") return Bnr(t.key);
    if (t?.type === "oauth") return Bnr(t.access);
    let r = e.request.body.apiKey ?? e.api.settings?.apiKey;
    if (typeof r === "string") return Bnr(r);
  },
  zLr = (e, t) => {
    let r = e.request.body,
      s = Object.hasOwn(r, "apiKey")
        ? Object.fromEntries(Object.entries(r).filter(([a]) => a !== "apiKey"))
        : r;
    return t.with({
      provider: e.providerID,
      endpoint: e.api.url === void 0 ? void 0 : { baseURL: e.api.url },
      headers: e.request.headers,
      http: { body: s },
      limits: { context: e.limit.context, output: e.limit.output },
    });
  },
  vda = (e, t) => {
    let r = t === "default" || t === void 0 ? e.request.variant : t,
      s = e.variants.find((a) => a.id === r);
    if (!s && t !== void 0 && t !== "default")
      return bn(new $Di({ providerID: e.providerID, modelID: e.id, variant: t }));
    return Jt(
      s
        ? fme(e, (a) => {
            (Object.assign(a.request.headers, s.headers), Object.assign(a.request.body, s.body));
          })
        : e,
    );
  },
  bda = (e) => (e.api.type === "aisdk" ? `${e.api.type}:${e.api.package}` : e.api.type),
  jda = (e, t) => {
    let r =
        t?.type !== "key" || t.metadata === void 0
          ? e
          : fme(e, (a) => {
              Object.assign(a.request.body, t.metadata);
            }),
      s = Tda(r, t);
    if (r.api.type === "aisdk" && r.api.package === "@ai-sdk/openai")
      return Jt(
        zLr(r, dDi)
          .with({ auth: s === void 0 ? Pse : dIn(s) })
          .model({ id: r.api.id }),
      );
    if (r.api.type === "aisdk" && r.api.package === "@ai-sdk/anthropic")
      return Jt(
        zLr(r, qIi)
          .with({ auth: s === void 0 ? Pse : WKs("x-api-key", s) })
          .model({ id: r.api.id }),
      );
    if (r.api.type === "aisdk" && r.api.package === "@ai-sdk/openai-compatible" && r.api.url)
      return Jt(
        zLr(r, rDi)
          .with({ auth: s === void 0 ? Pse : dIn(s) })
          .model({ id: r.api.id }),
      );
    return bn(new gDi({ providerID: r.providerID, modelID: r.id, api: bda(r) }));
  },
  Pda = (e, t, r) => vda(t, e.model?.variant).pipe(Hi((s) => jda(s, r))),
  _Di = (e) =>
    e.api.type === "aisdk" &&
    (e.api.package === "@ai-sdk/openai" ||
      e.api.package === "@ai-sdk/anthropic" ||
      (e.api.package === "@ai-sdk/openai-compatible" && e.api.url !== void 0)),
  Cda,
  EDi;