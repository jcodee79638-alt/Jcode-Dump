
function gJa(e) {
  let t = e.match(/^(?:cat\s+)?<<['"]?(\w+)['"]?\s*\n([\s\S]*?)\n\1\s*$/);
  if (t) return t[2];
  return e;
}