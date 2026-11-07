
var x4i = ne(async () => {
  Gt();
  D4i();
  await Jn([Vy(), XN()]);
  ((F7a = nt({ questions: J0(On(_Ba)).annotate({ description: "Questions to ask" }) })),
    (M4i = t_(
      "question",
      ft(function* () {
        let e = yield* gee;
        return {
          description: y4i,
          parameters: F7a,
          execute: (t, r) =>
            ft(function* () {
              let s = yield* e.ask({
                  sessionID: r.sessionID,
                  questions: t.questions,
                  tool: r.callID ? { messageID: r.messageID, callID: r.callID } : void 0,
                }),
                a = t.questions
                  .map((H, u) => `"${H.question}"="${s[u]?.length ? s[u].join(", ") : "Unanswered"}"`)
                  .join(", ");
              return {
                title: `Asked ${t.questions.length} question${t.questions.length > 1 ? "s" : ""}`,
                output: `User has answered your questions: ${a}. You can now continue with the user's answers in mind.`,
                metadata: { answers: s },
              };
            }).pipe(on),
        };
      }),
    )));
});