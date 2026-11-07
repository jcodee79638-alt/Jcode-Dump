
function zbi(e, t) {
  if (!e.issues.length && e.value === void 0)
    e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: t });
  return e;
}