
var t0r = ne(async () => {
  CE();
  Gt();
  OH();
  Axe();
  AP();
  ww();
  await Jn([t0r(), Yse(), S1(), lP()]);
  ((M0a = nt({
    path: re.annotate({
      description:
        "File path to write. Relative paths resolve within the active Location. Absolute paths inside that Location are accepted; external absolute paths require external_directory approval.",
    }),
    content: re.annotate({ description: "Content to write to the file" }),
  })),
    (x0a = nt({ operation: ri("write"), target: re, resource: re, existed: Vi })),
    (T0a = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* kY,
          r = yield* Zde,
          s = yield* Cy;
        yield* e
          .register({
            [y0a]: jLr(
              jB({
                description:
                  "Write content to one file. Relative paths resolve within the active Location. Absolute paths inside the Location are accepted. Explicit external absolute paths require external_directory approval before edit approval.",
                input: M0a,
                output: x0a,
                toModelOutput: ({ output: a }) => [{ type: "text", text: S0a(a) }],
                execute: (a, H) =>
                  ft(function* () {
                    let u = { type: "tool", messageID: H.assistantMessageID, callID: H.toolCallID },
                      f = yield* t.resolve({ path: a.path, kind: "file" }),
                      d = f.externalDirectory;
                    if (d) yield* s.assert({ ...zWe(d), sessionID: H.sessionID, agent: H.agent, source: u });
                    return (
                      yield* s.assert({
                        action: "edit",
                        resources: [f.resource],
                        save: ["*"],
                        sessionID: H.sessionID,
                        agent: H.agent,
                        source: u,
                      }),
                      yield* r.writeTextPreservingBom({ target: f, content: a.content })
                    );
                  }).pipe(Zo(() => new zp({ message: `Unable to write ${a.path}` }))),
              }),
              "edit",
            ),
          })
          .pipe(on);
      }),
    )),
    (v0a = Ua({ name: "tool/write", layer: T0a, deps: [T8, Ixe, Fht, aN] })));
});