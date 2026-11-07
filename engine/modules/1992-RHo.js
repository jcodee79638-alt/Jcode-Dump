
function RHo(e) {
  let t = o$t(e);
  if (!t)
    throw new Ivn({
      repository: e,
      message: "Repository must be a git URL, host/path reference, or GitHub owner/repo shorthand",
    });
  if (!xvn(t)) throw new Dvn({ repository: e, message: "Local file repositories are not supported" });
  return t;
}