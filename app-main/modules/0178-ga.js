
function ga(e) {
  return e === "x64" || e === "arm64" || e === "ia32" ? e : "unknown";
}