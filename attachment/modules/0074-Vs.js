
class Vs {
  #t = zi();
  #e = 0;
  #s = null;
  static get _isSVGFittingCanvas() {
    const t = `data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="${ct}"><rect width="1" height="1" style="fill:red;"/></svg>`,
      s = new OffscreenCanvas(1, 3).getContext("2d", { willReadFrequently: !0 }),
      i = new Image();
    i.src = t;
    const n = i
      .decode()
      .then(
        () => (
          s.drawImage(i, 0, 0, 1, 1, 0, 0, 1, 3),
          new Uint32Array(s.getImageData(0, 0, 1, 1).data.buffer)[0] === 0
        ),
      );
    return k(this, "_isSVGFittingCanvas", n);
  }
  async #i(t, e) {
    this.#s ||= new Map();
    let s = this.#s.get(t);
    if (s === null) return null;
    if (s?.bitmap) return ((s.refCounter += 1), s);
    try {
      s ||= { bitmap: null, id: `image_${this.#t}_${this.#e++}`, refCounter: 0, isSvg: !1 };
      let i;
      if (
        (typeof e == "string"
          ? ((s.url = e), (i = await $s(e, "blob")))
          : e instanceof File
            ? (i = s.file = e)
            : e instanceof Blob && (i = e),
        i.type === "image/svg+xml")
      ) {
        const n = Vs._isSVGFittingCanvas,
          r = new FileReader(),
          a = new Image(),
          o = new Promise((l, h) => {
            ((a.onload = () => {
              ((s.bitmap = a), (s.isSvg = !0), l());
            }),
              (r.onload = async () => {
                const d = (s.svgUrl = r.result);
                a.src = (await n) ? `${d}#svgView(preserveAspectRatio(none))` : d;
              }),
              (a.onerror = r.onerror = h));
          });
        (r.readAsDataURL(i), await o);
      } else s.bitmap = await createImageBitmap(i);
      s.refCounter = 1;
    } catch (i) {
      (H(i), (s = null));
    }
    return (this.#s.set(t, s), s && this.#s.set(s.id, s), s);
  }
  async getFromFile(t) {
    const { lastModified: e, name: s, size: i, type: n } = t;
    return this.#i(`${e}_${s}_${i}_${n}`, t);
  }
  async getFromUrl(t) {
    return this.#i(t, t);
  }
  async getFromBlob(t, e) {
    const s = await e;
    return this.#i(t, s);
  }
  async getFromId(t) {
    this.#s ||= new Map();
    const e = this.#s.get(t);
    if (!e) return null;
    if (e.bitmap) return ((e.refCounter += 1), e);
    if (e.file) return this.getFromFile(e.file);
    if (e.blobPromise) {
      const { blobPromise: s } = e;
      return (delete e.blobPromise, this.getFromBlob(e.id, s));
    }
    return this.getFromUrl(e.url);
  }
  getFromCanvas(t, e) {
    this.#s ||= new Map();
    let s = this.#s.get(t);
    if (s?.bitmap) return ((s.refCounter += 1), s);
    const i = new OffscreenCanvas(e.width, e.height);
    return (
      i.getContext("2d").drawImage(e, 0, 0),
      (s = {
        bitmap: i.transferToImageBitmap(),
        id: `image_${this.#t}_${this.#e++}`,
        refCounter: 1,
        isSvg: !1,
      }),
      this.#s.set(t, s),
      this.#s.set(s.id, s),
      s
    );
  }
  getSvgUrl(t) {
    const e = this.#s.get(t);
    return e?.isSvg ? e.svgUrl : null;
  }
  deleteId(t) {
    this.#s ||= new Map();
    const e = this.#s.get(t);
    if (!e || ((e.refCounter -= 1), e.refCounter !== 0)) return;
    const { bitmap: s } = e;
    if (!e.url && !e.file) {
      const i = new OffscreenCanvas(s.width, s.height);
      (i.getContext("bitmaprenderer").transferFromImageBitmap(s), (e.blobPromise = i.convertToBlob()));
    }
    (s.close?.(), (e.bitmap = null));
  }
  isValidId(t) {
    return t.startsWith(`image_${this.#t}_`);
  }
}