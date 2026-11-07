
function V2s(e) {
  return KW((t) => t.trim() === t, {
    expected: "a string with no leading or trailing whitespace",
    meta: { _tag: "isTrimmed", regExp: new globalThis.RegExp(EAn) },
    arbitrary: { constraint: { patterns: [EAn] } },
    ...e,
  });
}