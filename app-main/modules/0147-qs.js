
function qs(e, t, n) {
  let i =
      t?.chat.id === e.sessionId && t.chat.directory.toLowerCase() === e.directory.toLowerCase() ? t : void 0,
    r =
      i?.permissions.length || i?.questions.length
        ? "needs_attention"
        : i?.status === "busy"
          ? "running"
          : e.state === "completed"
            ? "finished"
            : e.state !== "running"
              ? "interrupted"
              : "unknown",
    s = i?.messages.filter((l) => l.role === "assistant" && l.createdAt >= e.startedAt).at(-1)?.error,
    o = ["refresh"];
  if (r === "needs_attention") o.push("answer");
  if (s && /sign in|sign-in|password/i.test(s)) o.push("sign_in");
  if (s && /allowance|reset|token|account.*maximum|active requests/i.test(s)) o.push("usage");
  if (s && /requires an update|update automatically/i.test(s)) o.push("update");
  if (
    r === "interrupted" &&
    i?.status === "idle" &&
    n.state === "connected" &&
    !o.some((l) => l === "sign_in" || l === "usage" || l === "update")
  )
    o.push("continue");
  return (
    o.push("support"),
    { task: e, ...(i ? { chat: i } : {}), connection: { ...n }, outcome: r, actions: o }
  );
}