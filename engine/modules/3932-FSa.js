
async function FSa({ tools: e, toolChoice: t, activeTools: r }) {
  if (!NSa(e)) return { tools: void 0, toolChoice: void 0 };
  let s = r != null ? Object.entries(e).filter(([H]) => r.includes(H)) : Object.entries(e),
    a = [];
  for (let [H, u] of s) {
    let f = u.type;
    switch (f) {
      case void 0:
      case "dynamic":
      case "function":
        a.push({
          type: "function",
          name: H,
          description: u.description,
          inputSchema: await Rw(u.inputSchema).jsonSchema,
          ...(u.inputExamples != null ? { inputExamples: u.inputExamples } : {}),
          providerOptions: u.providerOptions,
          ...(u.strict != null ? { strict: u.strict } : {}),
        });
        break;
      case "provider":
        a.push({ type: "provider", name: H, id: u.id, args: u.args });
        break;
      default:
        throw Error(`Unsupported tool type: ${f}`);
    }
  }
  return {
    tools: a,
    toolChoice:
      t == null
        ? { type: "auto" }
        : typeof t === "string"
          ? { type: t }
          : { type: "tool", toolName: t.toolName },
  };
}