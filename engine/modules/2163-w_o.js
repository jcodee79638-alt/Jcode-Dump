
function w_o(e) {
  let t = typeof e === "string" ? e : af(e);
  return /^[^\s="\\]+$/.test(t) ? t : JSON.stringify(t);
}