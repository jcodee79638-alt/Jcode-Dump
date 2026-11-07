
function G(e, t, n = !1) {
  let i = _(j(e === void 0 && n ? {} : e), t);
  if (
    (Object.getPrototypeOf(i) !== Object.prototype && Object.getPrototypeOf(i) !== null) ||
    Reflect.ownKeys(i).some((r) => typeof r !== "string" || !t.includes(r))
  )
    throw Error("Invalid request.");
  return i;
}