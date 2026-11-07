
function Blt(e, t) {
  let r = e.source;
  return QQt((s) => e.test(s), {
    expected: `a string matching the RegExp ${r}`,
    meta: { _tag: "isPattern", regExp: e },
    arbitrary: { constraint: { patterns: [e.source] } },
    ...t,
  });
}