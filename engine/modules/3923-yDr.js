
async function yDr({ prompt: e, supportedUrls: t, download: r = PSa() }) {
  let s = await OSa(e.messages, r, t),
    a = new Map();
  for (let _ of e.messages)
    if (_.role === "assistant" && Array.isArray(_.content)) {
      for (let L of _.content)
        if (L.type === "tool-approval-request" && "approvalId" in L && "toolCallId" in L)
          a.set(L.approvalId, L.toolCallId);
    }
  let H = new Set();
  for (let _ of e.messages)
    if (_.role === "tool") {
      for (let L of _.content)
        if (L.type === "tool-approval-response") {
          let I = a.get(L.approvalId);
          if (I) H.add(I);
        }
    }
  let u = [
      ...(e.system != null
        ? typeof e.system === "string"
          ? [{ role: "system", content: e.system }]
          : Che(e.system).map((_) => ({
              role: "system",
              content: _.content,
              providerOptions: _.providerOptions,
            }))
        : []),
      ...e.messages.map((_) => kSa({ message: _, downloadedAssets: s })),
    ],
    f = [];
  for (let _ of u) {
    if (_.role !== "tool") {
      f.push(_);
      continue;
    }
    let L = f.at(-1);
    if ((L == null ? void 0 : L.role) === "tool") L.content.push(..._.content);
    else f.push(_);
  }
  let d = new Set();
  for (let _ of f)
    switch (_.role) {
      case "assistant": {
        for (let L of _.content) if (L.type === "tool-call" && !L.providerExecuted) d.add(L.toolCallId);
        break;
      }
      case "tool": {
        for (let L of _.content) if (L.type === "tool-result") d.delete(L.toolCallId);
        break;
      }
      case "user":
      case "system":
        for (let L of H) d.delete(L);
        if (d.size > 0) throw new Pki({ toolCallIds: Array.from(d) });
        break;
    }
  for (let _ of H) d.delete(_);
  if (d.size > 0) throw new Pki({ toolCallIds: Array.from(d) });
  return f.filter((_) => _.role !== "tool" || _.content.length > 0);
}