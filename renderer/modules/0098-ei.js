
function ei(e, n) {
  if (!("sessionId" in n) || n.sessionId !== e.chat.id) return e;
  if (n.type === "message-hidden") return { ...e, messages: e.messages.filter((a) => a.id !== n.messageId) };
  if (n.type === "status")
    return {
      ...e,
      status: n.status,
      waitingForSlot: n.waitingForSlot === !0,
      retrying: n.retrying === !0,
      queuePosition: n.queuePosition,
    };
  if (n.type !== "message" && n.type !== "part" && n.type !== "delta") return e;
  if (n.type === "message") {
    const a = e.messages.some((c) => c.id === n.message.id);
    return {
      ...e,
      waitingForSlot: !1,
      retrying: !1,
      queuePosition: void 0,
      messages: a
        ? e.messages.map((c) =>
            c.id === n.message.id
              ? { ...n.message, parts: n.message.parts.length ? n.message.parts : c.parts }
              : c,
          )
        : [...e.messages, n.message],
    };
  }
  const i = e.messages.find((a) => a.id === n.messageId),
    s = i ?? { id: n.messageId, role: "assistant", createdAt: Date.now(), parts: [] },
    l =
      n.type === "part"
        ? {
            ...s,
            parts: s.parts.some((a) => a.id === n.part.id)
              ? s.parts.map((a) => (a.id === n.part.id ? n.part : a))
              : [...s.parts, n.part],
          }
        : {
            ...s,
            parts: s.parts.some((a) => a.id === n.partId)
              ? s.parts.map((a) =>
                  a.id === n.partId && a.type === "text" ? { ...a, text: (a.text ?? "") + n.text } : a,
                )
              : [...s.parts, { id: n.partId, type: "text", text: n.text }],
          };
  return {
    ...e,
    waitingForSlot: !1,
    retrying: !1,
    queuePosition: void 0,
    messages: i ? e.messages.map((a) => (a.id === l.id ? l : a)) : [...e.messages, l],
  };
}