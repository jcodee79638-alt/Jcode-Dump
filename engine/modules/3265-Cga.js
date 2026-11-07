
function Cga(e, t) {
  return (
    (e.isBlock = Kgr(e)),
    (e.isCode = e.nodeName === "CODE" || e.parentNode.isCode),
    (e.isBlank = wga(e)),
    (e.flankingWhitespace = kga(e, t)),
    e
  );
}