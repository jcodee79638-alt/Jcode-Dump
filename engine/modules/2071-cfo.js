
function cfo(e) {
  return (
    e.length > 0 && e !== "." && e !== ".." && !e.includes("/") && !e.includes("\\") && !e.includes("\x00")
  );
}