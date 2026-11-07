
function Qor(e) {
  return e
    .split("/")
    .map((t) => Yor(t.trim()))
    .filter(Boolean);
}