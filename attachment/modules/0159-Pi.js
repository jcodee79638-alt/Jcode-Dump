
function Pi(c, t) {
  if (c._removeMirroring) throw new Error("Context is already forwarding operations.");
  const e = new Map();
  for (const s of [
    "save",
    "restore",
    "rotate",
    "scale",
    "translate",
    "transform",
    "setTransform",
    "resetTransform",
    "clip",
    "moveTo",
    "lineTo",
    "bezierCurveTo",
    "quadraticCurveTo",
    "arc",
    "arcTo",
    "ellipse",
    "rect",
    "roundRect",
    "closePath",
    "beginPath",
  ]) {
    const i = c[s];
    typeof i != "function" ||
      typeof t[s] != "function" ||
      (e.set(s, i),
      (c[s] = function (...n) {
        return (t[s](...n), i.apply(this, n));
      }));
  }
  c._removeMirroring = () => {
    for (const [s, i] of e) c[s] = i;
    delete c._removeMirroring;
  };
}