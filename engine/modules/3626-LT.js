
function LT(e, t, r, s, a) {
  let H =
    typeof t.unrepresentable === "function"
      ? t.unrepresentable({ zodSchema: e, path: s.path, message: a })
      : t.unrepresentable;
  if (H === "any") return !1;
  if (H === void 0 || H === "throw") throw Error(a);
  return (Object.assign(r, H), !0);
}