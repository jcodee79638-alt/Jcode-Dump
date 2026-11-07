
var u$r = ne(async () => {
  CE();
  txe();
  eHe();
  Gt();
  OH();
  Axe();
  jA();
  A$r();
  AP();
  ww();
  await Jn([u$r(), Yse(), S1(), lP()]);
  ((Mma = nt({
    patchText: re.annotate({
      description: "The full patch text describing add, update, and delete operations",
    }),
  })),
    (xma = nt({ type: Jo(["add", "update", "delete"]), resource: re, target: re })),
    (Sma = nt({ applied: On(xma), files: On(Xde) })),
    (vma = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* kY,
          r = yield* Zde,
          s = yield* ui.Service,
          a = yield* Cy;
        yield* e
          .register({
            [yma]: jLr(
              jB({
                description:
                  "Apply one patch containing add, update, and delete file operations. All targets are resolved and approved before target contents are read. Operations apply sequentially; if a later operation fails, earlier operations remain applied and the failure reports them explicitly. Moves and atomic rollback are not supported yet.",
                input: Mma,
                output: Sma,
                toModelOutput: ({ output: H }) => [{ type: "text", text: Tma(H) }],
                execute: (H, u) => {
                  let f = [],
                    d = (_) => {
                      let L =
                        f.length === 0
                          ? `Unable to apply patch at ${_}`
                          : `Patch partially applied before failing at ${_}. Applied: ${f.map((I) => I.resource).join(", ")}`;
                      return new zp({ message: L });
                    };
                  return ft(function* () {
                    let _ = { type: "tool", messageID: u.assistantMessageID, callID: u.toolCallID };
                    if (!H.patchText.trim()) return yield* new zp({ message: "patchText is required" });
                    let L = yield* ZA({
                      try: () => pma(H.patchText),
                      catch: (O) => new zp({ message: `apply_patch verification failed: ${String(O)}` }),
                    });
                    if (L.length === 0) return yield* new zp({ message: "patch rejected: empty patch" });
                    if (L.find((O) => O.type === "update" && O.movePath !== void 0))
                      return yield* new zp({ message: "apply_patch moves are not supported yet" });
                    let D = [];
                    for (let O of L)
                      D.push({ hunk: O, target: yield* t.resolve({ path: O.path, kind: "file" }) });
                    let S = new Map();
                    for (let { target: O } of D) {
                      let B = O.externalDirectory;
                      if (B) S.set(B.resource, B);
                    }
                    for (let O of S.values())
                      yield* a.assert({ ...zWe(O), sessionID: u.sessionID, agent: u.agent, source: _ });
                    yield* a.assert({
                      action: "edit",
                      resources: [...new Set(D.map(({ target: O }) => O.resource))],
                      save: ["*"],
                      sessionID: u.sessionID,
                      agent: u.agent,
                      source: _,
                    });
                    let T = [];
                    for (let { hunk: O, target: B } of D)
                      yield* ft(function* () {
                        if (O.type === "add") {
                          T.push({
                            ...O,
                            target: B,
                            before: "",
                            after:
                              O.contents.endsWith(`
`) || O.contents === ""
                                ? O.contents
                                : `${O.contents}
`,
                          });
                          return;
                        }
                        if ((yield* s.stat(B.canonical)).type !== "File") yield* d(O.path);
                        let V = yield* s.readFile(B.canonical),
                          q = new TextDecoder("utf-8", { ignoreBOM: !0 }).decode(V),
                          Z = q.replace(/^\uFEFF/, "");
                        if (O.type === "delete") {
                          T.push({ ...O, target: B, before: Z, after: "" });
                          return;
                        }
                        let se = dma(O.path, O.chunks, q);
                        T.push({
                          ...O,
                          target: B,
                          source: V,
                          content: mma(se.content, se.bom),
                          before: Z,
                          after: se.content,
                        });
                      }).pipe(Zo(() => d(O.path)));
                    let C = T.map(jma);
                    return (
                      yield* ja(
                        T,
                        (O) =>
                          ft(function* () {
                            if (O.type === "add") {
                              let V = yield* r.create({
                                target: O.target,
                                content:
                                  O.contents.endsWith(`
`) || O.contents === ""
                                    ? O.contents
                                    : `${O.contents}
`,
                              });
                              f.push({ type: O.type, resource: V.resource, target: V.target });
                              return;
                            }
                            if (O.type === "delete") {
                              let V = yield* r.remove({ target: O.target });
                              f.push({ type: O.type, resource: V.resource, target: V.target });
                              return;
                            }
                            let B = yield* r.writeIfUnchanged({
                              target: O.target,
                              expected: O.source,
                              content: O.content,
                            });
                            f.push({ type: O.type, resource: B.resource, target: B.target });
                          }).pipe(Zo(() => d(O.path))),
                        { discard: !0 },
                      ),
                      { applied: f, files: C }
                    );
                  }).pipe(Zo((_) => (_ instanceof zp ? _ : d("patch"))));
                },
              }),
              "edit",
            ),
          })
          .pipe(on);
      }),
    )),
    (bma = Ua({ name: "tool/apply-patch", layer: vma, deps: [T8, Ixe, Fht, ui.node, aN] })));
});