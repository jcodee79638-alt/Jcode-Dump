
var Ves = ne(async () => {
  $H();
  xx();
  jT();
  await Jn([CWe(), Vw(), bT(), Tx()]);
  Wes = kE("config")
    .add(
      zd("config")
        .add(
          MH("get", JCr, { query: jo, success: zs(Qde, "Get config info") }).annotateMerge(
            Fn({
              identifier: "config.get",
              summary: "Get configuration",
              description: "Retrieve the current OpenCode configuration settings and preferences.",
            }),
          ),
          Cbe("update", JCr, {
            query: jo,
            payload: Qde,
            success: zs(Qde, "Successfully updated config"),
            error: PA,
          }).annotateMerge(
            Fn({
              identifier: "config.update",
              summary: "Update configuration",
              description: "Update OpenCode configuration settings and preferences.",
            }),
          ),
          MH("providers", `${JCr}/providers`, {
            query: jo,
            success: zs(Mxa, "List of providers"),
          }).annotateMerge(
            Fn({
              identifier: "config.providers",
              summary: "List config providers",
              description: "Get a list of all configured AI providers and their default models.",
            }),
          ),
        )
        .annotateMerge(Fn({ title: "config", description: "Experimental HttpApi config routes." }))
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
    );
});