
function k6(e, t) {
  let r = JSON.stringify(e);
  return KW((s) => s.startsWith(e), {
    expected: `a string starting with ${r}`,
    meta: { _tag: "isStartsWith", startsWith: e, regExp: new globalThis.RegExp(`^${e}`) },
    arbitrary: { constraint: { patterns: [`^${e}`] } },
    ...t,
  });
}