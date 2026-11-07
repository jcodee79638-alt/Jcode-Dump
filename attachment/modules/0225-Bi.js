
function Bi(c) {
  return Math.floor(Y(c, 0, 1) * 255)
    .toString(16)
    .padStart(2, "0");
}