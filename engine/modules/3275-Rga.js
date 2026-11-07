
function Rga(e) {
  return (
    e != null &&
    (typeof e === "string" || (e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11)))
  );
}