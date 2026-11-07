
function pi(c, t, e) {
  (Ms(c, e), e.map(Is));
  const s = 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
  (Ms(t, e), e.map(Is));
  const i = 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
  return s > i ? (s + 0.05) / (i + 0.05) : (i + 0.05) / (s + 0.05);
}