
function KFa(e, t) {
  if (!e.getServerCapabilities()?.resources) return Promise.resolve([]);
  return sjt(
    (r) => e.listResourceTemplates(r === void 0 ? void 0 : { cursor: r }, { timeout: t }),
    (r) => r.resourceTemplates,
  );
}