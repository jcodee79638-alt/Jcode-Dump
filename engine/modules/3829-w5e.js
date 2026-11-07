
async function w5e({ value: e, schema: t, context: r }) {
  let s = await Ww({ value: e, schema: t, context: r });
  if (!s.success) throw dy.wrap({ value: e, cause: s.error, context: r });
  return s.value;
}