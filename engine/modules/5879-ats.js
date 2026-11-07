
var ats = ne(async () => {
  Gt();
  $H();
  xx();
  await Jn([JS(), bT(), Tx()]);
  ((DiH = nt({ context: be(re) })),
    (ots = kE("projectCopyName").add(
      zd("projectCopyName")
        .add(
          sc("generateName", "/experimental/project/:projectID/copy/generate-name", {
            params: { projectID: z_ },
            query: jo,
            payload: DiH,
            success: nt({ name: re }),
          }).annotateMerge(
            Fn({
              identifier: "experimental.projectCopy.generateName",
              summary: "Generate project copy name",
              description: "Generate a short name for a project copy from task context.",
            }),
          ),
        )
        .annotateMerge(Fn({ title: "projectCopy", description: "Project copy naming routes." }))
        .middleware(Fm)
        .middleware(Nm)
        .middleware(tm),
    )));
});