
function xMa(e, t) {
  let s = {
    type: "array",
    uniqueItems: !0,
    items: YL(e.valueType._def, { ...t, currentPath: [...t.currentPath, "items"] }),
  };
  if (e.minSize) s.minItems = e.minSize.value;
  if (e.maxSize) s.maxItems = e.maxSize.value;
  return s;
}