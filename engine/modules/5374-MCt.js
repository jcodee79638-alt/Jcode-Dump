
var MCt = ne(async () => {
  Gt();
  eHe();
  P5i();
  Ql();
  Vce();
  jA();
  sQe();
  await Jn([Vy(), ek(), eN(), ime(), ZL(), P7()]);
  F5i = new Map();
  ((HXa = nt({
    filePath: re.annotate({ description: "The absolute path to the file to modify" }),
    oldString: re.annotate({ description: "The text to replace" }),
    newString: re.annotate({ description: "The text to replace it with (must be different from oldString)" }),
    replaceAll: be(Vi).annotate({ description: "Replace all occurrences of oldString (default false)" }),
  })),
    (Pjr = t_(
      "edit",
      ft(function* () {
        let e = yield* fR,
          t = yield* ui.Service,
          r = yield* _J,
          s = yield* B$;
        return {
          description: C5i,
          parameters: HXa,
          execute: (a, H) =>
            ft(function* () {
              if (!a.filePath) throw Error("filePath is required");
              if (a.oldString === a.newString)
                throw Error("No changes to apply: oldString and newString are identical.");
              let u = yield* Jc,
                f = Gce.isAbsolute(a.filePath) ? a.filePath : Gce.join(u.directory, a.filePath);
              yield* tk(H, f);
              let d = "",
                _ = "",
                L = "";
              yield* aXa(f).withPermits(1)(
                ft(function* () {
                  if (a.oldString === "") {
                    if (yield* t.existsSafe(f))
                      throw Error(
                        "oldString cannot be empty when editing an existing file. Provide the exact text to replace, or use write for an intentional full-file replacement.",
                      );
                    let Be = pR(a.newString),
                      Te = Be.bom;
                    if (
                      ((_ = ""),
                      (L = Be.text),
                      (d = Vee(Ow(f, f, _, L))),
                      yield* H.ask({
                        permission: "edit",
                        patterns: [Gce.relative(u.worktree, f)],
                        always: ["*"],
                        metadata: { filepath: f, diff: d },
                      }),
                      yield* t.writeWithDirs(f, rO(L, Te)),
                      yield* r.file(f))
                    )
                      L = yield* ZLe(t, f, Te);
                    (yield* s.publish(Zht.Edited, { file: f }),
                      yield* s.publish(Qse.Updated, { file: f, event: "add" }));
                    return;
                  }
                  let V = yield* t.stat(f).pipe($s(() => Jt(void 0)));
                  if (!V) throw Error(`File ${f} not found`);
                  if (V.type === "Directory") throw Error(`Path is a directory, not a file: ${f}`);
                  let q = yield* qce(t, f);
                  _ = q.text;
                  let Z = oXa(_),
                    se = N5i(nwe(a.oldString), Z),
                    ae = N5i(nwe(a.newString), Z),
                    z = pR(LXa(_, se, ae, a.replaceAll)),
                    Ae = q.bom || z.bom;
                  if (
                    ((L = z.text),
                    (d = Vee(Ow(f, f, nwe(_), nwe(L)))),
                    yield* H.ask({
                      permission: "edit",
                      patterns: [Gce.relative(u.worktree, f)],
                      always: ["*"],
                      metadata: { filepath: f, diff: d },
                    }),
                    yield* t.writeWithDirs(f, rO(L, Ae)),
                    yield* r.file(f))
                  )
                    L = yield* ZLe(t, f, Ae);
                  (yield* s.publish(Zht.Edited, { file: f }),
                    yield* s.publish(Qse.Updated, { file: f, event: "change" }),
                    (d = Vee(Ow(f, f, nwe(_), nwe(L)))));
                }).pipe(on),
              );
              let I = 0,
                D = 0;
              for (let V of SN(_, L)) {
                if (V.added) I += V.count || 0;
                if (V.removed) D += V.count || 0;
              }
              let S = { file: f, patch: d, additions: I, deletions: D };
              yield* H.metadata({ metadata: { diff: d, filediff: S, diagnostics: {} } });
              let T = "Edit applied successfully.";
              yield* e.touchFile(f, "document");
              let C = yield* e.diagnostics(),
                O = ui.normalizePath(f),
                B = YLe.report(f, C[O] ?? []);
              if (B)
                T += `

LSP errors detected in this file, please fix:
${B}`;
              return {
                metadata: { diagnostics: C, diff: d, filediff: S },
                title: `${Gce.relative(u.worktree, f)}`,
                output: T,
              };
            }),
        };
      }),
    )));
});