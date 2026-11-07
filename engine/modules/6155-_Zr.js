
function _Zr(e) {
  if (!Array.isArray(e) || e.length > 10) throw Error("Account information is unavailable. Try again.");
  let t = e.map((r) => {
    if (
      !r ||
      typeof r !== "object" ||
      typeof r.id !== "string" ||
      !r.id ||
      r.id.length > 200 ||
      typeof r.text !== "string" ||
      !r.text.trim() ||
      r.text.length > 2000 ||
      /[\u0000-\u0008\u000b-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/.test(r.text) ||
      !Number.isSafeInteger(r.createdAt) ||
      r.createdAt < 0 ||
      !Number.isSafeInteger(r.expiresAt) ||
      r.expiresAt <= r.createdAt
    )
      throw Error("Account information is unavailable. Try again.");
    return { id: r.id, text: r.text, createdAt: r.createdAt, expiresAt: r.expiresAt };
  });
  if (new Set(t.map((r) => r.id)).size !== t.length)
    throw Error("Account information is unavailable. Try again.");
  return t;
}
CFe();
Gfe();