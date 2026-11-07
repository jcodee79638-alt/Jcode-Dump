
function Ie(c) {
  const t = ge(c);
  return t ? t.slice(0, 3) : (H(`Not a valid color format: "${c}"`), [0, 0, 0]);
}