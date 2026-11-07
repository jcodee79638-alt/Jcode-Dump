
function Wi(c) {
  const t = new Path2D();
  if (!c) return t;
  for (let e = 0, s = c.length; e < s;)
    switch (c[e++]) {
      case be.moveTo:
        t.moveTo(c[e++], c[e++]);
        break;
      case be.lineTo:
        t.lineTo(c[e++], c[e++]);
        break;
      case be.curveTo:
        t.bezierCurveTo(c[e++], c[e++], c[e++], c[e++], c[e++], c[e++]);
        break;
      case be.quadraticCurveTo:
        t.quadraticCurveTo(c[e++], c[e++], c[e++], c[e++]);
        break;
      case be.closePath:
        t.closePath();
        break;
      default:
        H(`Unrecognized drawing path operator: ${c[e - 1]}`);
        break;
    }
  return t;
}