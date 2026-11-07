
function Ue(c) {
  ((c.strokeStyle = c.fillStyle = "#000000"),
    (c.fillRule = "nonzero"),
    (c.globalAlpha = 1),
    (c.lineWidth = 1),
    (c.lineCap = "butt"),
    (c.lineJoin = "miter"),
    (c.miterLimit = 10),
    (c.globalCompositeOperation = "source-over"),
    (c.font = "10px sans-serif"),
    c.setLineDash !== void 0 && (c.setLineDash([]), (c.lineDashOffset = 0)));
  const { filter: t } = c;
  t !== "none" && t !== "" && (c.filter = "none");
}