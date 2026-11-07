
function mvt(e, t) {
  let r = t.project.vcs ? fXe.join(t.worktree, ".opencode", "plans") : fXe.join(uH.data, "plans");
  return fXe.join(r, [e.time.created, e.slug].join("-") + ".md");
}