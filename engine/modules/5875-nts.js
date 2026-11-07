
var nts = ne(async () => {
  VZ();
  Gt();
  $H();
  Sx();
  xx();
  jT();
  await Jn([bT(), Tx()]);
  ((EiH = nt({ reply: Aht, message: be(re) })),
    (rts = kE("permission")
      .add(
        zd("permission")
          .add(
            MH("list", tts, { query: jo, success: zs(On(bir), "List of pending permissions") }).annotateMerge(
              Fn({
                identifier: "permission.list",
                summary: "List pending permissions",
                description: "Get all pending permission requests across all sessions.",
              }),
            ),
            sc("reply", `${tts}/:requestID/reply`, {
              params: { requestID: GG },
              query: jo,
              payload: EiH,
              success: zs(Vi, "Permission processed successfully"),
              error: [PA, ite],
            }).annotateMerge(
              Fn({
                identifier: "permission.reply",
                summary: "Respond to permission request",
                description: "Approve or deny a permission request from the AI assistant.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "permission", description: "Experimental HttpApi permission routes." }))
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