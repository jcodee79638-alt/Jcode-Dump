
function XFa(e, t) {
  if (!e.getServerCapabilities()?.prompts) return Promise.resolve([]);
  return sjt(
    (r) => e.listPrompts(r === void 0 ? void 0 : { cursor: r }, { timeout: t }),
    (r) => r.prompts,
  );
}