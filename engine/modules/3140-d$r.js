
var d$r = ne(async () => {
  CE();
  Gt();
  OH();
  jA();
  BA();
  AP();
  ww();
  await Jn([d$r(), eN(), qd(), S1(), P2(), lP()]);
  ((Kma = nt({
    pattern: Yht.fields.pattern.annotate({ description: "Regex pattern to search for in file contents" }),
    path: du
      .pipe(be)
      .annotate({ description: "Relative directory to search. Defaults to the active Location." }),
    include: Yht.fields.include.annotate({
      description: 'File glob to include in the search (for example, "*.js" or "*.{ts,tsx}")',
    }),
    limit: Yht.fields.limit.annotate({ description: "Maximum matches to return" }),
  })),
    (zma = On(Xse)),
    (Yma = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* ui.Service,
          r = yield* SV,
          s = yield* bm,
          a = yield* Cy;
        yield* e
          .register({
            [tyi]: jB({
              description:
                "Search file contents by regular expression within the active Location or an absolute managed tool-output file. Use a path to narrow the search, include to filter files by glob, and limit to bound the match count. Returns concise file resources, line numbers, and bounded line previews.",
              input: Kma,
              output: zma,
              toModelOutput: ({ output: H }) => [
                {
                  type: "text",
                  text: Qma(
                    H.map((u) => ({
                      ...u,
                      entry: { ...u.entry, path: the.resolve(s.directory, u.entry.path) },
                    })),
                  ),
                },
              ],
              execute: (H, u) =>
                ft(function* () {
                  yield* a.assert({
                    action: tyi,
                    resources: [H.pattern],
                    save: ["*"],
                    metadata: { root: ".", path: H.path, include: H.include, limit: H.limit },
                    sessionID: u.sessionID,
                    agent: u.agent,
                    source: { type: "tool", messageID: u.assistantMessageID, callID: u.toolCallID },
                  });
                  let f = the.resolve(s.directory, H.path ?? "."),
                    d = yield* t.stat(f).pipe($s(() => Jt(void 0)));
                  return yield* r
                    .grep({
                      cwd: d?.type === "Directory" ? f : the.dirname(f),
                      pattern: H.pattern,
                      file: d?.type === "File" ? the.basename(f) : void 0,
                      include: H.include,
                      limit: H.limit ?? Number.MAX_SAFE_INTEGER,
                    })
                    .pipe(
                      Vn((_) =>
                        _.map((L) =>
                          Xse.make({
                            ...L,
                            entry: xD.make({
                              ...L.entry,
                              path: du.make(
                                the.relative(
                                  s.directory,
                                  the.resolve(d?.type === "Directory" ? f : the.dirname(f), L.entry.path),
                                ),
                              ),
                            }),
                          }),
                        ),
                      ),
                    );
                }).pipe(Zo(() => new zp({ message: `Unable to grep for ${H.pattern}` }))),
            }),
          })
          .pipe(on);
      }),
    )),
    (Zma = Ua({ name: "tool/grep", layer: Yma, deps: [T8, ui.node, pxe, KS, aN] })));
});