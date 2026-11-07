
function rTr(e, t) {
  if (!e || typeof e !== "object" || Array.isArray(e)) return e;
  return Object.defineProperty(e, "_request_id", { value: t.headers.get("x-request-id"), enumerable: !1 });
}