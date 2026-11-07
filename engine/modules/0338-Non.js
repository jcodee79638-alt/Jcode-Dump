
function Non(e) {
  let t = e?.separator ?? ",";
  return Sm((r) => (r === "" ? [] : r.split(t)));
}