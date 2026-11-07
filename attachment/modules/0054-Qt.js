
function Qt(c, t, e = !1, s = !0) {
  if (t instanceof Me) {
    const { pageWidth: i, pageHeight: n } = t.rawDims,
      { style: r } = c,
      a = `round(down, var(--total-scale-factor) * ${i}px, var(--scale-round-x))`,
      o = `round(down, var(--total-scale-factor) * ${n}px, var(--scale-round-y))`;
    !e || t.rotation % 180 === 0 ? ((r.width = a), (r.height = o)) : ((r.width = o), (r.height = a));
  }
  s && c.setAttribute("data-main-rotation", t.rotation);
}