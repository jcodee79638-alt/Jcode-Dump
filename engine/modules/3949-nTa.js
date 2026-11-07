
function nTa({ error: e, exponentialBackoffDelay: t }) {
  let r = e.responseHeaders;
  if (!r) return t;
  let s,
    a = r["retry-after-ms"];
  if (a) {
    let u = parseFloat(a);
    if (!Number.isNaN(u)) s = u;
  }
  let H = r["retry-after"];
  if (H && s === void 0) {
    let u = parseFloat(H);
    if (!Number.isNaN(u)) s = u * 1000;
    else s = Date.parse(H) - Date.now();
  }
  if (s != null && !Number.isNaN(s) && 0 <= s && (s < 60000 || s < t)) return s;
  return t;
}