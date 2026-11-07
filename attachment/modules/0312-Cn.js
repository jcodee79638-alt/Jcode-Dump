
function Cn(c, t) {
  const e = new TextEncoder().encode(ci(t));
  return { filename: c, mime: "text/plain", url: "data:text/plain;base64," + Tn(e) };
}