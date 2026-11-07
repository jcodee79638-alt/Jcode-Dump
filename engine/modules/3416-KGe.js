
async function KGe() {
  if (mX.value && Date.now() - mX.at < 5000) return structuredClone(mX.value);
  let e = await pvi.read();
  if (e === null || e === void 0) return ((mX.value = {}), (mX.at = Date.now()), {});
  if (typeof e !== "object" || Array.isArray(e)) throw Error("Protected MCP configuration is unavailable.");
  return ((mX.value = e), (mX.at = Date.now()), structuredClone(mX.value));
}