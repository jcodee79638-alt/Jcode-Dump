
function wht(e) {
  let t = Object.entries(e).filter((r) => r[1] !== void 0);
  return t.length ? Object.fromEntries(t) : void 0;
}