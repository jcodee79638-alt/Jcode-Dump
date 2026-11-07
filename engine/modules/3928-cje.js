
async function cje({ toolCallId: e, input: t, output: r, tool: s, errorMode: a }) {
  if (a === "text") return { type: "error-text", value: fW(r) };
  else if (a === "json") return { type: "error-json", value: Oki(r) };
  if (s == null ? void 0 : s.toModelOutput)
    return await s.toModelOutput({ toolCallId: e, input: t, output: r });
  return typeof r === "string" ? { type: "text", value: r } : { type: "json", value: Oki(r) };
}