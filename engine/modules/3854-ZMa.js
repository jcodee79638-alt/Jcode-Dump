
function ZMa({ tools: e, toolChoice: t }) {
  e = (e == null ? void 0 : e.length) ? e : void 0;
  let r = [];
  if (e == null) return { tools: void 0, toolChoice: void 0, toolWarnings: r };
  let s = [];
  for (let H of e)
    if (H.type === "provider") r.push({ type: "unsupported", feature: `provider-defined tool ${H.id}` });
    else
      s.push({
        type: "function",
        function: {
          name: H.name,
          description: H.description,
          parameters: H.inputSchema,
          ...(H.strict != null ? { strict: H.strict } : {}),
        },
      });
  if (t == null) return { tools: s, toolChoice: void 0, toolWarnings: r };
  let a = t.type;
  switch (a) {
    case "auto":
    case "none":
    case "required":
      return { tools: s, toolChoice: a, toolWarnings: r };
    case "tool":
      return { tools: s, toolChoice: { type: "function", function: { name: t.toolName } }, toolWarnings: r };
    default:
      throw new gv({ functionality: `tool choice type: ${a}` });
  }
}