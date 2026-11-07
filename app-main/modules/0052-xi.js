
function xi(e) {
  let t = j(e);
  return {
    id: M(t.id),
    sessionId: M(t.sessionID),
    permission: M(t.permission),
    patterns: jn(t.patterns).filter((n) => typeof n === "string"),
  };
}