
function J2s(e) {
  let t = u2e(e.order),
    r = e.formatter ?? af;
  return (s, a) =>
    KW((H) => t(H, s), {
      expected: `a value greater than or equal to ${r(s)}`,
      arbitrary: { constraint: { ordered: { order: e.order, minimum: s } } },
      ...e.annotate?.(s),
      ...a,
    });
}