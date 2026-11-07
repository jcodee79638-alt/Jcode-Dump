
function J9a(e, t) {
  let [r, s] = [e, t];
  try {
    [r, s] = [new URL(e).href, new URL(t).href];
  } catch {}
  return r === s || (r.endsWith("/") && r.slice(0, -1) === s) || (s.endsWith("/") && s.slice(0, -1) === r);
}