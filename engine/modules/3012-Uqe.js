
var Uqe = ne(() => {
  Uqe();
  Gt();
  Hu();
  g_();
  aw();
  Hu();
  ((tbe = re.check(k6("que")).pipe(
    Jl("QuestionV2.ID"),
    Bl((e) => {
      let t = () => e.make("que_" + t0());
      return { create: t, ascending: (r) => (r === void 0 ? t() : e.make(r)) };
    }),
  )),
    (NEi = nt({
      label: re.annotate({ description: "Display text (1-5 words, concise)" }),
      description: re.annotate({ description: "Explanation of choice" }),
    }).annotate({ identifier: "QuestionV2.Option" })),
    (FEi = {
      question: re.annotate({ description: "Complete question" }),
      header: re.annotate({ description: "Very short label (max 30 chars)" }),
      options: On(NEi).annotate({ description: "Available choices" }),
      multiple: Vi.pipe(Gn).annotate({ description: "Allow selecting multiple choices" }),
    }),
    (BEi = nt({
      ...FEi,
      custom: Vi.pipe(Gn).annotate({ description: "Allow typing a custom answer (default: true)" }),
    }).annotate({ identifier: "QuestionV2.Info" })),
    (vua = nt(FEi).annotate({ identifier: "QuestionV2.Prompt" })),
    (REi = nt({ messageID: re, callID: re }).annotate({ identifier: "QuestionV2.Tool" })),
    (_Mt = nt({
      id: tbe,
      sessionID: gf,
      questions: On(BEi).annotate({ description: "Questions to ask" }),
      tool: REi.pipe(Gn),
    }).annotate({ identifier: "QuestionV2.Request" })),
    (lLr = On(re).annotate({ identifier: "QuestionV2.Answer" })),
    (WEi = nt({
      answers: On(lLr).annotate({
        description: "User answers in order of questions (each answer is an array of selected labels)",
      }),
    }).annotate({ identifier: "QuestionV2.Reply" })),
    (kEi = ua({ type: "question.v2.asked", schema: _Mt.fields })),
    (OEi = ua({ type: "question.v2.replied", schema: { sessionID: gf, requestID: tbe, answers: On(lLr) } })),
    (UEi = ua({ type: "question.v2.rejected", schema: { sessionID: gf, requestID: tbe } })),
    (VEi = { Asked: kEi, Replied: OEi, Rejected: UEi, Definitions: jl(kEi, OEi, UEi) }));
});