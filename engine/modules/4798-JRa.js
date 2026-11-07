
function JRa(e, t) {
  for (let a = t ?? 0; a < e.length; a++) {
    if (e[a] === 10) return { preceding: a, index: a + 1, carriage: !1 };
    if (e[a] === 13) return { preceding: a, index: a + 1, carriage: !0 };
  }
  return null;
}