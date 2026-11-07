
function yn(c, t) {
  const { focusOutline: e } = c;
  return {
    bbox: M._rotateBox(e.box, t),
    root: { "data-main-rotation": t },
    rootClass: { highlightOutline: !0, free: c.isFree },
    path: { d: e.toSVGPath() },
  };
}