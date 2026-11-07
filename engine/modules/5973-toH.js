
function toH(e, t, r) {
  if (t === "/experimental/console/switch" && r === "post") delete e.responses?.["400"];
  if ((t !== "/session/{sessionID}/message" && t !== "/session/{sessionID}/command") || r !== "post") return;
  let s = e.responses?.["200"]?.content?.["application/json"];
  if (!s) return;
  s.schema = {
    type: "object",
    required: ["info", "parts"],
    properties: {
      info: { $ref: "#/components/schemas/AssistantMessage" },
      parts: { type: "array", items: { $ref: "#/components/schemas/Part" } },
    },
  };
}