
function OAn(e, t, r, s) {
  return { arbitrary: r === void 0 || t.recursion === void 0 ? s : e.oneof(t.recursion, r, s), terminal: r };
}