
function fvt(e) {
  if (!e) return;
  let { providerExecuted: t, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}