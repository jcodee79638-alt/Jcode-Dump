
function iKs(e) {
  if (e.charCodeAt(1) === 94) e = e.slice(0, 1) + e.slice(2);
  if (e.charCodeAt(e.length - 2) === 36) e = e.slice(0, e.length - 2) + e.slice(e.length - 1);
  return e;
}