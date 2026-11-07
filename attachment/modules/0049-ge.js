
function ge(c) {
  if (c.startsWith("#")) {
    const e = c.slice(1);
    return [
      parseInt(e.slice(0, 2), 16),
      parseInt(e.slice(2, 4), 16),
      parseInt(e.slice(4, 6), 16),
      e.length >= 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1,
    ];
  }
  if (c.startsWith("rgb(")) {
    const [e, s, i] = c
      .slice(4, -1)
      .split(",")
      .map((n) => parseInt(n, 10));
    return [e, s, i, 1];
  }
  if (c.startsWith("rgba(")) {
    const e = c.slice(5, -1).split(",");
    return [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10), parseFloat(e[3])];
  }
  const t = c.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+|none))?\)$/);
  return t
    ? [
        Math.round(parseFloat(t[1]) * 255),
        Math.round(parseFloat(t[2]) * 255),
        Math.round(parseFloat(t[3]) * 255),
        t[4] !== void 0 && t[4] !== "none" ? parseFloat(t[4]) : 1,
      ]
    : null;
}