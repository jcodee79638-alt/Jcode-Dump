
function oja(e, t) {
  if (!t || e.length <= t) return e;
  let r = e.length - t;
  return `${e.slice(0, t)}
[Tool output truncated for compaction: omitted ${r} chars]`;
}