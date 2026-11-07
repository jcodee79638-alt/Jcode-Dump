
function Is(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}