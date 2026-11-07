
var qXi = ne(async () => {
  Gt();
  Ql();
  qjr();
  eHe();
  Vce();
  jA();
  WXi();
  sQe();
  await Jn([Vy(), ZL(), ime(), MCt(), ek(), eN(), P7()]);
  ((SJa = nt({
    patchText: re.annotate({ description: "The full patch text that describes all changes to be made" }),
  })),
    (Gjr = t_(
      "apply_patch",
      ft(function* () {
        let e = yield* fR,
          t = yield* ui.Service,
          r = yield* _J,
          s = yield* B$,
          a = Ge("ApplyPatchTool.execute")(function* (H, u) {
            if (!H.patchText) return yield* bn(Error("patchText is required"));
            let f;
            try {
              f = cQe(H.patchText).hunks;
            } catch (B) {
              return yield* bn(Error(`apply_patch verification failed: ${B}`));
            }
            if (f.length === 0) {
              if (
                H.patchText
                  .replace(
                    /\r\n/g,
                    `
`,
                  )
                  .replace(
                    /\r/g,
                    `
`,
                  )
                  .trim() ===
                `*** Begin Patch
*** End Patch`
              )
                return yield* bn(Error("patch rejected: empty patch"));
              return yield* bn(Error("apply_patch verification failed: no hunks found"));
            }
            let d = yield* Jc,
              _ = [],
              L = "";
            for (let B of f) {
              let V = LJ.resolve(d.directory, B.path);
              switch ((yield* tk(u, V), B.type)) {
                case "add": {
                  let Z =
                      B.contents.length === 0 ||
                      B.contents.endsWith(`
`)
                        ? B.contents
                        : `${B.contents}
`,
                    se = pR(Z),
                    ae = Vee(Ow(V, V, "", se.text)),
                    z = 0,
                    Ae = 0;
                  for (let le of SN("", se.text)) {
                    if (le.added) z += le.count || 0;
                    if (le.removed) Ae += le.count || 0;
                  }
                  (_.push({
                    filePath: V,
                    oldContent: "",
                    newContent: se.text,
                    type: "add",
                    diff: ae,
                    additions: z,
                    deletions: Ae,
                    bom: se.bom,
                  }),
                    (L +=
                      ae +
                      `
`));
                  break;
                }
                case "update": {
                  let q = yield* t.stat(V).pipe($s(() => Jt(void 0)));
                  if (!q || q.type === "Directory")
                    return yield* bn(
                      Error(`apply_patch verification failed: Failed to read file to update: ${V}`),
                    );
                  let Z = yield* qce(t, V),
                    se = Z.text,
                    ae = se,
                    z = Z.bom;
                  try {
                    let Lt = Vjr(V, B.chunks, rO(Z.text, Z.bom));
                    ((ae = Lt.content), (z = Lt.bom));
                  } catch (Lt) {
                    return yield* bn(Error(`apply_patch verification failed: ${Lt}`));
                  }
                  let Ae = Vee(Ow(V, V, se, ae)),
                    le = 0,
                    Be = 0;
                  for (let Lt of SN(se, ae)) {
                    if (Lt.added) le += Lt.count || 0;
                    if (Lt.removed) Be += Lt.count || 0;
                  }
                  let Te = B.move_path ? LJ.resolve(d.directory, B.move_path) : void 0;
                  (yield* tk(u, Te),
                    _.push({
                      filePath: V,
                      oldContent: se,
                      newContent: ae,
                      type: B.move_path ? "move" : "update",
                      movePath: Te,
                      diff: Ae,
                      additions: le,
                      deletions: Be,
                      bom: z,
                    }),
                    (L +=
                      Ae +
                      `
`));
                  break;
                }
                case "delete": {
                  let q = yield* qce(t, V).pipe(
                      $s((z) =>
                        bn(
                          Error(
                            `apply_patch verification failed: ${z instanceof Error ? z.message : String(z)}`,
                          ),
                        ),
                      ),
                    ),
                    Z = q.text,
                    se = Vee(Ow(V, V, Z, "")),
                    ae = Z.split(`
`).length;
                  (_.push({
                    filePath: V,
                    oldContent: Z,
                    newContent: "",
                    type: "delete",
                    diff: se,
                    additions: 0,
                    deletions: ae,
                    bom: q.bom,
                  }),
                    (L +=
                      se +
                      `
`));
                  break;
                }
              }
            }
            let I = _.map((B) => ({
                filePath: B.filePath,
                relativePath: LJ.relative(d.worktree, B.movePath ?? B.filePath).replaceAll("\\", "/"),
                type: B.type,
                patch: B.diff,
                additions: B.additions,
                deletions: B.deletions,
                ...(B.movePath ? { movePath: B.movePath } : {}),
              })),
              D = _.map((B) => LJ.relative(d.worktree, B.filePath).replaceAll("\\", "/"));
            yield* u.ask({
              permission: "edit",
              patterns: D,
              always: ["*"],
              metadata: { filepath: D.join(", "), diff: L, files: I },
            });
            let S = [];
            for (let B of _) {
              let V = B.type === "delete" ? void 0 : (B.movePath ?? B.filePath);
              switch (B.type) {
                case "add":
                  (yield* t.writeWithDirs(B.filePath, rO(B.newContent, B.bom)),
                    S.push({ file: B.filePath, event: "add" }));
                  break;
                case "update":
                  (yield* t.writeWithDirs(B.filePath, rO(B.newContent, B.bom)),
                    S.push({ file: B.filePath, event: "change" }));
                  break;
                case "move":
                  if (B.movePath)
                    (yield* t.writeWithDirs(B.movePath, rO(B.newContent, B.bom)),
                      yield* t.remove(B.filePath),
                      S.push({ file: B.filePath, event: "unlink" }),
                      S.push({ file: B.movePath, event: "add" }));
                  break;
                case "delete":
                  (yield* t.remove(B.filePath), S.push({ file: B.filePath, event: "unlink" }));
                  break;
              }
              if (V) {
                if (yield* r.file(V)) yield* ZLe(t, V, B.bom);
                yield* s.publish(Zht.Edited, { file: V });
              }
            }
            for (let B of S) yield* s.publish(Qse.Updated, B);
            for (let B of _) {
              if (B.type === "delete") continue;
              let V = B.movePath ?? B.filePath;
              yield* e.touchFile(V, "document");
            }
            let T = yield* e.diagnostics(),
              O = `Success. Updated the following files:
${_.map((B) => {
  if (B.type === "add") return `A ${LJ.relative(d.worktree, B.filePath).replaceAll("\\", "/")}`;
  if (B.type === "delete") return `D ${LJ.relative(d.worktree, B.filePath).replaceAll("\\", "/")}`;
  let V = B.movePath ?? B.filePath;
  return `M ${LJ.relative(d.worktree, V).replaceAll("\\", "/")}`;
}).join(`
`)}`;
            for (let B of _) {
              if (B.type === "delete") continue;
              let V = B.movePath ?? B.filePath,
                q = YLe.report(V, T[ui.normalizePath(V)] ?? []);
              if (!q) continue;
              let Z = LJ.relative(d.worktree, V).replaceAll("\\", "/");
              O += `

LSP errors detected in ${Z}, please fix:
${q}`;
            }
            return { title: O, metadata: { diff: L, files: I, diagnostics: T }, output: O };
          });
        return { description: VXi, parameters: SJa, execute: (H, u) => a(H, u).pipe(on) };
      }),
    )));
});