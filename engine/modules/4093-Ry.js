
var Ry = ne(() => {
  Gt();
  ZTt();
  Ry();
  au();
  W8i = G1("OPENCODE_EXPERIMENTAL");
  NE = class NE extends (
    B8i()("@opencode/RuntimeFlags", {
      autoShare: G1("OPENCODE_AUTO_SHARE"),
      pure: G1("OPENCODE_PURE"),
      disableDefaultPlugins: G1("OPENCODE_DISABLE_DEFAULT_PLUGINS"),
      disableEmbeddedWebUi: G1("OPENCODE_DISABLE_EMBEDDED_WEB_UI"),
      disableExternalSkills: G1("OPENCODE_DISABLE_EXTERNAL_SKILLS"),
      disableLspDownload: G1("OPENCODE_DISABLE_LSP_DOWNLOAD"),
      disableClaudeCodePrompt: Xpe({
        broad: G1("OPENCODE_DISABLE_CLAUDE_CODE"),
        direct: G1("OPENCODE_DISABLE_CLAUDE_CODE_PROMPT"),
      }).pipe(GQ((e) => e.broad || e.direct)),
      disableClaudeCodeSkills: Xpe({
        broad: G1("OPENCODE_DISABLE_CLAUDE_CODE"),
        direct: G1("OPENCODE_DISABLE_CLAUDE_CODE_SKILLS"),
      }).pipe(GQ((e) => e.broad || e.direct)),
      enableExa: Xpe({
        experimental: W8i,
        enabled: G1("OPENCODE_ENABLE_EXA"),
        legacy: G1("OPENCODE_EXPERIMENTAL_EXA"),
      }).pipe(GQ((e) => e.experimental || e.enabled || e.legacy)),
      enableParallel: Xpe({
        enabled: G1("OPENCODE_ENABLE_PARALLEL"),
        legacy: G1("OPENCODE_EXPERIMENTAL_PARALLEL"),
      }).pipe(GQ((e) => e.enabled || e.legacy)),
      enableExperimentalModels: G1("OPENCODE_ENABLE_EXPERIMENTAL_MODELS"),
      enableQuestionTool: G1("OPENCODE_ENABLE_QUESTION_TOOL"),
      experimentalReferences: oee("OPENCODE_EXPERIMENTAL_REFERENCES"),
      experimentalBackgroundSubagents: oee("OPENCODE_EXPERIMENTAL_BACKGROUND_SUBAGENTS"),
      experimentalLspTy: G1("OPENCODE_EXPERIMENTAL_LSP_TY"),
      experimentalLspTool: oee("OPENCODE_EXPERIMENTAL_LSP_TOOL"),
      experimentalOxfmt: oee("OPENCODE_EXPERIMENTAL_OXFMT"),
      experimentalPlanMode: oee("OPENCODE_EXPERIMENTAL_PLAN_MODE"),
      experimentalCodeMode: oee("OPENCODE_EXPERIMENTAL_CODE_MODE"),
      experimentalEventSystem: oee("OPENCODE_EXPERIMENTAL_EVENT_SYSTEM"),
      experimentalWorkspaces: oee("OPENCODE_EXPERIMENTAL_WORKSPACES"),
      experimentalIconDiscovery: oee("OPENCODE_EXPERIMENTAL_ICON_DISCOVERY"),
      outputTokenMax: R8i("OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX"),
      bashDefaultTimeoutMs: R8i("OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS"),
      experimentalNativeLlm: G1("OPENCODE_EXPERIMENTAL_NATIVE_LLM"),
      experimentalWebSockets: G1("OPENCODE_EXPERIMENTAL_WEBSOCKETS"),
      client: dG("OPENCODE_CLIENT").pipe(XQ("cli")),
    })
  ) {};
  ((TVc = NE.layer.pipe(ou(Ncn(H2s({}))), X2e)),
    (WN = Ll({ service: NE, layer: NE.layer.pipe(X2e), deps: [] })));
});