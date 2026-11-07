
function XLe(e, t) {
  if (ui.contains(t.directory, e)) return !0;
  if (t.worktree === "/") return !1;
  return ui.contains(t.worktree, e);
}