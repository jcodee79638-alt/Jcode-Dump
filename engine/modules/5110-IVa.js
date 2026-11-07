
function IVa(e) {
  try {
    return JSON.stringify(EVa(JSON.parse(e)));
  } catch {
    return e;
  }
}