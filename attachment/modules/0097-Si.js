
const Si = (c, t) => c?.getOrInsertComputed(t, () => ({ dependencies: new Set(), isRenderingOperation: !1 }));