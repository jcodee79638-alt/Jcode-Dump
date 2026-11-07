
function Ke(e) {
  return e
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .replace(
      /(authorization\s*[:=]\s*(?:bearer\s+)?|(?:api[_-]?key|password|token|secret)\s*[:=]\s*)[^\s,;]+/gi,
      "$1[redacted]",
    )
    .replace(/\b(?:sk|pk)-[A-Za-z0-9_-]{16,}\b/g, "[redacted]")
    .slice(0, 6e3);
}