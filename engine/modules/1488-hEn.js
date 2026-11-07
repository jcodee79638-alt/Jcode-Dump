
function hEn(e) {
  if (e.length > 1 && e.charCodeAt(e.length - 1) === 47) return e.slice(0, -1);
  return e;
}