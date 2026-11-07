
function VnH(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}