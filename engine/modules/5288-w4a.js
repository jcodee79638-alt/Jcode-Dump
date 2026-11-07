
function w4a(e) {
  let t = /[?*[]/.exec(e);
  if (!t) return e;
  if (t.index === 0) return;
  return e.slice(0, t.index);
}