
function Qbi(e, t, r, s) {
  if (!t.issues.length) {
    if (((e.value = t.value), t.memo)) e.memo = !0;
    return e;
  }
  return (
    (e.value = r.catchValue({
      ...t,
      value: e.value,
      error: { issues: t.issues.map((a) => hX(a, s, U8())) },
      input: e.value,
    })),
    e
  );
}