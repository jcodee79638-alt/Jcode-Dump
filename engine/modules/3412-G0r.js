
function G0r() {
  return {
    model: `${QL}/${$he}`,
    small_model: `${QL}/${$he}`,
    default_agent: "build",
    subagent_depth: 0,
    username: "You",
    autoupdate: !1,
    share: "disabled",
    plugin: [],
    instructions: [],
    agent: {},
    command: {},
    mcp: {},
    enabled_providers: [QL],
    provider: {
      [QL]: {
        name: "Jac Code",
        npm: "@ai-sdk/openai-compatible",
        options: { baseURL: `${O0}/v1`, apiKey: "jac-session" },
        models: Object.fromEntries(
          Object.entries(SFe).map(([e, t]) => [
            e,
            { name: t, tool_call: !0, limit: { context: 131072, output: 8192 } },
          ]),
        ),
      },
    },
    permission: { task: "deny", external_directory: "ask", bash: "ask", webfetch: "ask", edit: "ask" },
  };
}