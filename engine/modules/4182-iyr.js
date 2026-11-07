
function iyr(e) {
  if (!e || typeof e !== "object") return !1;
  if ("code" in e && e.code === "ENOENT") return !0;
  if ("reason" in e && e.reason && typeof e.reason === "object" && "_tag" in e.reason)
    return e.reason._tag === "NotFound";
  return !1;
}