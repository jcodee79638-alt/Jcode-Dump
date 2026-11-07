
function gVa(e) {
  try {
    return JSON.stringify(_br(JSON.parse(e)));
  } catch {
    return e;
  }
}