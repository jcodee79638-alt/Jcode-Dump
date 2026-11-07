
function ze(c) {
  return c
    ? c.nodeType === Node.ELEMENT_NODE
      ? c.closest(".textLayer")
      : c.parentElement?.closest(".textLayer") || null
    : null;
}