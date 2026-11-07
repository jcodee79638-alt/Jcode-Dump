
async function uo(c, t) {
  const e = hn({
    data: c,
    enableXfa: !1,
    disableFontFace: !0,
    useSystemFonts: !1,
    useWorkerFetch: !1,
    useWasm: !1,
    stopAtErrors: !0,
    maxImageSize: 4e6,
    canvasMaxAreaInBytes: 8e6,
    disableAutoFetch: !0,
    disableStream: !0,
    disableRange: !0,
  });
  try {
    const s = await e.promise;
    s.numPages > hi.pages && Et("pages");
    const i = [];
    let n = "";
    for (let r = 1; r <= s.numPages; r++) {
      const a = await s.getPage(r),
        o = await a.getTextContent();
      n = ci(
        n +
          `
Page ${r}
` +
          o.items.map((u) => ("str" in u ? u.str : "")).join(" "),
      );
      const l = a.getViewport({ scale: 1 }),
        h = a.getViewport({ scale: Math.min(2, 1280 / Math.max(l.width, l.height)) });
      (!Number.isFinite(h.width) || !Number.isFinite(h.height) || h.width < 1 || h.height < 1) &&
        Et("document");
      const d = document.createElement("canvas");
      ((d.width = Math.ceil(h.width)),
        (d.height = Math.ceil(h.height)),
        await a.render({ canvas: d, viewport: h, annotationMode: 0 }).promise,
        i.push(await kn(d, d.width, d.height, `${t} - page ${r}.jpg`)),
        a.cleanup());
    }
    return [Cn(t + " (extracted text).txt", n), ...i];
  } finally {
    await e.destroy();
  }
}