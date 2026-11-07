
function H7a(e) {
  return Fhe(() => {
    try {
      if (typeof e !== "string") return;
      return JSON.parse(e);
    } catch {
      return;
    }
  });
}