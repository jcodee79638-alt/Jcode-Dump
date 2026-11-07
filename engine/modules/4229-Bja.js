
function Bja(e) {
  return (
    ux(e) && typeof e.name === "string" && (e.description === void 0 || typeof e.description === "string")
  );
}