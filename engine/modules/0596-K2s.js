
function K2s(e) {
  let t = A2e(e.order),
    r = e.formatter ?? af;
  return (s, a) =>
    KW((H) => t(H, s), {
      expected: `a value less than or equal to ${r(s)}`,
      arbitrary: { constraint: { ordered: { order: e.order, maximum: s } } },
      ...e.annotate?.(s),
      ...a,
    });
}