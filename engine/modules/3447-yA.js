
function yA(e) {
  let t = e;
  if (!t) return {};
  if (typeof t === "string") return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  if ((delete t.message, typeof t.error === "string")) return { ...t, error: () => t.error };
  return t;
}