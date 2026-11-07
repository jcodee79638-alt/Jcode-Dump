
function he(e) {
  return process.platform === "win32" ? L.default.resolve(e).toLowerCase() : L.default.resolve(e);
}