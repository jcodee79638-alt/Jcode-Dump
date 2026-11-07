
function l7(...e) {
  return e.reduce((t, r) => ({ ...t, ...r }), {});
}