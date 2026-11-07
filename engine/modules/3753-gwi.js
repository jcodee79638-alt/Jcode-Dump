
function gwi(e, t) {
  try {
    return new URL(e).origin === new URL(t).origin;
  } catch (r) {
    return !1;
  }
}