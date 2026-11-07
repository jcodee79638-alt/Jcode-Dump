
function qFa(e, t, r) {
  let s = {
    ...e.inputSchema,
    type: "object",
    properties: e.inputSchema.properties ?? {},
    additionalProperties: !1,
  };
  return rDr({
    description: e.description ?? "",
    inputSchema: ub(s),
    execute: async (a, H) => {
      let u = await t.callTool({ name: e.name, arguments: a || {} }, NX, {
        resetTimeoutOnProgress: !0,
        signal: H.abortSignal,
        timeout: r,
        onprogress: () => {},
      });
      if (u.isError)
        throw Error(
          u.content.flatMap((f) => (f.type === "text" ? [f.text] : [])).filter((f) => f.trim()).join(`

`) || "MCP tool returned an error",
        );
      if (u.content.length > 0 || u.structuredContent === void 0 || u.structuredContent === null) return u;
      return { ...u, content: [{ type: "text", text: JSON.stringify(u.structuredContent) }] };
    },
  });
}