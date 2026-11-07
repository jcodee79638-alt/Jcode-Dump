
function bn(c) {
  return {
    bbox: c.box,
    root: { viewBox: "0 0 1 1" },
    rootClass: { highlight: !0, free: c.isFree },
    path: { d: c.toSVGPath() },
  };
}