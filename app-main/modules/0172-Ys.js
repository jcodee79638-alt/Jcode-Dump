
function Ys(e) {
  if (
    !Xn(e) ||
    (e.model !== void 0 && e.model !== "jaccoder-5.5" && e.model !== "jcoder-5.6") ||
    !Ut(e.sessionId, 256) ||
    !/^[A-Za-z0-9_.-]+$/.test(e.sessionId) ||
    !Ut(e.directory, 4096) ||
    !Ae.default.isAbsolute(e.directory) ||
    !Ut(e.text, 200000) ||
    !Array.isArray(e.attachments) ||
    e.attachments.length > 10 ||
    (!e.text.trim() && !e.attachments.length) ||
    !["off", "low", "high", "xhigh"].includes(String(e.thinking)) ||
    !["read", "ask", "full"].includes(String(e.accessMode))
  )
    return !1;
  return e.attachments.every(
    (t) =>
      Xn(t) &&
      Object.keys(t).every((n) => ["id", "filename", "mime", "size"].includes(n)) &&
      Ut(t.id, 256) &&
      /^[A-Za-z0-9_.-]+$/.test(t.id) &&
      Ut(t.filename, 260) &&
      Ut(t.mime, 150) &&
      Number.isSafeInteger(t.size) &&
      Number(t.size) >= 0 &&
      Number(t.size) <= 1e7,
  );
}