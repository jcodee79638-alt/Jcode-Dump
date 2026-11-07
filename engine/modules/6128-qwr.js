
function qwr(e) {
  if (!e || typeof e !== "object" || Array.isArray(e)) throw new Sc("unavailable");
  let t = e;
  if (
    typeof t.id !== "string" ||
    !t.id ||
    t.id.length > 200 ||
    typeof t.text !== "string" ||
    t.text.trim() !== t.text ||
    !t.text.length ||
    t.text.length > 2000 ||
    /[\u0000-\u0008\u000b-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/.test(t.text) ||
    typeof t.createdAt !== "number" ||
    !Number.isSafeInteger(t.createdAt) ||
    t.createdAt < 0 ||
    typeof t.expiresAt !== "number" ||
    !Number.isSafeInteger(t.expiresAt) ||
    t.expiresAt <= t.createdAt
  )
    throw new Sc("unavailable");
  return { id: t.id, text: t.text, createdAt: t.createdAt, expiresAt: t.expiresAt };
}