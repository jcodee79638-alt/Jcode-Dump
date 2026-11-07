
async function H4i(e) {
  let t = await Bun.file(e)
    .json()
    .catch(() => {
      return;
    });
  return VVa(t && typeof t === "object" && !Array.isArray(t) ? t.jac_thinking_v24 : void 0);
}