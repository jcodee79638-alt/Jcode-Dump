
function SMa(e, t) {
  if (e.rest)
    return {
      type: "array",
      minItems: e.items.length,
      items: e.items
        .map((r, s) => YL(r._def, { ...t, currentPath: [...t.currentPath, "items", `${s}`] }))
        .reduce((r, s) => (s === void 0 ? r : [...r, s]), []),
      additionalItems: YL(e.rest._def, { ...t, currentPath: [...t.currentPath, "additionalItems"] }),
    };
  else
    return {
      type: "array",
      minItems: e.items.length,
      maxItems: e.items.length,
      items: e.items
        .map((r, s) => YL(r._def, { ...t, currentPath: [...t.currentPath, "items", `${s}`] }))
        .reduce((r, s) => (s === void 0 ? r : [...r, s]), []),
    };
}