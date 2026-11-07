
function hn(c = {}) {
  const t = new Qs(),
    { docId: e } = t,
    s = c.url ? mr(c.url) : null,
    i = c.data ? br(c.data) : null,
    n = c.httpHeaders || null,
    r = c.withCredentials === !0,
    a = c.password ?? null,
    o = c.range instanceof cn ? c.range : null,
    l = Number.isInteger(c.rangeChunkSize) && c.rangeChunkSize > 0 ? c.rangeChunkSize : 2 ** 16;
  let h = c.worker instanceof lt ? c.worker : null;
  const d = c.verbosity,
    u = typeof c.docBaseUrl == "string" && !ss(c.docBaseUrl) ? c.docBaseUrl : null,
    f = Ne(c.cMapUrl),
    p = c.cMapPacked !== !1,
    g = Ne(c.iccUrl),
    m = Ne(c.standardFontDataUrl),
    b = Ne(c.wasmUrl),
    y = c.stopAtErrors !== !0,
    A = Number.isInteger(c.maxImageSize) && c.maxImageSize > -1 ? c.maxImageSize : -1,
    w = typeof c.isOffscreenCanvasSupported == "boolean" ? c.isOffscreenCanvasSupported : !mt,
    v = typeof c.isImageDecoderSupported == "boolean" ? c.isImageDecoderSupported : !mt,
    S = Number.isInteger(c.canvasMaxAreaInBytes) ? c.canvasMaxAreaInBytes : -1,
    x = typeof c.disableFontFace == "boolean" ? c.disableFontFace : mt,
    _ = c.fontExtraProperties === !0,
    E = c.enableXfa === !0,
    P = c.ownerDocument || globalThis.document,
    C = c.disableRange === !0,
    R = c.disableStream === !0,
    L = c.disableAutoFetch === !0,
    O = c.pdfBug === !0,
    W = c.CanvasFactory || (mt ? _r : wr),
    I = c.FilterFactory || (mt ? Er : Sr),
    F = c.BinaryDataFactory || (mt ? Cr : Ci),
    et = c.enableHWA === !0,
    Ht = c.enableWebGPU === !0 ? Mr() : Promise.resolve(!1),
    ot = c.useWasm !== !1,
    q = c.pagesMapper || new ha(),
    X = typeof c.useSystemFonts == "boolean" ? c.useSystemFonts : !mt && !x,
    Ut =
      typeof c.useWorkerFetch == "boolean"
        ? c.useWorkerFetch
        : !!(
            F === Ci &&
            f &&
            p &&
            m &&
            b &&
            we(f, document.baseURI) &&
            we(m, document.baseURI) &&
            we(b, document.baseURI)
          ),
    Nt = null;
  Dn(d);
  const Pt = {
    canvasFactory: new W({ ownerDocument: P, enableHWA: et }),
    filterFactory: new I({ docId: e, ownerDocument: P }),
    binaryDataFactory: Ut ? null : new F({ cMapUrl: f, standardFontDataUrl: m, wasmUrl: b }),
  };
  h || ((h = lt.create({ verbosity: d, port: de.workerPort })), (t._worker = h));
  const J = {
      docId: e,
      apiVersion: "6.4.299",
      data: i,
      password: a,
      disableAutoFetch: L,
      rangeChunkSize: l,
      docBaseUrl: u,
      enableXfa: E,
      evaluatorOptions: {
        maxImageSize: A,
        disableFontFace: x,
        ignoreErrors: y,
        isOffscreenCanvasSupported: w,
        isImageDecoderSupported: v,
        canvasMaxAreaInBytes: S,
        fontExtraProperties: _,
        useSystemFonts: X,
        useWasm: ot,
        useWorkerFetch: Ut,
        cMapUrl: f,
        cMapPacked: p,
        iccUrl: g,
        standardFontDataUrl: m,
        wasmUrl: b,
        hasGPU: !1,
      },
    },
    Oe = {
      ownerDocument: P,
      pdfBug: O,
      styleElement: Nt,
      enableHWA: et,
      loadingParams: { disableAutoFetch: L, enableXfa: E },
    };
  return (
    Promise.all([h.promise, Ht])
      .then(function ([, Re]) {
        if (h.destroyed) throw new Error("Worker was destroyed");
        J.evaluatorOptions.hasGPU = Re;
        const us = h.messageHandler.sendWithPromise("GetDocRequest", J, i ? [i.buffer] : null);
        let ee;
        if (!i)
          if (o) ee = new qr({ pdfDataRangeTransport: o, disableRange: C, disableStream: R });
          else if (s) {
            const se = aa(s);
            ee = new se({
              url: s,
              httpHeaders: n,
              withCredentials: r,
              rangeChunkSize: l,
              disableRange: C,
              disableStream: R,
            });
          } else throw new Error("getDocument - expected either `data`, `range`, or `url` parameter.");
        return us.then((se) => {
          if (h.destroyed) throw new Error("Worker was destroyed");
          const me = new ve(e, se, h.port),
            Pn = new pa(me, t, ee, Oe, Pt, q);
          if (((t._transport = Pn), t.destroyed)) throw new Error("Loading aborted");
          me.send("Ready", null);
        });
      })
      .catch(t._capability.reject)
      .finally(t._setupCapability.resolve),
    t
  );
}