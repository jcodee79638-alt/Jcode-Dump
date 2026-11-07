
function Gen(e) {
  let t = e.headers.get("retry-after");
  return new Sc("throttled", t && /^\d{1,5}$/.test(t) ? Math.min(3600, Math.max(1, Number(t))) : 60);
}