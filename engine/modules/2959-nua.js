
function nua(e) {
  if (e.api.type !== "aisdk" || e.api.package !== "@ai-sdk/openai-compatible") return [];
  let t = `${e.id} ${e.api.id}`.toLowerCase();
  if (!["glm-5.2", "glm-5-2", "glm-5p2"].some((r) => t.includes(r))) return [];
  return ["high", "max"].map((r) => ({ id: r, headers: {}, body: { reasoning_effort: r } }));
}