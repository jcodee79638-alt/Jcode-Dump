
function WBi(e, t) {
  let r = P9a.includes(e.status) ? e.headers.get("location") : null;
  try {
    return r ? new URL(r, t) : void 0;
  } catch {
    return;
  }
}