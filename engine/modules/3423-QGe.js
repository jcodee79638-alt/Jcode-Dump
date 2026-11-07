
function QGe(e) {
  let t = Object.values(e).filter((s) => typeof s === "number");
  return Object.entries(e)
    .filter(([s, a]) => t.indexOf(+s) === -1)
    .map(([s, a]) => a);
}