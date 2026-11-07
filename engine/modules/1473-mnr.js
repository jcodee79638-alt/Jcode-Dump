
var mnr = (e, { windowsPathsNoEscape: t = !1, magicalBraces: r = !0 } = {}) => {
  if (r)
    return t
      ? e.replace(/\[([^/\\])\]/g, "$1")
      : e.replace(/((?!\\).|^)\[([^/\\])\]/g, "$1$2").replace(/\\([^/])/g, "$1");
  return t
    ? e.replace(/\[([^/\\{}])\]/g, "$1")
    : e.replace(/((?!\\).|^)\[([^/\\{}])\]/g, "$1$2").replace(/\\([^/{}])/g, "$1");
};