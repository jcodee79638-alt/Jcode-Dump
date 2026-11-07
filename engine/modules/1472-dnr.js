
var dnr = (e, { windowsPathsNoEscape: t = !1, magicalBraces: r = !1 } = {}) => {
  if (r) return t ? e.replace(/[?*()[\]{}]/g, "[$&]") : e.replace(/[?*()[\]\\{}]/g, "\\$&");
  return t ? e.replace(/[?*()[\]]/g, "[$&]") : e.replace(/[?*()[\]\\]/g, "\\$&");
};