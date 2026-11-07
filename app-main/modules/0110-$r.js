
async function $r(e, t) {
  if (t === "restore" && e.confirmed !== !0) throw Error("Confirm restoration before continuing.");
  let n = await De(e.directory, e.path, !0),
    i = await Dr(n.root, n.relative);
  if (i.fingerprint !== e.fingerprint)
    throw Error("The file changed. Review its latest diff before continuing.");
  if (t === "stage" && i.canStage) {
    await Ge(n.root, ["add", "--", n.relative]);
    return;
  }
  if (t === "restore" && i.canRestore) {
    await Ge(n.root, ["restore", "--source=HEAD", "--staged", "--worktree", "--", n.relative]);
    return;
  }
  throw Error("This file cannot be changed from this review.");
}