
var Exr = ne(() => {
  Exr();
  Gt();
  g_();
  Hu();
  aw();
  DWe();
  ((pjt = re.check(k6("que")).pipe(
    Jl("QuestionID"),
    Bl((e) => ({ ascending: (t) => e.make(t ?? "que_" + t0()) })),
  )),
    (k3i = nt({
      label: re.annotate({ description: "Display text (1-5 words, concise)" }),
      description: re.annotate({ description: "Explanation of choice" }),
    }).annotate({ identifier: "QuestionOption" })),
    (O3i = {
      question: re.annotate({ description: "Complete question" }),
      header: re.annotate({ description: "Very short label (max 30 chars)" }),
      options: On(k3i).annotate({ description: "Available choices" }),
      multiple: be(Vi).annotate({ description: "Allow selecting multiple choices" }),
    }),
    (U3i = nt({
      ...O3i,
      custom: be(Vi).annotate({ description: "Allow typing a custom answer (default: true)" }),
    }).annotate({ identifier: "QuestionInfo" })),
    (dBa = nt(O3i).annotate({ identifier: "QuestionPrompt" })),
    (N3i = nt({ messageID: IV, callID: re }).annotate({ identifier: "QuestionTool" })),
    (F3i = nt({
      id: pjt,
      sessionID: gf,
      questions: On(U3i).annotate({ description: "Questions to ask" }),
      tool: be(N3i),
    }).annotate({ identifier: "QuestionRequest" })),
    (gxr = On(re).annotate({ identifier: "QuestionAnswer" })),
    (mBa = nt({
      answers: On(gxr).annotate({
        description: "User answers in order of questions (each answer is an array of selected labels)",
      }),
    }).annotate({ identifier: "QuestionReply" })),
    (B3i = nt({ sessionID: gf, requestID: pjt, answers: On(gxr) }).annotate({
      identifier: "QuestionReplied",
    })),
    (R3i = nt({ sessionID: gf, requestID: pjt }).annotate({ identifier: "QuestionRejected" })),
    (P3i = ua({ type: "question.asked", schema: F3i.fields })),
    (C3i = ua({ type: "question.replied", schema: B3i.fields })),
    (w3i = ua({ type: "question.rejected", schema: R3i.fields })),
    (W3i = { Asked: P3i, Replied: C3i, Rejected: w3i, Definitions: jl(P3i, C3i, w3i) }));
});