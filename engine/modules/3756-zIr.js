
function zIr(e) {
  let t = e.split(".");
  if (t.length !== 4) return !1;
  return t.every((r) => {
    let s = Number(r);
    return Number.isInteger(s) && s >= 0 && s <= 255 && String(s) === r;
  });
}