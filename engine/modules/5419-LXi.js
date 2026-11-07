
var LXi = ne(async () => {
  Gt();
  Gt();
  eHe();
  _Xi();
  jA();
  Ql();
  Vce();
  sQe();
  await Jn([Vy(), ek(), ZL(), eN(), ime(), P7(), MCt()]);
  ((YXa = nt({
    content: re.annotate({ description: "The content to write to the file" }),
    filePath: re.annotate({
      description: "The absolute path to the file to write (must be absolute, not relative)",
    }),
  })),
    (Njr = t_(
      "write",
      ft(function* () {
        let e = yield* fR,
          t = yield* ui.Service,
          r = yield* B$,
          s = yield* _J;
        return {
          description: hXi,
          parameters: YXa,
          execute: (a, H) =>
            ft(function* () {
              let u = yield* Jc,
                f = e$e.isAbsolute(a.filePath) ? a.filePath : e$e.join(u.directory, a.filePath);
              yield* tk(H, f);
              let d = yield* t.existsSafe(f),
                _ = d ? yield* qce(t, f) : { bom: !1, text: "" },
                L = pR(a.content),
                I = _.bom || L.bom,
                D = _.text,
                S = L.text,
                T = Vee(Ow(f, f, D, S));
              if (
                (yield* H.ask({
                  permission: "edit",
                  patterns: [e$e.relative(u.worktree, f)],
                  always: ["*"],
                  metadata: { filepath: f, diff: T },
                }),
                yield* t.writeWithDirs(f, rO(S, I)),
                yield* s.file(f))
              )
                yield* ZLe(t, f, I);
              (yield* r.publish(Zht.Edited, { file: f }),
                yield* r.publish(Qse.Updated, { file: f, event: d ? "change" : "add" }));
              let C = "Wrote file successfully.";
              yield* e.touchFile(f, "document");
              let O = yield* e.diagnostics(),
                B = ui.normalizePath(f),
                V = 0;
              for (let [q, Z] of Object.entries(O)) {
                let se = q === B;
                if (!se && V >= QXa) continue;
                let ae = YLe.report(se ? f : q, Z);
                if (!ae) continue;
                if (se) {
                  C += `

LSP errors detected in this file, please fix:
${ae}`;
                  continue;
                }
                (V++,
                  (C += `

LSP errors detected in other files:
${ae}`));
              }
              return {
                title: e$e.relative(u.worktree, f),
                metadata: { diagnostics: O, filepath: f, exists: d },
                output: C,
              };
            }).pipe(on),
        };
      }),
    )));
});