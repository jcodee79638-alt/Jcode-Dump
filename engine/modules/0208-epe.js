
function epe(e) {
  return (t, r) => (t === r ? 0 : e(t, r));
}