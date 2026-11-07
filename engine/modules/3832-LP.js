
async function LP({ text: e, schema: t }) {
  try {
    let r = ZIr(e);
    if (t == null) return { success: !0, value: r, rawValue: r };
    return await Ww({ value: r, schema: t });
  } catch (r) {
    return { success: !1, error: Jne.isInstance(r) ? r : new Jne({ text: e, cause: r }), rawValue: void 0 };
  }
}