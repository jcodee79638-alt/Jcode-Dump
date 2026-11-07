
function ARe(e) {
  return KW((t) => globalThis.Number.isSafeInteger(t), {
    expected: "an integer",
    meta: { _tag: "isInt" },
    arbitrary: { constraint: { integer: !0 } },
    ...e,
  });
}