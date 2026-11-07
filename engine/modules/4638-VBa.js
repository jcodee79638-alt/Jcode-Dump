
function VBa(e, t) {
  let r = e.indexOf(t);
  if (r !== -1) return [e.substring(0, r), t, e.substring(r + t.length)];
  return [e, "", ""];
}