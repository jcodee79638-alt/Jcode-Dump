
function at(e, t) {
  return process.platform === "win32" ? e.toLowerCase() === t.toLowerCase() : e === t;
}