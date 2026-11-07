
var $ma = (e, t) => e === t,
  gma = (e, t) => e.trimEnd() === t.trimEnd(),
  Ema = (e, t) => e.trim() === t.trim(),
  Ima = (e, t) => XDi(e.trim()) === XDi(t.trim()),
  XDi = (e) =>
    e
      .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
      .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
      .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-")
      .replace(/\u2026/g, "...")
      .replace(/\u00A0/g, " "),
  c$r = (e) => (e.startsWith("\uFEFF") ? { bom: !0, text: e.slice(1) } : { bom: !1, text: e }),
  Dma = (e) => e.match(/^(?:cat\s+)?<<['"]?(\w+)['"]?\s*\n([\s\S]*?)\n\1\s*$/)?.[2] ?? e;