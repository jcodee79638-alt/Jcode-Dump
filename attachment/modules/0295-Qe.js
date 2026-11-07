
class Qe {
  #t = [];
  #e = new Map();
  #s = null;
  #i = 0;
  #n = 0;
  #a = 0;
  static #r = null;
  constructor(t, e, s, i) {
    ((this.#i = t),
      (this.#t = e),
      (this.#n = s.rawDims.pageWidth),
      (this.#a = s.rawDims.pageHeight),
      (this.#s = i));
  }
  render() {
    const t = document.createElement("div");
    t.className = "textLayerImages";
    for (let e = 0; e < this.#t.length; e += 6) {
      const s = this.#o(this.#t.subarray(e, e + 6));
      s && t.append(s);
    }
    return (
      t.addEventListener("contextmenu", (e) => {
        if (!(e.target instanceof HTMLCanvasElement)) return;
        const s = e.target,
          i = this.#e.get(s);
        if (!i) return;
        const n = Qe.#r?.deref();
        if (n === s) return;
        (n && ((n.width = 0), (n.height = 0)), (Qe.#r = new WeakRef(s)));
        const { inverseTransform: r, x1: a, y1: o, width: l, height: h } = i,
          d = this.#s(),
          u = Math.ceil(a * d.width),
          f = Math.ceil(o * d.height),
          p = Math.floor((a + l / this.#n) * d.width),
          g = Math.floor((o + h / this.#a) * d.height);
        ((s.width = p - u), (s.height = g - f));
        const m = s.getContext("2d");
        (m.setTransform(...r), m.translate(-u, -f), m.drawImage(d, 0, 0));
      }),
      t
    );
  }
  #o([t, e, s, i, n, r]) {
    const a = Math.hypot((n - t) * this.#n, (r - e) * this.#a),
      o = Math.hypot((s - t) * this.#n, (i - e) * this.#a);
    if (a < this.#i || o < this.#i) return null;
    const l = [
        ((n - t) * this.#n) / a,
        ((r - e) * this.#a) / a,
        ((s - t) * this.#n) / o,
        ((i - e) * this.#a) / o,
        0,
        0,
      ],
      h = T.inverseTransform(l),
      d = document.createElement("canvas");
    return (
      (d.className = "textLayerImagePlaceholder"),
      (d.width = 0),
      (d.height = 0),
      Object.assign(d.style, {
        opacity: 0,
        position: "absolute",
        left: je(t),
        top: je(e),
        width: je(a / this.#n),
        height: je(o / this.#a),
        transformOrigin: "0% 0%",
        transform: `matrix(${l.join(",")})`,
      }),
      this.#e.set(d, { inverseTransform: h, width: a, height: o, x1: t, y1: e }),
      d
    );
  }
}
globalThis._pdfjsTestingUtils = { HighlightOutliner: Ls };
globalThis.pdfjsLib = {
  AbortException: zt,
  AnnotationEditorLayer: Bt,
  AnnotationEditorParamsType: G,
  AnnotationEditorType: B,
  AnnotationEditorUIManager: jt,
  AnnotationLayer: ti,
  AnnotationMode: $t,
  AnnotationType: Z,
  applyOpacity: Yn,
  build: ba,
  ColorPicker: St,
  createValidAbsoluteUrl: Gi,
  CSSConstants: Xn,
  DOMSVGFactory: qe,
  DrawLayer: N,
  FeatureTest: j,
  fetchData: $s,
  findContrastColor: Kn,
  getDocument: hn,
  getFilenameFromUrl: zn,
  getPdfFilenameFromUrl: jn,
  getRGB: Ie,
  getRGBA: ge,
  getUuid: zi,
  GlobalWorkerOptions: de,
  ImageKind: Ve,
  InvalidPDFException: Cs,
  isDataScheme: ss,
  isPdfFile: js,
  isValidExplicitDest: Ar,
  makeArr: pe,
  makeMap: Gs,
  makeObj: Ts,
  makeSet: Un,
  MathClamp: Y,
  noContextMenu: kt,
  normalizeUnicode: Bn,
  OPS: Ft,
  OutputScale: _t,
  PasswordException: _s,
  PasswordResponses: In,
  PDFDataRangeTransport: cn,
  PDFDateString: ks,
  PDFWorker: lt,
  PermissionFlag: Mn,
  PixelsPerInch: fe,
  RenderingCancelledException: zs,
  renderRichText: Vi,
  ResponseException: Xe,
  setLayerDimensions: Qt,
  shadow: k,
  SignatureExtractor: oe,
  stopEvent: rt,
  SupportedImageMimeTypes: Ps,
  TextLayer: ut,
  TextLayerImages: Qe,
  TouchManager: Yi,
  updateUrlHash: $i,
  Util: T,
  VerbosityLevel: Je,
  version: ma,
  XfaLayer: ji,
};