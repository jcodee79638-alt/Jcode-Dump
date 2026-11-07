
var p$r = ne(async () => {
  CE();
  Gt();
  OH();
  BA();
  AP();
  ww();
  await Jn([p$r(), eN(), qd(), P2(), S1(), lP()]);
  ((Vma = nt({
    pattern: Jsr.fields.pattern.annotate({ description: "Glob pattern to match files against" }),
    path: du
      .pipe(be)
      .annotate({ description: "Relative directory to search. Defaults to the active Location." }),
    limit: Jsr.fields.limit.annotate({ description: "Maximum results to return" }),
  })),
    (qma = On(xD)),
    (Xma = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* SV,
          r = yield* bm,
          s = yield* Cy;
        yield* e
          .register({
            [ZDi]: jB({
              description:
                "Find files by glob pattern within the active Location. Returns concise relative file resources. Use a relative path to narrow the search and limit to bound the result count.",
              input: Vma,
              output: qma,
              toModelOutput: ({ output: a }) => [
                { type: "text", text: Gma(a.map((H) => ({ ...H, path: txt.resolve(r.directory, H.path) }))) },
              ],
              execute: (a, H) =>
                ft(function* () {
                  yield* s.assert({
                    action: ZDi,
                    resources: [a.pattern],
                    save: ["*"],
                    metadata: { root: a.path ?? ".", path: a.path, limit: a.limit },
                    sessionID: H.sessionID,
                    agent: H.agent,
                    source: { type: "tool", messageID: H.assistantMessageID, callID: H.toolCallID },
                  });
                  let u = txt.resolve(r.directory, a.path ?? ".");
                  return yield* t
                    .glob({ cwd: u, pattern: a.pattern, limit: a.limit ?? Number.MAX_SAFE_INTEGER })
                    .pipe(
                      Vn((f) =>
                        f.map((d) =>
                          xD.make({ ...d, path: du.make(txt.relative(r.directory, txt.resolve(u, d.path))) }),
                        ),
                      ),
                    );
                }).pipe(Zo(() => new zp({ message: `Unable to find files matching ${a.pattern}` }))),
            }),
          })
          .pipe(on);
      }),
    )),
    (Jma = Ua({ name: "tool/glob", layer: Xma, deps: [T8, pxe, KS, aN] })));
});
import the from "path";