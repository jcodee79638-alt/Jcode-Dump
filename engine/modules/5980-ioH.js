
function ioH(e) {
  let t = e.anyOf ?? e.oneOf;
  return t?.length === 2 && t.some(soH) && t.some(ooH);
}