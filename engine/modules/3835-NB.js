
async function NB({ provider: e, providerOptions: t, schema: r }) {
  if ((t == null ? void 0 : t[e]) == null) return;
  let s = await Ww({ value: t[e], schema: r });
  if (!s.success)
    throw new SAt({ argument: "providerOptions", message: `invalid ${e} provider options`, cause: s.error });
  return s.value;
}