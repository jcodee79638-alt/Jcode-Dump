
function nn(e) {
  const n = e.replace(
    /\\+(?:u\{([a-f0-9]{1,6})\}|u([a-f0-9]{4})|x([a-f0-9]{2})|([nrtbfv])|(["'\\/]))/gi,
    (i, s, l, a, c, d) => {
      if (d) return d;
      if (c)
        return /[nr]/i.test(c)
          ? `
`
          : "";
      const f = Number.parseInt(s || l || a || "0", 16);
      return f <= 1114111 ? String.fromCodePoint(f) : "";
    },
  );
  return /\\+(?:u\{|u[a-f0-9]{4}|x[a-f0-9]{2}|[nrtbfv"'])/i.test(n)
    ? "[redacted escaped diagnostic]"
    : n
        .replace(
          /[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g,
          "",
        )
        .split(/[\r\n\u2028\u2029]/, 1)[0]
        .replace(/(?:https?:\/\/|file:\/\/|jac-preview:\/\/|\/\/)[^\s<>"'`]+/gi, "[URL]")
        .replace(
          /\b((?:proxy[-_ ]?)?authorization|(?:set[-_ ]?)?cookie)\b["']?\s*[:=][^\r\n]*/gi,
          "$1: [redacted]",
        )
        .replace(
          /\b((?:[a-z0-9]+[_-])*(?:api[_-]?key|password|passwd|token|secret))\b["']?\s*[:=][^\r\n]*/gi,
          "$1=[redacted]",
        )
        .replace(/\b(Basic|Bearer)\s+\S[^\r\n]*/gi, "$1 [redacted]")
        .replace(/\b(?:sk|pk)-[A-Za-z0-9_-]{16,}\b/g, "[redacted]")
        .replace(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, "[redacted]")
        .trim();
}