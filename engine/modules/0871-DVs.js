
function DVs(e, t) {
  let r = {
    name: e.providerID,
    ...(e.api.type === "aisdk" ? (e.api.settings ?? {}) : {}),
    ...e.request.body,
  };
  if (e.api.type === "aisdk" && e.api.url) r.baseURL = e.api.url;
  let { fetch: s, chunkTimeout: a } = r;
  return (
    delete r.chunkTimeout,
    (r.fetch = async (H, u) => {
      let f = { ...(u ?? {}) },
        d = [
          f.signal,
          typeof a === "number" && a > 0 ? new AbortController() : void 0,
          r.timeout !== void 0 && r.timeout !== null && r.timeout !== !1
            ? AbortSignal.timeout(r.timeout)
            : void 0,
        ].filter((D) => Boolean(D)),
        _ = d.find((D) => D instanceof AbortController),
        L = d.map((D) => (D instanceof AbortController ? D.signal : D));
      if (L.length === 1) f.signal = L[0];
      if (L.length > 1) f.signal = AbortSignal.any(L);
      if (
        (t === "@ai-sdk/openai" || t === "@ai-sdk/azure" || t === "@ai-sdk/amazon-bedrock/mantle") &&
        f.body &&
        f.method === "POST"
      ) {
        let D = JSON.parse(f.body);
        if (D.store !== !0 && Array.isArray(D.input)) {
          for (let S of D.input) if ("id" in S) delete S.id;
          f.body = JSON.stringify(D);
        }
      }
      let I = await (typeof s === "function" ? s : fetch)(H, { ...f, timeout: !1 });
      if (!_ || typeof a !== "number") return I;
      return IVs(I, a, _);
    }),
    r
  );
}