
function q5e(e) {
  return (
    PDr.add(e),
    () => {
      PDr.delete(e);
    }
  );
}