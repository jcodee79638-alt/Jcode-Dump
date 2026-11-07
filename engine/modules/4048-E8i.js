
function E8i(e) {
  return { type: "tool-result", toolCallId: e.toolCallId, toolName: e.toolName, output: cva(e.output) };
}