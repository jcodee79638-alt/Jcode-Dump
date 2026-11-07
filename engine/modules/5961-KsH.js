
function KsH(e) {
  if (!e.includes(".")) return e;
  return e
    .split(".")
    .filter((t) => !/^\d+$/.test(t))
    .map((t) => t.slice(0, 1).toUpperCase() + t.slice(1))
    .join("");
}