
function sTa({ messages: e }) {
  let t = e.at(-1);
  if ((t == null ? void 0 : t.role) != "tool") return { approvedToolApprovals: [], deniedToolApprovals: [] };
  let r = {};
  for (let d of e)
    if (d.role === "assistant" && typeof d.content !== "string") {
      let _ = d.content;
      for (let L of _) if (L.type === "tool-call") r[L.toolCallId] = L;
    }
  let s = {};
  for (let d of e)
    if (d.role === "assistant" && typeof d.content !== "string") {
      let _ = d.content;
      for (let L of _) if (L.type === "tool-approval-request") s[L.approvalId] = L;
    }
  let a = {};
  for (let d of t.content) if (d.type === "tool-result") a[d.toolCallId] = d;
  let H = [],
    u = [],
    f = t.content.filter((d) => d.type === "tool-approval-response");
  for (let d of f) {
    let _ = s[d.approvalId];
    if (_ == null) throw new Uxa({ approvalId: d.approvalId });
    if (a[_.toolCallId] != null) continue;
    let L = r[_.toolCallId];
    if (L == null) throw new t6i({ toolCallId: _.toolCallId, approvalId: _.approvalId });
    let I = { approvalRequest: _, approvalResponse: d, toolCall: L };
    if (d.approved) H.push(I);
    else u.push(I);
  }
  return { approvedToolApprovals: H, deniedToolApprovals: u };
}