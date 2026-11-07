
async function KIr(e) {
  var t;
  try {
    await ((t = e.body) == null ? void 0 : t.cancel());
  } catch (r) {}
}