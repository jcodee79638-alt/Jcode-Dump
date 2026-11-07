
function fo(c, t) {
  let e = 0,
    s = 0;
  const i = (o) =>
      t === "docx"
        ? /^word\/(?:document|header\d+|footer\d+)\.xml$/.test(o)
        : t === "pptx"
          ? /^ppt\/slides\/slide\d+\.xml$/.test(o)
          : /^xl\/(?:sharedStrings|worksheets\/sheet\d+)\.xml$/.test(o),
    n = lo(c, {
      filter(o) {
        return (
          (++e > 512 ||
            o.name.length > 200 ||
            /(?:^|\/)\.\.(?:\/|$)|\\|vbaProject|externalLinks|embeddings|activeX/i.test(o.name)) &&
            Et("document"),
          i(o.name)
            ? ((o.originalSize > 2e6 ||
                (s += o.originalSize) > 6e6 ||
                o.originalSize > Math.max(1024, o.size) * 200) &&
                Et("document"),
              !0)
            : !1
        );
      },
    }),
    r = [];
  let a = "";
  for (const o of Object.keys(n).sort((l, h) => l.localeCompare(h, void 0, { numeric: !0 }))) {
    const l = _n(n[o]);
    (l.length > 2e6 || /<!DOCTYPE|<!ENTITY/i.test(l)) && Et("document");
    const h = new DOMParser().parseFromString(l, "application/xml");
    if ((h.getElementsByTagName("parsererror").length && Et("document"), o === "xl/sharedStrings.xml")) {
      for (const u of h.getElementsByTagName("si")) r.push(u.textContent ?? "");
      continue;
    }
    const d =
      t === "xlsx"
        ? [...h.getElementsByTagName("row")].map((u) =>
            [...u.getElementsByTagName("c")]
              .map((f) => {
                const p =
                  f.getElementsByTagName("v")[0]?.textContent ??
                  f.getElementsByTagName("t")[0]?.textContent ??
                  "";
                return f.getAttribute("t") === "s" ? (r[Number(p)] ?? "") : p;
              })
              .join("	"),
          )
        : [...h.getElementsByTagNameNS("*", "p")].map((u) =>
            [...u.getElementsByTagNameNS("*", "t")].map((f) => f.textContent ?? "").join(""),
          );
    a = ci(
      a +
        `
${o}
` +
        d.join(`
`),
    );
  }
  return (a.trim() || Et("document"), a);
}
window.attachmentWorker.receive(async (c) => {
  try {
    (!(c.bytes instanceof Uint8Array) || !c.bytes.length || c.bytes.length > hi.fileBytes) && Et("size");
    const t = c.kind.startsWith("image/")
      ? [await co(c.bytes, c.kind, c.filename)]
      : c.kind === "pdf"
        ? await uo(c.bytes, c.filename)
        : [Cn(c.filename + " (extracted text).txt", fo(c.bytes, c.kind))];
    window.attachmentWorker.finish({ ok: !0, files: t });
  } catch (t) {
    window.attachmentWorker.finish({
      ok: !1,
      code: t && typeof t == "object" && "code" in t && typeof t.code == "string" ? t.code : "document",
    });
  }
});
window.attachmentWorker.ready();
