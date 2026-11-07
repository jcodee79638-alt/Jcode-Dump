
function krH(e, t) {
  try {
    return new URL(e).host === t;
  } catch {
    return !1;
  }
}