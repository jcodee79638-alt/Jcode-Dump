
function MZi(e) {
  if (!e?.instance) throw Error("Worktree adapter requires an instance context");
  return e.instance;
}