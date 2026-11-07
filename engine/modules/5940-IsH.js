
function IsH(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}