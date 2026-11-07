
class Ga extends D {
  #t = null;
  #e = null;
  #s = null;
  #i = null;
  #n = null;
  #a = "";
  #r = null;
  #o = !1;
  #l = null;
  #h = !1;
  #u = !1;
  static _type = "stamp";
  static _editorType = B.STAMP;
  constructor(t) {
    (super({ ...t, name: "stampEditor" }),
      (this.#i = t.bitmapUrl),
      (this.#n = t.bitmapFile),
      (this.defaultL10nId = "pdfjs-editor-stamp-editor"));
  }
  static initialize(t, e) {
    D.initialize(t, e);
  }
  static isHandlingMimeForPasting(t) {
    return Ps.has(t);
  }
  static paste(t, e) {
    e.pasteEditor({ mode: B.STAMP }, { bitmapFile: t.getAsFile() });
  }
  altTextFinish() {
    (this._uiManager.useNewAltTextFlow && (this.div.hidden = !1), super.altTextFinish());
  }
  get telemetryFinalData() {
    return { type: "stamp", hasAltText: !!this.altTextData?.altText };
  }
  static computeTelemetryFinalData(t) {
    const e = t.get("hasAltText");
    return { hasAltText: e.get(!0) ?? 0, hasNoAltText: e.get(!1) ?? 0 };
  }
  #d(t, e = !1) {
    if (!t) {
      this.remove();
      return;
    }
    ((this.#t = t.bitmap),
      e || ((this.#e = t.id), (this.#h = t.isSvg)),
      t.file && (this.#a = t.file.name),
      this.#m());
  }
  #f() {
    if (((this.#s = null), this._uiManager.enableWaiting(!1), !!this.#r)) {
      if (this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && this.#t) {
        this.addEditToolbar().then(() => {
          (this._editToolbar.hide(), this._uiManager.editAltText(this, !0));
        });
        return;
      }
      if (!this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && this.#t) {
        this._reportTelemetry({
          action: "pdfjs.image.image_added",
          data: { alt_text_modal: !1, alt_text_type: "empty" },
        });
        try {
          this.mlGuessAltText();
        } catch {}
      }
      this.div.focus();
    }
  }
  async mlGuessAltText(t = null, e = !0) {
    if (this.hasAltTextData()) return null;
    const { mlManager: s } = this._uiManager;
    if (!s) throw new Error("No ML.");
    if (!(await s.isEnabledFor("altText"))) throw new Error("ML isn't enabled for alt text.");
    const { data: i, width: n, height: r } = t || this.copyCanvas(null, null, !0).imageData,
      a = await s.guess({
        name: "altText",
        request: { data: i, width: n, height: r, channels: i.length / (n * r) },
      });
    if (!a) throw new Error("No response from the AI service.");
    if (a.error) throw new Error("Error from the AI service.");
    if (a.cancel) return null;
    if (!a.output) throw new Error("No valid response from the AI service.");
    const o = a.output;
    return (
      await this.setGuessedAltText(o),
      e && !this.hasAltTextData() && (this.altTextData = { alt: o, decorative: !1 }),
      o
    );
  }
  #g() {
    if (this.#e) {
      (this._uiManager.enableWaiting(!0),
        this._uiManager.imageManager
          .getFromId(this.#e)
          .then((s) => this.#d(s, !0))
          .finally(() => this.#f()));
      return;
    }
    if (this.#i) {
      const s = this.#i;
      ((this.#i = null),
        this._uiManager.enableWaiting(!0),
        (this.#s = this._uiManager.imageManager
          .getFromUrl(s)
          .then((i) => this.#d(i))
          .finally(() => this.#f())));
      return;
    }
    if (this.#n) {
      const s = this.#n;
      ((this.#n = null),
        this._uiManager.enableWaiting(!0),
        (this.#s = this._uiManager.imageManager
          .getFromFile(s)
          .then((i) => this.#d(i))
          .finally(() => this.#f())));
      return;
    }
    const t = document.createElement("input");
    ((t.type = "file"), (t.accept = Ps.keys().join(",")));
    const e = this._uiManager._signal;
    ((this.#s = new Promise((s) => {
      (t.addEventListener(
        "change",
        async () => {
          if (!t.files || t.files.length === 0) this.remove();
          else {
            this._uiManager.enableWaiting(!0);
            const i = await this._uiManager.imageManager.getFromFile(t.files[0]);
            (this._reportTelemetry({
              action: "pdfjs.image.image_selected",
              data: { alt_text_modal: this._uiManager.useNewAltTextFlow },
            }),
              this.#d(i));
          }
          s();
        },
        { signal: e },
      ),
        t.addEventListener(
          "cancel",
          () => {
            (this.remove(), s());
          },
          { signal: e },
        ));
    }).finally(() => this.#f())),
      t.click());
  }
  remove() {
    (this.#e &&
      ((this.#t = null),
      this._uiManager.imageManager.deleteId(this.#e),
      this.#r?.remove(),
      (this.#r = null),
      this.#l && (clearTimeout(this.#l), (this.#l = null))),
      super.remove());
  }
  rebuild() {
    if (!this.parent) {
      this.#e && this.#g();
      return;
    }
    (super.rebuild(),
      this.div !== null &&
        (this.#e && this.#r === null && this.#g(), this.isAttachedToDOM || this.parent.add(this)));
  }
  onceAdded(t) {
    ((this._isDraggable = !0), t && this.div.focus());
  }
  isEmpty() {
    return !(this.#s || this.#t || this.#i || this.#n || this.#e || this.#o);
  }
  get toolbarButtons() {
    return [["altText", this.createAltText()]];
  }
  get isResizable() {
    return !0;
  }
  render() {
    if (this.div) return this.div;
    let t, e;
    return (
      this._isCopy && ((t = this.x), (e = this.y)),
      super.render(),
      (this.div.hidden = !0),
      this.createAltText(),
      this.#o || (this.#t ? this.#m() : this.#g()),
      this._isCopy && this._moveAfterPaste(t, e),
      this._uiManager.addShouldRescale(this),
      this.div
    );
  }
  setCanvas(t, e) {
    const { id: s, bitmap: i } = this._uiManager.imageManager.getFromCanvas(t, e);
    (e.remove(),
      s &&
        this._uiManager.imageManager.isValidId(s) &&
        ((this.#e = s), i && (this.#t = i), (this.#o = !1), this.#m()));
  }
  _onResized() {
    this.onScaleChanging();
  }
  onScaleChanging() {
    if (!this.parent) return;
    this.#l !== null && clearTimeout(this.#l);
    const t = 200;
    this.#l = setTimeout(() => {
      ((this.#l = null), this.#p());
    }, t);
  }
  #m() {
    const { div: t } = this;
    let { width: e, height: s } = this.#t;
    const [i, n] = this.pageDimensions,
      r = 0.75;
    if (this.width) ((e = this.width * i), (s = this.height * n));
    else if (e > r * i || s > r * n) {
      const o = Math.min((r * i) / e, (r * n) / s);
      ((e *= o), (s *= o));
    }
    this._uiManager.enableWaiting(!1);
    const a = (this.#r = document.createElement("canvas"));
    (a.setAttribute("role", "img"),
      this.addContainer(a),
      (this.width = e / i),
      (this.height = s / n),
      this.setDims(),
      this._initialOptions?.isCentered ? this.center() : this.fixAndSetPosition(),
      (this._initialOptions = null),
      (!this._uiManager.useNewAltTextWhenAddingImage ||
        !this._uiManager.useNewAltTextFlow ||
        this.annotationElementId) &&
        (t.hidden = !1),
      this.#p(),
      this.#u || (this.parent.addUndoableEditor(this), (this.#u = !0)),
      this._reportTelemetry({ action: "inserted_image" }),
      this.#a && this.div.setAttribute("aria-description", this.#a),
      this.annotationElementId || this._uiManager.a11yAlert(D._l10nAlert.stamp));
  }
  copyCanvas(t, e, s = !1) {
    t ||= 224;
    const { width: i, height: n } = this.#t,
      r = new _t();
    let a = this.#t,
      o = i,
      l = n,
      h = null;
    if (e) {
      if (i > e || n > e) {
        const S = Math.min(e / i, e / n);
        ((o = Math.floor(i * S)), (l = Math.floor(n * S)));
      }
      h = document.createElement("canvas");
      const u = (h.width = Math.ceil(o * r.sx)),
        f = (h.height = Math.ceil(l * r.sy));
      this.#h || (a = this.#c(u, f));
      const p = h.getContext("2d");
      p.filter = this._uiManager.hcmFilter;
      let g = "white",
        m = "#cfcfd8";
      this._uiManager.hcmFilter !== "none"
        ? (m = "black")
        : Wn.isDarkMode && ((g = "#8f8f9d"), (m = "#42414d"));
      const b = 15,
        y = b * r.sx,
        A = b * r.sy,
        w = new OffscreenCanvas(y * 2, A * 2),
        v = w.getContext("2d");
      ((v.fillStyle = g),
        v.fillRect(0, 0, y * 2, A * 2),
        (v.fillStyle = m),
        v.fillRect(0, 0, y, A),
        v.fillRect(y, A, y, A),
        (p.fillStyle = p.createPattern(w, "repeat")),
        p.fillRect(0, 0, u, f),
        p.drawImage(a, 0, 0, a.width, a.height, 0, 0, u, f));
    }
    let d = null;
    if (s) {
      let u, f;
      if (r.symmetric && a.width < t && a.height < t) ((u = a.width), (f = a.height));
      else if (((a = this.#t), i > t || n > t)) {
        const m = Math.min(t / i, t / n);
        ((u = Math.floor(i * m)), (f = Math.floor(n * m)), this.#h || (a = this.#c(u, f)));
      }
      const g = new OffscreenCanvas(u, f).getContext("2d", { willReadFrequently: !0 });
      (g.drawImage(a, 0, 0, a.width, a.height, 0, 0, u, f),
        (d = { width: u, height: f, data: g.getImageData(0, 0, u, f).data }));
    }
    return { canvas: h, width: o, height: l, imageData: d };
  }
  #c(t, e) {
    const { width: s, height: i } = this.#t;
    let n = s,
      r = i,
      a = this.#t;
    for (; n > 2 * t || r > 2 * e;) {
      const o = n,
        l = r;
      (n > 2 * t && (n = Math.ceil(n / 2)), r > 2 * e && (r = Math.ceil(r / 2)));
      const h = new OffscreenCanvas(n, r);
      (h.getContext("2d").drawImage(a, 0, 0, o, l, 0, 0, n, r), (a = h.transferToImageBitmap()));
    }
    return a;
  }
  #p() {
    const [t, e] = this.parentDimensions,
      { width: s, height: i } = this,
      n = new _t(),
      r = Math.ceil(s * t * n.sx),
      a = Math.ceil(i * e * n.sy),
      o = this.#r;
    if (!o || (o.width === r && o.height === a)) return;
    ((o.width = r), (o.height = a));
    const l = this.#h ? this.#t : this.#c(r, a),
      h = o.getContext("2d");
    ((h.filter = this._uiManager.hcmFilter), h.drawImage(l, 0, 0, l.width, l.height, 0, 0, r, a));
  }
  #b(t) {
    if (t) {
      if (this.#h) {
        const i = this._uiManager.imageManager.getSvgUrl(this.#e);
        if (i) return i;
      }
      const e = document.createElement("canvas");
      return (
        ({ width: e.width, height: e.height } = this.#t),
        e.getContext("2d").drawImage(this.#t, 0, 0),
        e.toDataURL()
      );
    }
    if (this.#h) {
      const [e, s] = this.pageDimensions,
        i = Math.round(this.width * e * fe.PDF_TO_CSS_UNITS),
        n = Math.round(this.height * s * fe.PDF_TO_CSS_UNITS),
        r = new OffscreenCanvas(i, n);
      return (
        r.getContext("2d").drawImage(this.#t, 0, 0, this.#t.width, this.#t.height, 0, 0, i, n),
        r.transferToImageBitmap()
      );
    }
    return structuredClone(this.#t);
  }
  static async deserialize(t, e, s) {
    let i = null,
      n = !1;
    if (t instanceof pn) {
      const {
        data: {
          rect: g,
          rotation: m,
          id: b,
          structParent: y,
          popupRef: A,
          richText: w,
          contentsObj: v,
          creationDate: S,
          modificationDate: x,
        },
        container: _,
        parent: {
          page: { pageNumber: E },
        },
        canvas: P,
      } = t;
      let C, R;
      P
        ? (delete t.canvas, ({ id: C, bitmap: R } = s.imageManager.getFromCanvas(_.id, P)), P.remove())
        : ((n = !0), (t._hasNoCanvas = !0));
      const L = (await e._structTree.getAriaAttributes(`${le}${b}`))?.get("aria-label") || "";
      i = t = {
        annotationType: B.STAMP,
        bitmapId: C,
        bitmap: R,
        pageIndex: E - 1,
        rect: g.slice(0),
        rotation: m,
        annotationElementId: b,
        id: b,
        deleted: !1,
        accessibilityData: { decorative: !1, altText: L },
        isSvg: !1,
        structParent: y,
        popupRef: A,
        richText: w,
        comment: v?.str || null,
        creationDate: S,
        modificationDate: x,
      };
    }
    const r = await super.deserialize(t, e, s),
      { rect: a, bitmap: o, bitmapUrl: l, bitmapId: h, isSvg: d, accessibilityData: u } = t;
    (n
      ? (s.addMissingCanvas(t.id, r), (r.#o = !0))
      : h && s.imageManager.isValidId(h)
        ? ((r.#e = h), o && (r.#t = o))
        : (r.#i = l),
      (r.#h = d));
    const [f, p] = r.pageDimensions;
    return (
      (r.width = (a[2] - a[0]) / f),
      (r.height = (a[3] - a[1]) / p),
      u && (r.altTextData = u),
      (r._initialData = i),
      t.comment && r.setCommentData(t),
      (r.#u = !!i),
      r
    );
  }
  serialize(t = !1, e = null) {
    if (this.isEmpty()) return null;
    if (this.deleted) return this.serializeDeleted();
    const s = Object.assign(super.serialize(t), { bitmapId: this.#e, isSvg: this.#h });
    if ((this.addComment(s), t))
      return (
        (s.bitmapUrl = this.#b(!0)),
        (s.accessibilityData = this.serializeAltText(!0)),
        (s.isCopy = !0),
        s
      );
    const { decorative: i, altText: n } = this.serializeAltText(!1);
    if ((!i && n && (s.accessibilityData = { type: "Figure", alt: n }), this.annotationElementId)) {
      const a = this.#y(s);
      return a.isSame
        ? null
        : (a.isSameAltText
            ? delete s.accessibilityData
            : (s.accessibilityData.structParent = this._initialData.structParent ?? -1),
          (s.id = this.annotationElementId),
          delete s.bitmapId,
          s);
    }
    if (e === null) return s;
    e.stamps ||= new Map();
    const r = this.#h ? (s.rect[2] - s.rect[0]) * (s.rect[3] - s.rect[1]) : null;
    if (!e.stamps.has(this.#e)) (e.stamps.set(this.#e, { area: r, serialized: s }), (s.bitmap = this.#b(!1)));
    else if (this.#h) {
      const a = e.stamps.get(this.#e);
      r > a.area && ((a.area = r), a.serialized.bitmap.close(), (a.serialized.bitmap = this.#b(!1)));
    }
    return s;
  }
  #y(t) {
    const {
        pageIndex: e,
        accessibilityData: { altText: s },
      } = this._initialData,
      i = t.pageIndex === e,
      n = (t.accessibilityData?.alt || "") === s;
    return {
      isSame: !this.hasEditedComment && !this._hasBeenMoved && !this._hasBeenResized && i && n,
      isSameAltText: n,
    };
  }
  renderAnnotationElement(t) {
    return this.deleted
      ? (t.hide(), null)
      : (t.updateEdited({ rect: this.getPDFRect(), popup: this.comment }), null);
  }
}