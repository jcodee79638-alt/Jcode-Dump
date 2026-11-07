
function VTt(e) {
  if (typeof e !== "string") {
    if (e.specificationVersion !== "v3" && e.specificationVersion !== "v2") {
      let t = e;
      throw new ASa({ version: t.specificationVersion, provider: t.provider, modelId: t.modelId });
    }
    return DSa(e);
  }
  return MSa().languageModel(e);
}