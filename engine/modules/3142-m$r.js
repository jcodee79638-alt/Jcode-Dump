
var m$r = ne(async () => {
  CE();
  Gt();
  OH();
  AP();
  ww();
  await Jn([m$r(), S1(), rbe(), lP()]);
  ((r_a = nt({ questions: On(bua).annotate({ description: "Questions to ask" }) })),
    (n_a = nt({ answers: On(jua) })),
    (s_a = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* Gae,
          r = yield* Cy;
        yield* e
          .register({
            [e_a]: jB({
              description: t_a,
              input: r_a,
              output: n_a,
              toModelOutput: ({ input: s, output: a }) => [
                { type: "text", text: i_a(s.questions, a.answers) },
              ],
              execute: (s, a) =>
                r
                  .assert({
                    action: "question",
                    resources: ["*"],
                    sessionID: a.sessionID,
                    agent: a.agent,
                    source: { type: "tool", messageID: a.assistantMessageID, callID: a.toolCallID },
                  })
                  .pipe(
                    Zo(() => new zp({ message: "Permission denied: question" })),
                    Zu(
                      t
                        .ask({
                          sessionID: a.sessionID,
                          questions: s.questions,
                          tool: { messageID: a.assistantMessageID, callID: a.toolCallID },
                        })
                        .pipe(on),
                    ),
                    Vn((H) => ({ answers: H })),
                  ),
            }),
          })
          .pipe(on);
      }),
    )),
    (o_a = Ua({ name: "tool/question", layer: s_a, deps: [T8, aN, GEi] })));
});
import ube from "path";
import { pathToFileURL as iyi } from "url";