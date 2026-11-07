
var CWe = ne(async () => {
  Gt();
  BA();
  Tht();
  bht();
  _sr();
  hsr();
  Lsr();
  $sr();
  gsr();
  jht();
  vht();
  Isr();
  Dsr();
  ysr();
  Msr();
  await Jn([CWe(), xht()]);
  ((BqH = nt({ config: be(Qie), remote_config: be(Qie) })),
    (bZs = Jo(["DEBUG", "INFO", "WARN", "ERROR"]).annotate({
      identifier: "LogLevel",
      description: "Log level",
    })),
    (Qde = nt({
      $schema: be(re).annotate({ description: "JSON schema reference for configuration validation" }),
      shell: be(re).annotate({ description: "Default shell to use for terminal and bash tool" }),
      logLevel: be(bZs).annotate({ description: "Log level" }),
      server: be(TZs).annotate({ description: "Server configuration for opencode serve and web commands" }),
      command: be(ks(re, uZs)).annotate({
        description: "Command configuration, see https://opencode.ai/docs/commands",
      }),
      skills: be(vZs).annotate({ description: "Additional skill folder paths" }),
      references: be(usr).annotate({ description: "Named git or local directory references" }),
      reference: be(usr).annotate({
        description: "@deprecated Use 'references' field instead. Named git or local directory references",
      }),
      watcher: be(nt({ ignore: be(J0(On(re))) })),
      snapshot: be(Vi).annotate({
        description:
          "Enable or disable snapshot tracking. When false, filesystem snapshots are not recorded and undoing or reverting will not undo/redo file changes. Defaults to true.",
      }),
      plugin: be(J0(On(DZs))),
      share: be(Jo(["manual", "auto", "disabled"])).annotate({
        description:
          "Control sharing behavior:'manual' allows manual sharing via commands, 'auto' enables automatic sharing, 'disabled' disables all sharing",
      }),
      autoshare: be(Vi).annotate({
        description: "@deprecated Use 'share' field instead. Share newly created sessions automatically",
      }),
      autoupdate: be(Io([Vi, ri("notify")])).annotate({
        description:
          "Check for new versions and show an update notice. Updates are never installed automatically; run /update or `opencode upgrade`. Set to false to disable update checks. true and 'notify' behave the same",
      }),
      disabled_providers: be(J0(On(re))).annotate({
        description: "Disable providers that are loaded automatically",
      }),
      enabled_providers: be(J0(On(re))).annotate({
        description: "When set, ONLY these providers will be enabled. All other providers will be ignored",
      }),
      model: be(re).annotate({
        description: "Model to use in the format of provider/model, eg anthropic/claude-2",
      }),
      small_model: be(re).annotate({
        description: "Small model to use for tasks like title generation in the format of provider/model",
      }),
      default_agent: be(re).annotate({
        description:
          "Default agent to use when none is specified. Must be a primary agent. Falls back to 'build' if not set or if the specified agent is invalid.",
      }),
      subagent_depth: be(Ko).annotate({
        description:
          "Maximum subagent nesting depth. Defaults to 1, which prevents subagents from launching subagents.",
      }),
      username: be(re).annotate({
        description: "Custom username to display in conversations instead of system username",
      }),
      mode: be(fG(nt({ build: be(j2), plan: be(j2) }), [ks(re, j2)])).annotate({
        description: "@deprecated Use `agent` field instead.",
      }),
      agent: be(
        fG(
          nt({
            plan: be(j2),
            build: be(j2),
            general: be(j2),
            explore: be(j2),
            title: be(j2),
            summary: be(j2),
            compaction: be(j2),
          }),
          [ks(re, j2)],
        ),
      ).annotate({ description: "Agent configuration, see https://opencode.ai/docs/agents" }),
      provider: be(ks(re, SZs)).annotate({
        description: "Custom provider configurations and model overrides",
      }),
      mcp: be(ks(re, Io([sMn, nt({ enabled: Vi })]))).annotate({
        description: "MCP (Model Context Protocol) server configurations",
      }),
      formatter: be(fZs).annotate({
        description:
          "Enable or configure formatters. Omit or set to false to disable, true to enable built-ins, or an object to enable built-ins with overrides.",
      }),
      lsp: be(LZs).annotate({
        description:
          "Enable or configure LSP servers. Omit or set to false to disable, true to enable built-ins, or an object to enable built-ins with overrides.",
      }),
      instructions: be(J0(On(re))).annotate({
        description: "Additional instruction files or patterns to include",
      }),
      layout: be(pZs).annotate({ description: "@deprecated Always uses stretch layout." }),
      permission: be(Y1n),
      tools: be(ks(re, Vi)),
      attachment: be(AZs).annotate({
        description: "Attachment processing configuration, including image size limits and resizing behavior",
      }),
      enterprise: be(nt({ url: be(re).annotate({ description: "Enterprise URL" }) })),
      tool_output: be(
        nt({
          max_lines: be(qc).annotate({
            description:
              "Maximum lines of tool output before it is truncated and saved to disk (default: 2000)",
          }),
          max_bytes: be(qc).annotate({
            description:
              "Maximum bytes of tool output before it is truncated and saved to disk (default: 51200)",
          }),
        }),
      ).annotate({
        description:
          "Thresholds for truncating tool output. When output exceeds either limit, the full text is written to the truncation directory and a preview is returned.",
      }),
      compaction: be(
        nt({
          auto: be(Vi).annotate({
            description: "Enable automatic compaction when context is full (default: true)",
          }),
          prune: be(Vi).annotate({ description: "Enable pruning of old tool outputs (default: false)" }),
          tail_turns: be(Ko).annotate({
            description:
              "Maximum number of recent user turns, including their following assistant/tool responses, to keep verbatim during compaction. By default retention is limited only by the preserved token budget.",
          }),
          preserve_recent_tokens: be(Ko).annotate({
            description: "Maximum number of tokens from recent turns to preserve verbatim after compaction",
          }),
          reserved: be(Ko).annotate({
            description:
              "Token buffer for compaction. Leaves enough window to avoid overflow during compaction.",
          }),
        }),
      ),
      experimental: be(
        nt({
          disable_paste_summary: be(Vi),
          batch_tool: be(Vi).annotate({ description: "Enable the batch tool" }),
          openTelemetry: be(Vi).annotate({
            description:
              "Enable OpenTelemetry spans for AI SDK calls (using the 'experimental_telemetry' flag)",
          }),
          primary_tools: be(J0(On(re))).annotate({
            description: "Tools that should only be available to primary agents.",
          }),
          continue_loop_on_deny: be(Vi).annotate({
            description: "Continue the agent loop when a tool call is denied",
          }),
          mcp_timeout: be(qc).annotate({
            description: "Timeout in milliseconds for model context protocol (MCP) requests",
          }),
          policies: be(J0(On(ssr))).annotate({
            description: "Policy statements applied to supported resources, such as provider access",
          }),
        }),
      ),
    }).annotate({ identifier: "Config" })));
});