
function z2s(e) {
  let t = u2e(e.order),
    r = tpe(e.order),
    s = A2e(e.order),
    a = ZAt(e.order),
    H = e.formatter ?? af;
  return (u, f) => {
    let d = u.exclusiveMinimum ? r : t,
      _ = u.exclusiveMaximum ? a : s;
    return KW((L) => d(L, u.minimum) && _(L, u.maximum), {
      expected: `a value between ${H(u.minimum)}${u.exclusiveMinimum ? " (excluded)" : ""} and ${H(u.maximum)}${u.exclusiveMaximum ? " (excluded)" : ""}`,
      arbitrary: {
        constraint: {
          ordered: {
            order: e.order,
            minimum: u.minimum,
            maximum: u.maximum,
            ...(u.exclusiveMinimum && { exclusiveMinimum: !0 }),
            ...(u.exclusiveMaximum && { exclusiveMaximum: !0 }),
          },
        },
      },
      ...e.annotate?.(u),
      ...f,
    });
  };
}