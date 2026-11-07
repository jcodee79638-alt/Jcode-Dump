
function Ibr(e, t) {
  return ((e.currentTextID = t ?? e.currentTextID ?? `text-${e.text++}`), e.currentTextID);
}