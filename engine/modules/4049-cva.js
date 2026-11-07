
function cva(e) {
  if (e.type === "text" || e.type === "error-text") return { type: e.type, value: dje(e.value) };
  if (e.type === "json" || e.type === "error-json") return { type: e.type, value: e.value };
  if (e.type === "execution-denied")
    return { type: e.type, ...(e.reason === void 0 ? {} : { reason: dje(e.reason) }) };
  return { type: "content", value: e.value.map((t) => (t.type === "text" ? RDr(t.text) : WDr())) };
}