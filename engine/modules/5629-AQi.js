
function AQi(e) {
  return e.state.status === "error" && e.state.metadata?.interrupted === !0;
}