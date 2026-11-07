
function Q2s(e, t) {
  return (
    (e = Math.max(0, Math.floor(e))),
    KW((r) => r.length >= e, {
      expected: `a value with a length of at least ${e}`,
      meta: { _tag: "isMinLength", minLength: e },
      [Glt]: !0,
      arbitrary: { constraint: { minLength: e } },
      ...t,
    })
  );
}