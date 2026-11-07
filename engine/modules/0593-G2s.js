
function G2s(e) {
  return KW((t) => globalThis.Number.isFinite(t), {
    expected: "a finite number",
    meta: { _tag: "isFinite" },
    arbitrary: { constraint: { noInfinity: !0, noNaN: !0 } },
    ...e,
  });
}