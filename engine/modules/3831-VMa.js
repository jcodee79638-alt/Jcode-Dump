
async function VMa({ text: e, schema: t }) {
  try {
    let r = ZIr(e);
    if (t == null) return r;
    return w5e({ value: r, schema: t });
  } catch (r) {
    if (Jne.isInstance(r) || dy.isInstance(r)) throw r;
    throw new Jne({ text: e, cause: r });
  }
}