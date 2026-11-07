
function pdt(e) {
  return (
    typeof e === "object" && e !== null && "mapToDriverValue" in e && typeof e.mapToDriverValue === "function"
  );
}