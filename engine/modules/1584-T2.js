
var T2 = ne(() => {
  T2();
  Gt();
  g_();
  Hu();
  YRe();
  ((S2 = eY),
    (_ir = ri("git").annotate({ identifier: "Project.Vcs" })),
    (hir = nt({ url: Gn(re), override: Gn(re), color: Gn(re) }).annotate({ identifier: "Project.Icon" })),
    (Lir = nt({
      start: Gn(
        re.annotate({ description: "Startup script to run when creating a new workspace (worktree)" }),
      ),
    }).annotate({ identifier: "Project.Commands" })),
    (UQs = nt({ created: Ko, updated: Ko, initialized: Gn(Ko) }).annotate({ identifier: "Project.Time" })),
    (GDn = nt({
      id: S2,
      worktree: re,
      vcs: Gn(_ir),
      name: Gn(re),
      icon: Gn(hir),
      commands: Gn(Lir),
      time: UQs,
      sandboxes: On(re),
    }).annotate({ identifier: "Project" })),
    (qDn = ua({ type: "project.updated", schema: GDn.fields })),
    (XDn = { Updated: qDn, Definitions: jl(qDn) }));
});