
function i9s(e, t, r) {
  if (vpe(e)) {
    if (!r) return `(?:${t})`;
  } else if (!r) return t;
  return `(${t})`;
}