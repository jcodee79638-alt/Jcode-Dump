
function Tvn(e) {
  let t = process.env.OPENCODE_REPO_CLONE_GITHUB_BASE_URL;
  if (!t) return `https://github.com/${e}.git`;
  return new URL(`${e}.git`, KHo(t)).href;
}