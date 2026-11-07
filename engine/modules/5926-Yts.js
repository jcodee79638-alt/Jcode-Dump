
var Yts = (e, t) =>
  zd("server.question")
    .add(
      MH("question.request.list", "/api/question/request", { query: fp, success: Dy(On(_Mt)) })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.question.request.list",
            summary: "List pending question requests",
            description: "Retrieve pending question requests for a location.",
          }),
        ),
    )
    .annotateMerge(Fn({ title: "questions", description: "Experimental question routes." }))
    .middleware(e)
    .add(
      MH("session.question.list", "/api/session/:sessionID/question", {
        params: { sessionID: P$ },
        success: nt({ data: On(_Mt) }),
        error: Wf,
      })
        .middleware(t)
        .annotateMerge(
          Fn({
            identifier: "v2.session.question.list",
            summary: "List session question requests",
            description: "Retrieve pending question requests owned by a session.",
          }),
        ),
    )
    .add(
      sc("session.question.reply", "/api/session/:sessionID/question/:requestID/reply", {
        params: { sessionID: P$, requestID: tbe },
        payload: WEi,
        success: lf,
        error: [Wf, Owe],
      })
        .middleware(t)
        .annotateMerge(
          Fn({
            identifier: "v2.session.question.reply",
            summary: "Reply to pending question request",
            description: "Answer a pending question request owned by a session.",
          }),
        ),
    )
    .add(
      sc("session.question.reject", "/api/session/:sessionID/question/:requestID/reject", {
        params: { sessionID: P$, requestID: tbe },
        success: lf,
        error: [Wf, Owe],
      })
        .middleware(t)
        .annotateMerge(
          Fn({
            identifier: "v2.session.question.reject",
            summary: "Reject pending question request",
            description: "Reject a pending question request owned by a session.",
          }),
        ),
    )
    .annotateMerge(Fn({ title: "session questions", description: "Experimental session question routes." }));