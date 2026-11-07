
function we(c, t) {
  const e = t ? URL.parse(c, t) : URL.parse(c);
  return /https?:/.test(e?.protocol ?? "");
}