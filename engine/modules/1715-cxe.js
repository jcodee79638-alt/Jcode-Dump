
function cxe(e, t) {
  return Object.fromEntries(Object.entries(e).filter(([r]) => !t.includes(r)));
}