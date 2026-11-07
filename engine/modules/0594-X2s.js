
function X2s(e) {
  let t = tpe(e.order),
    r = e.formatter ?? af;
  return (s, a) =>
    KW((H) => t(H, s), {
      expected: `a value greater than ${r(s)}`,
      arbitrary: { constraint: { ordered: { order: e.order, minimum: s, exclusiveMinimum: !0 } } },
      ...e.annotate?.(s),
      ...a,
    });
}