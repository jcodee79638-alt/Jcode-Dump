
function es(c) {
  typeof c != "string" && $("Invalid argument for stringToBytes");
  const t = c.length,
    e = new Uint8Array(t);
  for (let s = 0; s < t; ++s) e[s] = c.charCodeAt(s) & 255;
  return e;
}