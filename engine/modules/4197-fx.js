
function fx(e) {
  if (e instanceof Error) {
    if (e.message) return e.message;
    if (e.name) return e.name;
  }
  if (ux(e) && typeof e.message === "string" && e.message) return e.message;
  if (ux(e) && ux(e.data) && typeof e.data.message === "string" && e.data.message) return e.data.message;
  let t = String(e);
  if (t && t !== "[object Object]") return t;
  let r = AXe(e);
  if (r) return r;
  return "unknown error";
}