
function Me(e, t = Number.MAX_SAFE_INTEGER) {
  return typeof e === "number" && Number.isSafeInteger(e) && e >= 0 && e <= t;
}