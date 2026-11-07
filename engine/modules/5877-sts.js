
var sts = ne(async () => {
  Gt();
  $H();
  Sx();
  xx();
  jT();
  await Jn([fJ(), JS(), bT(), Tx()]);
  ((IiH = nt({ name: be(re), icon: be(CCe.fields.icon), commands: be(CCe.fields.commands) })),
    (its = kE("project")
      .add(
        zd("project")
          .add(
            MH("list", uYe, { query: jo, success: zs(On(CCe), "List of projects") }).annotateMerge(
              Fn({
                identifier: "project.list",
                summary: "List all projects",
                description: "Get a list of projects that have been opened with OpenCode.",
              }),
            ),
            MH("current", `${uYe}/current`, {
              query: jo,
              success: zs(CCe, "Current project information"),
            }).annotateMerge(
              Fn({
                identifier: "project.current",
                summary: "Get current project",
                description: "Retrieve the currently active project that OpenCode is working with.",
              }),
            ),
            sc("initGit", `${uYe}/git/init`, {
              query: jo,
              success: zs(CCe, "Project information after git initialization"),
            }).annotateMerge(
              Fn({
                identifier: "project.initGit",
                summary: "Initialize git repository",
                description:
                  "Create a git repository for the current project and return the refreshed project info.",
              }),
            ),
            Cbe("update", `${uYe}/:projectID`, {
              params: { projectID: z_ },
              query: jo,
              payload: IiH,
              success: zs(CCe, "Updated project information"),
              error: [PA, oYe],
            }).annotateMerge(
              Fn({
                identifier: "project.update",
                summary: "Update project",
                description: "Update project properties such as name, icon, and commands.",
              }),
            ),
            MH("directories", `${uYe}/:projectID/directories`, {
              params: { projectID: z_ },
              query: jo,
              success: zs(qQs, "Project directories"),
            }).annotateMerge(
              Fn({
                identifier: "project.directories",
                summary: "List project directories",
                description: "List known local absolute directories for a project.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "project", description: "Experimental HttpApi project routes." }))
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