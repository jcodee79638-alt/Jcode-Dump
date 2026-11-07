
function C5e(e) {
  if (e == null) return "unknown error";
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  return JSON.stringify(e);
}