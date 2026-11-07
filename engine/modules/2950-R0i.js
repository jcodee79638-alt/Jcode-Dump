
function R0i(e, t, r = {}) {
  ((e.name = r.name ?? t.name),
    (e.family = t.family),
    (e.api = t.provider?.npm
      ? { id: t.id, type: "aisdk", package: t.provider.npm, url: t.provider.api }
      : { id: t.id, type: "native", url: t.provider?.api, settings: {} }),
    (e.capabilities = {
      tools: t.tool_call,
      input: [...(t.modalities?.input ?? [])],
      output: [...(t.modalities?.output ?? [])],
    }),
    (e.variants = []),
    (e.time.released = QAa(t.release_date)),
    (e.cost = r.cost ?? Jhr(t.cost)),
    (e.status = t.status ?? "active"),
    (e.enabled = !0),
    (e.limit = { context: t.limit.context, input: t.limit.input, output: t.limit.output }),
    Object.assign(e.request.headers, r.request?.headers ?? {}),
    Object.assign(e.request.body, r.request?.body ?? {}));
}