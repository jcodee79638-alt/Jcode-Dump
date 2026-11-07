
function bi(e) {
  if (typeof e !== "string" || !/^[1-9]\d{0,2}$/.test(e)) return;
  let t = Number(e);
  return t <= 512 ? t : void 0;
}