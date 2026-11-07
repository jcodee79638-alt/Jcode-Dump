
var qjr = ne(() => {
  Gt();
  jA();
  sQe();
  qjr();
  pyA = nt({
    patchText: re.annotate({ description: "The full patch text that describes all changes to be made" }),
  });
  ((MJa = Ge("Patch.applyHunksToFiles")(function* (e) {
    if (e.length === 0) return yield* bn(Error("No files were modified."));
    let t = yield* ui.Service,
      r = [],
      s = [],
      a = [];
    for (let H of e)
      switch (H.type) {
        case "add": {
          (yield* t.writeWithDirs(H.path, H.contents), r.push(H.path), yield* fH(`Added file: ${H.path}`));
          break;
        }
        case "delete": {
          (yield* t.remove(H.path), a.push(H.path), yield* fH(`Deleted file: ${H.path}`));
          break;
        }
        case "update": {
          let u = yield* t.readFileString(H.path),
            f = Vjr(H.path, H.chunks, u);
          if (H.move_path)
            (yield* t.writeWithDirs(H.move_path, rO(f.content, f.bom)),
              yield* t.remove(H.path),
              s.push(H.move_path),
              yield* fH(`Moved file: ${H.path} -> ${H.move_path}`));
          else
            (yield* t.writeWithDirs(H.path, rO(f.content, f.bom)),
              s.push(H.path),
              yield* fH(`Updated file: ${H.path}`));
          break;
        }
      }
    return { added: r, modified: s, deleted: a };
  })),
    (dyA = Ge("Patch.applyPatch")(function* (e) {
      let { hunks: t } = cQe(e);
      return yield* MJa(t);
    })),
    (myA = Ge("Patch.maybeParseApplyPatchVerified")(function* (e, t) {
      if (e.length === 1)
        try {
          return (cQe(e[0]), { type: "CorrectnessError", error: Error("ImplicitInvocation") });
        } catch {}
      let r = EJa(e);
      switch (r.type) {
        case "Body": {
          let s = yield* ui.Service,
            a = r.args,
            H = a.workdir ? iwe.resolve(t, a.workdir) : t,
            u = new Map();
          for (let f of a.hunks) {
            let d = iwe.resolve(H, f.type === "update" && f.move_path ? f.move_path : f.path);
            switch (f.type) {
              case "add":
                u.set(d, { type: "add", content: f.contents });
                break;
              case "delete": {
                let _ = iwe.resolve(H, f.path),
                  L = yield* s.readFileString(_).pipe($s(() => Jt(void 0)));
                if (L === void 0)
                  return { type: "CorrectnessError", error: Error(`Failed to read file for deletion: ${_}`) };
                u.set(d, { type: "delete", content: L });
                break;
              }
              case "update": {
                let _ = iwe.resolve(H, f.path),
                  L = yield* s
                    .readFileString(_)
                    .pipe($s((I) => Jt(Error(`Failed to read file ${_}: ${I}`, { cause: I }))));
                if (L instanceof Error) return { type: "CorrectnessError", error: L };
                try {
                  let I = Vjr(_, f.chunks, L);
                  u.set(d, {
                    type: "update",
                    unified_diff: I.unified_diff,
                    move_path: f.move_path ? iwe.resolve(H, f.move_path) : void 0,
                    new_content: I.content,
                  });
                } catch (I) {
                  return { type: "CorrectnessError", error: I };
                }
                break;
              }
            }
          }
          return { type: "Body", action: { changes: u, patch: a.patch, cwd: H } };
        }
        case "PatchParseError":
          return { type: "CorrectnessError", error: r.error };
        case "NotApplyPatch":
          return { type: "NotApplyPatch" };
      }
    })));
});