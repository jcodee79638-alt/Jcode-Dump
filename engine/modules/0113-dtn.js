
async function dtn(e, t) {
  return ptn(e).then(
    (r) => !r.some((s) => s.sessionId === t),
    () => !1,
  );
}