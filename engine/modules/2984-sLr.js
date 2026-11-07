
function sLr() {
  if (Ad.OPENCODE_GIT_BASH_PATH) return Ad.OPENCODE_GIT_BASH_PATH;
  let e = UH("git");
  if (!e) return;
  let t = Cqe.join(e, "..", "..", "bin", "bash.exe");
  if (mEi(t)?.size) return t;
}