
function Sr() {
  let e = new Map(),
    t = new Set();
  return (n) => {
    let i = Q(n),
      r = i.payload ? Q(i.payload) : i,
      s = Q(r.properties),
      o = M(s.sessionID);
    if (r.type === "message.part.updated") {
      let l = Q(s.part);
      if (t.has(M(l.messageID))) {
        e.set(M(l.id), "hidden");
        return;
      }
      e.set(M(l.id), l.synthetic === !0 || l.ignored === !0 ? "hidden" : M(l.type));
      let u = ki(l);
      if (u) return { type: "part", sessionId: M(l.sessionID), messageId: M(l.messageID), part: u };
      return;
    }
    if (
      r.type === "message.part.delta" &&
      s.field === "text" &&
      !t.has(M(s.messageID)) &&
      e.get(M(s.partID)) === "text"
    )
      return {
        type: "delta",
        sessionId: o,
        messageId: M(s.messageID),
        partId: M(s.partID),
        text: M(s.delta),
      };
    if (r.type === "message.updated") {
      let l = Q(s.info);
      if (l.role === "assistant" && l.summary === !0)
        return (t.add(M(l.id)), { type: "message-hidden", sessionId: M(l.sessionID), messageId: M(l.id) });
      let u = $o({ info: s.info, parts: [] });
      if (u) return { type: "message", sessionId: M(Q(s.info).sessionID), message: u };
      return;
    }
    if (r.type === "session.status") return { type: "status", sessionId: o, ...Er(s.status) };
    if (r.type === "session.idle") return { type: "status", sessionId: o, status: "idle" };
    if (r.type === "session.error") return { type: "error", sessionId: o || void 0, message: xr(s.error) };
    if (r.type === "server.heartbeat" || r.type === "message.part.delta") return;
    return { type: "refresh", sessionId: o || void 0 };
  };
}