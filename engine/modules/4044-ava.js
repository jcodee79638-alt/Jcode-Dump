
function ava(e, t, r) {
  let s = new Map(),
    a = I8i.byteLength(
      JSON.stringify(e, (f, d) => (typeof d === "string" && d.startsWith("data:image/") ? "[image]" : d)),
    ),
    H = 0,
    u = 0;
  for (let f of e.toReversed()) {
    if (f.role !== "user" || typeof f.content === "string") continue;
    for (let d of f.content.toReversed()) {
      if ((d.type !== "image" && d.type !== "file") || s.size >= DHe.images) continue;
      let _ = Hva(d);
      if (!_ || H + _.bytes > DHe.totalImageBytes || u + _.url.length > Math.max(0, 850000 - a)) continue;
      (s.set(d, _), (H += _.bytes), (u += _.url.length));
    }
  }
  return e.flatMap((f) => {
    if (f.role !== "user" && f.role !== "assistant" && f.role !== "tool") return [];
    if (f.role === "tool")
      return [
        {
          role: "tool",
          content: f.content.map((_) =>
            _.type === "tool-result"
              ? E8i(_)
              : {
                  type: "tool-approval-response",
                  approvalId: _.approvalId,
                  approved: _.approved,
                  ...(_.reason === void 0 ? {} : { reason: dje(_.reason) }),
                  ...(_.providerExecuted === void 0 ? {} : { providerExecuted: _.providerExecuted }),
                },
          ),
        },
      ];
    if (typeof f.content === "string") return [{ role: f.role, content: dje(f.content) }];
    if (f.role === "user")
      return [
        {
          role: "user",
          content: f.content.map((_) => {
            let L = s.get(_);
            return _.type === "text"
              ? RDr(_.text)
              : L
                ? { type: "image", image: new URL(L.url), mediaType: L.mime }
                : WDr();
          }),
        },
      ];
    let d = f.content.flatMap((_) => {
      if (_.type === "reasoning") return [{ type: "reasoning", text: dje(_.text) }];
      if (_.type === "file") return [WDr()];
      if (_.type === "text") return [RDr(_.text)];
      if (_.type === "tool-result") return [E8i(_)];
      if (_.type === "tool-approval-request")
        return [{ type: _.type, approvalId: _.approvalId, toolCallId: _.toolCallId }];
      return [
        {
          type: "tool-call",
          toolCallId: _.toolCallId,
          toolName: _.toolName,
          input: _.input,
          ...(_.providerExecuted === void 0 ? {} : { providerExecuted: _.providerExecuted }),
        },
      ];
    });
    return d.length ? [{ role: "assistant", content: d }] : [];
  });
}