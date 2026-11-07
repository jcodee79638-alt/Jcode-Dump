
function Y6(e, t) {
  if (t instanceof roe && t.operation === e) return t;
  return new roe({ operation: e, message: t instanceof globalThis.Error ? t.message : String(t), cause: t });
}