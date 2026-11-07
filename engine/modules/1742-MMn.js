
function MMn(e) {
  let t = e.replace(/^\uFEFF+/, "");
  return { bom: t.length !== e.length, text: t };
}