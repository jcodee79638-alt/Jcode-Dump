
function NSt(e, t, r) {
  if (e.issues.some((s) => s.code !== "unrecognized_keys")) return ((e.aborted = !0), e);
  return t._zod.run({ value: e.value, issues: e.issues }, r);
}