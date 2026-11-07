
function Gdt(
  { selection: e, isFirst: t, parseJson: r, parseJsonIfString: s, rootJsonMappers: a, arrayModeRoot: H },
  u,
) {
  return (f) => {
    if (t && !f[0]) return f[0];
    return H ? sqs(t ? f[0] : f, t, e, u, r, s) : E3e(t ? f[0] : f, t, e, u, r, s, a);
  };
}