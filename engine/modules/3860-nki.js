
function nki(e) {
  let t = Vwi(e.baseURL),
    r = e.name,
    s = { ...(e.apiKey && { Authorization: `Bearer ${e.apiKey}` }), ...e.headers },
    a = () => gHe(s, `ai-sdk/openai-compatible/${uxa}`),
    H = (D) => ({
      provider: `${r}.${D}`,
      url: ({ path: S }) => {
        let T = new URL(`${t}${S}`);
        if (e.queryParams) T.search = new URLSearchParams(e.queryParams).toString();
        return T.toString();
      },
      headers: a,
      fetch: e.fetch,
    }),
    u = (D) => f(D),
    f = (D) =>
      new exa(D, {
        ...H("chat"),
        includeUsage: e.includeUsage,
        supportsStructuredOutputs: e.supportsStructuredOutputs,
        transformRequestBody: e.transformRequestBody,
        metadataExtractor: e.metadataExtractor,
      }),
    d = (D) => new sxa(D, { ...H("completion"), includeUsage: e.includeUsage }),
    _ = (D) => new Hxa(D, { ...H("embedding") }),
    L = (D) => new Axa(D, H("image")),
    I = (D) => u(D);
  return (
    (I.specificationVersion = "v3"),
    (I.languageModel = u),
    (I.chatModel = f),
    (I.completionModel = d),
    (I.embeddingModel = _),
    (I.textEmbeddingModel = _),
    (I.imageModel = L),
    I
  );
}