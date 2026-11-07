
function GZs(e, t) {
  let r = e.provider?.npm ?? t,
    s = pMn(r),
    a = e.options && s.request(e.options),
    H = e.cost && [
      {
        input: e.cost.input,
        output: e.cost.output,
        cache: { read: e.cost.cache_read, write: e.cost.cache_write },
      },
      ...(e.cost.context_over_200k
        ? [
            {
              tier: { type: "context", size: 200000 },
              input: e.cost.context_over_200k.input,
              output: e.cost.context_over_200k.output,
              cache: {
                read: e.cost.context_over_200k.cache_read,
                write: e.cost.context_over_200k.cache_write,
              },
            },
          ]
        : []),
    ],
    u =
      e.tool_call !== void 0 || e.modalities?.input !== void 0 || e.modalities?.output !== void 0
        ? { tools: e.tool_call ?? !1, input: e.modalities?.input ?? [], output: e.modalities?.output ?? [] }
        : void 0;
  return {
    family: e.family,
    name: e.name,
    api: e.provider?.npm
      ? {
          ...(e.id === void 0 ? {} : { id: e.id }),
          type: "aisdk",
          package: e.provider.npm,
          ...(e.provider.api === void 0 ? {} : { url: e.provider.api }),
          settings: {},
        }
      : e.id === void 0
        ? void 0
        : { id: e.id },
    capabilities: u,
    request: (e.headers || a) && { headers: e.headers, body: a },
    variants: e.variants && Object.entries(e.variants).map(([f, d]) => ({ id: f, body: s.request(d) })),
    cost: H,
    disabled: e.status === "deprecated" ? !0 : void 0,
    limit: e.limit && {
      context: Tsr(e.limit.context),
      input: e.limit.input === void 0 ? void 0 : Tsr(e.limit.input),
      output: Tsr(e.limit.output),
    },
  };
}