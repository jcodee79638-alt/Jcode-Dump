
function pYa(e) {
  let t = e.replace(/\s/g, ""),
    r = t.endsWith("==") ? 2 : t.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((t.length * 3) / 4) - r);
}