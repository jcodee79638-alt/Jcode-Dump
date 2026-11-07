
function QRs(e) {
  if (e === "utf-8" || e === "utf8" || e === "") return rln;
  try {
    return new TextDecoder(e);
  } catch (t) {
    return rln;
  }
}