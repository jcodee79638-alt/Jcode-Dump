
function xEi(e) {
  if (e.length === 0) return "''";
  return `'${e.replace(/'/g, "'\\''")}'`;
}