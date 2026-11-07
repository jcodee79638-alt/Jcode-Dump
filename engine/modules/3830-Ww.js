
async function Ww({ value: e, schema: t, context: r }) {
  let s = Rw(t);
  try {
    if (s.validate == null) return { success: !0, value: e, rawValue: e };
    let a = await s.validate(e);
    if (a.success) return { success: !0, value: a.value, rawValue: e };
    return { success: !1, error: dy.wrap({ value: e, cause: a.error, context: r }), rawValue: e };
  } catch (a) {
    return { success: !1, error: dy.wrap({ value: e, cause: a, context: r }), rawValue: e };
  }
}