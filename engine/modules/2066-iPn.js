
function iPn(e) {
  try {
    return Sar.default(e);
  } catch {
    return Sar.default(sPn(e));
  }
}