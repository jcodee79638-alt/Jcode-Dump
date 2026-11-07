
function DAt(e) {
  if (typeof e !== "string" || e.length > 4096) return;
  try {
    let t = JSON.parse(e);
    if (
      !t ||
      typeof t !== "object" ||
      !("type" in t) ||
      t.type !== "error" ||
      !("error" in t) ||
      !t.error ||
      typeof t.error !== "object"
    )
      return;
    if (!("recovery" in t.error) || t.error.recovery !== "settled-continuation" || !("code" in t.error))
      return;
    if (t.error.code === "response_interrupted" || t.error.code === "response_incomplete")
      return t.error.code;
  } catch {}
}