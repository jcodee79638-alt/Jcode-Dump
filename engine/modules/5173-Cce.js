
function Cce(e, t) {
  if (Buffer.byteLength(JSON.stringify(e)) <= t) return e;
  let r = `
[... omitted from compaction input; full content remains saved ...]
`,
    s = (u) =>
      e.slice(0, Math.ceil(u / 2)).replace(/[\uD800-\uDBFF]$/, "") +
      r +
      e.slice(e.length - Math.floor(u / 2)).replace(/^[\uDC00-\uDFFF]/, ""),
    a = 0,
    H = e.length;
  while (a < H) {
    let u = Math.ceil((a + H) / 2);
    if (Buffer.byteLength(JSON.stringify(s(u))) <= t) a = u;
    else H = u - 1;
  }
  return s(a);
}