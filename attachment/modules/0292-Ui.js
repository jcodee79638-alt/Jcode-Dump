
function Ui(c, t, e) {
  if (c.nodeType !== Node.ELEMENT_NODE || !c.classList.contains("textLayer") || t !== c.childNodes.length)
    return { container: c, offset: t };
  let s = c.lastChild;
  return (
    s?.nodeType === Node.ELEMENT_NODE && s.classList.contains("endOfContent") && (s = s.previousSibling),
    !s || !e.contains(s)
      ? null
      : s.nodeType === Node.TEXT_NODE
        ? { container: s, offset: s.textContent.length }
        : { container: s, offset: s.childNodes.length }
  );
}