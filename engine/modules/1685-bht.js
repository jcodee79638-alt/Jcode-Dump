
var bht = ne(() => {
  bht();
  Gt();
  BA();
  vht();
  ((oZs = Io([
    re.check(cRe(/^#[0-9a-fA-F]{6}$/)),
    Jo(["primary", "secondary", "accent", "success", "warning", "error", "info"]),
  ])),
    (Z1n = fG(
      nt({
        model: be(re),
        variant: be(re).annotate({
          description:
            "Default model variant for this agent (applies only when using the agent's configured model).",
        }),
        temperature: be(mo),
        top_p: be(mo),
        prompt: be(re),
        tools: be(ks(re, Vi)).annotate({ description: "@deprecated Use 'permission' field instead" }),
        disable: be(Vi),
        description: be(re).annotate({ description: "Description of when to use the agent" }),
        mode: be(Jo(["subagent", "primary", "all"])),
        hidden: be(Vi).annotate({
          description:
            "Hide this subagent from the @ autocomplete menu (default: false, only applies to mode: subagent)",
        }),
        options: be(ks(re, e0)),
        color: be(oZs).annotate({
          description: "Hex color code (e.g., #FF5733) or theme color (e.g., primary)",
        }),
        steps: be(qc).annotate({
          description: "Maximum number of agentic iterations before forcing text-only response",
        }),
        maxSteps: be(qc).annotate({ description: "@deprecated Use 'steps' field instead." }),
        permission: be(Y1n),
      }),
      [ks(re, e0)],
    )),
    (aZs = new Set([
      "name",
      "model",
      "variant",
      "prompt",
      "description",
      "temperature",
      "top_p",
      "mode",
      "hidden",
      "color",
      "steps",
      "maxSteps",
      "options",
      "permission",
      "disable",
      "tools",
    ])),
    (j2 = Z1n.pipe(v$(Z1n, { decode: Sm(HZs), encode: QC({ strict: !1 }) })).annotate({
      identifier: "AgentConfig",
    })));
});