
function Itr(e) {
  if (typeof e === "string") return [WU(e)];
  return e.segments;
}