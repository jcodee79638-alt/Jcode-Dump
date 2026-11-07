
function Qxt(e) {
  let t = e.toLowerCase().trim(),
    r = t.indexOf(";");
  return r === -1 ? t : t.slice(0, r).trim();
}