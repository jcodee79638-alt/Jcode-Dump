
async function khe({ name: e, tracer: t, attributes: r, fn: s, endWhenDone: a = !0 }) {
  return t.startActiveSpan(e, { attributes: await r }, async (H) => {
    let u = Aje.context.active();
    try {
      let f = await Aje.context.with(u, () => s(H));
      if (a) H.end();
      return f;
    } catch (f) {
      try {
        F6i(H, f);
      } finally {
        H.end();
      }
      throw f;
    }
  });
}