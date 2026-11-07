
function Dbr(e, t) {
  return (
    (e.currentReasoningID = t ?? e.currentReasoningID ?? `reasoning-${e.reasoning++}`),
    e.currentReasoningID
  );
}