
function Ppe(e) {
  return e.encoding ? Ppe(e.encoding[e.encoding.length - 1].to) : e;
}