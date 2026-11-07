
async function aRa(e, t = e.messages.at(-1)) {
  if (!t || t.role !== "assistant" || !t.content || typeof t.content === "string") return null;
  let r = t.content.filter((a) => a.type === "tool_use");
  if (r.length === 0) return null;
  return {
    role: "user",
    content: await Promise.all(
      r.map(async (a) => {
        let H = e.tools.find((u) => ("name" in u ? u.name : u.mcp_server_name) === a.name);
        if (!H || !("run" in H))
          return {
            type: "tool_result",
            tool_use_id: a.id,
            content: `Error: Tool '${a.name}' not found`,
            is_error: !0,
          };
        try {
          let u = a.input;
          if ("parse" in H && H.parse) u = H.parse(u);
          let f = await H.run(u);
          return { type: "tool_result", tool_use_id: a.id, content: f };
        } catch (u) {
          return {
            type: "tool_result",
            tool_use_id: a.id,
            content: `Error: ${u instanceof Error ? u.message : String(u)}`,
            is_error: !0,
          };
        }
      }),
    ),
  };
}