
var exe = ne(() => {
  exe();
  Gt();
  Hu();
  Hu();
  SY();
  ((QQs = nt({
    path: du,
    status: Jo(["added", "modified", "deleted"]),
    additions: Ko,
    deletions: Ko,
    patch: re,
  }).annotate({ identifier: "File.Diff" })),
    (tht = nt({
      messageID: wf,
      partID: re.pipe(Gn),
      snapshot: re.pipe(Gn),
      diff: re.pipe(Gn),
      files: On(QQs).pipe(Gn),
    }).annotate({ identifier: "Revert.State" })));
});