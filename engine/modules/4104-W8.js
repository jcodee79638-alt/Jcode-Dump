
function W8(e) {
  return { ...e.info, ...(e.info.metadata ? { metadata: { ...e.info.metadata } } : {}) };
}