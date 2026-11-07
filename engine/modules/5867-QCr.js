
var QCr = ne(async () => {
  GGe();
  BA();
  Gt();
  $H();
  xx();
  jT();
  skt();
  yy();
  zM();
  await Jn([xP(), e$(), jI(), p$e(), bT(), Tx()]);
  ((QnH = nt({ consoleManagedProviders: J0(On(re)), activeOrgName: nw(re), switchableOrgCount: Ko }).annotate(
    { identifier: "ConsoleState" },
  )),
    (YnH = nt({ backgroundSubagents: Vi }).annotate({ identifier: "ExperimentalCapabilities" })),
    (ZnH = nt({ accountID: re, accountEmail: re, accountUrl: re, orgID: re, orgName: re, active: Vi })),
    (eiH = nt({ orgs: On(ZnH) })),
    (tiH = nt({ accountID: Fbe, orgID: OGe })),
    (riH = On(re).annotate({ identifier: "ToolIDs" })),
    (niH = nt({ id: re, description: re, parameters: PH }).annotate({ identifier: "ToolListItem" })),
    (iiH = On(niH).annotate({ identifier: "ToolList" })),
    (siH = nt({ ...Tb, provider: Kp, model: WL })),
    (oiH = On(re)),
    (aiH = Io([
      ri("WorktreeNotGitError"),
      ri("WorktreeNameGenerationFailedError"),
      ri("WorktreeCreateFailedError"),
      ri("WorktreeStartCommandFailedError"),
      ri("WorktreeRemoveFailedError"),
      ri("WorktreeResetFailedError"),
      ri("WorktreeListFailedError"),
    ])));
  E$e = class E$e extends (
    $y("WorktreeError")({ name: aiH, data: nt({ message: re }) }, { httpApiStatus: 400 })
  ) {};
  ((HiH = nt({
    ...Tb,
    roots: be(HYe),
    start: be(O6),
    cursor: be(O6),
    search: be(re),
    limit: be(O6),
    archived: be(HYe),
  })),
    (f9 = {
      capabilities: "/experimental/capabilities",
      console: "/experimental/console",
      consoleOrgs: "/experimental/console/orgs",
      consoleSwitch: "/experimental/console/switch",
      tool: "/experimental/tool",
      toolIDs: "/experimental/tool/ids",
      worktree: "/experimental/worktree",
      worktreeReset: "/experimental/worktree/reset",
      session: "/experimental/session",
      sessionBackground: "/experimental/session/:sessionID/background",
      resource: "/experimental/resource",
    }),
    (Kes = kE("experimental")
      .add(
        zd("experimental")
          .add(
            MH("capabilities", f9.capabilities, {
              query: jo,
              success: zs(YnH, "Experimental capabilities"),
            }).annotateMerge(
              Fn({
                identifier: "experimental.capabilities.get",
                summary: "Get experimental capabilities",
                description: "Get experimental features enabled on the OpenCode server.",
              }),
            ),
            MH("console", f9.console, {
              query: jo,
              success: zs(QnH, "Active Console provider metadata"),
              error: aX,
            }).annotateMerge(
              Fn({
                identifier: "experimental.console.get",
                summary: "Get active Console provider metadata",
                description:
                  "Get the active Console org name and the set of provider IDs managed by that Console org.",
              }),
            ),
            MH("consoleOrgs", f9.consoleOrgs, {
              query: jo,
              success: zs(eiH, "Switchable Console orgs"),
              error: aX,
            }).annotateMerge(
              Fn({
                identifier: "experimental.console.listOrgs",
                summary: "List switchable Console orgs",
                description:
                  "Get the available Console orgs across logged-in accounts, including the current active org.",
              }),
            ),
            sc("consoleSwitch", f9.consoleSwitch, {
              query: jo,
              payload: tiH,
              success: zs(Vi, "Switch success"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "experimental.console.switchOrg",
                summary: "Switch active Console org",
                description:
                  "Persist a new active Console account/org selection for the current local OpenCode state.",
              }),
            ),
            MH("tool", f9.tool, { query: siH, success: zs(iiH, "Tools"), error: PA }).annotateMerge(
              Fn({
                identifier: "tool.list",
                summary: "List tools",
                description:
                  "Get a list of available tools with their JSON schema parameters for a specific provider and model combination.",
              }),
            ),
            MH("toolIDs", f9.toolIDs, { query: jo, success: zs(riH, "Tool IDs"), error: PA }).annotateMerge(
              Fn({
                identifier: "tool.ids",
                summary: "List tool IDs",
                description:
                  "Get a list of all available tool IDs, including both built-in tools and dynamically registered tools.",
              }),
            ),
            MH("worktree", f9.worktree, {
              query: jo,
              success: zs(oiH, "List of worktree directories"),
              error: E$e,
            }).annotateMerge(
              Fn({
                identifier: "worktree.list",
                summary: "List worktrees",
                description: "List all sandbox worktrees for the current project.",
              }),
            ),
            sc("worktreeCreate", f9.worktree, {
              disableCodecs: !0,
              query: jo,
              payload: [lf, IQi],
              success: zs(EQi, "Worktree created"),
              error: E$e,
            }).annotateMerge(
              Fn({
                identifier: "worktree.create",
                summary: "Create worktree",
                description:
                  "Create a new git worktree for the current project and run any configured startup scripts.",
              }),
            ),
            P8("worktreeRemove", f9.worktree, {
              query: jo,
              payload: DQi,
              success: zs(Vi, "Worktree removed"),
              error: E$e,
            }).annotateMerge(
              Fn({
                identifier: "worktree.remove",
                summary: "Remove worktree",
                description: "Remove a git worktree and delete its branch.",
              }),
            ),
            sc("worktreeReset", f9.worktreeReset, {
              query: jo,
              payload: yQi,
              success: zs(Vi, "Worktree reset"),
              error: E$e,
            }).annotateMerge(
              Fn({
                identifier: "worktree.reset",
                summary: "Reset worktree",
                description: "Reset a worktree branch to the primary default branch.",
              }),
            ),
            MH("session", f9.session, { query: HiH, success: zs(On(POi), "List of sessions") }).annotateMerge(
              Fn({
                identifier: "experimental.session.list",
                summary: "List sessions",
                description:
                  "Get a list of all OpenCode sessions across projects, sorted by most recently updated. Archived sessions are excluded by default.",
              }),
            ),
            sc("sessionBackground", f9.sessionBackground, {
              params: { sessionID: Ec },
              query: jo,
              success: zs(Vi, "Backgrounded subagents"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "experimental.session.background",
                summary: "Background subagents",
                description:
                  "Detach any synchronous subagents currently blocking the session and continue them in the background.",
              }),
            ),
            MH("resource", f9.resource, {
              query: jo,
              success: zs(ks(re, K2a), "MCP resources"),
            }).annotateMerge(
              Fn({
                identifier: "experimental.resource.list",
                summary: "Get MCP resources",
                description:
                  "Get all available MCP resources from connected servers. Optionally filter by name.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "experimental", description: "Experimental HttpApi read-only routes." }))
          .middleware(Fm)
          .middleware(Nm)
          .middleware(tm),
      )
      .annotateMerge(
        Fn({
          title: "opencode experimental HttpApi",
          version: "0.0.1",
          description: "Experimental HttpApi surface for selected instance routes.",
        }),
      )));
});