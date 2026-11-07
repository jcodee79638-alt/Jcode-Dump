
var AYe = ne(async () => {
  Gt();
  $H();
  xx();
  jT();
  await Jn([Jw(), $ee(), P7(), ek(), tte(), h7(), bT(), Tx()]);
  ((miH = nt({ home: re, state: re, config: re, worktree: re, directory: re }).annotate({
    identifier: "Path",
  })),
    (_iH = nt({ ...Tb, mode: wYa, context: be(O6.check(ARe(), pG(0))) })));
  lAe = class lAe extends (
    $y("VcsApplyError")(
      { name: ri("VcsApplyError"), data: nt({ message: re, reason: Jo(["non-git", "not-clean"]) }) },
      { httpApiStatus: 400 },
    )
  ) {};
  ((xR = {
    dispose: "/instance/dispose",
    path: "/path",
    vcs: "/vcs",
    vcsStatus: "/vcs/status",
    vcsDiff: "/vcs/diff",
    vcsDiffRaw: "/vcs/diff/raw",
    vcsApply: "/vcs/apply",
    command: "/command",
    agent: "/agent",
    skill: "/skill",
    lsp: "/lsp",
    formatter: "/formatter",
  }),
    (Zes = kE("instance")
      .add(
        zd("instance")
          .add(
            sc("dispose", xR.dispose, { query: jo, success: zs(Vi, "Instance disposed") }).annotateMerge(
              Fn({
                identifier: "instance.dispose",
                summary: "Dispose instance",
                description: "Clean up and dispose the current OpenCode instance, releasing all resources.",
              }),
            ),
            MH("path", xR.path, { query: jo, success: miH }).annotateMerge(
              Fn({
                identifier: "path.get",
                summary: "Get paths",
                description:
                  "Retrieve the current working directory and related path information for the OpenCode instance.",
              }),
            ),
            MH("vcs", xR.vcs, { query: jo, success: zs(OYa, "VCS info") }).annotateMerge(
              Fn({
                identifier: "vcs.get",
                summary: "Get VCS info",
                description:
                  "Retrieve version control system (VCS) information for the current project, such as git branch.",
              }),
            ),
            MH("vcsStatus", xR.vcsStatus, { query: jo, success: zs(On(NYa), "VCS status") }).annotateMerge(
              Fn({
                identifier: "vcs.status",
                summary: "Get VCS status",
                description: "Retrieve changed files in the current working tree without patches.",
              }),
            ),
            MH("vcsDiff", xR.vcsDiff, { query: _iH, success: zs(On(UYa), "VCS diff") }).annotateMerge(
              Fn({
                identifier: "vcs.diff",
                summary: "Get VCS diff",
                description:
                  "Retrieve the current git diff for the working tree or against the default branch.",
              }),
            ),
            MH("vcsDiffRaw", xR.vcsDiffRaw, {
              query: jo,
              success: zs(re.pipe(MSi({ contentType: "text/x-diff; charset=utf-8" })), "Raw VCS diff"),
            }).annotateMerge(
              Fn({
                identifier: "vcs.diff.raw",
                summary: "Get raw VCS diff",
                description: "Retrieve a raw patch for current uncommitted changes.",
              }),
            ),
            sc("vcsApply", xR.vcsApply, {
              query: jo,
              payload: FYa,
              success: zs(BYa, "VCS patch applied"),
              error: lAe,
            }).annotateMerge(
              Fn({
                identifier: "vcs.apply",
                summary: "Apply VCS patch",
                description: "Apply a raw patch to the current working tree.",
              }),
            ),
            MH("command", xR.command, { query: jo, success: zs(On(aBa), "List of commands") }).annotateMerge(
              Fn({
                identifier: "command.list",
                summary: "List commands",
                description: "Get a list of all available commands in the OpenCode system.",
              }),
            ),
            MH("agent", xR.agent, { query: jo, success: zs(On(Kja), "List of agents") }).annotateMerge(
              Fn({
                identifier: "app.agents",
                summary: "List agents",
                description: "Get a list of all available AI agents in the OpenCode system.",
              }),
            ),
            MH("skill", xR.skill, { query: jo, success: zs(On(Nja), "List of skills") }).annotateMerge(
              Fn({
                identifier: "app.skills",
                summary: "List skills",
                description: "Get a list of all available skills in the OpenCode system.",
              }),
            ),
            MH("lsp", xR.lsp, { query: jo, success: zs(On(M5a), "LSP server status") }).annotateMerge(
              Fn({
                identifier: "lsp.status",
                summary: "Get LSP status",
                description: "Get LSP server status",
              }),
            ),
            MH("formatter", xR.formatter, {
              query: jo,
              success: zs(On(nXa), "Formatter status"),
            }).annotateMerge(
              Fn({
                identifier: "formatter.status",
                summary: "Get formatter status",
                description: "Get formatter status",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "instance", description: "Experimental HttpApi instance read routes." }))
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