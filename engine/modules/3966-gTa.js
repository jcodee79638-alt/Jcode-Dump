
function gTa(...e) {
  let t = e.filter((s) => s != null);
  if (t.length === 0) return;
  if (t.length === 1) return t[0];
  let r = new AbortController();
  for (let s of t) {
    if (s.aborted) return (r.abort(s.reason), r.signal);
    s.addEventListener(
      "abort",
      () => {
        r.abort(s.reason);
      },
      { once: !0 },
    );
  }
  return r.signal;
}