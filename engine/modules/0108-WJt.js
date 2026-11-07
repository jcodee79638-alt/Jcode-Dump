
function WJt(e) {
  if (
    !NM(e) ||
    Object.keys(e).sort().join(",") !== "sessions,version" ||
    e.version !== 1 ||
    !Array.isArray(e.sessions) ||
    e.sessions.length > 256
  )
    throw Ap();
  let t = e.sessions.map((r) => {
    if (
      !NM(r) ||
      Object.keys(r).sort().join(",") !== "attachments,id" ||
      typeof r.id !== "string" ||
      !/^[A-Za-z0-9_-]{1,100}$/.test(r.id) ||
      !Array.isArray(r.attachments) ||
      r.attachments.length > 100 ||
      r.attachments.some((s) => typeof s !== "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(s)) ||
      new Set(r.attachments).size !== r.attachments.length
    )
      throw Ap();
    return { id: r.id, attachments: r.attachments };
  });
  if (
    new Set(t.map((r) => r.id)).size !== t.length ||
    Buffer.byteLength(JSON.stringify({ version: 1, sessions: t })) > 524288
  )
    throw Ap();
  return { version: 1, sessions: t };
}