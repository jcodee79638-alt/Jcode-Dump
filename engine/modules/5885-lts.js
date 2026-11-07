
var lts = ne(async () => {
  Ixr();
  Gt();
  $H();
  Sx();
  xx();
  jT();
  await Jn([XN(), bT(), Tx()]);
  ((SiH = nt({
    answers: On(LBa).annotate({
      description: "User answers in order of questions (each answer is an array of selected labels)",
    }),
  })),
    (uts = kE("question")
      .add(
        zd("question")
          .add(
            MH("list", twr, { query: jo, success: zs(On(hBa), "List of pending questions") }).annotateMerge(
              Fn({
                identifier: "question.list",
                summary: "List pending questions",
                description: "Get all pending question requests across all sessions.",
              }),
            ),
            sc("reply", `${twr}/:requestID/reply`, {
              params: { requestID: yPe },
              query: jo,
              payload: SiH,
              success: zs(Vi, "Question answered successfully"),
              error: [PA, g$e],
            }).annotateMerge(
              Fn({
                identifier: "question.reply",
                summary: "Reply to question request",
                description: "Provide answers to a question request from the AI assistant.",
              }),
            ),
            sc("reject", `${twr}/:requestID/reject`, {
              params: { requestID: yPe },
              query: jo,
              success: zs(Vi, "Question rejected successfully"),
              error: [PA, g$e],
            }).annotateMerge(
              Fn({
                identifier: "question.reject",
                summary: "Reject question request",
                description: "Reject a question request from the AI assistant.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "question", description: "Question routes." }))
          .middleware(Fm)
          .middleware(Nm)
          .middleware(tm),
      )
      .annotateMerge(
        Fn({
          title: "opencode HttpApi",
          version: "0.0.1",
          description: "Effect HttpApi surface for instance routes.",
        }),
      )));
});