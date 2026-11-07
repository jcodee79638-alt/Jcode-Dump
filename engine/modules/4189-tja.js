
function tja(e) {
  let t = e.statusCode;
  if (!t) return e.isRetryable;
  return t === 404 || e.isRetryable;
}