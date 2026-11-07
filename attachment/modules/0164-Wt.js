
function Wt(c, t) {
  const e = [
    "strokeStyle",
    "fillStyle",
    "fillRule",
    "globalAlpha",
    "lineWidth",
    "lineCap",
    "lineJoin",
    "miterLimit",
    "globalCompositeOperation",
    "font",
    "filter",
  ];
  for (const s of e) c[s] !== void 0 && (t[s] = c[s]);
  c.setLineDash !== void 0 && (t.setLineDash(c.getLineDash()), (t.lineDashOffset = c.lineDashOffset));
}