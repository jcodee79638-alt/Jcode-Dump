
function MAt(e, t = Date.now()) {
  if (!e || e.length > 128) return;
  if (/^\d+(?:\.\d+)?$/.test(e)) {
    let s = Number(e);
    return Number.isFinite(s) ? Math.min(Math.ceil(s * 1000), 2147483647) : 2147483647;
  }
  if (!/^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(e)) return;
  let r = Date.parse(e) - t;
  return Number.isFinite(r) && r >= 0 ? Math.min(r, 2147483647) : void 0;
}