
function ss(c) {
  const t = c.length;
  let e = 0;
  for (; e < t && c[e].trim() === "";) e++;
  return c.substring(e, e + 5).toLowerCase() === "data:";
}