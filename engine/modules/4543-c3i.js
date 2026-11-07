
function c3i(e) {
  if (typeof e === "string" || Array.isArray(e)) return e;
  let { [a3i]: t } = e;
  if (!t) throw Error(`${a3i} is not supported`);
  return t;
}