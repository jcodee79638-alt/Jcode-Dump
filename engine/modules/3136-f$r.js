
var f$r = ne(async () => {
  CE();
  txe();
  eHe();
  Gt();
  OH();
  Axe();
  jA();
  AP();
  ww();
  await Jn([f$r(), Yse(), S1(), lP()]);
  ((Cma = nt({
    path: re.annotate({
      description:
        "File path to edit. Relative paths resolve within the active Location. Absolute paths inside that Location are accepted; external absolute paths require external_directory approval.",
    }),
    oldString: re.annotate({ description: "Exact text to replace" }),
    newString: re.annotate({ description: "Replacement text, which must differ from oldString" }),
    replaceAll: Vi.pipe(be).annotate({
      description: "Replace all exact occurrences of oldString (default false)",
    }),
  })),
    (wma = nt({ files: On(Xde), replacements: Aa })),
    (Rma = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* kY,
          r = yield* Zde,
          s = yield* ui.Service,
          a = yield* Cy;
        yield* e
          .register({
            [Pma]: jLr(
              jB({
                description:
                  "Replace exact text in one file. Relative paths resolve within the active Location. Absolute paths inside the Location are accepted. Explicit external absolute paths require external_directory approval before edit approval.",
                input: Cma,
                output: wma,
                toModelOutput: ({ input: H, output: u }) => [
                  { type: "text", text: Bma(u, H.oldString, H.newString) },
                ],
                execute: (H, u) => {
                  let f = (d) =>
                    d.pipe(
                      Zo((_) =>
                        _ instanceof jsr
                          ? new zp({
                              message:
                                "File changed after permission approval. Read it again before editing.",
                            })
                          : new zp({ message: `Unable to edit ${H.path}` }),
                      ),
                    );
                  return ft(function* () {
                    let d = { type: "tool", messageID: u.assistantMessageID, callID: u.toolCallID };
                    if (H.oldString === H.newString)
                      return yield* new zp({
                        message: "No changes to apply: oldString and newString are identical.",
                      });
                    if (H.oldString === "")
                      return yield* new zp({
                        message: "oldString must not be empty. Use write to create or overwrite a file.",
                      });
                    let _ = yield* f(t.resolve({ path: H.path, kind: "file" })),
                      L = _.externalDirectory;
                    if (L)
                      yield* f(a.assert({ ...zWe(L), sessionID: u.sessionID, agent: u.agent, source: d }));
                    yield* f(
                      a.assert({
                        action: "edit",
                        resources: [_.resource],
                        save: ["*"],
                        sessionID: u.sessionID,
                        agent: u.agent,
                        source: d,
                      }),
                    );
                    let I = Nma(yield* f(s.readFile(_.canonical))),
                      D = kma(I.text),
                      S = zDi(H.oldString, D),
                      T = zDi(H.newString, D),
                      C = Fma(I.text, S);
                    if (C === 0)
                      return yield* new zp({
                        message:
                          "Could not find oldString in the file. It must match exactly, including whitespace and indentation.",
                      });
                    if (C > 1 && H.replaceAll !== !0)
                      return yield* new zp({
                        message:
                          "Found multiple exact matches for oldString. Provide more surrounding context or set replaceAll to true.",
                      });
                    let O = H.replaceAll === !0 ? I.text.replaceAll(S, T) : I.text.replace(S, T),
                      B = SN(I.text, O).reduce(
                        (Z, se) => ({
                          additions: Z.additions + (se.added ? (se.count ?? 0) : 0),
                          deletions: Z.deletions + (se.removed ? (se.count ?? 0) : 0),
                        }),
                        { additions: 0, deletions: 0 },
                      ),
                      V = Oma(O),
                      q = yield* f(
                        r.writeIfUnchanged({
                          target: _,
                          expected: I.content,
                          content: Uma(V.text, I.bom || V.bom),
                        }),
                      );
                    return {
                      files: [
                        {
                          file: q.resource,
                          patch: Ow(q.resource, q.resource, I.text, O),
                          status: "modified",
                          ...B,
                        },
                      ],
                      replacements: C,
                    };
                  });
                },
              }),
              "edit",
            ),
          })
          .pipe(on);
      }),
    )),
    (Wma = Ua({ name: "tool/edit", layer: Rma, deps: [T8, Ixe, Fht, ui.node, aN] })));
});
import txt from "path";