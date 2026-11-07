
function CnH(e, t) {
  return t.searchParams.get("directory") || e.headers["x-opencode-directory"] || process.cwd();
}