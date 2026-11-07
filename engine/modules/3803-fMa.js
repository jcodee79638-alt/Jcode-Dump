
function fMa(e, t) {
  if (t.mapStrategy === "record") return Nwi(e, t);
  let r = YL(e.keyType._def, { ...t, currentPath: [...t.currentPath, "items", "items", "0"] }) || NN(),
    s = YL(e.valueType._def, { ...t, currentPath: [...t.currentPath, "items", "items", "1"] }) || NN();
  return { type: "array", maxItems: 125, items: { type: "array", items: [r, s], minItems: 2, maxItems: 2 } };
}